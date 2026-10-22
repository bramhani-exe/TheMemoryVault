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
        title: 'The Locality Sorter',
        academicConcept: 'Temporal vs. Spatial Locality of Reference',
        chamberDescription: 'Two categorization chambers labeled Temporal Locality and Spatial Locality flank the final chamber doorway.',
        environmentalClue: 'Temporal Locality = referencing the SAME item repeatedly in time. Spatial Locality = referencing NEIGHBORING memory addresses in space.',
        hints: [
          'Loop counter variable accessed repeatedly = Temporal Locality. Stepping through an array sequentially = Spatial Locality.',
          'Assign the loop counter to Temporal and the sequential array to Spatial.'
        ],
        journalEntry: {
          summary: 'Programs exhibit locality of reference: temporal locality (re-accessing recently used memory) and spatial locality (accessing adjacent addresses). Cache memory exploits both.',
          keyTakeaway: 'Temporal: re-accessing same memory soon (e.g. loops). Spatial: accessing nearby items (e.g. array traversal).',
          formulaOrDiagram: 'Temporal = Same address over time | Spatial = Nearby addresses in memory'
        },
        interactiveData: {
          type: 'classificationConfig',
          prompt: 'Sort each program access pattern into its correct principle of locality.',
          instructions: 'Click an access pattern item, then click its matching locality bin.',
          classificationConfig: {
            categories: [
              { id: 'cat-temporal', title: 'Temporal Locality', description: 'Re-referencing the same memory location repeatedly in time' },
              { id: 'cat-spatial', title: 'Spatial Locality', description: 'Accessing memory locations stored adjacent to each other in space' }
            ],
            items: [
              { id: 'item-loop', name: 'Loop counter variable `i` read and incremented every iteration', correctCategoryId: 'cat-temporal', note: 'Same variable re-used in time' },
              { id: 'item-array', name: 'Sequential array traversal: `array[0], array[1], array[2]`', correctCategoryId: 'cat-spatial', note: 'Adjacent items in space' }
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
        title: 'Identifying Main Memory',
        academicConcept: 'Physical Realization of System RAM (DIMM)',
        chamberDescription: 'Four hardware components are mounted inside glass display pedestals before the locked chamber portal.',
        environmentalClue: 'Look for the elongated circuit board with multiple silicon chips and gold contact edge pins designed to slot into motherboard memory channels.',
        hints: [
          'Which of the four illustrated components is a RAM module (DIMM stick)?',
          'Select the Dual Inline Memory Module (DIMM RAM stick) with gold edge connector pins.'
        ],
        journalEntry: {
          summary: 'In modern computers, main memory is physically implemented on Dual Inline Memory Module (DIMM) circuit boards containing multiple DRAM integrated circuits.',
          keyTakeaway: 'Main memory consists of DIMM sticks containing silicon DRAM chips connected to the memory controller via a high-speed parallel bus.',
          formulaOrDiagram: 'DIMM Module -> DRAM Chips (Bank, Row, Column Matrix)'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Select the physical hardware component that serves as the computer system\'s Main Memory (RAM).',
          instructions: 'Click the illustrated component that represents a computer RAM module.',
          visualSelectConfig: {
            question: 'Select the Main Memory (RAM) hardware module:',
            options: [
              {
                id: 'opt-dimm',
                label: 'DIMM RAM Module',
                sublabel: 'Circuit stick with DRAM chips and gold bus edge pins',
                iconName: 'Layers',
                isCorrect: true,
                explanation: 'Correct! The Dual Inline Memory Module (DIMM) is the standard hardware format for computer Main Memory (RAM).'
              },
              {
                id: 'opt-cpu',
                label: 'CPU Processor',
                sublabel: 'Silicon microchip with central heat spreader',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Incorrect. That is the Central Processing Unit (CPU), which executes instructions.'
              },
              {
                id: 'opt-hdd',
                label: 'Mechanical Hard Drive',
                sublabel: 'Aluminum casing with magnetic spinning platters',
                iconName: 'Disc',
                isCorrect: false,
                explanation: 'Incorrect. A hard drive is secondary storage, not main working memory.'
              },
              {
                id: 'opt-psu',
                label: 'Power Supply Unit (PSU)',
                sublabel: 'Metal power box with transformer coils and cooling fan',
                iconName: 'Zap',
                isCorrect: false,
                explanation: 'Incorrect. The PSU supplies electrical power to the system.'
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
        title: 'The Power Failure Experiment',
        academicConcept: 'Volatility: Volatile RAM vs. Non-Volatile Storage',
        chamberDescription: 'A laboratory bench holds two powered memory modules (Main Memory DRAM and Flash ROM) beside a heavy brass knife-switch.',
        environmentalClue: 'Pull the knife-switch to cut electrical power to the laboratory. Observe which memory module loses all its stored contents when unpowered.',
        hints: [
          'Click the knife switch to turn off power. Notice which device loses its data (becomes volatile).',
          'DRAM loses its stored bits when power is cut. Click DRAM to confirm it is volatile.'
        ],
        journalEntry: {
          summary: 'Volatile memory requires continuous electrical power to retain its state. When power is lost, all data in DRAM dissipates within milliseconds.',
          keyTakeaway: 'Main Memory (RAM) is volatile (loses data on power loss); Flash/ROM and SSDs are non-volatile (retain data permanently).',
          formulaOrDiagram: 'DRAM: Power OFF = Data Lost (Volatile) | Flash: Power OFF = Data Kept (Non-Volatile)'
        },
        interactiveData: {
          type: 'powerFailureLabConfig',
          prompt: 'Operate the knife-switch to cut system power, then identify which memory device proved to be VOLATILE by losing its data.',
          instructions: 'Toggle the power switch to OFF, observe what happens to both memory units, then select the volatile device.',
          powerFailureLabConfig: {
            challengeQuestion: 'Which memory device lost all its contents when power was interrupted?',
            targetDeviceId: 'dev-ram',
            devices: [
              {
                id: 'dev-ram',
                name: 'Main Memory (DRAM)',
                typeTag: 'Capacitive Semiconductor',
                isVolatile: true,
                prePowerData: '0x4A 0x8F 0xC3 0x11 [ACTIVE DATA]',
                postPowerData: '0x00 0x00 0x00 0x00 [DATA DISSIPATED]'
              },
              {
                id: 'dev-flash',
                name: 'Solid State Flash (ROM)',
                typeTag: 'Floating-Gate Semiconductor',
                isVolatile: false,
                prePowerData: 'SYSTEM_BOOT_KERNEL_V5.1',
                postPowerData: 'SYSTEM_BOOT_KERNEL_V5.1 [RETAINED]'
              }
            ]
          }
        }
      },
      {
        id: 'main-memory-4',
        number: 4,
        title: 'SRAM vs DRAM Workbench',
        academicConcept: 'SRAM (Cache) vs. DRAM (Main Memory) Cell Circuitry',
        chamberDescription: 'An electrical engineering test bench displays the internal circuit schematics of SRAM and DRAM cells.',
        environmentalClue: 'SRAM uses a 6-transistor latch (no refresh needed, fast). DRAM uses 1 transistor + 1 capacitor (very dense, needs refresh).',
        hints: [
          'SRAM uses 6 transistors (used for Cache); DRAM uses 1 transistor + 1 capacitor (used for Main RAM).',
          'Match SRAM to the 6-transistor cache socket, and DRAM to the 1-transistor capacitor RAM socket.'
        ],
        journalEntry: {
          summary: 'Static RAM (SRAM) uses 6 transistors per cell to form a bistable latch. Dynamic RAM (DRAM) uses only 1 transistor and 1 capacitor, allowing billions of cells on a chip.',
          keyTakeaway: 'SRAM: 6T, ultra-fast, expensive, used in Cache. DRAM: 1T-1C, dense, low cost, needs refresh, used in Main Memory.',
          formulaOrDiagram: 'SRAM = 6 Transistors (Cache) | DRAM = 1 Transistor + 1 Capacitor (Main RAM)'
        },
        interactiveData: {
          type: 'circuitWiringConfig',
          prompt: 'Connect each memory technology to its matching circuit characteristics and primary usage.',
          instructions: 'Click a memory type on the left, then click its corresponding architectural specification on the right.',
          circuitWiringConfig: {
            title: 'Memory Cell Circuit Specifications',
            schematicType: 'dram-vs-sram',
            sockets: [
              { id: 'sock-sram', label: '6 Transistors per bit; ultra-fast; no refresh needed; used for Cache Memory', correctComponentId: 'c-sram' },
              { id: 'sock-dram', label: '1 Transistor + 1 Capacitor per bit; high density; requires periodic refresh; used for Main RAM', correctComponentId: 'c-dram' }
            ],
            components: [
              { id: 'c-sram', name: 'SRAM (Static RAM)', description: 'Bistable flip-flop circuitry' },
              { id: 'c-dram', name: 'DRAM (Dynamic RAM)', description: 'Capacitive charge storage' }
            ]
          }
        }
      },
      {
        id: 'main-memory-5',
        number: 5,
        title: 'The Refresh Regulator',
        academicConcept: 'Why DRAM Requires Periodic Refresh Cycles',
        chamberDescription: 'An oscilloscope displays a microscopic DRAM capacitor gradually leaking its stored electrical charge.',
        environmentalClue: 'A bronze engraving reads: "A capacitor stores charge like a bucket with a microscopic pinhole; without periodic recharging, the charge drains away."',
        hints: [
          'Why does DRAM need periodic refresh: capacitor leakage or CPU overheating?',
          'DRAM memory cells use tiny capacitors that leak charge, so they must be recharged periodically.'
        ],
        journalEntry: {
          summary: 'In DRAM, a bit 1 is represented by an electric charge stored in a microscopic capacitor. Because capacitors naturally leak electrons through the substrate, they must be refreshed every few milliseconds.',
          keyTakeaway: 'DRAM requires periodic refresh cycles because its memory capacitors naturally leak electrical charge over time.',
          formulaOrDiagram: 'DRAM Bit 1 = Stored Charge -> Leaks over time -> Must be Refreshed periodically'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Why must Dynamic RAM (DRAM) undergo continuous periodic electrical refresh cycles?',
          instructions: 'Select the physical reason that explains why DRAM requires refresh cycles.',
          visualSelectConfig: {
            question: 'Why does DRAM require periodic refresh?',
            options: [
              {
                id: 'opt-leak',
                label: 'Its microscopic memory storage capacitors gradually leak charge over time',
                sublabel: 'Requires periodic electrical recharge to prevent data loss',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! DRAM cells store bits as charge on microscopic capacitors that naturally leak electrons, requiring periodic refresh every few milliseconds.'
              },
              {
                id: 'opt-erase',
                label: 'To automatically erase old calculations and reset the memory to zero',
                sublabel: 'Memory clearing process',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. Refresh restores existing data; it does not erase or clear memory.'
              },
              {
                id: 'opt-temp',
                label: 'To prevent the silicon memory bus traces from overheating',
                sublabel: 'Thermal control',
                iconName: 'Power',
                isCorrect: false,
                explanation: 'Incorrect. Refresh is not a thermal management mechanism.'
              },
              {
                id: 'opt-sync',
                label: 'To synchronize memory bank clocks with the computer\'s audio card',
                sublabel: 'Peripheral synchronization',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Incorrect. Refresh has nothing to do with external audio hardware.'
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
        title: 'Mapping Flexibility: Direct vs. Associative',
        academicConcept: 'Direct Mapped vs. Fully Associative Cache Placement',
        chamberDescription: 'Two cache architecture diagrams compare strict single-slot placement against universal placement freedom.',
        environmentalClue: 'In Direct Mapping, a block has only 1 fixed line. In Fully Associative mapping, a block can be placed in ANY free line in the cache.',
        hints: [
          'Which mapping scheme allows placing a block in ANY empty line: Direct Mapping or Fully Associative?',
          'Fully Associative mapping allows a memory block to be placed anywhere in the cache.'
        ],
        journalEntry: {
          summary: 'Direct mapping restricts each memory block to exactly one cache line (Block mod N). Fully associative cache allows a block to reside in any line, eliminating conflict misses.',
          keyTakeaway: 'Direct Mapped = exactly 1 specific line. Fully Associative = can be placed in ANY available line.',
          formulaOrDiagram: 'Direct Mapped: 1 Fixed Line | Fully Associative: Any Line in Cache'
        },
        interactiveData: {
          type: 'visualSelectConfig',
          prompt: 'Which cache mapping scheme allows an incoming memory block to be placed in ANY available cache line without restriction?',
          instructions: 'Select the mapping scheme with maximum block placement flexibility.',
          visualSelectConfig: {
            question: 'Which mapping scheme allows placement in ANY cache line?',
            options: [
              {
                id: 'opt-assoc',
                label: 'Fully Associative Mapping',
                sublabel: 'Can place memory blocks in ANY available cache line',
                iconName: 'Zap',
                isCorrect: true,
                explanation: 'Correct! Fully Associative mapping provides total placement freedom; a block can be loaded into any unoccupied line in the cache.'
              },
              {
                id: 'opt-direct',
                label: 'Direct Mapping',
                sublabel: 'Strictly restricted to one fixed line (Block mod N)',
                iconName: 'Layers',
                isCorrect: false,
                explanation: 'Incorrect. Direct Mapping forces each block into exactly one line determined by Block mod N.'
              },
              {
                id: 'opt-seq',
                label: 'Sequential Magnetic Storage',
                sublabel: 'Sequential access tape',
                iconName: 'Disc',
                isCorrect: false,
                explanation: 'Incorrect. Sequential storage is not a cache mapping technique.'
              },
              {
                id: 'opt-rom',
                label: 'Read-Only Memory Mapping',
                sublabel: 'Hardwired non-modifiable addresses',
                iconName: 'Cpu',
                isCorrect: false,
                explanation: 'Incorrect. ROM is non-writable storage, not a cache mapping method.'
              }
            ]
          }
        }
      }
    ]
  }
];
