<script lang="ts">
  import { base } from "$app/paths";
  import { lockBodyScroll } from "$lib/utils/scroll-lock";
  import { GithubLogoIcon, HandCoinsIcon, ListIcon, MoonIcon, SunIcon } from "phosphor-svelte";

  let menuOpen = $state(false);
  let theme = $state<"dark" | "light">("dark");

  const closeMenu = () => {
    menuOpen = false;
  };

  const closeMenuOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  };

  $effect(() => {
    if (menuOpen) {
      return lockBodyScroll();
    }
  });

  $effect(() => {
    const current = document.documentElement.dataset.theme;
    theme = current === "light" ? "light" : "dark";
  });

  const toggleTheme = () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("halley-theme", theme);
  };

  const withBase = (href: string) => `${base}${href}`;
  const links = [
    { href: withBase("/"), label: "Home" },
    { href: withBase("/wiki"), label: "Wiki" },
    { href: withBase("/ecosystem"), label: "Ecosystem" },
    { href: withBase("/news"), label: "News" },
    { href: withBase("/backstory"), label: "Backstory" }
  ];
</script>

<svelte:window onkeydown={closeMenuOnEscape} />

<header class="site-header">
    <nav class="topnav" aria-label="Main-nav">
        <div class="nav-left">
          <a class="brand" href={withBase("/")} onclick={closeMenu}>
            Halley
          </a>
        </div>

        <button
          class="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close site menu" : "Open site menu"}
          aria-controls="site-mobile-menu"
          aria-expanded={menuOpen}
          onclick={() => (menuOpen = !menuOpen)}
        >
          <ListIcon color="currentColor" weight="bold" size={24} />
        </button>

        <div id="site-mobile-menu" class:open={menuOpen} class="nav-menu">
          <a class="mobile-drawer-brand" href={withBase("/")} onclick={closeMenu}>Halley</a>

          <div class="nav-center">
            {#each links as link}
              <a class="links" href={link.href} onclick={closeMenu}>{link.label}</a>
            {/each}
          </div>

          <div class="nav-right">
            <button
              class="theme-toggle"
              type="button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "light"}
              onclick={toggleTheme}
            >
              {#if theme === "dark"}
                <SunIcon color="currentColor" weight="bold" size={22} />
                <span>Light</span>
              {:else}
                <MoonIcon color="currentColor" weight="bold" size={22} />
                <span>Dark</span>
              {/if}
            </button>
            <a class="github" href="https://github.com/saltnpepper97/halley" rel="noreferrer" aria-label="Halley on GitHub" onclick={closeMenu}><GithubLogoIcon color="currentColor" weight="regular" size={24} /></a>
            <a class="support" href={withBase("/support")} onclick={closeMenu}><HandCoinsIcon color="currentColor" weight="bold" size={24} /><span>Support</span></a>
          </div>
        </div>
    </nav>

    <button class:open={menuOpen} class="menu-backdrop" type="button" aria-label="Close menu" onclick={closeMenu}></button>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0.75rem;
  }

  .topnav {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
    width: min(100%, var(--page-max-width));
    margin-inline: auto;
    padding: 0.7rem 0.85rem 0.7rem 1.25rem;
    background:
      linear-gradient(135deg, rgba(255, 106, 42, 0.13), transparent 34%),
      rgba(16, 23, 34, 0.78);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-1), inset 0 1px 0 rgba(246, 239, 231, 0.08);
    backdrop-filter: blur(18px) saturate(140%);
  }

  .nav-menu {
    display: contents;
  }

  .menu-toggle,
  .menu-backdrop,
  .mobile-drawer-brand {
    display: none;
  }

  .topnav::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255, 106, 42, 0.6), rgba(125, 220, 255, 0.2), transparent);
    height: 1px;
    opacity: 0.65;
  }

  .nav-left {
    justify-self: start;
  }

  .nav-center {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
  }

  .links {
    position: relative;
    padding: 0.5rem 0.7rem;
    color: var(--text-2);
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    border-radius: var(--radius-sm);
    transition:
      color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .links:hover {
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.06);
    transform: translateY(-1px);
  }

  :global(:root[data-theme="light"]) .links {
    color: var(--text-2);
    background: transparent;
  }

  :global(:root[data-theme="light"]) .links:hover {
    color: var(--text-1);
    background: rgba(38, 27, 20, 0.08);
  }

  .nav-right {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .brand {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: "Sora";
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: -0.05em;
    text-decoration: none;
  }

  .brand::before {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    content: "";
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 20px rgba(255, 106, 42, 0.72);
  }

  .brand::after {
    position: absolute;
    left: 0.15rem;
    width: 1.7rem;
    height: 1px;
    content: "";
    background: linear-gradient(90deg, rgba(255, 106, 42, 0), rgba(255, 106, 42, 0.9));
    transform: translateX(-100%);
  }

  a {
    text-decoration: none;
  }

  .theme-toggle,
  .github {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.65rem;
    min-height: 2.65rem;
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.06);
    border: 1px solid var(--border-1);
    padding: 0.5rem;
    border-radius: var(--radius-xl);
    transition:
      border-color 160ms ease,
      color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .theme-toggle {
    gap: 0.42rem;
    padding-inline: 0.75rem;
    font-weight: 800;
  }

  .theme-toggle span {
    font-size: 0.86rem;
  }

  .theme-toggle:hover,
  .github:hover {
      color: var(--accent-soft);
      background: rgba(255, 106, 42, 0.1);
      border-color: var(--border-2);
      transform: translateY(-1px);
  }

  .support {
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 2.65rem;
    padding: 0.55rem 0.95rem;
    color: #170b06;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border-radius: var(--radius-xl);
    box-shadow: 0 0 24px rgba(255, 106, 42, 0.2);
    transition:
      box-shadow 160ms ease,
      transform 160ms ease,
      filter 160ms ease;
  }

  .support:hover {
      color: #170b06;
      box-shadow: var(--glow-1);
      filter: brightness(1.06);
      transform: translateY(-1px);
  }

  @media (max-width: 880px) {
    .site-header {
      position: fixed;
      top: 0.75rem;
      right: 0.75rem;
      z-index: 60;
      padding: 0;
      pointer-events: none;
    }

    .topnav {
      display: block;
      overflow: visible;
      width: auto;
      margin: 0;
      padding: 0;
      background: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      pointer-events: none;
      backdrop-filter: none;
    }

    :global(:root[data-theme="light"]) .topnav {
      background: transparent;
      border: 0;
      box-shadow: none;
      backdrop-filter: none;
    }

    .topnav::before,
    .nav-left {
      display: none;
    }

    .menu-toggle {
      position: relative;
      z-index: 61;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.8rem;
      min-height: 2.8rem;
      padding: 0;
      color: var(--text-1);
      background:
        linear-gradient(135deg, rgba(255, 106, 42, 0.12), transparent 48%),
        rgba(16, 23, 34, 0.9);
      border: 1px solid var(--border-1);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-1), inset 0 1px 0 rgba(246, 239, 231, 0.08);
      font-family: var(--font-display);
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      pointer-events: auto;
      backdrop-filter: blur(16px);
    }

    .menu-toggle:hover {
      border-color: var(--border-2);
      color: var(--accent-soft);
    }

    :global(:root[data-theme="light"]) .menu-toggle {
      color: var(--accent-deep);
      background:
        linear-gradient(135deg, rgba(184, 63, 17, 0.12), transparent 52%),
        rgba(243, 238, 231, 0.92);
      border-color: rgba(38, 27, 20, 0.18);
      box-shadow:
        0 14px 34px rgba(54, 37, 26, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    :global(:root[data-theme="light"]) .menu-toggle:hover {
      color: #fffaf4;
      background:
        linear-gradient(135deg, rgba(184, 63, 17, 0.92), rgba(143, 47, 12, 0.88));
      border-color: rgba(94, 31, 9, 0.32);
      box-shadow:
        0 14px 34px rgba(54, 37, 26, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.14);
    }

    .menu-backdrop.open {
      position: fixed;
      inset: 0;
      z-index: 30;
      display: block;
      background: rgba(3, 6, 10, 0.42);
      border: 0;
      pointer-events: auto;
      backdrop-filter: blur(2px);
    }

    .nav-menu {
      position: fixed;
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      z-index: 40;
      display: grid;
      align-content: start;
      gap: 1rem;
      width: min(20rem, calc(100vw - 1rem));
      padding: 1rem;
      overflow-y: auto;
      background:
        radial-gradient(circle at 10% 0%, rgba(255, 106, 42, 0.16), transparent 15rem),
        rgba(16, 23, 34, 0.94);
      border: 1px solid var(--border-1);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-1);
      opacity: 0;
      pointer-events: none;
      transform: translateX(calc(100% + 1rem));
      visibility: hidden;
      transition:
        opacity 180ms ease,
        transform 180ms ease,
        visibility 0s linear 180ms;
      overscroll-behavior: contain;
      backdrop-filter: blur(18px) saturate(140%);
    }

    :global(:root[data-theme="light"]) .menu-backdrop.open {
      background: rgba(38, 27, 20, 0.18);
    }

    :global(:root[data-theme="light"]) .nav-menu {
      background:
        radial-gradient(circle at 10% 0%, rgba(184, 63, 17, 0.08), transparent 15rem),
        rgba(243, 238, 231, 0.96);
      border-color: rgba(38, 27, 20, 0.16);
      box-shadow:
        0 22px 56px rgba(54, 37, 26, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    .mobile-drawer-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      color: var(--text-1);
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.05em;
    }

    .mobile-drawer-brand::before {
      width: 0.65rem;
      height: 0.65rem;
      content: "";
      background: var(--accent);
      border-radius: 999px;
      box-shadow: 0 0 20px rgba(255, 106, 42, 0.72);
    }

    .nav-menu.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
      visibility: visible;
      transition-delay: 0s;
    }

    .nav-center {
      display: grid;
      gap: 0.35rem;
      justify-content: stretch;
      min-width: 0;
    }

    .nav-center::-webkit-scrollbar {
      display: none;
    }

    .links {
      padding: 0.75rem 0.85rem;
      border: 1px solid transparent;
      background: rgba(246, 239, 231, 0.035);
    }

    :global(:root[data-theme="light"]) .links {
      background: rgba(255, 255, 255, 0.34);
      border-color: rgba(38, 27, 20, 0.1);
    }

    :global(:root[data-theme="light"]) .links:hover {
      background: rgba(38, 27, 20, 0.08);
      border-color: rgba(184, 63, 17, 0.22);
    }

    .links:hover {
      border-color: var(--border-2);
    }

    .nav-right {
      display: grid;
      justify-self: stretch;
      justify-content: stretch;
      gap: 0.45rem;
    }

    .theme-toggle,
    .github {
      justify-content: flex-start;
      width: 100%;
    }

    .support {
      width: 100%;
      padding-inline: 0.75rem;
    }

    .github::after {
      content: "GitHub";
      margin-left: 0.5rem;
      font-weight: 800;
    }

    .theme-toggle::after {
      content: " theme";
      font-weight: 800;
    }

  }

  @media (max-width: 520px) {
    .site-header {
      top: 0.5rem;
      right: 0.5rem;
    }

    .topnav {
      padding: 0;
    }

    .brand {
      font-size: 1.25rem;
    }

    .theme-toggle,
    .github,
    .support {
      min-width: 2.35rem;
      min-height: 2.35rem;
      padding: 0.45rem;
      border-radius: var(--radius-lg);
    }

    .links {
      padding: 0.7rem 0.75rem;
      font-size: 0.88rem;
    }
  }
</style>
