<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="min-h-screen bg-gradient-to-b from-white via-[#F5F7FF] to-brand-bg font-['Manrope'] text-brand-text">
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
