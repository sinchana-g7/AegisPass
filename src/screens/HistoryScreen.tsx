import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PasswordPurpose, VaultEntry } from '../types';
import { PURPOSE_METADATA } from '../utils/constants';
import { decryptData } from '../utils/crypto';
import { 
  KeyRound, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  ShieldCheck, 
  Download, 
  Upload, 
  Plus, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const HistoryScreen: React.FC = () => {
  const { 
    vaultEntries, 
    masterPassword, 
    setMasterPassword, 
    isVaultUnlocked, 
    setIsVaultUnlocked, 
    deleteVaultEntry, 
    clearAllVaultEntries, 
    saveCurrentToVault,
    showToast,
    openInfoModal 
  } = useApp();

  const [masterInput, setMasterInput] = useState(masterPassword);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [decryptedCache, setDecryptedCache] = useState<Record<string, string>>({});
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Manual Add Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPurpose, setNewPurpose] = useState<PasswordPurpose>('other');

  const handleUnlock = () => {
    if (!masterInput.trim()) {
      showToast('Please enter a master password to unlock your vault', 'info');
      return;
    }
    setMasterPassword(masterInput);
    setIsVaultUnlocked(true);
    showToast('Vault decrypted locally', 'success');
  };

  const handleLock = () => {
    setIsVaultUnlocked(false);
    setDecryptedCache({});
    setVisiblePasswords({});
    showToast('Vault locked', 'info');
  };

  const getDecryptedPassword = async (entry: VaultEntry): Promise<string> => {
    if (decryptedCache[entry.id]) {
      return decryptedCache[entry.id];
    }
    try {
      const keyToUse = masterPassword.trim() || 'AegisPass_Default_Key_128';
      const plain = await decryptData(
        entry.ciphertextBase64,
        entry.ivBase64,
        entry.saltBase64,
        keyToUse
      );
      setDecryptedCache(prev => ({ ...prev, [entry.id]: plain }));
      return plain;
    } catch {
      showToast('Decryption failed for this entry. Key mismatch.', 'error');
      return '[Decryption Error]';
    }
  };

  const handleToggleReveal = async (entry: VaultEntry) => {
    const isCurrentlyVisible = visiblePasswords[entry.id];
    if (isCurrentlyVisible) {
      setVisiblePasswords(prev => ({ ...prev, [entry.id]: false }));
    } else {
      await getDecryptedPassword(entry);
      setVisiblePasswords(prev => ({ ...prev, [entry.id]: true }));
    }
  };

  const handleCopyPassword = async (entry: VaultEntry) => {
    const plain = await getDecryptedPassword(entry);
    if (!plain || plain.startsWith('[')) return;
    try {
      await navigator.clipboard.writeText(plain);
      setCopiedId(entry.id);
      showToast('Password copied from encrypted vault!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('Failed to copy password', 'error');
    }
  };

  const handleManualAdd = async () => {
    if (!newPassword.trim() || !newLabel.trim()) {
      showToast('Please provide both a label and a password', 'warning');
      return;
    }
    await saveCurrentToVault(newPassword, newPurpose, newLabel);
    setAddModalOpen(false);
    setNewLabel('');
    setNewPassword('');
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vaultEntries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aegispass_vault_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Vault backup file downloaded', 'success');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            localStorage.setItem('aegispass_vault', JSON.stringify(parsed));
            window.location.reload();
          }
        } catch {
          showToast('Invalid backup JSON format', 'error');
        }
      };
    }
  };

  // Filtered items
  const filteredEntries = vaultEntries.filter(entry => {
    const matchesSearch = (entry.label || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === 'all' || entry.purpose === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline-lg text-white">Password Vault & History</h1>
          <p className="text-sm text-[#b9cacb]">
            AES-GCM-256 encrypted local storage. Passwords remain exclusively in your browser memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openInfoModal('vault')}
            className="text-xs text-[#00f0ff] hover:underline flex items-center gap-1 font-mono"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Vault Cryptography</span>
          </button>
        </div>
      </div>

      {/* Master Password Gate */}
      {!isVaultUnlocked ? (
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#00f0ff]/30 text-center max-w-md mx-auto space-y-6 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
          <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] mx-auto shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Unlock Local Vault</h2>
            <p className="text-xs text-[#849495] leading-relaxed">
              Enter your master passphrase to derive the PBKDF2 decryption key and view your saved credentials.
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="password"
              value={masterInput}
              onChange={(e) => setMasterInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Master Passphrase..."
              className="w-full px-4 py-3 rounded-xl input-cyber text-center font-mono text-white text-sm focus:ring-1 focus:ring-[#00f0ff]"
              autoFocus
            />

            <button
              onClick={handleUnlock}
              className="btn-primary w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Decrypt & Unlock</span>
            </button>
          </div>

          <div className="text-[11px] text-[#849495] border-t border-white/5 pt-4">
            Total Encrypted Entries: <strong className="text-white">{vaultEntries.length}</strong>
          </div>
        </div>
      ) : (
        /* Unlocked Vault View */
        <div className="space-y-6 animate-fade-in">
          {/* Controls toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
            {/* Search & Category Filter */}
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#849495] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved records..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-[#849495] focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#00f0ff] focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="all">All Categories</option>
                {Object.values(PURPOSE_METADATA).map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setAddModalOpen(true)}
                className="btn-primary px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Entry</span>
              </button>

              <button
                onClick={handleLock}
                className="btn-secondary px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 text-[#849495] hover:text-white"
                title="Lock vault"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* Records List */}
          {filteredEntries.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#849495] mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">No Vault Entries Found</h3>
              <p className="text-xs text-[#849495] max-w-sm mx-auto">
                Generate a password from the Generator or click "Add Entry" to save encrypted credentials to this local device.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEntries.map((entry) => {
                const isVisible = visiblePasswords[entry.id];
                const decryptedVal = decryptedCache[entry.id];

                return (
                  <div
                    key={entry.id}
                    className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm font-semibold text-white">{entry.label}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
                          {PURPOSE_METADATA[entry.purpose]?.label || entry.purpose}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {entry.strength}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-[#849495]">
                        <span>Saved: {entry.createdAt}</span>
                      </div>

                      {/* Password line */}
                      <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-[#00f0ff] flex items-center justify-between gap-2 max-w-md">
                        <span className="truncate select-all">
                          {isVisible ? decryptedVal || 'Decrypting...' : '••••••••••••••••••••'}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleReveal(entry)}
                        className="p-2 rounded-xl bg-white/5 text-[#849495] hover:text-white hover:bg-white/10 transition-colors"
                        title={isVisible ? 'Hide' : 'Reveal'}
                      >
                        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleCopyPassword(entry)}
                        className="p-2 rounded-xl bg-white/5 text-[#849495] hover:text-[#00f0ff] hover:bg-white/10 transition-colors"
                        title="Copy password"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => deleteVaultEntry(entry.id)}
                        className="p-2 rounded-xl bg-white/5 text-[#849495] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Backup & Management Toolbar */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#849495]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportBackup}
                disabled={vaultEntries.length === 0}
                className="btn-secondary px-3.5 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Export Encrypted Backup (JSON)</span>
              </button>

              <label className="btn-secondary px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Import Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to completely erase all entries in this local vault? This action cannot be undone.')) {
                  clearAllVaultEntries();
                }
              }}
              disabled={vaultEntries.length === 0}
              className="text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Entire Vault</span>
            </button>
          </div>
        </div>
      )}

      {/* Manual Add Entry Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full space-y-4 border border-[#00f0ff]/30 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-white">Add Encrypted Vault Record</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-[#849495] hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-[#849495] mb-1">Account Label / Title</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. ProtonMail, GitHub, Fidelity"
                  className="w-full px-3.5 py-2 rounded-xl input-cyber text-sm text-white"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#849495] mb-1">Category</label>
                <select
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value as PasswordPurpose)}
                  className="w-full px-3.5 py-2 rounded-xl input-cyber text-sm text-[#00f0ff]"
                >
                  {Object.values(PURPOSE_METADATA).map(p => (
                    <option key={p.id} value={p.id} className="bg-[#12131a] text-white">{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#849495] mb-1">Password to Encrypt</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-3.5 py-2 rounded-xl input-cyber font-mono text-sm text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setAddModalOpen(false)}
                className="btn-secondary px-4 py-2 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleManualAdd}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Save Encrypted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
