export type Category =
  | 'social-media'
  | 'video'
  | 'web-search'
  | 'web-data'
  | 'community-data'
  | 'company-data'
  | 'news'
  | 'automation'
  | 'utility-data'

export interface Vendor {
  slug: string
  name: string
  description: string
  category: Category
  tags: string[]
  endpoints: number
  /** Per-call price in USD when the platform is not metered by credit. */
  price?: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'social-media': 'Social',
  video: 'Video',
  'web-search': 'Search',
  'web-data': 'Web data',
  'community-data': 'Community',
  'company-data': 'Company',
  news: 'News',
  automation: 'Automation',
  'utility-data': 'Utility',
}

export const CATEGORIES: Category[] = [
  'social-media',
  'web-search',
  'web-data',
  'community-data',
  'video',
  'company-data',
  'news',
  'automation',
  'utility-data',
]

/**
 * 30 platforms, matching the live /apis catalog: description, tags and
 * endpoint counts are copied verbatim from the rendered page.
 */
export const VENDORS: Vendor[] = [
  {
    slug: 'douyin',
    name: 'Douyin',
    description:
      'Read public Douyin surfaces for creator, brand, and trend research: video search, user profiles, post details, comments, live rooms, hot accounts, challenges, and engagement statistics.',
    category: 'social-media',
    tags: ['douyin', 'social-media', 'short-video', 'creator-data'],
    endpoints: 262,
  },
  {
    slug: 'instagram',
    name: 'Instagram',
    description:
      'Read public Instagram surfaces through SandBase: profiles, posts, comments, followers, following, reels, hashtags, locations, stories, highlights, user search, and creator or brand metadata.',
    category: 'social-media',
    tags: ['instagram', 'social-media', 'creator-data', 'content-data'],
    endpoints: 81,
  },
  {
    slug: 'weibo',
    name: 'Weibo',
    description:
      'Read public Weibo surfaces for social listening and trend analysis: hot search rankings, channel trends, user profiles, posts, comments, likes, followers, articles, videos, and audio metadata.',
    category: 'social-media',
    tags: ['weibo', 'social-media', 'social-listening', 'creator-data'],
    endpoints: 52,
  },
  {
    slug: 'xiaohongshu',
    name: 'Xiaohongshu',
    description:
      'Read public Xiaohongshu surfaces for lifestyle, commerce, and creator research: hot lists, note search, user profiles, comments, product search, product details, recommendations, and creator growth data.',
    category: 'social-media',
    tags: ['xiaohongshu', 'commerce', 'creator-data', 'product-data'],
    endpoints: 34,
  },
  {
    slug: 'tiktok',
    name: 'TikTok',
    description:
      'Read public TikTok surfaces for creator, trend, and social research: users, videos, sounds, search, comments, followers, hashtags, video metadata, and profile histories.',
    category: 'social-media',
    tags: ['tiktok', 'social-media', 'short-video', 'creator-data'],
    endpoints: 145,
  },
  {
    slug: 'kuaishou',
    name: 'Kuaishou',
    description:
      'Read public Kuaishou surfaces for creator, commerce, and trend research: video search, video details, user profiles, posts, comments and sub-comments, live rooms, hot-search and person rankings, music charts, brand and shopping top lists, and share-link resolution.',
    category: 'social-media',
    tags: ['kuaishou', 'social-media', 'short-video', 'creator-data'],
    endpoints: 36,
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    description:
      'Read public YouTube surfaces for video research and content analysis: video metadata, search results, channels, playlists, comments, transcripts, engagement metrics, and creator context.',
    category: 'video',
    tags: ['youtube', 'video', 'creator-data', 'content-data'],
    endpoints: 33,
  },
  {
    slug: 'wechat-channels',
    name: 'WeChat Channels',
    description:
      'Read public WeChat Channels surfaces for short-video and creator research: channel info and profiles, channel videos, video details, comments, live details and history, collections, video search, and share-URL resolution.',
    category: 'social-media',
    tags: ['wechat-channels', 'social-media', 'short-video', 'creator-data'],
    endpoints: 12,
  },
  {
    slug: 'pinterest',
    name: 'Pinterest',
    description:
      'Read public Pinterest surfaces for visual discovery, trend, and creator research: pin details and media, board details, user boards and profiles, and keyword search across pins for inspiration and content workflows.',
    category: 'social-media',
    tags: ['pinterest', 'social-media', 'visual-discovery', 'content-data'],
    endpoints: 4,
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn',
    description:
      'Read public LinkedIn professional-network surfaces for recruiting, sales, and research workflows: profile search, company employees, posts, company pages, services, and engagement metadata.',
    category: 'company-data',
    tags: ['linkedin', 'company-data', 'professional-network', 'lead-generation'],
    endpoints: 7,
  },
  {
    slug: 'threads',
    name: 'Threads',
    description:
      'Read public Threads surfaces for social monitoring and audience research: user profiles, user posts, replies and reposts, post details, post comments, and recent, top, and profile search.',
    category: 'social-media',
    tags: ['threads', 'social-media', 'social-listening', 'creator-data'],
    endpoints: 9,
  },
  {
    slug: 'lemon8',
    name: 'Lemon8',
    description:
      'Read public Lemon8 surfaces for lifestyle and creator research: keyword search, discover tabs and banners, post details, comments, user profiles, following and follower lists, topic details and post lists, and hot-search keywords.',
    category: 'social-media',
    tags: ['lemon8', 'social-media', 'lifestyle', 'creator-data'],
    endpoints: 16,
  },
  {
    slug: 'xigua',
    name: 'Xigua',
    description:
      'Read public Xigua Video surfaces for creator, content, and audience research: video search, video details, play URLs, user profiles, user post lists, and video comment threads with engagement-oriented public metadata.',
    category: 'video',
    tags: ['xigua', 'video', 'creator-data', 'content-data'],
    endpoints: 6,
  },
  {
    slug: 'pipixia',
    name: 'Pipixia',
    description:
      'Read public Pipixia surfaces for community and trend research: home and short-drama feeds, keyword search, post details, comments, user profiles, following and follower lists, hashtag details and post lists, hot-search boards, and post statistics.',
    category: 'social-media',
    tags: ['pipixia', 'social-media', 'community-data', 'content-data'],
    endpoints: 17,
  },
  {
    slug: 'zhihu',
    name: 'Zhihu',
    description:
      'Read public Zhihu Q&A and community surfaces for knowledge and trend research: hot lists, question and answer details, columns and articles, pins, topic, column, e-book and scholar search, user profiles, answers, articles, collections, follows, and AI search streams.',
    category: 'community-data',
    tags: ['zhihu', 'community-data', 'knowledge', 'content-data'],
    endpoints: 41,
  },
  {
    slug: 'telegram',
    name: 'Telegram',
    description:
      'Read public Telegram channel surfaces for monitoring, discovery, and research: channel info, batch channel info, channel post lists, post details and comment threads, similar-channel discovery, and keyword channel search.',
    category: 'community-data',
    tags: ['telegram', 'community-data', 'messaging', 'content-data'],
    endpoints: 7,
  },
  {
    slug: 'wechat-mp',
    name: 'WeChat MP',
    description:
      'Read public WeChat Official Account article surfaces for content and reputation research: account profiles and services, article lists, article details, comments and replies, related articles, read and engagement stats, and article ad metadata.',
    category: 'community-data',
    tags: ['wechat-mp', 'community-data', 'articles', 'creator-data'],
    endpoints: 8,
  },
  {
    slug: 'wechat-search',
    name: 'WeChat Search',
    description:
      'Search public WeChat surfaces for content discovery and monitoring workflows: keyword search across articles and accounts plus dedicated video search results, returning structured public metadata for research and trend analysis.',
    category: 'web-search',
    tags: ['wechat-search', 'web-search', 'content-data'],
    endpoints: 2,
  },
  {
    slug: 'toutiao',
    name: 'Toutiao',
    description:
      'Read public Toutiao surfaces for news, media, and content research: article details and video details across both app and web entry points, author profiles, user identifiers, and article comment threads with public engagement metadata.',
    category: 'news',
    tags: ['toutiao', 'news', 'content-data', 'creator-data'],
    endpoints: 7,
  },
  {
    slug: 'dataforseo',
    name: 'DataForSEO',
    description:
      'Access DataForSEO data across SEO and market research workflows: SERP and keyword data, on-page and content analysis, sentiment and rating distribution, plus business data from Google, Yelp and Trustpilot and app data from the Apple and Google stores.',
    category: 'web-data',
    tags: ['dataforseo', 'web-data', 'serp', 'market-data'],
    endpoints: 74,
  },
  {
    slug: 'firecrawl',
    name: 'Firecrawl',
    description:
      'Extract LLM-ready web data for retrieval, research, and enrichment workflows: scrape single pages to Markdown or HTML, crawl entire sites, map site structure and links, batch scrape many URLs at once, and run web search.',
    category: 'web-data',
    tags: ['firecrawl', 'web-data', 'web-extraction', 'web-search'],
    endpoints: 5,
  },
  {
    slug: 'scholar',
    name: 'Scholar',
    description:
      'Search academic and web literature for research and citation workflows: scholarly paper search, general web search, mixed academic-and-web results, and query explanation that clarifies how a search was interpreted and expanded.',
    category: 'web-search',
    tags: ['scholar', 'web-search', 'academic', 'research'],
    endpoints: 3,
  },
  {
    slug: 'agentbody',
    name: 'Agent Body',
    description:
      'Use AgentBody automation and enrichment tools for agent workflows: TikTok and YouTube transcripts, LinkedIn profile, email and phone enrichment, YouTube channel email lookup, document parsing, and writing humanization.',
    category: 'automation',
    tags: ['agentbody', 'automation', 'data-enrichment', 'transcription'],
    endpoints: 6,
  },
  {
    slug: 'bilibili',
    name: 'Bilibili',
    description:
      'Read public Bilibili video data for creator and content workflows, including video metadata and engagement-oriented public information.',
    category: 'video',
    tags: ['bilibili', 'video', 'content-data'],
    endpoints: 38,
  },
  {
    slug: 'cloudsway',
    name: 'Cloudsway',
    description:
      'Access Cloudsway infrastructure and data APIs exposed through SandBase for cloud, automation, and operational workflows.',
    category: 'utility-data',
    tags: ['cloudsway', 'utility-data', 'infrastructure', 'automation'],
    endpoints: 1,
  },
  {
    slug: 'exa',
    name: 'Exa',
    description:
      'Use Exa for AI-native web search and retrieval workflows: semantic search, grounded answers, similar-page discovery, and optional content extraction.',
    category: 'web-search',
    tags: ['exa', 'web-search', 'semantic-search', 'content-data'],
    endpoints: 3,
    price: '$0.007 / call',
  },
  {
    slug: 'reddit',
    name: 'Reddit',
    description:
      'Read Reddit community data for research and monitoring workflows: posts, comments, subreddits, user profiles, scores, nested discussions, and official API-backed structured data.',
    category: 'community-data',
    tags: ['reddit', 'community-data', 'social-media', 'content-data'],
    endpoints: 24,
  },
  {
    slug: 'sandbase',
    name: 'SandBase',
    description:
      'Use SandBase-native APIs and utilities for catalog, platform, and automation workflows exposed through the SandBase API ecosystem.',
    category: 'utility-data',
    tags: ['sandbase', 'utility-data', 'platform', 'automation'],
    endpoints: 18,
  },
  {
    slug: 'tavily',
    name: 'Tavily',
    description:
      'Use Tavily for fresh web search workflows with structured results designed for agents, research tools, and retrieval pipelines.',
    category: 'web-search',
    tags: ['tavily', 'web-search', 'research'],
    endpoints: 3,
  },
  {
    slug: 'twitter',
    name: 'Twitter',
    description:
      'Read public X/Twitter surfaces for social monitoring and audience research: tweet search, profile timelines, followers, following, lists, and rich profile metadata.',
    category: 'social-media',
    tags: ['twitter', 'social-media', 'social-listening', 'creator-data'],
    endpoints: 12,
  },
]

