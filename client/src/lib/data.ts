// PhDNexus — Mock data for the platform

export interface Researcher {
  id: string;
  name: string;
  university: string;
  country: string;
  field: string;
  year: number; // PhD year
  avatar: string; // initials
  avatarColor: string;
  bio: string;
  ideas: number;
  collaborators: number;
  citations: number;
  isOnline?: boolean;
}

export interface Idea {
  id: string;
  title: string;
  abstract: string;
  field: string;
  subfield: string;
  tags: string[];
  author: Researcher;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  comments: number;
  collaborators: number;
  status: "open" | "in-progress" | "seeking-feedback" | "published";
  isNew?: boolean;
  isFeatured?: boolean;
  seekingCollaboration: boolean;
  methodology?: string;
  researchQuestion?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  field: string;
  members: number;
  ideas: number;
  isActive: boolean;
  recentActivity: string;
}

export const researchers: Researcher[] = [
  {
    id: "r1",
    name: "Dr. Amara Osei",
    university: "MIT",
    country: "Ghana / USA",
    field: "Computational Neuroscience",
    year: 3,
    avatar: "AO",
    avatarColor: "#000000",
    bio: "Investigating neural encoding mechanisms in sensory cortex using large-scale calcium imaging and deep learning.",
    ideas: 12,
    collaborators: 8,
    citations: 34,
    isOnline: true,
  },
  {
    id: "r2",
    name: "Yuki Tanaka",
    university: "University of Tokyo",
    country: "Japan",
    field: "Materials Science",
    year: 2,
    avatar: "YT",
    avatarColor: "#333333",
    bio: "Developing novel 2D materials for next-generation energy storage applications.",
    ideas: 7,
    collaborators: 5,
    citations: 12,
    isOnline: false,
  },
  {
    id: "r3",
    name: "Sofia Reyes",
    university: "ETH Zürich",
    country: "Mexico / Switzerland",
    field: "Climate Science",
    year: 4,
    avatar: "SR",
    avatarColor: "#222222",
    bio: "Modeling feedback loops in Arctic permafrost degradation and their global climate implications.",
    ideas: 9,
    collaborators: 11,
    citations: 67,
    isOnline: true,
  },
  {
    id: "r4",
    name: "Kwame Mensah",
    university: "Oxford",
    country: "Ghana / UK",
    field: "Political Economy",
    year: 3,
    avatar: "KM",
    avatarColor: "#000000",
    bio: "Analyzing institutional barriers to technology adoption in sub-Saharan African economies.",
    ideas: 5,
    collaborators: 3,
    citations: 8,
    isOnline: false,
  },
  {
    id: "r5",
    name: "Priya Sharma",
    university: "IISc Bangalore",
    country: "India",
    field: "Quantum Computing",
    year: 2,
    avatar: "PS",
    avatarColor: "#333333",
    bio: "Designing fault-tolerant quantum error correction codes for near-term quantum devices.",
    ideas: 6,
    collaborators: 4,
    citations: 19,
    isOnline: true,
  },
  {
    id: "r6",
    name: "Lars Eriksson",
    university: "KTH Stockholm",
    country: "Sweden",
    field: "Robotics & AI",
    year: 1,
    avatar: "LE",
    avatarColor: "#222222",
    bio: "Exploring embodied cognition in robotic systems through developmental learning paradigms.",
    ideas: 3,
    collaborators: 2,
    citations: 4,
    isOnline: true,
  },
];

