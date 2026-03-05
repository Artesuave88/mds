import { Feed } from "feed";
import { getProjects } from "$lib/content";

const siteUrl = "https://www.midasweb.org";

export const GET = () => {
  const feed = new Feed({
    title: "Midas Web Development",
    description: "UK-based custom web developer for high-performance websites.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    updated: new Date(),
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
    author: {
      name: "Midas Web Development",
      link: siteUrl,
      email: "info@midasweb.org",
    },
  });

  const projects = getProjects({ sort: "newest" });

  projects.forEach((project) => {
    const url = `${siteUrl}/work/${project.slug}`;

    feed.addItem({
      title: project.title,
      id: url,
      link: url,
      description: project.summary,
      date: new Date(project.year, 0, 1),
      author: [{ name: "Midas Web Development" }],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
