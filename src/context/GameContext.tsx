import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameProgress, LocationId, ScreenType, JournalRecord } from '../types/game';
import { LOCATIONS } from '../data/locationsData';
import { soundFx } from '../utils/audio';

const STORAGE_KEY = 'the_memory_vault_save_v2';

const defaultProgress: GameProgress = {
  solvedPuzzles: [],
  unlockedDoors: [],
  collectedKeys: [],
  completedLocations: [],
  claimedTreasures: [],
  vaultRestored: false,
  score: 0,
  hintsUsedCount: 0,
  hintsRevealed: {},
  visitedChambers: {
    'hierarchy': 1,
    'main-memory': 1,
    'cache-mapping': 1
  },
  soundEnabled: true
};

interface GameContextType {
  progress: GameProgress;
  currentScreen: ScreenType;
  selectedLocationId: LocationId | null;
  activeChamberNumber: number; // 1 to 5
  activeToolId: string | null;
  isInventoryOpen: boolean;
  isJournalOpen: boolean;
  journalEntries: JournalRecord[];
  
  // Navigation
  setScreen: (screen: ScreenType) => void;
  selectLocation: (id: LocationId) => void;
  enterChamber: (chamberNum: number, locId?: LocationId) => void;
  goToMap: () => void;
  
  // Gameplay Actions
  solvePuzzle: (puzzleId: string) => void;
  collectKey: (puzzleId: string) => void;
  unlockDoor: (puzzleId: string) => void;
  advanceToNextChamber: () => void;
  claimLocationTreasure: (locId: LocationId) => void;
  useHint: (puzzleId: string, level: 1 | 2) => void;
  restoreCentralVault: () => void;
  
