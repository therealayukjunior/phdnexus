// Data Fetcher - Combines mock data with OpenAlex API data
import { Idea, Researcher, Community } from "./data";
import {
  fetchWorksByTopic,
  searchWorks,
  fetchTopConcepts,
  fetchAuthorsByTopic,
  mapWorkToIdea,
  mapAuthorToResearcher,
} from "./openalex";

// Cache for API results
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function isCacheValid(key: string): boolean {
  const cached = cache[key];
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
}

// Fetch ideas by field/topic
export async function fetchIdeasByField(field: string, limit: number = 12): Promise<Idea[]> {
  const cacheKey = `ideas-${field}-${limit}`;

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }

  try {
    const works = await searchWorks(field, limit);
    const ideas = works.map((work, idx) => mapWorkToIdea(work, idx));
    cache[cacheKey] = { data: ideas, timestamp: Date.now() };
    return ideas;
  } catch (error) {
    console.error("Error fetching ideas by field:", error);
    return [];
  }
}

// Fetch researchers by field
export async function fetchResearchersByField(field: string, limit: number = 6): Promise<Researcher[]> {
  const cacheKey = `researchers-${field}-${limit}`;

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }

  try {
    // For now, we'll search for papers and extract authors
    const works = await searchWorks(field, 5);
    const researchers: Researcher[] = [];

    for (const work of works) {
      const mainAuthor = work.authorships?.[0];
      if (mainAuthor) {
        researchers.push(
          mapAuthorToResearcher(
            {
              id: mainAuthor.author.id,
              display_name: mainAuthor.author.display_name,
              works_count: 1,
              cited_by_count: work.cited_by_count,
              last_known_institution: mainAuthor.institutions?.[0],
            },
            researchers.length
          )
        );
      }
    }

    const sliced = researchers.slice(0, limit);
    cache[cacheKey] = { data: sliced, timestamp: Date.now() };
    return sliced;
  } catch (error) {
    console.error("Error fetching researchers:", error);
    return [];
  }
}

// Fetch trending topics/fields
export async function fetchTrendingFields(): Promise<string[]> {
  const cacheKey = "trending-fields";

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data;
  }

  try {
    const concepts = await fetchTopConcepts(15);
    cache[cacheKey] = { data: concepts, timestamp: Date.now() };
    return concepts;
  } catch (error) {
    console.error("Error fetching trending fields:", error);
    return [
      "Artificial Intelligence",
      "Climate Science",
      "Quantum Computing",
      "Neuroscience",
      "Materials Science",
    ];
  }
}

// Search across ideas and researchers
export async function globalSearch(query: string): Promise<{ ideas: Idea[]; researchers: Researcher[] }> {
  try {
    const works = await searchWorks(query, 20);
    const ideas = works.map((work, idx) => mapWorkToIdea(work, idx));

    // Extract unique researchers from works
    const researcherMap = new Map<string, Researcher>();
    for (const work of works) {
      const mainAuthor = work.authorships?.[0];
      if (mainAuthor && !researcherMap.has(mainAuthor.author.id)) {
        researcherMap.set(
          mainAuthor.author.id,
          mapAuthorToResearcher(
            {
              id: mainAuthor.author.id,
              display_name: mainAuthor.author.display_name,
              works_count: 1,
              cited_by_count: work.cited_by_count,
              last_known_institution: mainAuthor.institutions?.[0],
            },
            researcherMap.size
          )
        );
      }
    }

    return {
      ideas: ideas.slice(0, 12),
      researchers: Array.from(researcherMap.values()).slice(0, 8),
    };
  } catch (error) {
    console.error("Error in global search:", error);
    return { ideas: [], researchers: [] };
  }
}

// Create mock communities from trending fields
export async function fetchCommunities(): Promise<Community[]> {
  try {
    const fields = await fetchTrendingFields();
    return fields.slice(0, 6).map((field, idx) => ({
      id: `community-${idx}`,
      name: `${field} Research Network`,
      description: `A global community for researchers working in ${field}`,
      field: field,
      members: Math.floor(Math.random() * 1000) + 500,
      ideas: Math.floor(Math.random() * 200) + 50,
      isActive: true,
      recentActivity: `${Math.floor(Math.random() * 24)} hours ago`,
    }));
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}