export const ideas: Idea[] = [
  {
    id: "i1",
    title: "Cross-Modal Sensory Integration in Predictive Coding Networks",
    abstract:
      "This research proposes a novel framework for understanding how the brain integrates information across sensory modalities using predictive coding principles. By combining large-scale electrophysiology with computational modeling, we aim to identify the hierarchical structures that enable robust multi-sensory perception.",
    field: "Neuroscience",
    subfield: "Computational Neuroscience",
    tags: ["predictive coding", "multi-sensory", "deep learning", "electrophysiology"],
    author: researchers[0],
    createdAt: "2026-05-20",
    updatedAt: "2026-05-22",
    upvotes: 47,
    comments: 14,
    collaborators: 3,
    status: "open",
    isNew: true,
    isFeatured: true,
    seekingCollaboration: true,
    methodology: "Large-scale calcium imaging, recurrent neural network modeling, Bayesian inference",
    researchQuestion: "How do predictive coding mechanisms enable robust multi-sensory integration in the presence of noise and ambiguity?",
  },
  {
    id: "i2",
    title: "2D MXene Heterostructures for High-Density Solid-State Batteries",
    abstract:
      "We propose synthesizing novel MXene-based heterostructures as solid electrolytes for next-generation lithium-ion batteries. Our approach combines atomic layer deposition with in-situ electron microscopy to characterize ion transport mechanisms at the nanoscale.",
    field: "Materials Science",
    subfield: "Energy Materials",
    tags: ["MXene", "solid-state batteries", "2D materials", "ion transport"],
    author: researchers[1],
    createdAt: "2026-05-18",
    updatedAt: "2026-05-21",
    upvotes: 31,
    comments: 9,
    collaborators: 2,
    status: "seeking-feedback",
    isNew: false,
    isFeatured: false,
    seekingCollaboration: true,
    methodology: "Atomic layer deposition, TEM/EELS characterization, electrochemical impedance spectroscopy",
    researchQuestion: "Can MXene heterostructures achieve ionic conductivities exceeding 10 mS/cm at room temperature?",
  },
  {
    id: "i3",
    title: "Permafrost Carbon Feedback Loops Under 2°C Warming Scenarios",
    abstract:
      "This study develops a coupled land-atmosphere model to quantify carbon release from Arctic permafrost under IPCC 2°C warming scenarios. We integrate satellite remote sensing data with ground-truth measurements from 40+ monitoring stations across Siberia and Canada.",
    field: "Climate Science",
    subfield: "Arctic Systems",
    tags: ["permafrost", "carbon cycle", "climate modeling", "Arctic", "remote sensing"],
    author: researchers[2],
    createdAt: "2026-05-15",
    updatedAt: "2026-05-22",
    upvotes: 89,
    comments: 27,
    collaborators: 6,
    status: "in-progress",
    isNew: false,
    isFeatured: true,
    seekingCollaboration: false,
    methodology: "Coupled land-atmosphere modeling, satellite remote sensing, field measurements",
    researchQuestion: "What is the magnitude and timing of permafrost carbon feedback under 2°C global warming?",
  },
  {
    id: "i4",
    title: "Institutional Veto Players and Technology Diffusion in West Africa",
    abstract:
      "Drawing on veto player theory and new institutional economics, this research examines how political fragmentation and regulatory capture impede the diffusion of mobile payment technologies across 15 West African countries from 2010–2025.",
    field: "Political Economy",
    subfield: "Development Economics",
    tags: ["institutions", "technology diffusion", "West Africa", "fintech", "political economy"],
    author: researchers[3],
    createdAt: "2026-05-10",
    updatedAt: "2026-05-19",
    upvotes: 23,
    comments: 11,
    collaborators: 1,
    status: "open",
    isNew: false,
    isFeatured: false,
    seekingCollaboration: true,
    methodology: "Comparative case studies, panel data econometrics, expert interviews",
    researchQuestion: "How do veto player configurations mediate the relationship between regulatory quality and fintech adoption?",
  },
  {
    id: "i5",
    title: "Topological Quantum Error Correction via Floquet Codes",
    abstract:
      "We propose a new class of Floquet quantum error correcting codes that leverage topological protection to achieve fault-tolerant quantum computation with significantly reduced overhead compared to surface codes.",
    field: "Quantum Computing",
    subfield: "Quantum Error Correction",
    tags: ["quantum error correction", "Floquet codes", "topological quantum computing", "fault tolerance"],
    author: researchers[4],
    createdAt: "2026-05-17",
    updatedAt: "2026-05-20",
    upvotes: 56,
    comments: 18,
    collaborators: 4,
    status: "seeking-feedback",
    isNew: true,
    isFeatured: false,
    seekingCollaboration: true,
    methodology: "Theoretical analysis, numerical simulation, quantum circuit optimization",
    researchQuestion: "Can Floquet codes achieve a threshold error rate above 1% with fewer physical qubits than surface codes?",
  },
  {
    id: "i6",
    title: "Developmental Learning in Soft Robotic Systems: A Morphological Approach",
    abstract:
      "Inspired by infant motor development, this research investigates how soft robotic systems can acquire complex manipulation skills through staged developmental curricula, leveraging the body's morphological properties as a computational resource.",
    field: "Robotics & AI",
    subfield: "Embodied Cognition",
    tags: ["soft robotics", "developmental learning", "embodied cognition", "morphological computation"],
    author: researchers[5],
    createdAt: "2026-05-21",
    updatedAt: "2026-05-22",
    upvotes: 18,
    comments: 6,
    collaborators: 0,
    status: "open",
    isNew: true,
    isFeatured: false,
    seekingCollaboration: true,
    methodology: "Physical robot experiments, reinforcement learning, developmental psychology frameworks",
    researchQuestion: "Can developmental curricula enable soft robots to acquire dexterous manipulation skills without explicit programming?",
  },
  {
    id: "i7",
    title: "Epigenetic Clocks as Biomarkers for Accelerated Aging in Chronic Stress",
    abstract:
      "Using longitudinal methylation data from 2,000+ participants, this study investigates whether epigenetic aging acceleration mediates the relationship between chronic psychosocial stress and age-related disease onset.",
    field: "Biomedical Science",
    subfield: "Epigenetics",
    tags: ["epigenetics", "aging", "stress", "methylation", "biomarkers"],
    author: researchers[0],
    createdAt: "2026-05-08",
    updatedAt: "2026-05-16",
    upvotes: 72,
    comments: 22,
    collaborators: 5,
    status: "in-progress",
    isNew: false,
    isFeatured: false,
    seekingCollaboration: false,
    methodology: "Longitudinal cohort study, DNA methylation arrays, mediation analysis",
    researchQuestion: "Does epigenetic age acceleration mediate the stress-disease relationship independent of chronological age?",
  },
  {
    id: "i8",
    title: "Linguistic Relativity in Spatial Reasoning: Cross-Cultural fMRI Evidence",
    abstract:
      "This cross-cultural neuroimaging study tests the Sapir-Whorf hypothesis by comparing spatial reasoning neural activations in speakers of languages with absolute versus relative spatial reference frames.",
    field: "Cognitive Science",
    subfield: "Psycholinguistics",
    tags: ["linguistic relativity", "spatial cognition", "fMRI", "cross-cultural", "Sapir-Whorf"],
    author: researchers[2],
    createdAt: "2026-05-12",
    updatedAt: "2026-05-18",
    upvotes: 44,
    comments: 16,
    collaborators: 3,
    status: "seeking-feedback",
    isNew: false,
    isFeatured: false,
    seekingCollaboration: true,
    methodology: "fMRI neuroimaging, cross-cultural participant recruitment, computational linguistics",
    researchQuestion: "Do language-specific spatial reference frames modulate neural activation patterns in parietal cortex?",
  },
];

