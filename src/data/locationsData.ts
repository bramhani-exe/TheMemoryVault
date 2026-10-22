import { LocationData } from '../types/game';

export const LOCATIONS: LocationData[] = [
  // =========================================================================
  // LOCATION 1: THE MEMORY SPIRE (Memory Hierarchy)
  // =========================================================================
  {
    id: 'hierarchy',
    name: 'The Memory Spire',
    topicTitle: 'Memory Hierarchy Organization',
    syllabusModuleHours: 'Module 5: Topic 1',
    description: 'A grand multi-tiered architectural tower representing the spectrum of computer memory, from ultra-fast CPU registers at the pinnacle down to high-capacity storage at the base.',
    environmentTheme: 'Lush terraced spire garden with brass observation decks, stepped pyramid platforms, and luminous copper bus traces.',
    buildingVisual: 'tower',
    iconSvg: 'Layers',
    treasure: {
      id: 'hierarchy-relic',
      name: 'Pyramid of Hierarchy',
      academicSymbol: 'Speed vs. Cost',
      description: 'A sacred golden pyramid illustrating the fundamental law: closer to CPU = faster access and higher cost per bit; further = larger capacity and lower cost.',
      restorationRole: 'Synchronizes the multi-tier speed balancing channels of the Central Memory Vault.'
    },
    masterySummary: 'Mastery of Memory Hierarchy achieved: You demonstrated the 4-tier memory speed/cost pyramid, recognized CPU registers as the fastest on-chip storage, understood the trade-offs of the hierarchy, identified cache as the bridge to RAM, and sorted temporal and spatial locality.',
    puzzles: [
      {
        id: 'hierarchy-1',
        number: 1,
        title: 'The Hierarchy Tower',
        academicConcept: 'Memory Hierarchy Levels (Fastest to Slowest)',
        chamberDescription: 'Four empty levels of an illuminated hierarchy tower rise before a reinforced brass door. Each tier represents a stage of the computer memory hierarchy.',
        environmentalClue: 'A brass plaque reads: "At the peak sits the fastest, smallest storage inside the processor; at the foundation rests high-capacity bulk storage."',
        hints: [
          'Arrange from top to bottom: Registers (fastest) -> Cache (SRAM) -> Main Memory (DRAM) -> Secondary Storage (SSD).',
          'Level 1 is Registers, Level 2 is Cache, Level 3 is Main Memory, Level 4 is Secondary Storage.'
        ],
        journalEntry: {
          summary: 'The memory hierarchy organizes computer storage into distinct levels to balance speed, cost, and capacity. Fast memory is expensive and small; large memory is inexpensive but slower.',
          keyTakeaway: 'Order from fastest/smallest to slowest/largest: CPU Registers -> Cache (SRAM) -> Main Memory (DRAM) -> Secondary Storage (SSD/Disk).',
          formulaOrDiagram: 'CPU Registers (<1 ns) < Cache (1-10 ns) < Main RAM (50-100 ns) < Storage (>10,000 ns)'
        },
        interactiveData: {
          type: 'hierarchyTowerConfig',
          prompt: 'Place each memory component into its correct level of the hierarchy tower, from fastest access (top) to highest capacity (bottom).',
          instructions: 'Click a component, then click the matching level slot in the hierarchy tower.',
          hierarchyTowerConfig: {
            floors: [
              { level: 1, name: 'Level 1: Pinnacle', description: 'Fastest access (<1 ns), inside CPU core', acceptedComponentId: 'comp-reg' },
              { level: 2, name: 'Level 2: High-Speed Buffer', description: 'Fast SRAM cache bridging CPU and memory', acceptedComponentId: 'comp-cache' },
              { level: 3, name: 'Level 3: Working Store', description: 'Main system RAM holding active program data', acceptedComponentId: 'comp-ram' },
              { level: 4, name: 'Level 4: Foundation', description: 'High-capacity, non-volatile bulk storage', acceptedComponentId: 'comp-ssd' }
            ],
            components: [
              { id: 'comp-reg', name: 'CPU Registers', metric: '~0.5 ns · Fastest', iconType: 'register' },
              { id: 'comp-cache', name: 'Cache Memory (SRAM)', metric: '~2 ns · High Speed', iconType: 'cache' },
              { id: 'comp-ram', name: 'Main Memory (DRAM)', metric: '~60 ns · Working Store', iconType: 'ram' },
              { id: 'comp-ssd', name: 'Secondary Storage (SSD)', metric: '~50 µs · Bulk Storage', iconType: 'ssd' }
            ]
          }
        }
      },
      {
        id: 'hierarchy-2',
        number: 2,
        title: 'The Processor Sanctum',
        academicConcept: 'Fastest Storage Inside the CPU Core',
        chamberDescription: 'A glowing CPU schematic displays the processor execution core surrounded by memory pathways.',
        environmentalClue: 'A copper sign states: "Only one storage element operates at processor clock speed within the arithmetic logic unit itself."',
        hints: [
          'Which component is located directly inside the CPU: RAM, SSD, or Registers?',
          'CPU Registers are the closest and fastest storage elements in a computer.'
        ],
        journalEntry: {
          summary: 'CPU registers reside directly inside the processor chip. They hold immediate operands and instruction addresses for single-cycle execution.',
          keyTakeaway: 'Registers are the fastest storage element in the computer hierarchy, operating with zero bus delay.',
          formulaOrDiagram: 'CPU Core -> Internal Registers (Zero Bus Latency)'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Which storage component is located directly inside the CPU core for instantaneous single-cycle execution?',
          instructions: 'Select the illustrated component that resides inside the processor core.',
          visualSelectConfig: {
            question: 'Identify the fastest storage inside the CPU:',
            options: [
              {
                id: 'opt-reg',
                label: 'CPU Registers',
                sublabel: 'Inside execution core · Sub-nanosecond speed',
                iconName: 'Cpu',
                isCorrect: true,
                explanation: 'Correct! Registers reside directly within the CPU execution unit, providing instantaneous operand access.'
              },
              {
                id: 'opt-ram',
                label: 'Main Memory (DRAM)',
                sublabel: 'External system bus · 50-80 ns latency',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. Main memory (RAM) is located outside the CPU on the motherboard system bus.'
              },
              {
                id: 'opt-ssd',
                label: 'Solid State Drive (SSD)',
                sublabel: 'PCIe / NVMe peripheral · Microsecond latency',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Incorrect. SSDs are secondary storage devices connected via peripheral interfaces.'
              },
              {
                id: 'opt-hdd',
                label: 'Magnetic Hard Disk',
                sublabel: 'Mechanical drive · Millisecond latency',
                iconName: 'Disc',
                isCorrect: false,
                explanation: 'Incorrect. Hard disks are mechanical secondary storage devices.'
              }
            ]
          }
        }
      },
      {
        id: 'hierarchy-3',
        number: 3,
        title: 'Hierarchy Role Matching',
        academicConcept: 'Functional Roles in the Memory Hierarchy',
        chamberDescription: 'A diagnostic patchbay displays three memory components and three architectural functional sockets.',
        environmentalClue: 'Connect each memory component to its primary architectural function in the computer system.',
        hints: [
          'Registers provide single-cycle execution inside the CPU; Cache is the high-speed SRAM buffer; SSD is long-term non-volatile storage.',
          'Match Registers to Internal CPU storage, Cache to High-speed buffer, and SSD to Permanent bulk storage.'
        ],
        journalEntry: {
          summary: 'Each tier of the memory hierarchy serves a specialized role: registers feed the ALU, cache buffers frequent data, and secondary storage retains files permanently.',
          keyTakeaway: 'The hierarchy balances cost and performance: fast SRAM cache absorbs memory stalls, while cheap SSD stores terabytes.',
          formulaOrDiagram: 'Registers (ALU data) | Cache (Speed buffer) | Secondary Storage (Permanent files)'
        },
        interactiveData: {
          type: 'circuitWiringConfig',
          prompt: 'Match each memory component with its corresponding architectural role in the computer system.',
          instructions: 'Click a component card on the left, then click its matching role socket on the right.',
          circuitWiringConfig: {
            title: 'Memory Component Role Patchbay',
            schematicType: 'bus-cycle',
            sockets: [
              { id: 'sock-reg', label: 'Ultra-fast execution storage located inside the CPU', correctComponentId: 'c-reg' },
              { id: 'sock-cache', label: 'High-speed SRAM buffer bridging CPU and Main Memory', correctComponentId: 'c-cache' },
              { id: 'sock-ssd', label: 'Non-volatile permanent storage for operating system and files', correctComponentId: 'c-ssd' }
            ],
            components: [
              { id: 'c-reg', name: 'CPU Registers', description: 'Internal ALU operands store' },
              { id: 'c-cache', name: 'Cache (SRAM)', description: 'Fast buffer between CPU and RAM' },
              { id: 'c-ssd', name: 'Secondary SSD', description: 'High-capacity permanent file store' }
            ]
          }
        }
      },
      {
        id: 'hierarchy-4',
        number: 4,
        title: 'The Missing Bridge Tier',
        academicConcept: 'Cache Memory as the Bridge Between CPU and RAM',
        chamberDescription: 'A wall diagram illustrates a memory pyramid with an empty glowing gap between processor registers and system RAM.',
        environmentalClue: 'A technician note reads: "Because DRAM is over 100 times slower than the CPU, a high-speed SRAM buffer is required to prevent CPU starvation."',
        hints: [
          'What high-speed memory sits between CPU Registers and Main Memory RAM?',
          'Cache memory (SRAM) bridges the speed gap between CPU and RAM.'
        ],
        journalEntry: {
          summary: 'Without cache memory, modern processors would spend over 90% of their clock cycles waiting for slow DRAM main memory.',
          keyTakeaway: 'Cache memory (SRAM) acts as an ultra-fast buffer between CPU registers and main memory.',
          formulaOrDiagram: 'CPU Core <-> [ Cache (SRAM) ] <-> Main Memory (DRAM)'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Which high-speed memory component fills the missing tier between CPU Registers and Main Memory?',
          instructions: 'Select the component that bridges the speed gap between CPU and RAM.',
          visualSelectConfig: {
            question: 'Identify the missing intermediate memory tier:',
            options: [
              {
                id: 'opt-cache',
                label: 'Cache Memory (SRAM)',
                sublabel: 'Bridging buffer · 1-5 ns access time',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! Cache memory (SRAM) bridges the massive speed gap between processor registers and slower DRAM.'
              },
              {
                id: 'opt-dvd',
                label: 'Optical Disc (DVD/Blu-Ray)',
                sublabel: 'Removable media · Very slow millisecond access',
                iconName: 'Disc',
                isCorrect: false,
                explanation: 'Incorrect. Optical media is a slow secondary storage format, not a CPU-to-memory bridge.'
              },
              {
                id: 'opt-tape',
                label: 'Magnetic Tape Drive',
                sublabel: 'Sequential archival media',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Incorrect. Tape storage is used for offline archives.'
              },
              {
                id: 'opt-rom',
                label: 'BIOS ROM Chip',
                sublabel: 'Firmware boot store',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. ROM stores startup firmware, not runtime CPU buffer data.'
              }
            ]
          }
        }
      },
            {
        id: 'hierarchy-5',
        number: 5,
        title: 'The Memory Pattern Sorter',
        academicConcept: 'Locality of Reference',
        chamberDescription: 'Two sorting chambers show how a running program uses memory.',
        environmentalClue: 'During program execution, memory references tend to cluster. Loops are a common example.',
        hints: [
          'A loop counter is used again and again.',
          'Sequential array access uses memory locations close together.'
        ],
        journalEntry: {
          summary: 'During program execution, memory references tend to cluster. This pattern is called locality of reference.',
          keyTakeaway: 'Repeated use of the same location and use of nearby locations are common memory-access patterns.',
          formulaOrDiagram: 'Loop counter = Repeated access | Array traversal = Nearby access'
        },
        interactiveData: {
          type: 'classificationConfig',
          prompt: 'Sort each memory-access pattern into the correct group.',
          instructions: 'Click an access pattern, then click its matching group.',
          classificationConfig: {
            categories: [
              { id: 'cat-repeated', title: 'Repeated Access', description: 'The same memory location is used again and again' },
              { id: 'cat-nearby', title: 'Nearby Access', description: 'Memory locations close together are used one after another' }
            ],
            items: [
              { id: 'item-loop', name: 'A loop counter used in every iteration', correctCategoryId: 'cat-repeated', note: 'The same location is reused' },
              { id: 'item-array', name: 'Reading array[0], array[1], array[2] in order', correctCategoryId: 'cat-nearby', note: 'Nearby locations are used in sequence' }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // LOCATION 2: THE PRIMARY CORE (Main Memory)
  // =========================================================================
  {
    id: 'main-memory',
    name: 'The Primary Core',
    topicTitle: 'Main Memory Organization (RAM)',
    syllabusModuleHours: 'Module 5: Topic 2',
    description: 'The central memory laboratory of the facility, housing silicon modules, DRAM capacitive arrays, and the volatile working storage that sustains active computing.',
    environmentTheme: 'Cleanroom facility with jade columns, translucent circuit trays, and gold-plated memory bus sockets.',
    buildingVisual: 'garden',
    iconSvg: 'Cpu',
    treasure: {
      id: 'main-memory-relic',
      name: 'Matrix RAM Core',
      academicSymbol: '1T-1C Cell',
      description: 'An illuminated silicon wafer preserving the architecture of Dynamic RAM: dense 1-transistor 1-capacitor memory cells and multiplexed row-column addressing.',
      restorationRole: 'Restores working memory addressing and row refresh control to the Central Memory Vault.'
    },
    masterySummary: 'Mastery of Main Memory achieved: You identified physical RAM modules, verified the active working role of system memory, conducted the power failure experiment confirming volatility, analyzed SRAM vs DRAM cell designs, and demonstrated capacitor refresh cycles.',
    puzzles: [
            {
        id: 'main-memory-1',
        number: 1,
        title: 'Where Does the Data Go?',
        academicConcept: 'Main Memory and Secondary Storage',
        chamberDescription: 'A memory-routing panel asks where different data should be placed.',
        environmentalClue: 'The CPU needs programs and data while they are being used. Saved files must remain stored.',
        hints: [
          'Programs being used now go into main memory.',
          'Files kept after the computer turns off go into secondary storage.'
        ],
        journalEntry: {
          summary: 'Main memory holds programs and data while the CPU uses them. Secondary storage keeps saved files.',
          keyTakeaway: 'Main memory is working storage; secondary storage keeps saved files.',
          formulaOrDiagram: 'Active program/data -> Main Memory | Saved files -> Secondary Storage'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'A student is editing a project that is saved on the computer. Where is the open project held while it is being used?',
          instructions: 'Select the correct memory type.',
          visualSelectConfig: {
            question: 'Where is the open project held while it is being used?',
            options: [
              {
                id: 'opt-main-memory',
                label: 'Main Memory',
                sublabel: 'Holds programs and data while the CPU uses them',
                iconName: 'Layers',
                isCorrect: true,
                explanation: 'Correct! Main memory holds the program and data while they are being used.'
              },
              {
                id: 'opt-secondary',
                label: 'Secondary Storage',
                sublabel: 'Keeps saved files for later use',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Not quite. Secondary storage keeps the saved copy, but the open project being used is held in main memory.'
              },
              {
                id: 'opt-cache',
                label: 'Cache',
                sublabel: 'Small, fast memory between the CPU and main memory',
                iconName: 'Zap',
                isCorrect: false,
                explanation: 'Not quite. Cache is a small fast buffer between the CPU and main memory.'
              },
              {
                id: 'opt-registers',
                label: 'CPU Registers',
                sublabel: 'Fast storage inside the CPU',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Not quite. Registers are fast storage inside the CPU, not the main place for an open project.'
              }
            ]
          }
        }
      },
      {
        id: 'main-memory-2',
        number: 2,
        title: 'The Working Memory Role',
        academicConcept: 'Primary Purpose of Main Memory (RAM)',
        chamberDescription: 'An architectural system bus diagram depicts the CPU requesting code and variable buffers.',
        environmentalClue: 'A technician note states: "The CPU cannot execute code directly from a hard drive; programs must first be loaded into working memory."',
        hints: [
          'What is RAM used for: active running programs or permanent long-term storage?',
          'RAM holds currently running instructions and data being actively processed by the CPU.'
        ],
        journalEntry: {
          summary: 'Main memory holds operating system code, active application instructions, and data currently being manipulated by the processor.',
          keyTakeaway: 'Main memory (RAM) is the direct working workspace of the CPU. Programs must be loaded into RAM to execute.',
          formulaOrDiagram: 'Storage (Files) -> Loaded into RAM -> Executed by CPU'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'What is the primary operational role of Main Memory (RAM) during computer execution?',
          instructions: 'Select the option that correctly describes the role of RAM.',
          visualSelectConfig: {
            question: 'What is the primary role of Main Memory (RAM)?',
            options: [
              {
                id: 'opt-active',
                label: 'Holding active programs and data currently being executed by the CPU',
                sublabel: 'Fast read/write working space for the processor',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! Main memory serves as the direct working storage holding active software code and operating data.'
              },
              {
                id: 'opt-permanent',
                label: 'Permanently saving user documents when the computer is turned off',
                sublabel: 'Permanent non-volatile archiving',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Incorrect. Permanent storage is the role of secondary storage (SSD/HDD), not volatile RAM.'
              },
              {
                id: 'opt-cooling',
                label: 'Regulating power voltages and cooling fan speeds on the motherboard',
                sublabel: 'Hardware power management',
                iconName: 'Power',
                isCorrect: false,
                explanation: 'Incorrect. Hardware power regulation is handled by the power supply and motherboard VRMs.'
              },
              {
                id: 'opt-network',
                label: 'Transmitting internet packets through the ethernet network card',
                sublabel: 'Network communications',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Incorrect. Network packet transmission is handled by network interface controllers.'
              }
            ]
          }
        }
      },
            {
        id: 'main-memory-3',
        number: 3,
        title: 'Match the Memory Job',
        academicConcept: 'Roles of Cache, Main Memory, and Secondary Storage',
        chamberDescription: 'Three memory components must be matched to their jobs.',
        environmentalClue: 'Cache is small and fast. Main memory holds data in use. Secondary storage keeps saved files.',
        hints: [
          'Cache is the small, fast memory between the CPU and main memory.',
          'Main memory holds programs and data currently being used.'
        ],
        journalEntry: {
          summary: 'Cache, main memory, and secondary storage perform different jobs in the memory system.',
          keyTakeaway: 'Cache is small and fast; main memory holds data in use; secondary storage keeps saved files.',
          formulaOrDiagram: 'Cache = small/fast | Main Memory = data in use | Secondary Storage = saved files'
        },
        interactiveData: {
          type: 'circuitWiringConfig',
          prompt: 'Match each memory type to its correct job.',
          instructions: 'Click a memory type, then click its matching job.',
          circuitWiringConfig: {
            title: 'Memory Job Matcher',
            schematicType: 'bus-cycle',
            sockets: [
              { id: 'sock-cache', label: 'Small, fast memory between the CPU and main memory', correctComponentId: 'c-cache' },
              { id: 'sock-main', label: 'Holds programs and data currently being used', correctComponentId: 'c-main' },
              { id: 'sock-secondary', label: 'Keeps saved files for later use', correctComponentId: 'c-secondary' }
            ],
            components: [
              { id: 'c-cache', name: 'Cache', description: 'Small, fast memory' },
              { id: 'c-main', name: 'Main Memory', description: 'Working storage' },
              { id: 'c-secondary', name: 'Secondary Storage', description: 'Saved file storage' }
            ]
          }
        }
      },
            {
        id: 'main-memory-4',
        number: 4,
        title: 'Fast or Affordable?',
        academicConcept: 'SRAM Speed and Cost',
        chamberDescription: 'A memory-choice panel compares two approaches to building memory.',
        environmentalClue: 'A computer built entirely from SRAM would be very fast, but it would cost a very large amount.',
        hints: [
          'SRAM is very fast but expensive.',
          'Main memory is used for the programs and data currently in use.'
        ],
        journalEntry: {
          summary: 'SRAM is very fast, but using it for all memory would be very expensive.',
          keyTakeaway: 'SRAM is fast but costly; main memory is used for the computer’s working data.',
          formulaOrDiagram: 'SRAM = very fast, high cost | Main Memory = working storage'
        },
        interactiveData: {
          type: 'circuitWiringConfig',
          prompt: 'Match each memory type to its correct description.',
          instructions: 'Click a memory type, then click its matching description.',
          circuitWiringConfig: {
            title: 'Memory Choice Panel',
            schematicType: 'dram-vs-sram',
            sockets: [
              { id: 'sock-sram', label: 'Very fast memory, but very expensive to use for all memory', correctComponentId: 'c-sram' },
              { id: 'sock-main', label: 'Main memory used for programs and data currently in use', correctComponentId: 'c-main' }
            ],
            components: [
              { id: 'c-sram', name: 'SRAM', description: 'Fast memory' },
              { id: 'c-main', name: 'Main Memory', description: 'Working memory' }
            ]
          }
        }
      },
            {
        id: 'main-memory-5',
        number: 5,
        title: 'The Memory Trade-Off',
        academicConcept: 'Memory Speed, Cost, and Hierarchy',
        chamberDescription: 'A memory planner must choose between speed and cost.',
        environmentalClue: 'Fast memory is desirable, but building all memory from the fastest type would cost a very large amount.',
        hints: [
          'SRAM is very fast but expensive.',
          'A computer needs a balance of speed, capacity, and cost.'
        ],
        journalEntry: {
          summary: 'Memory design balances speed, capacity, and cost.',
          keyTakeaway: 'Very fast memory such as SRAM is expensive, so computers use a hierarchy of memory types.',
          formulaOrDiagram: 'Speed + Capacity + Cost = Memory hierarchy trade-off'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Why do computers not use only the fastest memory for everything?',
          instructions: 'Select the best reason.',
          visualSelectConfig: {
            question: 'Why not use only the fastest memory for everything?',
            options: [
              {
                id: 'opt-cost',
                label: 'The fastest memory would cost a very large amount',
                sublabel: 'Computers balance speed, capacity, and cost',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! The fastest memory is expensive, so computers use a memory hierarchy.'
              },
              {
                id: 'opt-speed',
                label: 'Fast memory is too slow for the CPU',
                sublabel: 'Speed limitation',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Not quite. The fastest memory is fast; the issue is its high cost.'
              },
              {
                id: 'opt-capacity',
                label: 'Fast memory cannot store any data',
                sublabel: 'Capacity limitation',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Not quite. Fast memory can store data, but it is expensive.'
              },
              {
                id: 'opt-power',
                label: 'Fast memory uses no electrical power',
                sublabel: 'Power usage',
                iconName: 'Power',
                isCorrect: false,
                explanation: 'Not quite. The main trade-off taught here is speed versus cost.'
              }
            ]
          }
        }
      }
    ]
  },

  // =========================================================================
  // LOCATION 3: THE CACHE CITADEL (Cache Memory Mapping)
  // =========================================================================
  {
    id: 'cache-mapping',
    name: 'The Cache Citadel',
    topicTitle: 'Cache Memory Mapping',
    syllabusModuleHours: 'Module 5: Topic 3',
    description: 'A fortress of high-speed routing mechanisms where main memory blocks are mapped into cache lines using direct, associative, and modulo routing circuits.',
    environmentTheme: 'Geometric labyrinth with polished quartz walls, illuminated data bus channels, and brass selector switches.',
    buildingVisual: 'labyrinth',
    iconSvg: 'BookOpen',
    treasure: {
      id: 'cache-relic',
      name: 'Cache Modulo Crossbar',
      academicSymbol: 'Block mod N',
      description: 'A golden crossbar matrix capable of instantly computing cache line indices, comparing address tags, and verifying cache hits.',
      restorationRole: 'Restores high-speed cache mapping and tag validation circuits to the Central Memory Vault.'
    },
    masterySummary: 'Mastery of Cache Memory Mapping achieved: You mastered Direct Mapping calculations using Block mod N, verified the role of address TAG fields, routed memory blocks into cache lines, distinguished Cache Hits from Misses, and compared Direct vs Fully Associative flexibility.',
    puzzles: [
      {
        id: 'cache-mapping-1',
        number: 1,
        title: 'The Direct-Mapping Router',
        academicConcept: 'Direct Cache Mapping Formula (Cache Line = Block mod N)',
        chamberDescription: 'A direct-mapping cache routing console displays 4 cache lines (Line 0, 1, 2, 3). Memory Block #14 is queued to enter the cache.',
        environmentalClue: 'Formula inscribed above the router: Cache Line = (Memory Block Number) mod (Total Cache Lines). With 4 cache lines: Line = 14 mod 4.',
        hints: [
          'Calculate 14 mod 4 (the remainder when 14 is divided by 4).',
          '14 divided by 4 is 3 with a remainder of 2. Therefore, 14 mod 4 = Line 2.'
        ],
        journalEntry: {
          summary: 'In Direct Mapping, each memory block maps to exactly one cache line determined by the formula: Cache Line = (Block Address) mod (Total Cache Lines).',
          keyTakeaway: 'For a 4-line cache, Block #14 maps to Line 2 because 14 mod 4 = 2 (14 = 4 × 3 + 2).',
          formulaOrDiagram: 'Cache Line = Memory Block mod (Number of Cache Lines) = 14 mod 4 = Line 2'
        },
        interactiveData: {
          type: 'cacheRouterMachineConfig',
          prompt: 'A direct-mapped cache has 4 lines (Lines 0, 1, 2, 3). Which cache line will Memory Block #14 map to?',
          instructions: 'Using the formula Line = Block mod 4, select the correct destination cache line compartment.',
          cacheRouterMachineConfig: {
            blockAddress: 14,
            totalLines: 4,
            blockDataPreview: 'Block #14 [PAYLOAD: 0xEE44]',
            mappingRuleFormula: 'Cache Line = 14 mod 4 = 2',
            correctLineIndex: 2,
            lineSlots: [
              { index: 0, label: 'Cache Line 0 (Holds Block mod 4 = 0)' },
              { index: 1, label: 'Cache Line 1 (Holds Block mod 4 = 1)' },
              { index: 2, label: 'Cache Line 2 (Holds Block mod 4 = 2)' },
              { index: 3, label: 'Cache Line 3 (Holds Block mod 4 = 3)' }
            ]
          }
        }
      },
      {
        id: 'cache-mapping-2',
        number: 2,
        title: 'The Sentinel Tag',
        academicConcept: 'Purpose of the Cache Address TAG Field',
        chamberDescription: 'A glowing cache line schematic shows a data block paired with an address TAG field.',
        environmentalClue: 'Because multiple memory blocks map to the same cache line, the TAG acts as a fingerprint to verify which block is currently stored.',
        hints: [
          'What is the TAG used for: checking if the requested block is in the cache line, or measuring clock speed?',
          'The TAG field verifies whether the block stored in the line matches the requested CPU address.'
        ],
        journalEntry: {
          summary: 'Because multiple memory blocks share the same cache line index, a TAG field containing the upper address bits is stored alongside the data to identify the block.',
          keyTakeaway: 'The TAG field identifies whether the data currently in the cache line corresponds to the memory address requested by the CPU.',
          formulaOrDiagram: 'Address = [ TAG | INDEX | OFFSET ] -> TAG match = Cache Hit'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'In a cache memory line, what is the crucial purpose of the TAG field?',
          instructions: 'Select the option that correctly describes the role of the cache address TAG.',
          visualSelectConfig: {
            question: 'What is the purpose of the cache TAG field?',
            options: [
              {
                id: 'opt-tag-id',
                label: 'To verify whether the cached block matches the exact memory address requested by the CPU',
                sublabel: 'Address identification and hit/miss verification',
                iconName: 'ShieldCheck',
                isCorrect: true,
                explanation: 'Correct! The TAG contains the upper address bits, allowing the comparator to confirm if the cached block matches the requested memory block.'
              },
              {
                id: 'opt-tag-speed',
                label: 'To measure the clock frequency and electrical temperature of the cache bus',
                sublabel: 'Hardware diagnostics',
                iconName: 'Zap',
                isCorrect: false,
                explanation: 'Incorrect. The TAG is an address identifier, not a diagnostic sensor.'
              },
              {
                id: 'opt-tag-compress',
                label: 'To compress data bytes so double the information fits in the line',
                sublabel: 'Data compression',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. Cache lines store raw data words without compression.'
              },
              {
                id: 'opt-tag-backup',
                label: 'To periodically duplicate and backup cache lines to the hard drive',
                sublabel: 'Disk backup',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Incorrect. Backup to storage is handled by operating system file services.'
              }
            ]
          }
        }
      },
      {
        id: 'cache-mapping-3',
        number: 3,
        title: 'Cache Route mod 4 (Block #9)',
        academicConcept: 'Direct Cache Mapping for Memory Block #9',
        chamberDescription: 'Another memory block, Block #9, arrives at the direct-mapped cache routing machine with 4 lines.',
        environmentalClue: 'Formula: Line = Block mod 4. Compute 9 mod 4 to determine which line will hold Block #9.',
        hints: [
          'What is 9 divided by 4? 4 * 2 = 8, with 1 left over.',
          '9 mod 4 = 1. Click Cache Line 1.'
        ],
        journalEntry: {
          summary: 'In a 4-line direct mapped cache, any block number divided by 4 leaves a remainder between 0 and 3, which is the cache line index.',
          keyTakeaway: 'Block #9 maps to Cache Line 1 because 9 mod 4 = 1.',
          formulaOrDiagram: 'Cache Line = 9 mod 4 = Line 1 (9 = 4 × 2 + 1)'
        },
        interactiveData: {
          type: 'cacheRouterMachineConfig',
          prompt: 'A direct-mapped cache has 4 lines (Lines 0, 1, 2, 3). Which cache line will Memory Block #9 map to?',
          instructions: 'Compute 9 mod 4 and select the corresponding cache line compartment.',
          cacheRouterMachineConfig: {
            blockAddress: 9,
            totalLines: 4,
            blockDataPreview: 'Block #9 [PAYLOAD: 0x99AA]',
            mappingRuleFormula: 'Cache Line = 9 mod 4 = 1',
            correctLineIndex: 1,
            lineSlots: [
              { index: 0, label: 'Cache Line 0 (Block mod 4 = 0)' },
              { index: 1, label: 'Cache Line 1 (Block mod 4 = 1)' },
              { index: 2, label: 'Cache Line 2 (Block mod 4 = 2)' },
              { index: 3, label: 'Cache Line 3 (Block mod 4 = 3)' }
            ]
          }
        }
      },
      {
        id: 'cache-mapping-4',
        number: 4,
        title: 'Cache Hit vs. Cache Miss',
        academicConcept: 'Recognizing Cache Hit vs. Cache Miss',
        chamberDescription: 'An animated logic gate compares an incoming CPU request with the cache tag memory.',
        environmentalClue: 'When the tag matches and the valid bit is 1, the CPU gets its data immediately without waiting for main memory.',
        hints: [
          'When requested data is found in cache, is it a Hit or a Miss?',
          'Finding the data in cache is a Cache Hit.'
        ],
        journalEntry: {
          summary: 'A Cache Hit occurs when the processor finds the requested memory block in cache memory. A Cache Miss occurs when it must fetch the block from slower main memory.',
          keyTakeaway: 'Cache Hit: Fast instant access from cache. Cache Miss: Delay while loading from main memory.',
          formulaOrDiagram: 'Tag Match = Cache Hit (Fast) | Tag Mismatch = Cache Miss (Fetch from RAM)'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'When the CPU requests data and finds a matching TAG already present in cache memory, this event is called:',
          instructions: 'Select the correct architectural term for this event.',
          visualSelectConfig: {
            question: 'What is this successful cache event called?',
            options: [
              {
                id: 'opt-hit',
                label: 'Cache Hit',
                sublabel: 'Immediate ultra-fast data delivery to the CPU',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! A Cache Hit occurs when the requested memory word is found in cache, delivering data with minimal latency.'
              },
              {
                id: 'opt-miss',
                label: 'Cache Miss',
                sublabel: 'Must stall and fetch the block from slower main RAM',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. A Cache Miss occurs when the data is NOT in cache and must be retrieved from RAM.'
              },
              {
                id: 'opt-fault',
                label: 'Page Fault',
                sublabel: 'Virtual memory disk page transfer',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Incorrect. A Page Fault is a virtual memory operating system event, not a cache hit.'
              },
              {
                id: 'opt-bus',
                label: 'Bus Invalidation Error',
                sublabel: 'Hardware bus fault',
                iconName: 'Power',
                isCorrect: false,
                explanation: 'Incorrect. Finding requested data in cache is a normal successful hit, not an error.'
              }
            ]
          }
        }
      },
            {
        id: 'cache-mapping-5',
        number: 5,
        title: 'One Line or Two?',
        academicConcept: 'Direct Mapping vs. 2-Way Set-Associative Mapping',
        chamberDescription: 'Two cache-routing diagrams compare where a memory block may be placed.',
        environmentalClue: 'In direct mapping, a block has one fixed cache line. In 2-way set-associative mapping, a block can use either of two lines in its set.',
        hints: [
          'Direct mapping gives a block one fixed line.',
          '2-way set-associative mapping gives a block two possible lines in its set.'
        ],
        journalEntry: {
          summary: 'Direct mapping assigns a memory block to one specific cache line. A 2-way set-associative cache allows a block to occupy either of two lines in its designated set.',
          keyTakeaway: 'Direct-mapped: one fixed line. 2-way set-associative: two possible lines in the set.',
          formulaOrDiagram: 'Direct-mapped = 1 fixed line | 2-way set-associative = 2 lines in its set'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'In a 2-way set-associative cache, how many cache lines in its designated set can a memory block use?',
          instructions: 'Select the correct number of possible cache lines.',
          visualSelectConfig: {
            question: 'How many cache lines in its set can a block use in a 2-way set-associative cache?',
            options: [
              {
                id: 'opt-two',
                label: '2 lines',
                sublabel: 'Either of the two lines in its designated set',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! In a 2-way set-associative cache, a block can use either of two lines in its set.'
              },
              {
                id: 'opt-one',
                label: '1 fixed line',
                sublabel: 'Direct mapping assigns one specific line',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Not quite. One fixed line describes direct mapping, not 2-way set-associative mapping.'
              },
              {
                id: 'opt-four',
                label: '4 lines',
                sublabel: 'A larger set size',
                iconName: 'HardDrive',
                isCorrect: false,
                explanation: 'Not quite. A 2-way set-associative cache provides two possible lines per set.'
              },
              {
                id: 'opt-any',
                label: 'Any line in the whole cache',
                sublabel: 'Maximum placement freedom',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Not quite. A 2-way set-associative cache limits the block to two lines within its set.'
              }
            ]
          }
        }
      }
    ]
  }
];
