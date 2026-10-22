import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { OpeningScreen } from './components/OpeningScreen';
import { WorldMap } from './components/WorldMap';
import { LocationEntrance } from './components/LocationEntrance';
import { ChamberView } from './components/ChamberView';
import { TreasureChamber } from './components/TreasureChamber';
import { FinalVaultChamber } from './components/FinalVaultChamber';
import { InventoryModal } from './components/InventoryModal';
import { JournalModal } from './components/JournalModal';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';

const GameContainer: React.FC = () => {
  const { currentScreen, setScreen } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E3827]">
      {/* Top Header Bar */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentScreen === 'opening' && <OpeningScreen />}
        {currentScreen === 'map' && <WorldMap />}
        {currentScreen === 'location-entrance' && <LocationEntrance />}
        {currentScreen === 'chamber' && <ChamberView />}
        {currentScreen === 'treasure' && <TreasureChamber />}
        {currentScreen === 'final-vault' && <FinalVaultChamber />}
        {currentScreen === 'privacy' && <PrivacyPolicyPage />}
        {currentScreen === 'terms' && <TermsPage />}
      </main>

      {/* Persistent Modals */}
      <InventoryModal />
      <JournalModal />

      {/* Clean Light Footer */}
      <footer className="mt-auto border-t border-[#DDD5C3] py-6 px-4 bg-[#F2EDE1] text-xs text-[#6E7E73]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono-code text-center sm:text-left">
            <span>The Memory Vault · Computer Organization & Architecture</span>
            <span className="mx-2 text-[#DDD5C3]">·</span>
            <span>Module 5 Curriculum (3 Core Topics · 15 Puzzles)</span>
          </div>

          <div className="flex items-center gap-4 font-mono-code">
            <button
              onClick={() => setScreen('privacy')}
              className="hover:text-[#1E3827] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#DDD5C3]">/</span>
            <button
              onClick={() => setScreen('terms')}
              className="hover:text-[#1E3827] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}

export default App;
