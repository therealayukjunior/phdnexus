// Data Fetcher — Combines mock data with live OpenAlex API data
import type { Idea, Researcher, Community } from "./data";
import {
  searchWorks,
  fetchTopTopics,
  mapWorkToIdea,
  mapAuthorToResearcher,
} from "./openalex";

// Cache for API results
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function isCacheValid(key: string): boolean {
  const cached = cache[key];
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
}

// Hardcoded popular research fields as reliable fallback
const FALLBACK_FIELDS = [
  "All Fields",
  "Machine Learning",
  "Climate Change",
  "Neuroscience",
  "Quantum Computing",
  "CRISPR Gene Editing",
  "Natural Language Processing",
  "Cancer Research",
  "Renewable Energy",
  "Robotics",
  "Immunology",
  "Materials Science",
  "Astrophysics",
  "Epidemiology",
  "Computer Vision",
];

// Fetch ideas by field/topic — live from OpenAlex
export async function fetchIdeasByField(field: string, limit: number = 20): Promise<Idea[]> {
  const cacheKey = `ideas-${field}-${limit}`;

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data as Idea[];
  }

  try {
    const works = await searchWorks(field, limit);
    if (works.length === 0) return [];
    const ideas = works.map((work, idx) => mapWorkToIdea(work, idx)) as Idea[];
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
    return cache[cacheKey].data as Researcher[];
  }

  try {
    const works = await searchWorks(field, 8);
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
          ) as Researcher
        );
      }
    }

    const result = Array.from(researcherMap.values()).slice(0, limit);
    cache[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error("Error fetching researchers:", error);
    return [];
  }
}

// Fetch trending topics/fields from OpenAlex
export async function fetchTrendingFields(): Promise<string[]> {
  const cacheKey = "trending-fields";

  if (isCacheValid(cacheKey)) {
    return cache[cacheKey].data as string[];
  }

  try {
    const topics = await fetchTopTopics(20);
    if (topics.length > 0) {
      // Mix OpenAlex topics with our curated list for better coverage
      const combined = Array.from(new Set([...FALLBACK_FIELDS.slice(1), ...topics.slice(0, 10)]));
      cache[cacheKey] = { data: combined, timestamp: Date.now() };
      return combined;
    }
  } catch (error) {
    console.error("Error fetching trending fields:", error);
  }

  // Return curated fallback fields
  return FALLBACK_FIELDS.slice(1);
}

// Search across ideas and researchers
export async function globalSearch(query: string): Promise<{ ideas: Idea[]; researchers: Researcher[] }> {
  try {
    const works = await searchWorks(query, 20);
    const ideas = works.map((work, idx) => mapWorkToIdea(work, idx)) as Idea[];

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
          ) as Researcher
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

// Create communities from trending fields
export async function fetchCommunities(): Promise<Community[]> {
  try {
    const fieldList = await fetchTrendingFields();
    return fieldList.slice(0, 6).map((field, idx) => ({
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
