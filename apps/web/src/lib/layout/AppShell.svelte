<script>
  import Footer from "./Footer.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div class="min-h-screen bg-gradient-to-b from-[#f2f6f4] via-[#f7f5ef] to-[#eef3f8] font-['Manrope'] text-slate-900">
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
