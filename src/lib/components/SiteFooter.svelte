<script lang="ts">
  import { base } from "$app/paths";
  import { newsPosts } from "$lib/news/releases";

  const year = new Date().getFullYear();
  const withBase = (href: string) => `${base}${href}`;

  // Derive the orbit label from the latest shipped release (skip preview teasers)
  // so this never goes stale.
  const latestRelease = newsPosts.find((post) => post.kind !== "preview");
  const latestOrbit = latestRelease?.title.split(" ")[0] ?? "First";

  const columns = [
    {
      title: "Links",
      links: [
        { href: withBase("/"), label: "Home" },
        { href: withBase("/wiki"), label: "Wiki" },
        { href: withBase("/news"), label: "News" },
        { href: withBase("/backstory"), label: "Backstory" }
      ]
    },
    {
      title: "Socials",
      links: [
        { href: "https://github.com/saltnpepper97/halley", label: "GitHub" }
      ]
    }
  ];
</script>

<footer class="site-footer">
  <div class="footer-shell">
    <section class="footer-card" aria-labelledby="footer-title">
      <div class="footer-brand">
        <a class="brand" href={withBase("/")} id="footer-title">Halley</a>
        <p>Spatial Wayland workspaces for keeping context alive.</p>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        {#each columns as column}
          <div class="footer-column">
            <h2>{column.title}</h2>
            {#each column.links as link}
              <a href={link.href}>{link.label}</a>
            {/each}
          </div>
        {/each}
      </nav>

    </section>

    <div class="footer-bottom">
      <p>© {year} Halley. Built for deliberate desktops.</p>
      <p class="orbit-note">{latestOrbit} orbit in progress.</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    position: relative;
    z-index: 2;
    padding: clamp(1.25rem, 4vw, 3rem) 1rem clamp(1.25rem, 3vw, 2rem);
  }

  .footer-shell {
    display: grid;
    gap: 0.9rem;
    width: min(100%, var(--page-max-width));
    margin-inline: auto;
  }

  .footer-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.8fr);
    align-items: start;
    gap: clamp(1.5rem, 4vw, 3rem);
    padding: clamp(1.25rem, 3vw, 2rem);
    background:
      radial-gradient(circle at 9% 8%, rgba(255, 106, 42, 0.16), transparent 18rem),
      rgba(11, 17, 27, 0.92);
    border: 1px solid var(--border-1);
    border-top-color: var(--hud-line-faint);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-1), inset 0 1px 0 var(--hud-line-soft);
    backdrop-filter: blur(6px) saturate(120%);
  }

  .footer-card::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255, 106, 42, 0.58), rgba(125, 220, 255, 0.2), transparent);
    height: 1px;
    opacity: 0.62;
  }

  .footer-card::after {
    position: absolute;
    right: -7rem;
    bottom: -9rem;
    width: 19rem;
    height: 19rem;
    pointer-events: none;
    content: "";
    background: radial-gradient(circle, rgba(125, 220, 255, 0.14), transparent 68%);
    border-radius: 999px;
  }

  .footer-brand,
  .footer-nav {
    position: relative;
    z-index: 1;
  }

  .footer-brand {
    display: grid;
    gap: 0.75rem;
    max-width: 28rem;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    width: max-content;
    font-family: var(--font-display);
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .brand::before {
    width: 0.72rem;
    height: 0.72rem;
    content: "";
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 22px rgba(255, 106, 42, 0.72);
  }

  .footer-brand p,
  .footer-bottom p {
    color: var(--text-3);
  }

  .footer-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1rem, 3vw, 2rem);
  }

  .footer-column {
    display: grid;
    gap: 0.45rem;
  }

  h2 {
    margin-bottom: 0.25rem;
    color: var(--text-1);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .footer-column a {
    width: max-content;
    color: var(--text-2);
    font-weight: 700;
    transition:
      color 160ms ease,
      transform 160ms ease;
  }

  .footer-column a:hover {
    color: var(--accent-soft);
    transform: translateX(2px);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-inline: clamp(0.25rem, 2vw, 1rem);
    font-size: 0.9rem;
  }

  .orbit-note {
    text-align: right;
  }

  @media (max-width: 880px) {
    .footer-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .site-footer {
      padding-inline: 0.5rem;
    }

    .footer-card {
      gap: 1.25rem;
      padding: 1rem;
    }

    .footer-nav {
      grid-template-columns: 1fr;
    }

    .footer-bottom {
      display: grid;
      padding-inline: 0.25rem;
    }

    .orbit-note {
      text-align: left;
    }
  }
</style>