/**
 * The catalog is the source of truth for every headline number on the page —
 * totals are derived here so copy can never drift from the data.
 */
export const TOTAL_ENDPOINTS = VENDORS.reduce((sum, v) => sum + v.endpoints, 0)
export const TOTAL_PLATFORMS = VENDORS.length

/**
 * This prototype only owns `/`. Every destination it links to lives on the real
 * SandBase site, so all outbound paths are resolved against this base. Centralising
 * it means no link can point at a route that does not exist here.
 */
export const SANDBASE_ORIGIN = 'https://sandbase.ai'

/** Absolute SandBase URL for an in-site path such as `/apis/douyin`. */
export function sb(path: string): string {
  return `${SANDBASE_ORIGIN}${path}`
}

/** Monid-style hero wall: short label + what the capability does. */
export interface WallItem {
  /** Vendor slug from the catalog, used to resolve the official brand mark. */
  slug: string
  name: string
  capability: string
}

export const WALL: WallItem[] = [
  { slug: 'douyin', name: 'Douyin', capability: 'video search' },
  { slug: 'exa', name: 'Exa', capability: 'web search' },
  { slug: 'tiktok', name: 'TikTok', capability: 'creator data' },
  { slug: 'reddit', name: 'Reddit', capability: 'community data' },
  { slug: 'instagram', name: 'Instagram', capability: 'profiles & reels' },
  { slug: 'firecrawl', name: 'Firecrawl', capability: 'page extraction' },
  { slug: 'youtube', name: 'YouTube', capability: 'transcripts' },
  { slug: 'tavily', name: 'Tavily', capability: 'fresh search' },
  { slug: 'linkedin', name: 'LinkedIn', capability: 'people search' },
  { slug: 'bilibili', name: 'Bilibili', capability: 'video metadata' },
  { slug: 'twitter', name: 'X', capability: 'social listening' },
  { slug: 'dataforseo', name: 'DataForSEO', capability: 'SERP & keywords' },
  { slug: 'zhihu', name: 'Zhihu', capability: 'Q&A research' },
  { slug: 'weibo', name: 'Weibo', capability: 'hot search' },
  { slug: 'scholar', name: 'Scholar', capability: 'papers & citations' },
  { slug: 'telegram', name: 'Telegram', capability: 'channel posts' },
  { slug: 'pinterest', name: 'Pinterest', capability: 'visual discovery' },
  { slug: 'xiaohongshu', name: 'Xiaohongshu', capability: 'product search' },
  { slug: 'threads', name: 'Threads', capability: 'audience research' },
  { slug: 'wechat-search', name: 'WeChat', capability: 'articles & video' },
]
