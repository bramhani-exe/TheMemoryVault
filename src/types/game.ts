export type LocationId =
  | 'hierarchy'
  | 'main-memory'
  | 'cache-mapping';

export type ScreenType =
  | 'opening'
  | 'map'
  | 'location-entrance'
  | 'chamber'
  | 'treasure'
  | 'final-vault'
  | 'privacy'
  | 'terms';

export type PuzzleType =
  | 'visualSelectConfig'
  | 'rotaryLockConfig'
  | 'powerFailureLabConfig'
  | 'hierarchyTowerConfig'
  | 'cacheRouterMachineConfig'
  | 'addressDecoderConfig'
  | 'coherenceConsoleConfig'
  | 'circuitWiringConfig'
  | 'storageSorterConfig'
  | 'calculationConfig'
  | 'bitFieldConfig'
  | 'classificationConfig'
  | 'orderingConfig';

export interface VisualOption {
  id: string;
  label: string;
  sublabel?: string;
  iconName?: string;
  isCorrect: boolean;
  explanation: string;
}

export interface InteractivePuzzleData {
  type: PuzzleType;
  prompt: string;
  instructions: string;
  diagramSvg?: string; // Optional embedded SVG illustration
  
  // 1. Visual Selection Apparatus (Large selectable illustrated options with immediate gentle feedback)
  visualSelectConfig?: {
    question: string;
    options: VisualOption[];
  };

  // 2. Power Failure Experiment Laboratory (Knife Switch)
  powerFailureLabConfig?: {
    devices: {
      id: string;
      name: string;
      typeTag: string;
      isVolatile: boolean;
      prePowerData: string;
      postPowerData: string;
    }[];
    challengeQuestion: string;
    targetDeviceId: string; // ID of device player must identify after blackout
  };

  // 3. Memory Hierarchy Tower (Slotting components into pyramid floors)
  hierarchyTowerConfig?: {
    floors: {
      level: number;
      name: string;
      description: string;
      acceptedComponentId: string;
    }[];
    components: {
      id: string;
      name: string;
      metric: string;
      iconType: 'register' | 'cache' | 'ram' | 'ssd' | 'tape';
    }[];
  };

  // 4. Cache Routing Modulo Machine
  cacheRouterMachineConfig?: {
    blockAddress: number;
    totalLines: number;
    blockDataPreview: string;
    mappingRuleFormula: string;
    correctLineIndex: number;
    lineSlots: { index: number; label: string }[];
  };

  // 5. Mechanical Rotary / Drum Combination Lock
  rotaryLockConfig?: {
    inputs: {
      label: string;
      unit?: string;
      defaultValue?: string;
      placeholder?: string;
      key: string;
      digits?: number;
      minVal?: number;
      maxVal?: number;
      step?: number;
    }[];
    validationFormula: (vals: Record<string, string>) => { isValid: boolean; feedback: string };
    targetHint: string;
    explanation: string;
  };

  // 6. Classification / Locality Sorter
  classificationConfig?: {
    categories: { id: string; title: string; description: string }[];
    items: { id: string; name: string; correctCategoryId: string; note: string }[];
  };

  // 7. Component / Circuit Wiring Workbench
  circuitWiringConfig?: {
    title: string;
    schematicType: 'dram-vs-sram' | 'bus-cycle' | 'sdram-pipeline';
    sockets: { id: string; label: string; correctComponentId: string }[];
    components: { id: string; name: string; description: string }[];
  };

  // Backward compatibility structures
  storageSorterConfig?: {
    categories: { id: string; title: string; description: string }[];
    items: { id: string; name: string; correctCategoryId: string; note: string }[];
  };
  addressDecoderConfig?: {
    totalBits: number;
    fields: { name: string; key: string; correctBits: number; hint: string }[];
    totalExplanation: string;
  };
}

export interface ChamberPuzzle {
  id: string;
  number: number; // 1 to 5
  title: string;
  academicConcept: string;
  chamberDescription: string;
  environmentalClue: string;
  interactiveData: InteractivePuzzleData;
  hints: string[]; // Progressive hint levels
  journalEntry: {
    summary: string;
    keyTakeaway: string;
    formulaOrDiagram?: string;
  };
}

export interface LocationData {
  id: LocationId;
  name: string;
  topicTitle: string;
  syllabusModuleHours: string;
  description: string;
  environmentTheme: string;
  buildingVisual: 'tower' | 'garden' | 'foundry' | 'archive' | 'labyrinth' | 'citadel';
  iconSvg: string;
  puzzles: ChamberPuzzle[];
  treasure: {
    id: string;
    name: string;
    academicSymbol: string;
    description: string;
    restorationRole: string;
  };
  masterySummary: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  usageLocationHint?: string;
  interactiveClueTitle: string;
  interactiveClueContent: string;
  iconName: string;
}

export interface JournalRecord {
  puzzleId: string;
  locationId: LocationId;
  chamberNumber: number;
  title: string;
  academicConcept: string;
  summary: string;
  keyTakeaway: string;
  formulaOrDiagram?: string;
  unlockedAt: string;
}

export interface GameProgress {
  solvedPuzzles: string[]; // puzzle IDs (15 total)
  unlockedDoors: string[]; // puzzle IDs corresponding to opened doors
  collectedKeys: string[]; // puzzle IDs where key collected
  completedLocations: LocationId[]; // (3 total)
  claimedTreasures: string[]; // (3 total)
  vaultRestored: boolean;
  score: number;
  hintsUsedCount: number;
  hintsRevealed: Record<string, number>; // puzzleId -> level (1 or 2)
  visitedChambers: Record<LocationId, number>; // highest chamber reached (1-5)
  soundEnabled: boolean;
}
