// OpenAlex API Integration
// Fetches real research data to populate PhDNexus

const OPENALEX_API_KEY = "r729JxsY6lr0m7bxXdYFLY";
const OPENALEX_BASE_URL = "https://api.openalex.org";

export interface OpenAlexWork {
  id: string;
  title: string;
  abstract_inverted_index?: Record<string, number[]>;
  publication_year?: number;
  cited_by_count: number;
  authorships: Array<{
    author: {
      id: string;
      display_name: string;
    };
    institutions: Array<{
      display_name: string;
      country_code?: string;
    }>;
  }>;
  primary_topic?: {
    display_name: string;
    id: string;
  };
  topics?: Array<{
    display_name: string;
    id: string;
  }>;
  created_date: string;
}

export interface OpenAlexAuthor {
  id: string;
  display_name: string;
  works_count: number;
  cited_by_count: number;
  last_known_institution?: {
    display_name: string;
    country_code?: string;
  };
}

export interface OpenAlexConcept {
  id: string;
  display_name: string;
  works_count: number;
  cited_by_count: number;
}

// Reconstruct abstract from inverted index
function reconstructAbstract(
  invertedIndex?: Record<string, number[]>
): string {
  if (!invertedIndex) return "";

  const words = new Array(
    Math.max(...Object.values(invertedIndex).flat(), 0) + 1
  );
  Object.entries(invertedIndex).forEach(([word, positions]) => {
    positions.forEach((pos) => {
      words[pos] = word;
    });
  });

  return words.filter(Boolean).join(" ").substring(0, 300);
}

// Fetch works by topic/concept
export async function fetchWorksByTopic(
  topicId: string,
  limit: number = 10
): Promise<OpenAlexWork[]> {
  try {
    const response = await fetch(
      `${OPENALEX_BASE_URL}/works?filter=topics.id:${topicId}&sort=-cited_by_count&per_page=${limit}&api_key=${OPENALEX_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching works by topic:", error);
    return [];
  }
}

// Fetch works by keyword search
export async function searchWorks(
  query: string,
  limit: number = 20
): Promise<OpenAlexWork[]> {
  try {
    const response = await fetch(
      `${OPENALEX_BASE_URL}/works?search=${encodeURIComponent(query)}&sort=-cited_by_count&per_page=${limit}&api_key=${OPENALEX_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching works:", error);
    return [];
  }
}

// Fetch top concepts/topics
export async function fetchTopConcepts(limit: number = 15): Promise<string[]> {
  try {
    const response = await fetch(
      `${OPENALEX_BASE_URL}/concepts?sort=-works_count&per_page=${limit}&api_key=${OPENALEX_API_KEY}`
    );
    const data = await response.json();
    return (data.results || []).map((c: OpenAlexConcept) => c.display_name);
  } catch (error) {
    console.error("Error fetching concepts:", error);
    return [];
  }
}

// Fetch authors by topic
export async function fetchAuthorsByTopic(
  topicId: string,
  limit: number = 10
): Promise<OpenAlexAuthor[]> {
  try {
    const response = await fetch(
      `${OPENALEX_BASE_URL}/authors?filter=topics.id:${topicId}&sort=-cited_by_count&per_page=${limit}&api_key=${OPENALEX_API_KEY}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

// Map OpenAlex work to PhDNexus Idea
export function mapWorkToIdea(work: OpenAlexWork, index: number) {
  const abstract = reconstructAbstract(work.abstract_inverted_index);
  const mainAuthor = work.authorships?.[0];
  const institution = mainAuthor?.institutions?.[0];

  return {
    id: `oa-${index}`,
    title: work.title,
    abstract: abstract || "Research paper from OpenAlex",
    field: work.primary_topic?.display_name || "Multidisciplinary",
    subfield: work.topics?.[1]?.display_name || work.primary_topic?.display_name || "General Research",
    tags: work.topics?.slice(0, 4).map((t) => t.display_name) || [],
    author: {
      id: mainAuthor?.author?.id || `author-${index}`,
      name: mainAuthor?.author?.display_name || "Anonymous Researcher",
      university: institution?.display_name || "Unknown Institution",
      country: institution?.country_code || "Unknown",
      field: work.primary_topic?.display_name || "Research",
      year: Math.max(1, 5 - (new Date().getFullYear() - (work.publication_year || 2020))),
      avatar: (mainAuthor?.author?.display_name || "AR")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      avatarColor: ["#000000", "#333333", "#222222"][index % 3],
      bio: `Published ${work.cited_by_count} cited works`,
      ideas: work.cited_by_count,
      collaborators: Math.floor(work.cited_by_count / 10),
      citations: work.cited_by_count,
    },
    createdAt: work.created_date?.split("T")[0] || new Date().toISOString().split("T")[0],
    updatedAt: work.created_date?.split("T")[0] || new Date().toISOString().split("T")[0],
    upvotes: Math.min(100, work.cited_by_count),
    comments: Math.floor(work.cited_by_count / 5),
    collaborators: Math.floor(work.cited_by_count / 20),
    status: "published" as const,
    isNew: false,
    isFeatured: work.cited_by_count > 500,
    seekingCollaboration: work.cited_by_count < 100,
    methodology: "Peer-reviewed research",
    researchQuestion: work.title,
  };
}

// Map OpenAlex author to PhDNexus Researcher
export function mapAuthorToResearcher(author: OpenAlexAuthor, index: number) {
  return {
    id: `oa-author-${index}`,
    name: author.display_name,
    university: author.last_known_institution?.display_name || "Unknown Institution",
    country: author.last_known_institution?.country_code || "Unknown",
    field: "Research",
    year: Math.floor(Math.random() * 4) + 1,
    avatar: author.display_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2),
    avatarColor: ["#000000", "#333333", "#222222"][index % 3],
    bio: `${author.works_count} publications, ${author.cited_by_count} citations`,
    ideas: author.works_count,
    collaborators: Math.floor(author.cited_by_count / 50),
    citations: author.cited_by_count,
    isOnline: Math.random() > 0.5,
  };
}
