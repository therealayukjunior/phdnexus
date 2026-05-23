// OpenAlex API Integration
// Fetches real research data to populate PhDNexus
// API Key: r729JxsY6lr0m7bxXdYFLY

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

export interface OpenAlexTopic {
  id: string;
  display_name: string;
  works_count: number;
}

// Reconstruct abstract from inverted index
export function reconstructAbstract(
  invertedIndex?: Record<string, number[]>
): string {
  if (!invertedIndex || Object.keys(invertedIndex).length === 0) return "";

  const maxPos = Math.max(...Object.values(invertedIndex).flat());
  const words = new Array(maxPos + 1).fill("");
  Object.entries(invertedIndex).forEach(([word, positions]) => {
    positions.forEach((pos) => {
      words[pos] = word;
    });
  });

  return words.filter(Boolean).join(" ").substring(0, 400);
}

// Fetch works by keyword search — returns real papers from OpenAlex
export async function searchWorks(
  query: string,
  limit: number = 20
): Promise<OpenAlexWork[]> {
  try {
    const url = `${OPENALEX_BASE_URL}/works?search=${encodeURIComponent(query)}&sort=-cited_by_count&per_page=${limit}&select=id,title,abstract_inverted_index,publication_year,cited_by_count,authorships,primary_topic,topics,created_date&api_key=${OPENALEX_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching works:", error);
    return [];
  }
}

// Fetch top topics from OpenAlex (replaces deprecated /concepts endpoint)
export async function fetchTopTopics(limit: number = 20): Promise<string[]> {
  try {
    const url = `${OPENALEX_BASE_URL}/topics?per_page=${limit}&api_key=${OPENALEX_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return (data.results || []).map((t: OpenAlexTopic) => t.display_name);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return [];
  }
}

// Map OpenAlex work to PhDNexus Idea
export function mapWorkToIdea(work: OpenAlexWork, index: number) {
  const abstract = reconstructAbstract(work.abstract_inverted_index);
  const mainAuthor = work.authorships?.[0];
  const institution = mainAuthor?.institutions?.[0];
  const topicName = work.primary_topic?.display_name || "Multidisciplinary";
  const tags = (work.topics || []).slice(0, 4).map((t) => t.display_name);

  return {
    id: `oa-${work.id.split("/").pop()}-${index}`,
    title: work.title || "Untitled Research",
    abstract: abstract || "Abstract not available for this paper.",
    field: topicName,
    subfield: work.topics?.[1]?.display_name || topicName,
    tags: tags.length > 0 ? tags : [topicName],
    author: {
      id: mainAuthor?.author?.id || `author-${index}`,
      name: mainAuthor?.author?.display_name || "Anonymous Researcher",
      university: institution?.display_name || "Unknown Institution",
      country: institution?.country_code || "Unknown",
      field: topicName,
      year: Math.max(1, 5 - (new Date().getFullYear() - (work.publication_year || 2020))),
      avatar: (mainAuthor?.author?.display_name || "AR")
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2),
      avatarColor: ["#000000", "#333333", "#222222"][index % 3],
      bio: `${work.cited_by_count} citations`,
      ideas: work.cited_by_count,
      collaborators: Math.floor(work.cited_by_count / 10),
      citations: work.cited_by_count,
    },
    createdAt: work.created_date?.split("T")[0] || new Date().toISOString().split("T")[0],
    updatedAt: work.created_date?.split("T")[0] || new Date().toISOString().split("T")[0],
    upvotes: Math.min(999, work.cited_by_count),
    comments: Math.floor(work.cited_by_count / 5),
    collaborators: Math.floor(work.cited_by_count / 20),
    status: "published" as const,
    isNew: (work.publication_year || 0) >= 2023,
    isFeatured: work.cited_by_count > 500,
    seekingCollaboration: work.cited_by_count < 100,
    methodology: "Peer-reviewed research",
    researchQuestion: work.title || "",
  };
}

// Map OpenAlex author to PhDNexus Researcher
export function mapAuthorToResearcher(author: OpenAlexAuthor, index: number) {
  return {
    id: `oa-author-${author.id?.split("/").pop() || index}`,
    name: author.display_name,
    university: author.last_known_institution?.display_name || "Unknown Institution",
    country: author.last_known_institution?.country_code || "Unknown",
    field: "Research",
    year: Math.floor(Math.random() * 4) + 1,
    avatar: author.display_name
      .split(" ")
      .map((n: string) => n[0])
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
