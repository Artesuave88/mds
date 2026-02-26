<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="min-h-screen bg-gradient-to-b from-brand-bg via-[#101935] to-[#0A0F1A] font-['Manrope'] text-brand-text">
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
