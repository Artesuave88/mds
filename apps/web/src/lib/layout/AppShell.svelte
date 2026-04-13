<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="page-shell min-h-screen text-brand-text">
  <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(212,160,23,0.16),transparent_50%)]"></div>
  <div class="pointer-events-none absolute left-[-8rem] top-[22rem] -z-10 h-72 w-72 rounded-full bg-brand-primary/8 blur-3xl"></div>
  <div class="pointer-events-none absolute right-[-6rem] top-[9rem] -z-10 h-80 w-80 rounded-full bg-brand-accent/12 blur-3xl"></div>
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
