import projectData from "../content/projects.json";
import type { Project, ProjectFilters, ProjectSort } from "./types";

const projects = projectData as Project[];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function sortProjects(items: Project[], sort: ProjectSort = "newest"): Project[] {
  return [...items].sort((a, b) => {
    if (sort === "oldest") {
      return a.year - b.year || a.title.localeCompare(b.title);
    }

    if (sort === "title") {
      return a.title.localeCompare(b.title) || b.year - a.year;
    }

    return b.year - a.year || a.title.localeCompare(b.title);
  });
}

export function filterProjects(
  items: Project[],
  { service, tool }: Pick<ProjectFilters, "service" | "tool"> = {}
): Project[] {
  const normalizedService = service ? normalize(service) : "";
  const normalizedTool = tool ? normalize(tool) : "";

  return items.filter((project) => {
    const hasService = normalizedService
      ? project.services.some((entry) => normalize(entry) === normalizedService)
      : true;

    const hasTool = normalizedTool
      ? project.tools.some((entry) => normalize(entry) === normalizedTool)
      : true;

    return hasService && hasTool;
  });
}

export function getProjects(filters: ProjectFilters = {}): Project[] {
  const filtered = filterProjects(projects, filters);
  return sortProjects(filtered, filters.sort ?? "newest");
}

export function getProjectBySlug(slug: string): Project | undefined {
  const normalizedSlug = normalize(slug);
  return projects.find((project) => normalize(project.slug) === normalizedSlug);
}

export function getServiceOptions(): string[] {
  return [...new Set(projects.flatMap((project) => project.services))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getToolOptions(): string[] {
  return [...new Set(projects.flatMap((project) => project.tools))].sort((a, b) =>
    a.localeCompare(b)
  );
}
