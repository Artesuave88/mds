<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="min-h-screen bg-gradient-to-b from-white via-[#F8F8F8] to-brand-bg font-['Manrope'] text-brand-text">
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
