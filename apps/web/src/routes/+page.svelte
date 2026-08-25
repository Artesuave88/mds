<script>
  import { setMeta } from "$lib/seo";
  import SeoHead from "$lib/seo/SeoHead.svelte";

  const meta = setMeta({
    title: "Web Design for UK Small Businesses",
    description:
      "Midas Web designs and builds clear, professional websites for UK small businesses and local organisations, helping visitors find and contact them online.",
    openGraphTitle: "Websites that help local businesses move forward",
    openGraphDescription: "Independent web design and development for UK small businesses and local organisations that need a clearer, more credible online presence.",
    image: "/case-studies/love-long-eaton/trent-lock.webp",
    url: "/"
  });

  const services = [
    ["01", "Strategy", "We find the clearest route from first visit to real enquiry."],
    ["02", "Design", "Distinctive, accessible interfaces shaped around your audience."],
    ["03", "Development", "Fast, responsive websites built without page-builder baggage."],
    ["04", "Launch", "A polished handover, hosting support and room to grow."]
  ];
</script>

<SeoHead {meta} />

<section class="hero">
  <div class="hero-orbit orbit-one"></div>
  <div class="hero-orbit orbit-two"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span></span> Independent web studio · UK</p>
      <h1>Good websites<br />make things <em>happen.</em></h1>
      <p class="hero-lede">
        We build bold, useful websites for local organisations with somewhere to go.
        Thoughtful strategy, sharp design and zero template thinking.
      </p>
      <div class="hero-actions">
        <a class="button button-light" href="/contact">Start a project <span>↗</span></a>
        <a class="text-link" href="#selected-work">See our work <span>↓</span></a>
      </div>
    </div>

    <div class="hero-proof" aria-label="Selected project previews">
      <a class="preview preview-town" href="/work/love-long-eaton-website">
        <img src="/case-studies/love-long-eaton/trent-lock.webp" alt="Trent Lock at sunrise, featured on Love Long Eaton" />
        <span class="preview-label">Love Long Eaton <b>↗</b></span>
      </a>
      <a class="preview preview-bjj" href="/work/long-eaton-bjj-website">
        <img src="/case-studies/long-eaton-bjj/home.jpg" alt="Long Eaton BJJ website homepage" />
        <span class="preview-label">Long Eaton BJJ <b>↗</b></span>
      </a>

    </div>
  </div>

</section>

<section class="intro">
  <div class="wrap intro-grid">
    <p class="section-kicker">What we believe</p>
    <div>
      <h2>Your website should feel like <span>you</span> - only clearer, faster and impossible to ignore.</h2>
      <p>
        We partner with people who care about what they do. No anonymous hand-offs and no
        off-the-shelf themes. Just close collaboration and a site built around the job it needs to do.
      </p>
    </div>
  </div>
</section>

<section class="work" id="selected-work">
  <div class="wrap">
    <div class="section-heading">
      <div>
        <p class="section-kicker">Selected work · 2026</p>
        <h2>Built around real places<br />and real people.</h2>
      </div>
      <a class="round-link" href="/work" aria-label="View all work">↗</a>
    </div>

    <article class="case case-love">
      <div class="case-copy">
        <div>
          <span class="case-number">01 / 02</span>
          <p class="case-type">Community platform</p>
          <h3>Love<br />Long Eaton</h3>
          <p class="case-description">
            A warm, energetic digital home for the town—bringing its events, independent
            businesses and best-kept secrets into one easy place.
          </p>
        </div>
        <div class="case-bottom">
          <div class="chips"><span>Strategy</span><span>UX/UI</span><span>SvelteKit</span></div>
          <a href="/work/love-long-eaton-website">Explore the project <span>↗</span></a>
        </div>
      </div>
      <a class="case-visual love-visual" href="/work/love-long-eaton-website">
        <img class="love-photo" src="/case-studies/love-long-eaton/trent-lock.webp" alt="A misty morning at Trent Lock" loading="lazy" />
        <div class="discovery-stack">
          <figure class="discovery-card discovery-park">
            <img src="/case-studies/love-long-eaton/west-park.jpg" alt="West Park in Long Eaton" loading="lazy" />
            <figcaption>West Park <span>01</span></figcaption>
          </figure>
          <figure class="discovery-card discovery-canal">
            <img src="/case-studies/love-long-eaton/erewash-canal.jpg" alt="A narrowboat on the Erewash Canal" loading="lazy" />
            <figcaption>Erewash Canal <span>02</span></figcaption>
          </figure>
          <figure class="discovery-card discovery-event">
            <img src="/case-studies/love-long-eaton/music-festival.jpg" alt="Long Eaton Music Festival artwork" loading="lazy" />
            <figcaption>What’s on <span>03</span></figcaption>
          </figure>
        </div>
        <span class="visual-note">Discover your town</span>
      </a>
    </article>

    <article class="case case-bjj">
      <a class="case-visual bjj-visual" href="/work/long-eaton-bjj-website">
        <div class="red-disc"></div>
        <div class="browser-card browser-bjj">
          <div class="browser-bar dark"><i></i><i></i><i></i><span>longeatonbjj.co.uk</span></div>
          <img src="/case-studies/long-eaton-bjj/home.jpg" alt="Long Eaton BJJ website" loading="lazy" />
        </div>
        <div class="phone-card">
          <img src="/case-studies/long-eaton-bjj/trial.jpg" alt="Long Eaton BJJ free trial page" loading="lazy" />
        </div>
      </a>
      <div class="case-copy">
        <div>
          <span class="case-number">02 / 02</span>
          <p class="case-type">Martial arts club</p>
          <h3>Long Eaton<br /><em>BJJ</em></h3>
          <p class="case-description">
            A confident, conversion-led site that turns first-time curiosity into trial bookings,
            while making classes, pricing and coaches effortless to understand.
          </p>
        </div>
        <div class="case-bottom">
          <div class="chips"><span>Web design</span><span>Development</span><span>Conversion</span></div>
          <a href="/work/long-eaton-bjj-website">Explore the project <span>↗</span></a>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="testimonial">
  <div class="wrap quote-grid">
    <div class="quote-mark">“</div>
    <blockquote>
      The new website has been <em>fantastic</em> for us. It’s easy to navigate,
      looks great on mobile, and has definitely helped us attract new customers.
      <footer><span>Long Eaton BJJ</span> · Client</footer>
    </blockquote>
  </div>
</section>

<section class="services">
  <div class="wrap">
    <div class="services-top">
      <p class="section-kicker">What we do</p>
      <h2>From “we need a website”<br />to <em>“that’s exactly us.”</em></h2>
    </div>
    <div class="service-list">
      {#each services as service}
        <div class="service-row">
          <span>{service[0]}</span>
          <h3>{service[1]}</h3>
          <p>{service[2]}</p>
          <b>↘</b>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="closing">
  <div class="wrap closing-inner">
    <p class="eyebrow"><span></span> Taking on new projects</p>
    <h2>Have something<br /><em>good</em> in mind?</h2>
    <a class="button button-dark" href="/contact">Let’s talk about it <span>↗</span></a>
    <p class="closing-note">Independent studio · Working across the UK</p>
  </div>
</section>
