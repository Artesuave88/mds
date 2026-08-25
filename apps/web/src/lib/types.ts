export type ProjectMetric = {
  metricLabel: string;
  baselineMetrics?: string;
  resultMetrics?: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  services: string[];
  tools: string[];
  heroImage: string;
  siteScreenshots?: string[];
  beforeImage?: string;
  afterImage?: string;
  summary: string;
  clientContext: string;
  problem: string;
  goals: string[];
  changes: string;
  metrics?: ProjectMetric[];
  buildNotes?: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  links?: ProjectLink[];
  metaTitle: string;
  metaDescription: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: string;
};

export type ProjectSort = 'newest' | 'oldest' | 'title';

export type ProjectFilters = {
  service?: string;
  tool?: string;
  sort?: ProjectSort;
};
