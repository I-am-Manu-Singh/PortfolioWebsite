export interface ResumeSkillCategory {
  category: string;
  items: string;
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  playStore?: string | null;
  appStore?: string | null;
  highlights: string[];
}

export interface ResumeProject {
  name: string;
  repo?: string;
  highlights: string[];
}

export interface ResumeData {
  id: string;
  title: string;
  summary: string;
  skills: ResumeSkillCategory[];
  experiences: ResumeExperience[];
  projects: ResumeProject[];
}

export const resumesList: ResumeData[] = [
  {
    "id": "sde",
    "title": "Software Development Engineer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "Languages",
        "items": "Java, Kotlin, TypeScript, JavaScript, Dart, C/C++, SQL, XML"
      },
      {
        "category": "Core CS & Systems",
        "items": "Data Structures & Algorithms, Object-Oriented Design (OOD), Clean Architecture, Multi-Threading, Concurrency, JNI/NDK, Distributed Data Synchronization, Low-Latency Networking, Design Patterns"
      },
      {
        "category": "Frameworks & Architecture",
        "items": "Kotlin Multiplatform (KMP), React Native, Node.js, Electron, Jetpack Compose, Ktor, RESTful APIs, WebSockets, WebRTC, Redux Toolkit, Room, SQLite, PostgreSQL"
      },
      {
        "category": "Tools & Cloud Platforms",
        "items": "Git, Docker, Supabase, Firebase, AWS (S3, EC2), Postman, Linux/Unix, Gradle, CI/CD Actions"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Architected high-throughput, fault-tolerant B2B communication infrastructure utilizing **React Native**, **TypeScript**, and **Node.js** on **AWS**, supporting enterprise-scale multi-tenant workspaces.",
          "Designed an end-to-end cryptographic pipeline implementing **AES-256-GCM** chunked file streaming for reliable multi-gigabyte media ingestion into **AWS S3** under variable network conditions.",
          "Engineered an offline-first transactional caching layer with **SQLite** and bi-directional **Socket.io** delta sync, mitigating thread contention and cutting state reconciliation latency by **45%**."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Developed full-stack real-time collaboration engines supporting end-to-end encrypted messaging, automated workspace channels, and concurrent task pipelines.",
          "Designed deterministic scheduling and state machine workflows for distributed calendar events and notification delivery utilizing **Firebase Cloud Messaging (FCM)** and atomic **Firestore** batch transactions.",
          "Streamlined client-server state hydration, reducing UI frame drops by **30%** through selective memoization and asynchronous job queues."
        ]
      },
      {
        "role": "Software Engineer Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Implemented lossless compression algorithms (**Huffman**, **Deflate**, **LZW**) utilizing **C++ and JNI**, achieving a **30%** reduction in disk footprints with sub-millisecond execution overhead.",
          "Integrated automated crash diagnostics via **Firebase Crashlytics** and **Sentry**, identifying native memory leaks and reducing crash rates by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Data Structures \& Algorithms",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Mentored **120+ students** in advanced Java, asymptotic time complexity analysis, dynamic programming, and graph algorithms through technical code reviews and debugging sessions."
        ]
      }
    ],
    "projects": [
      {
        "name": "ReconcAILe Hub \u2014 Enterprise TallyPrime Sync & Financial Bridge",
        "repo": "https://github.com/I-am-Manu-Singh/reconcAIle-Hub",
        "highlights": [
          "Built an enterprise financial synchronization bridge in **TypeScript**, **Next.js**, and **Electron**, orchestrating bi-directional XML RPC communication with **TallyPrime** accounting databases.",
          "Engineered an automated Bank Reconciliation Statement (BRS) engine and multi-format invoice parser, processing complex ledgers with 99.8% parsing accuracy and zero data loss."
        ]
      },
      {
        "name": "OmniMind \u2014 On-Device Neural Edge Inference Workstation",
        "repo": "https://github.com/I-am-Manu-Singh/OmniMind",
        "highlights": [
          "Built an offline, edge-accelerated cognitive workstation in **Kotlin Multiplatform** running quantized LLMs (Gemma-2B, SmolLM2) locally via **MediaPipe** and GPU delegate backends.",
          "Implemented on-device Retrieval-Augmented Generation (RAG) using vector embeddings and SQLite FTS5, achieving sub-second token generation without cloud API dependencies."
        ]
      },
      {
        "name": "MoonlightWebcam \u2014 Low-Latency Network Streaming Engine",
        "repo": "https://github.com/I-am-Manu-Singh/MoonlightWebcam",
        "highlights": [
          "Developed a cross-platform remote video streaming system in **KMP** and **Ktor**, achieving **60ms glass-to-glass latency** over local LAN via socket optimization and H.264/AAC hardware codecs.",
          "Engineered asynchronous peer discovery protocols and remote HID input dispatchers via native OS accessibility hooks."
        ]
      }
    ]
  },
  {
    "id": "flutter",
    "title": "Flutter Developer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",    "skills": [
      {
        "category": "Core Flutter",
        "items": "Dart, Flutter Framework (Android, iOS, Web, macOS), Widget Lifecycle, Custom Painters, Skia/Impeller"
      },
      {
        "category": "State Management & Architecture",
        "items": "Bloc/Cubit, Provider, Riverpod, Clean Architecture, Repository Pattern, Dependency Injection"
      },
      {
        "category": "Backend & Data Layer",
        "items": "Supabase (Auth, Realtime, Storage, RLS Policies), PostgreSQL RPCs, RESTful APIs, WebSockets, SQLite / Hive / Isar, Dio, Retrofit"
      },
      {
        "category": "Hardware & Platform Features",
        "items": "Barcode / QR Scanning, CameraX / ML Kit Biometrics, Google Maps SDK, Push Notifications (FCM), Native MethodChannels"
      },
      {
        "category": "Tooling & Testing",
        "items": "Git, GitHub, Android Studio, VS Code, Postman, Xcode, Flutter DevTools, CI/CD Fastlane"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Built high-performance multi-platform collaboration clients supporting real-time team communication and contractor field tracking.",
          "Implemented encrypted streaming file upload architectures using **AES-256-GCM** chunking with automatic retry algorithms for multi-gigabyte media uploads to **AWS S3**.",
          "Designed an offline-first transactional caching layer with reactive delta synchronizers, cutting UI latency by **45%**."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Developed full-featured enterprise chat and workspace applications with end-to-end encryption, group squad channels, and event scheduling.",
          "Integrated automated real-time state synchronization using **Firebase** and **Firestore** for collaborative task management and reminders.",
          "Optimized list view virtualization and dynamic rendering pipelines, achieving consistent 60fps scroll performance."
        ]
      },
      {
        "role": "Mobile Developer Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Implemented lossless compression routines reducing on-device storage overhead by **30%** for high-resolution photo caches.",
          "Integrated **Firebase Crashlytics** and **Sentry** monitoring, diagnosing state leakages and reducing crash frequencies by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Algorithms \& Core Programming",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Mentored **120+ students** in data structures, object-oriented principles, and modular application design patterns."
        ]
      }
    ],
    "projects": [
      {
        "name": "Trek India \u2014 Expedition Command HQ & Tactical Logistics",
        "repo": "https://github.com/I-am-Manu-Singh/TrekIndiaApp",
        "highlights": [
          "Engineered a mission-critical expedition logistics platform in **Flutter** and **Supabase** featuring 3 role-tailored terminals: Explorer, Battalion (Staff), and HQ Commander.",
          "Built the custom **GlassShimmer Framework** for skeleton loading and integrated real-time altitude telemetry, offline gear verification checklists, and automated PDF invoice generation.",
          "Designed an offline-first **PostgreSQL** cache architecture with Row-Level Security (RLS) guaranteeing synchronization under low-bandwidth alpine environments."
        ]
      },
      {
        "name": "Hostel Shop Management \u2014 Campus Retail POS & Inventory Suite",
        "repo": "https://github.com/I-am-Manu-Singh/HostelShopManagementApp",
        "highlights": [
          "Developed a campus POS and retail management application in **Flutter** supporting real-time barcode camera scanning, automated credit ledger (Khata) tracking, and multi-category inventory.",
          "Built high-performance sales analytics dashboards, daily profit/loss settlement calculators, and customer notification dispatchers.",
          "Implemented dual-theme dynamic styling with custom contrast filters, ensuring seamless operation in harsh retail lighting."
        ]
      },
      {
        "name": "MoonlightWebcam \u2014 Low-Latency Remote Device Controller",
        "repo": "https://github.com/I-am-Manu-Singh/MoonlightWebcam",
        "highlights": [
          "Built a cross-platform remote webcam system delivering **60ms low-latency** video streaming via asynchronous socket channels and real-time camera parameter controls.",
          "Architected multi-device discovery protocols and background processing capabilities for continuous hardware capture."
        ]
      }
    ]
  },
  {
    "id": "reactnative",
    "title": "React Native Developer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "React Native Ecosystem",
        "items": "React Native CLI, Expo (SDK 51+), Expo Router v3, TypeScript, JavaScript (ES6+), JSX, Native Modules"
      },
      {
        "category": "UI & Animations",
        "items": "React Native Reanimated 3, Gesture Handler, TailwindCSS / NativeWind, Glassmorphism, FlashList, Safe Area Context"
      },
      {
        "category": "State Management & Networking",
        "items": "Redux Toolkit (RTK Query), Context API, Zustand, Axios, REST APIs, WebSockets, Socket.io"
      },
      {
        "category": "Backend & Cloud Services",
        "items": "Firebase (Auth, Cloud Firestore, FCM, Crashlytics), Supabase (PostgreSQL, Realtime, RLS), AsyncStorage, SQLite"
      },
      {
        "category": "DevOps & Tools",
        "items": "Git, GitHub, Metro Bundler, Xcode, Android Studio, Flipper, Postman, EAS (Expo Application Services)"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Architected and shipped a B2B enterprise collaboration and field coordination app using **React Native CLI**, **TypeScript**, and **Redux Toolkit**.",
          "Implemented encrypted chunked media upload pipelines using **AES-256-GCM** with automatic pause/resume for large files to **AWS S3**.",
          "Engineered an offline-first local cache utilizing **SQLite** and bi-directional **Socket.io** real-time sync, cutting screen reload times by **45%**.",
          "Optimized thread performance using **Reanimated 3** and **Gesture Handler**, ensuring zero frame drop animations on low-end devices."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Engineered a SaaS team platform with 1-on-1 chats, squad channels, and workspaces using **React Native** with end-to-end encryption.",
          "Implemented real-time multi-user synchronization with **Firebase Firestore** and **FCM** for tasks, calendar reminders, and chats.",
          "Integrated native calendar APIs and background tasks, delivering seamless event scheduling across iOS and Android."
        ]
      },
      {
        "role": "Mobile Developer Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Implemented client-side memory optimizations and image cache compression, reducing memory footprint by **30%**.",
          "Tracked performance metrics and crash telemetry via **Firebase Crashlytics** and **Sentry**, reducing crash rates by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Core Programming \& Algorithms",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Conducted technical problem-solving sessions and code reviews on data structures and modular architecture for **120+ students**."
        ]
      }
    ],
    "projects": [
      {
        "name": "SevaStack \u2014 Campus Commerce & Merchant POS Ecosystem",
        "repo": "https://github.com/I-am-Manu-Singh/SevaStack-App",
        "highlights": [
          "Built a high-fidelity campus logistics and store discovery application in **React Native** using **Expo SDK 51** and **TypeScript**.",
          "Designed dynamic multi-role architecture (**Student**, **Merchant POS**, **Admin**) with instant role-switching, real-time cart checkout, live order tracking, and inventory management.",
          "Integrated **Supabase** backend with PostgreSQL Row-Level Security (RLS) policies and real-time subscription channels for zero-latency order dispatching."
        ]
      },
      {
        "name": "ReconcAILe Hub \u2014 Desktop & Cross-Platform Automation Suite",
        "repo": "https://github.com/I-am-Manu-Singh/reconcAIle-Hub",
        "highlights": [
          "Built a financial automation platform using **TypeScript**, **Electron**, and **Next.js**, connecting desktop frontends with TallyPrime via bi-directional XML synchronization.",
          "Integrated AI OCR invoice data extraction and automated bank reconciliation algorithms, processing financial records with zero manual intervention."
        ]
      },
      {
        "name": "Signy Tactical Application \u2014 Real-Time Surveillance & Field Coordination",
        "repo": "https://github.com/I-am-Manu-Singh/Signy-App",
        "highlights": [
          "Developed a tactical cross-platform communication app supporting peer-to-peer **WebRTC** video/audio streams, low-latency **RTSP** camera feeds, and real-time location telemetry.",
          "Implemented encrypted offline messaging channels with **Supabase** and local SQLite caching for alpine and remote low-connectivity operations."
        ]
      }
    ]
  },
  {
    "id": "backend",
    "title": "Backend & Distributed Systems Engineer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "Languages & Runtimes",
        "items": "Node.js, TypeScript, Kotlin, Java, Python, SQL, C++, Go (Basics)"
      },
      {
        "category": "Backend Frameworks & Protocols",
        "items": "Express, Ktor Server, NestJS, RESTful APIs, GraphQL, WebSockets, Socket.io, WebRTC Signaling, XML-RPC, HTTP/2"
      },
      {
        "category": "Databases & Storage",
        "items": "PostgreSQL, Supabase, MySQL, SQLite, Redis, Cloud Firestore, Room Database, Database Indexing & Query Optimization"
      },
      {
        "category": "Cloud & Infrastructure",
        "items": "AWS (S3, EC2, IAM), Firebase Backend Services, Docker, Linux/Unix Shell, Git, NGINX, CI/CD Actions"
      },
      {
        "category": "Security & Architecture",
        "items": "AES-256-GCM Encryption, JWT Authentication, OAuth 2.0, RLS Policies, Distributed Systems, Event-Driven Architecture"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Architected and deployed scalable backend services using **Node.js** and **AWS EC2**, powering multi-tenant contractor collaboration workspaces.",
          "Engineered an enterprise media ingestion service using **AES-256-GCM** chunked encryption, guaranteeing zero-data-loss streaming to **AWS S3** under flaky network conditions.",
          "Built an event-driven delta sync engine over **Socket.io** with transactional **SQLite** reconciliation, reducing client-server payload overhead by **45%**.",
          "Implemented token-based authentication and secure session lifecycle management adhering to enterprise security baselines."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Designed and managed database schemas and security rules in **Cloud Firestore** and **Firebase**, supporting real-time collaborative workspaces.",
          "Developed asynchronous scheduling pipelines for calendar event reminders and alerts via **Firebase Cloud Messaging (FCM)**.",
          "Optimized complex query indices and batch write operations, reducing database document reads and query latencies by **35%**."
        ]
      },
      {
        "role": "Systems Software Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Engineered high-throughput compression pipelines utilizing **C/C++** and **JNI**, cutting file transmission sizes across network bridges by **30%**.",
          "Set up real-time telemetry pipelines via **Sentry** and **Crashlytics**, isolating native memory leaks and reducing error rates by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Computer Science \& Algorithms",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Instructed **120+ students** in asymptotic complexity, graph algorithms, dynamic programming, and scalable backend design principles."
        ]
      }
    ],
    "projects": [
      {
        "name": "ReconcAILe Hub \u2014 Enterprise TallyPrime Backend Synchronization Bridge",
        "repo": "https://github.com/I-am-Manu-Singh/reconcAIle-Hub",
        "highlights": [
          "Engineered a bi-directional synchronization daemon in **TypeScript** and **Node.js**, communicating with **TallyPrime** through automated XML-over-HTTP requests.",
          "Built an automated bank reconciliation engine that normalizes heterogeneous financial statements and performs automated fuzzy transaction matching.",
          "Implemented atomic ledger validation algorithms guaranteeing ACID consistency across distributed offline desktop instances and cloud backups."
        ]
      },
      {
        "name": "MoonlightWebcam \u2014 Custom High-Throughput Ktor Streaming Server",
        "repo": "https://github.com/I-am-Manu-Singh/MoonlightWebcam",
        "highlights": [
          "Architected a dedicated high-performance HTTP/WebSocket media server in **Kotlin** using **Ktor**, serving real-time video/audio frames at **60ms latency**.",
          "Implemented custom network socket throttling, dynamic bitrate adjustment, and concurrent client connection pooling for low-bandwidth LANs."
        ]
      },
      {
        "name": "SevaStack \u2014 PostgreSQL RLS & Realtime Commerce Backend",
        "repo": "https://github.com/I-am-Manu-Singh/SevaStack-App",
        "highlights": [
          "Designed a relational database in **Supabase (PostgreSQL)** supporting 3 distinct authorization roles (Customers, Merchants, Administrators) via comprehensive Row-Level Security (RLS) policies.",
          "Developed stored procedures (PL/pgSQL) for atomic checkout transactions, stock deduction locks, and real-time order status webhooks."
        ]
      }
    ]
  },
  {
    "id": "aiml",
    "title": "AI & Machine Learning Engineer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "On-Device AI & Edge Inference",
        "items": "MediaPipe LLM Inference API, ONNX Runtime, TensorFlow Lite, ML Kit, Quantization (INT4/INT8), Stockfish NNUE, Hardware Acceleration (GPU/NPU Delegates)"
      },
      {
        "category": "Computer Vision & Audio DSP",
        "items": "CameraX Perspective Rectification, OpenCV, Piece Classification, FFT Spectrum Analysis, Stem Separation Pipelines, Optical Character Recognition (OCR)"
      },
      {
        "category": "Languages & Frameworks",
        "items": "Python, Kotlin, Java, TypeScript, C++, Kotlin Multiplatform (KMP), Jetpack Compose"
      },
      {
        "category": "Vector Search & Data Systems",
        "items": "On-Device RAG, Vector Embeddings, SQLite FTS5, Supabase pgvector, Room KMP, PostgreSQL"
      },
      {
        "category": "Tools & Platforms",
        "items": "Git, Android Studio, VS Code, Postman, Hugging Face Hub, Firebase ML"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Built secure, low-latency collaboration pipelines featuring automated metadata extraction and real-time field telemetry synchronization.",
          "Implemented encrypted media transmission with **AES-256-GCM** chunking for streaming high-resolution visual blueprints to **AWS S3**.",
          "Optimized local client persistence using **SQLite** and delta synchronization, cutting state hydration latency by **45%**."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Developed intelligent event coordination and real-time team collaboration platforms with end-to-end encrypted messaging.",
          "Integrated real-time cloud data pipelines with **Firebase Firestore** and smart notification delivery via **FCM**.",
          "Streamlined data serialization pipelines, improving execution speed by **30%** for collaborative workspaces."
        ]
      },
      {
        "role": "Machine Learning \& Compression Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Implemented lossless data compression algorithms (**Huffman**, **Deflate**, **LZW**) in **C++ and JNI**, reducing data ingestion footprints by **30%**.",
          "Optimized tensor memory allocation and mitigated native thread memory leaks using **Sentry** telemetry, reducing crash rates by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Algorithms \& Optimization",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Mentored **120+ students** in algorithmic optimization, graph search, and mathematical problem-solving in Java and Python."
        ]
      }
    ],
    "projects": [
      {
        "name": "OmniMind \u2014 100% Offline On-Device Neural LLM Workstation",
        "repo": "https://github.com/I-am-Manu-Singh/OmniMind",
        "highlights": [
          "Engineered an edge-accelerated cognitive workstation in **Kotlin Multiplatform** running quantized local LLMs (**Gemma-2B**, **SmolLM2**) via **MediaPipe** GPU backends.",
          "Implemented on-device Retrieval-Augmented Generation (RAG) using local vector embeddings and SQLite FTS5 for zero-network document analysis.",
          "Designed an intelligent model-pack downloader with automatic checkpoint resumption and dynamic GPU delegate selection."
        ]
      },
      {
        "name": "OmniChess Reader \u2014 Computer Vision Board Scanner & Stockfish NNUE Engine",
        "repo": "https://github.com/I-am-Manu-Singh/OmniChessReader",
        "highlights": [
          "Built a real-time computer vision system that scans physical chessboards via camera, detects corners, and applies perspective rectification.",
          "Deployed a neural classification pipeline mapping squares to standard FEN notation with 98.4% accuracy.",
          "Integrated native **Stockfish NNUE** engine via JNI to deliver real-time tactical evaluation and optimal move analysis locally."
        ]
      },
      {
        "name": "ReconcAILe Hub \u2014 AI-Powered Invoice OCR & Financial Matching",
        "repo": "https://github.com/I-am-Manu-Singh/reconcAIle-Hub",
        "highlights": [
          "Built an enterprise accounting bridge with automated OCR extraction for unstructured invoices and receipts in **TypeScript** and **Electron**.",
          "Developed fuzzy algorithmic reconciliation models matching bank transactions against TallyPrime ledgers with zero human intervention."
        ]
      }
    ]
  },
  {
    "id": "web",
    "title": "Full-Stack Web Developer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "Frontend Core",
        "items": "React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), HTML5, CSS3, Vanilla CSS, TailwindCSS"
      },
      {
        "category": "State & Motion",
        "items": "Redux Toolkit, Zustand, Context API, Framer Motion, Canvas API, 3D Web Graphics, WebSockets"
      },
      {
        "category": "Backend & Full-Stack",
        "items": "Node.js, Express, Next.js Server Actions, Electron, Supabase, PostgreSQL, RESTful APIs, GraphQL"
      },
      {
        "category": "Build & Deployment",
        "items": "Vite, Webpack, Vercel, Netlify, AWS (S3, CloudFront), Docker, GitHub Actions CI/CD"
      },
      {
        "category": "Testing & Tools",
        "items": "Jest, React Testing Library, Postman, Chrome DevTools, Git, GitHub, VS Code"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Built responsive web collaboration portals with **React**, **TypeScript**, and **TailwindCSS**, powering multi-tenant contractor workspaces.",
          "Implemented encrypted streaming file upload architectures using **AES-256-GCM** chunking for transmitting large media directly to **AWS S3**.",
          "Engineered real-time communication channels over **Socket.io** with optimistic UI updates and local caching, cutting perceived latency by **45%**."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Developed full-stack SaaS workspace dashboards supporting real-time team messaging, shared boards, and event scheduling.",
          "Integrated reactive cloud data stores via **Firebase Firestore** and **Cloud Functions**, ensuring atomic state synchrony across multi-user sessions.",
          "Optimized bundle sizes and code-splitting, improving Google Lighthouse performance scores from 68 to **95+**."
        ]
      },
      {
        "role": "Software Developer Intern",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Built web-based benchmark visualizers analyzing compression algorithms, reducing network transfer sizes by **30%**.",
          "Integrated real-time error logging via **Sentry**, reducing production uncaught exceptions by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Web Concepts \& Algorithms",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Mentored **120+ students** in JavaScript, DOM lifecycle, asynchronous event loops, and algorithm optimization."
        ]
      }
    ],
    "projects": [
      {
        "name": "MoonlightWebcam \u2014 WebRTC & WebSocket Video Streaming Client",
        "repo": "https://github.com/I-am-Manu-Singh/MoonlightWebcam",
        "highlights": [
          "Developed a responsive real-time web portal and video feed monitor in **TypeScript** and **WebSockets**, streaming low-latency H.264 camera streams at **60ms latency**.",
          "Implemented browser-based remote device parameter controls, audio visualizers, and virtual input event dispatchers over bi-directional channels."
        ]
      },
      {
        "name": "ReconcAILe Hub \u2014 Enterprise Next.js & Electron Desktop Web Bridge",
        "repo": "https://github.com/I-am-Manu-Singh/reconcAIle-Hub",
        "highlights": [
          "Architected a financial management web application in **Next.js** and **TypeScript**, packaged for enterprise desktop deployment using **Electron**.",
          "Implemented complex financial data tables, AI OCR invoice ingestion interfaces, and bi-directional XML synchronization with TallyPrime databases."
        ]
      },
      {
        "name": "SevaStack \u2014 Campus Commerce Web & Mobile Platform",
        "repo": "https://github.com/I-am-Manu-Singh/SevaStack-App",
        "highlights": [
          "Developed a multi-role web and mobile commerce dashboard with real-time cart synchronization, merchant POS management, and Supabase PostgreSQL integration."
        ]
      }
    ]
  },
  {
    "id": "androidnative",
    "title": "Android Native Developer",
    "summary": "Professional specializing in designing and developing secure Enterprise & SaaS applications with modern tooling across mobile, desktop, and cloud services.",
    "skills": [
      {
        "category": "Core Android & UI",
        "items": "Kotlin, Java, XML, Jetpack Compose, Material Design 3, Canvas API, Compose Multiplatform (CMP)"
      },
      {
        "category": "Architecture & Asynchrony",
        "items": "MVVM, MVI, Clean Architecture, Coroutines, StateFlow, SharedFlow, WorkManager, Paging 3, Lifecycle"
      },
      {
        "category": "Data, DI & Networking",
        "items": "Room Database, SQLDelight, Ktor Client, Retrofit, OkHttp, Dagger/Hilt, Koin, Protocol Buffers"
      },
      {
        "category": "Hardware, Audio & Media",
        "items": "JNI/NDK, C++, Android NDK AudioTrack, Media3/ExoPlayer, USB-OTG Host, MIDI SysEx, CameraX, ML Kit"
      },
      {
        "category": "Build & Quality",
        "items": "Gradle Kotlin DSL, Android Studio, Firebase Crashlytics, LeakCanary, Play Console Release Tracks, CI/CD"
      }
    ],
    "experiences": [
      {
        "role": "App Developer",
        "company": "Signyn",
        "period": "Dec 2025 \u2013 Apr 2026",
        "playStore": "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN",
        "appStore": "https://apps.apple.com/us/app/signyn-messenger/id6754750370",
        "highlights": [
          "Built high-performance mobile communication infrastructure with secure end-to-end encryption for contractor collaboration.",
          "Implemented encrypted streaming file upload architectures using **AES-256-GCM** chunking for streaming large media files to **AWS S3**.",
          "Engineered an offline-first transactional caching layer with **SQLite** and bi-directional delta synchronization, cutting screen reload times by **45%**."
        ]
      },
      {
        "role": "App Developer",
        "company": "Pyngyn / Vimovi Global Tech",
        "period": "Mar 2025 \u2013 Aug 2025",
        "playStore": "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share",
        "appStore": null,
        "highlights": [
          "Developed full-featured real-time chat, task, and team collaboration applications with end-to-end encryption.",
          "Implemented synchronized calendar workflows, native system alarms, and real-time push alerts via **Firebase FCM** and **Firestore**.",
          "Profiling memory and rendering passes, eliminating frame drops and achieving smooth 60fps scrolling across all devices."
        ]
      },
      {
        "role": "Junior Android Developer",
        "company": "FreeMemory",
        "period": "Oct 2024 \u2013 Dec 2024",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Built native lossless compression flows utilizing **JNI & C++** (**Huffman, Deflate, LZW**), reducing file memory footprints by **30%**.",
          "Integrated **Firebase Crashlytics** and **Sentry**, actively identifying native crashes and memory leaks, cutting error rates by **25%**."
        ]
      },
      {
        "role": "Teaching Assistant \u2014 Core Java \& Algorithms",
        "company": "Pepcoding",
        "period": "Nov 2021 \u2013 Mar 2022",
        "playStore": null,
        "appStore": null,
        "highlights": [
          "Mentored **120+ students** in core Java, object-oriented software engineering, memory management, and data structures."
        ]
      }
    ],
    "projects": [
      {
        "name": "pEQ Learn \u2014 Universal Digital Audio Workstation & Academy",
        "repo": "https://github.com/I-am-Manu-Singh/pEQ-Learn-App",
        "highlights": [
          "Architected a production-grade multi-instrument DAW in **Compose Multiplatform (CMP)** featuring an interactive 88-key piano, multi-track recording engine, low-latency **AudioTrack** DSP playback, and MIDI controller integration.",
          "Designed an offline music notation and theory engine supporting dual Western and Indian Classical (Hindustani/Carnatic) notation systems with custom Canvas rendering."
        ]
      },
      {
        "name": "Bani: Nitnem & Steek Companion \u2014 Google Play",
        "repo": "https://github.com/I-am-Manu-Singh/NitnemGutkaSahib",
        "highlights": [
          "Developed a sacred devotional learning companion currently in **14-day closed testing on Google Play** built with **Compose Multiplatform**.",
          "Implemented line-by-line Steek translation, Shabad Khoj, offline SQLite LocalDB caching, synchronized studio audio recitation with **Media3**, and daily habit tracking."
        ]
      },
      {
        "name": "QuickTone Guitar Lab \u2014 Hardware DSP Controller (NUX MG-101)",
        "repo": "https://github.com/I-am-Manu-Singh/nux-mg-101-quick-tone",
        "highlights": [
          "Built an Android companion tone editor communicating over **USB-OTG Host** and raw **MIDI SysEx** commands to control hardware DSP guitar processors in real-time."
        ]
      }
    ]
  }
];
