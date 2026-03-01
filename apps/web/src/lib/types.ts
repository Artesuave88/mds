export type ProjectMetric = string;

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
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
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: ProjectMetric[];
  testimonial?: ProjectTestimonial;
  links?: ProjectLink[];
};

export type ProjectSort = "newest" | "oldest" | "title";

export type ProjectFilters = {
  service?: string;
  tool?: string;
  sort?: ProjectSort;
};
