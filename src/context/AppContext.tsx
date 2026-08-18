import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  GeneratorConfig, 
  PasswordPurpose, 
  PasswordStrength, 
  ScreenId, 
  VaultEntry 
} from '../types';
import { PURPOSE_METADATA } from '../utils/constants';
import { calculateMetrics, encryptData, generateSecurePassword } from '../utils/crypto';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  userName: string;
  setUserName: (name: string) => void;
  selectedPurpose: PasswordPurpose;
  setSelectedPurpose: (purpose: PasswordPurpose) => void;
  generatorConfig: GeneratorConfig;
  setGeneratorConfig: React.Dispatch<React.SetStateAction<GeneratorConfig>>;
  activePassword: string;
  setActivePassword: (pwd: string) => void;
  regeneratePassword: () => void;
  vaultEntries: VaultEntry[];
  masterPassword: string;
  setMasterPassword: (pwd: string) => void;
  isVaultUnlocked: boolean;
  setIsVaultUnlocked: (unlocked: boolean) => void;
  saveCurrentToVault: (pwd: string, purpose: PasswordPurpose, label?: string) => Promise<boolean>;
  deleteVaultEntry: (id: string) => void;
  clearAllVaultEntries: () => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  infoModalTopic: string | null;
  openInfoModal: (topic: string) => void;
  closeInfoModal: () => void;
  videoSrc: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VIDEO_MAP: Record<ScreenId, string> = {
  home: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787026149/screen_1.mp4',
  welcome: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787026219/screen_2.mp4',
  generator: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787026278/screen_3.mp4',
  checker: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787026323/screen_4.mp4',
  validator: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787062082/screen_5.mp4',
  history: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787062137/screen_6.mp4',
  tips: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787062195/screen_7.mp4',
  about: 'https://res.cloudinary.com/vp90xv9o/video/upload/v1787062234/screen_8.mp4'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [userName, setUserNameState] = useState<string>(() => {
    return localStorage.getItem('aegispass_username') || '';
  });
  const [selectedPurpose, setSelectedPurposeState] = useState<PasswordPurpose>('banking');
  const [generatorConfig, setGeneratorConfig] = useState<GeneratorConfig>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [activePassword, setActivePassword] = useState<string>('');
  const [vaultEntries, setVaultEntries] = useState<VaultEntry[]>(() => {
    try {
      const saved = localStorage.getItem('aegispass_vault');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [infoModalTopic, setInfoModalTopic] = useState<string | null>(null);

  // Synchronize username in localStorage
  const setUserName = (name: string) => {
    setUserNameState(name);
    localStorage.setItem('aegispass_username', name);
  };

  // Switch purpose and automatically adjust recommended default length
  const setSelectedPurpose = (purpose: PasswordPurpose) => {
    setSelectedPurposeState(purpose);
    const meta = PURPOSE_METADATA[purpose];
    if (meta) {
      setGeneratorConfig(prev => ({
        ...prev,
        length: meta.defaultLength
      }));
    }
  };

  // Regenerate password
  const regeneratePassword = useCallback(() => {
    const pwd = generateSecurePassword(generatorConfig);
    setActivePassword(pwd);
  }, [generatorConfig]);

  // Initial password generation on mount
  useEffect(() => {
    if (!activePassword) {
      regeneratePassword();
    }
  }, [activePassword, regeneratePassword]);

  // Toast helper
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Save entry to Encrypted Vault
  const saveCurrentToVault = async (
    pwd: string, 
    purpose: PasswordPurpose, 
    label?: string
  ): Promise<boolean> => {
    if (!pwd) return false;
    
    // Check if master password is set
    const keyToUse = masterPassword.trim() || 'AegisPass_Default_Key_128';
    
    try {
      const encrypted = await encryptData(pwd, keyToUse);
      const metrics = calculateMetrics(pwd);
      const now = new Date();
      const formattedDate = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}, ${now.getFullYear()}`;
      
      const newEntry: VaultEntry = {
        id: 'vault_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        purpose,
        label: label || PURPOSE_METADATA[purpose].label,
        createdAt: formattedDate,
        timestamp: Date.now(),
        strength: metrics.strength as PasswordStrength,
        ciphertextBase64: encrypted.ciphertextBase64,
        ivBase64: encrypted.ivBase64,
        saltBase64: encrypted.saltBase64
      };

      const updated = [newEntry, ...vaultEntries];
      setVaultEntries(updated);
      localStorage.setItem('aegispass_vault', JSON.stringify(updated));
      showToast(`Saved to Encrypted Local Vault (${PURPOSE_METADATA[purpose].label})`, 'success');
      return true;
    } catch (err) {
      console.error('Failed to encrypt vault entry:', err);
      showToast('Encryption failed. Please check master password.', 'error');
      return false;
    }
  };

  const deleteVaultEntry = (id: string) => {
    const updated = vaultEntries.filter(e => e.id !== id);
    setVaultEntries(updated);
    localStorage.setItem('aegispass_vault', JSON.stringify(updated));
    showToast('Entry removed from vault', 'info');
  };

  const clearAllVaultEntries = () => {
    setVaultEntries([]);
    localStorage.removeItem('aegispass_vault');
    showToast('Vault history cleared completely', 'info');
  };

  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openInfoModal = (topic: string) => {
    setInfoModalTopic(topic);
  };

  const closeInfoModal = () => {
    setInfoModalTopic(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        userName,
        setUserName,
        selectedPurpose,
        setSelectedPurpose,
        generatorConfig,
        setGeneratorConfig,
        activePassword,
        setActivePassword,
        regeneratePassword,
        vaultEntries,
        masterPassword,
        setMasterPassword,
        isVaultUnlocked,
        setIsVaultUnlocked,
        saveCurrentToVault,
        deleteVaultEntry,
        clearAllVaultEntries,
        toasts,
        showToast,
        infoModalTopic,
        openInfoModal,
        closeInfoModal,
        videoSrc: VIDEO_MAP[currentScreen]
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