  // Modals & UI
  toggleInventory: (open?: boolean) => void;
  toggleJournal: (open?: boolean) => void;
  setActiveTool: (toolId: string | null) => void;
  toggleSound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ensure DOM is strictly in light mode
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('dark');
        localStorage.removeItem('the_memory_vault_theme');
      }
    } catch {
      // ignore
    }
  }, []);

  const [progress, setProgress] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultProgress,
          ...parsed,
          visitedChambers: {
            ...defaultProgress.visitedChambers,
            ...(parsed.visitedChambers || {})
          }
        };
      }
    } catch {
      // fallback
    }
    return defaultProgress;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('opening');
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId | null>(null);
  const [activeChamberNumber, setActiveChamberNumber] = useState<number>(1);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Sync sound settings
  useEffect(() => {
    soundFx.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Build unlocked journal entries
  const journalEntries: JournalRecord[] = React.useMemo(() => {
    const list: JournalRecord[] = [];
    LOCATIONS.forEach(loc => {
      loc.puzzles.forEach(puzzle => {
        if (progress.solvedPuzzles.includes(puzzle.id)) {
          list.push({
            puzzleId: puzzle.id,
            locationId: loc.id,
            chamberNumber: puzzle.number,
            title: puzzle.title,
            academicConcept: puzzle.academicConcept,
            summary: puzzle.journalEntry.summary,
            keyTakeaway: puzzle.journalEntry.keyTakeaway,
            formulaOrDiagram: puzzle.journalEntry.formulaOrDiagram,
            unlockedAt: 'Mastered'
          });
        }
      });
    });
    return list;
  }, [progress.solvedPuzzles]);

  const selectLocation = (id: LocationId) => {
    soundFx.playClick();
    setSelectedLocationId(id);
    const highestChamber = progress.visitedChambers[id] || 1;
    setActiveChamberNumber(highestChamber);
    setCurrentScreen('location-entrance');
  };

  const enterChamber = (chamberNum: number, locId?: LocationId) => {
    soundFx.playClick();
    if (locId) {
      setSelectedLocationId(locId);
    }
    setActiveChamberNumber(chamberNum);
    setCurrentScreen('chamber');
  };

  const goToMap = () => {
    soundFx.playClick();
    setCurrentScreen('map');
  };

  const solvePuzzle = (puzzleId: string) => {
    if (progress.solvedPuzzles.includes(puzzleId)) return;
    soundFx.playSuccess();
    setProgress(prev => {
      const alreadySolved = prev.solvedPuzzles.includes(puzzleId);
      if (alreadySolved) return prev;
      return {
        ...prev,
        solvedPuzzles: [...prev.solvedPuzzles, puzzleId],
        score: prev.score + 100
      };
    });
  };

  const collectKey = (puzzleId: string) => {
    if (progress.collectedKeys.includes(puzzleId)) return;
    soundFx.playKeyCollect();
    setProgress(prev => ({
      ...prev,
      collectedKeys: [...prev.collectedKeys, puzzleId]
    }));
  };

  const unlockDoor = (puzzleId: string) => {
    if (progress.unlockedDoors.includes(puzzleId)) return;
    soundFx.playDoorUnlock();
    setProgress(prev => ({
      ...prev,
      unlockedDoors: [...prev.unlockedDoors, puzzleId]
    }));
  };

  const advanceToNextChamber = () => {
    if (!selectedLocationId) return;
    if (activeChamberNumber < 5) {
      const nextNum = activeChamberNumber + 1;
      setActiveChamberNumber(nextNum);
      setProgress(prev => ({
        ...prev,
        visitedChambers: {
          ...prev.visitedChambers,
          [selectedLocationId]: Math.max(prev.visitedChambers[selectedLocationId] || 1, nextNum)
        }
      }));
    } else {
      // Completed all 5 chambers -> Treasure Chamber!
      claimLocationTreasure(selectedLocationId);
      setCurrentScreen('treasure');
    }
  };

  const claimLocationTreasure = (locId: LocationId) => {
    soundFx.playSuccess();
    setProgress(prev => {
      const isDone = prev.completedLocations.includes(locId);
      const newDone = isDone ? prev.completedLocations : [...prev.completedLocations, locId];
      const hasTreasure = prev.claimedTreasures.includes(locId);
      const newTreasures = hasTreasure ? prev.claimedTreasures : [...prev.claimedTreasures, locId];
      return {
        ...prev,
        completedLocations: newDone,
        claimedTreasures: newTreasures
      };
    });
  };

  const useHint = (puzzleId: string, level: 1 | 2) => {
    const currentLevel = progress.hintsRevealed[puzzleId] || 0;
    if (level <= currentLevel) return; // already revealed

    soundFx.playHint();
    setProgress(prev => ({
      ...prev,
      score: Math.max(0, prev.score - 5),
      hintsUsedCount: prev.hintsUsedCount + 1,
      hintsRevealed: {
        ...prev.hintsRevealed,
        [puzzleId]: level
      }
    }));
  };

  const restoreCentralVault = () => {
    soundFx.playSuccess();
    setProgress(prev => ({
      ...prev,
      vaultRestored: true,
      score: prev.score + 500
    }));
  };

  const toggleSound = () => {
    setProgress(prev => {
      const next = !prev.soundEnabled;
      soundFx.setEnabled(next);
      return { ...prev, soundEnabled: next };
    });
  };

  const resetGame = () => {
    soundFx.playClick();
    localStorage.removeItem(STORAGE_KEY);
    setProgress(defaultProgress);
    setCurrentScreen('opening');
    setSelectedLocationId(null);
    setActiveChamberNumber(1);
    setIsInventoryOpen(false);
    setIsJournalOpen(false);
  };

  return (
    <GameContext.Provider
      value={{
        progress,
        currentScreen,
        selectedLocationId,
        activeChamberNumber,
        activeToolId,
        isInventoryOpen,
        isJournalOpen,
        journalEntries,
        setScreen: setCurrentScreen,
        selectLocation,
        enterChamber,
        goToMap,
        solvePuzzle,
        collectKey,
        unlockDoor,
        advanceToNextChamber,
        claimLocationTreasure,
        useHint,
        restoreCentralVault,
        toggleInventory: (open) => setIsInventoryOpen(open !== undefined ? open : !isInventoryOpen),
        toggleJournal: (open) => setIsJournalOpen(open !== undefined ? open : !isJournalOpen),
        setActiveTool: setActiveToolId,
        toggleSound,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