export const communities: Community[] = [
  {
    id: "c1",
    name: "Computational Neuroscience Network",
    description: "A global community for PhD students working at the intersection of neuroscience, mathematics, and computer science.",
    field: "Neuroscience",
    members: 1247,
    ideas: 89,
    isActive: true,
    recentActivity: "2 hours ago",
  },
  {
    id: "c2",
    name: "Climate & Earth Systems",
    description: "Connecting PhD researchers across climate modeling, atmospheric science, oceanography, and environmental policy.",
    field: "Climate Science",
    members: 934,
    ideas: 67,
    isActive: true,
    recentActivity: "4 hours ago",
  },
  {
    id: "c3",
    name: "Quantum Information Science",
    description: "For PhD students in quantum computing, quantum communication, and quantum sensing across physics, CS, and engineering.",
    field: "Quantum Computing",
    members: 712,
    ideas: 54,
    isActive: true,
    recentActivity: "1 hour ago",
  },
  {
    id: "c4",
    name: "Global Development & Political Economy",
    description: "Interdisciplinary community for researchers studying development economics, political institutions, and policy.",
    field: "Political Economy",
    members: 556,
    ideas: 43,
    isActive: true,
    recentActivity: "6 hours ago",
  },
  {
    id: "c5",
    name: "Advanced Materials & Nanotechnology",
    description: "PhD researchers in materials synthesis, characterization, and applications from 2D materials to biomaterials.",
    field: "Materials Science",
    members: 823,
    ideas: 71,
    isActive: true,
    recentActivity: "3 hours ago",
  },
  {
    id: "c6",
    name: "Robotics & Autonomous Systems",
    description: "Connecting PhD students in robotics, autonomous vehicles, human-robot interaction, and AI planning.",
    field: "Robotics & AI",
    members: 689,
    ideas: 58,
    isActive: false,
    recentActivity: "1 day ago",
  },
];

export const fields = [
  "All Fields",
  "Neuroscience",
  "Climate Science",
  "Quantum Computing",
  "Materials Science",
  "Political Economy",
  "Robotics & AI",
  "Biomedical Science",
  "Cognitive Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Economics",
  "Sociology",
  "Computer Science",
];

export const statusLabels: Record<string, string> = {
  open: "Open for Discussion",
  "in-progress": "In Progress",
  "seeking-feedback": "Seeking Feedback",
  published: "Published",
};

export const statusColors: Record<string, string> = {
  open: "#000000",
  "in-progress": "#333333",
  "seeking-feedback": "#ffed00",
  published: "#8dc572",
};
