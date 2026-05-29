<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="page-shell min-h-screen text-brand-text">
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
