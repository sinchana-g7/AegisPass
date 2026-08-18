import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNav } from './components/TopNav';
import { Footer } from './components/Footer';
import { InfoModal, ToastContainer } from './components/InfoModal';
import { HomeScreen } from './screens/HomeScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GeneratorScreen } from './screens/GeneratorScreen';
import { CheckerScreen } from './screens/CheckerScreen';
import { ValidatorScreen } from './screens/ValidatorScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { TipsScreen } from './screens/TipsScreen';
import { AboutScreen } from './screens/AboutScreen';

const MainLayout: React.FC = () => {
  const { currentScreen, videoSrc } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'generator':
        return <GeneratorScreen />;
      case 'checker':
        return <CheckerScreen />;
      case 'validator':
        return <ValidatorScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'tips':
        return <TipsScreen />;
      case 'about':
        return <AboutScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e2e1eb] flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambient Video Layer */}
      {videoSrc && (
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="video-background opacity-30 object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark Obsidian Gradient Overlay */}
      <div className="overlay-gradient"></div>

      {/* Main Interactive App Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 flex flex-col">
          {renderScreen()}
        </main>
        <Footer />
      </div>

      {/* Global Overlays & Toasts */}
      <InfoModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
