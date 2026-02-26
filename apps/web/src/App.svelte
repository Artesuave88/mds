<script>
  import Router from "svelte-spa-router";
  import AppShell from "./lib/layout/AppShell.svelte";
  import About from "./routes/About.svelte";
  import Contact from "./routes/Contact.svelte";
  import Home from "./routes/Home.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Services from "./routes/Services.svelte";
  import Work from "./routes/Work.svelte";
  import WorkDetail from "./routes/WorkDetail.svelte";

  const routes = {
    "/": Home,
    "/work": Work,
    "/work/:slug": WorkDetail,
    "/services": Services,
    "/about": About,
    "/contact": Contact,
    "*": NotFound
  };
</script>

<AppShell>
  <Router {routes} />
</AppShell>
