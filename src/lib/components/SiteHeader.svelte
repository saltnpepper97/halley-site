<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
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

  type ThemeTransitionDocument = Document & {
    startViewTransition?: (update: () => void) => { ready: Promise<void> };
  };

  const toggleTheme = (event: MouseEvent) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const applyTheme = () => {
      theme = nextTheme;
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("halley-theme", theme);
    };
    const transitionDocument = document as ThemeTransitionDocument;

    if (!transitionDocument.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.style.setProperty("--theme-wipe-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-wipe-y", `${y}px`);
    const transition = transitionDocument.startViewTransition(applyTheme);

    void transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
        },
        {
          duration: 1100,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  };

  const withBase = (href: string) => `${base}${href}`;
  const normalizePath = (path: string) => {
    const withoutBase = base && path.startsWith(base) ? path.slice(base.length) : path;
    const absolute = withoutBase.startsWith("/") ? withoutBase : `/${withoutBase}`;

    return absolute.replace(/\/+$/, "") || "/";
  };

  const isActive = (href: string) => {
    const current = normalizePath(page.route.id ?? page.url.pathname);
    const target = normalizePath(href);

    if (target === "/") {
      return current === "/";
    }

    return current === target || current.startsWith(`${target}/`);
  };

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
          <a class="mobile-drawer-brand" href={withBase("/")} onclick={closeMenu}>
            Halley
          </a>

          <div class="nav-center">
            {#each links as link}
              <a
                class="links"
                class:active={isActive(link.href)}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onclick={closeMenu}
              >{link.label}</a>
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
      radial-gradient(circle at 8% 0%, rgba(255, 106, 42, 0.17), transparent 18rem),
      linear-gradient(135deg, rgba(125, 220, 255, 0.055), transparent 42%),
      rgba(9, 15, 25, 0.84);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    box-shadow:
      0 18px 54px rgba(0, 0, 0, 0.42),
      inset 0 1px 0 rgba(246, 239, 231, 0.1);
    backdrop-filter: blur(22px) saturate(145%);
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
    height: 2px;
    opacity: 0.78;
  }

  .nav-left {
    justify-self: start;
  }

  .nav-center {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.24rem;
    background: rgba(2, 5, 9, 0.28);
    border: 1px solid rgba(210, 229, 240, 0.075);
    border-radius: var(--radius-md);
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

  .links::after {
    position: absolute;
    right: 0.7rem;
    bottom: 0.22rem;
    left: 0.7rem;
    height: 1px;
    content: "";
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    box-shadow: 0 0 10px rgba(255, 106, 42, 0.5);
    opacity: 0;
    transform: scaleX(0.35);
    transition:
      opacity 180ms ease,
      transform 240ms var(--ease-out);
  }

  .links:hover {
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.06);
    transform: translateY(-1px);
  }

  .links.active {
    color: var(--text-1);
    background: linear-gradient(180deg, rgba(255, 106, 42, 0.12), rgba(255, 106, 42, 0.04));
  }

  .links.active::after {
    opacity: 1;
    transform: scaleX(1);
  }

  :global(:root[data-theme="light"]) .links {
    color: var(--text-2);
    background: transparent;
  }

  :global(:root[data-theme="light"]) .nav-center {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(38, 27, 20, 0.1);
  }

  :global(:root[data-theme="light"]) .links.active {
    color: var(--text-1);
    background: linear-gradient(180deg, rgba(184, 63, 17, 0.11), rgba(184, 63, 17, 0.035));
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
    font-family: "Sora";
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1;
    letter-spacing: -0.05em;
    text-decoration: none;
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
      background: rgba(var(--accent-rgb), 0.1);
      border-color: var(--border-2);
      transform: translateY(-1px);
  }

  .support {
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 2.65rem;
    padding: 0.55rem 0.95rem;
    color: var(--on-accent);
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border-radius: var(--radius-xl);
    box-shadow: 0 0 24px rgba(var(--accent-rgb), 0.2);
    transition:
      box-shadow 160ms ease,
      transform 160ms ease,
      filter 160ms ease;
  }

  .support:hover {
      color: var(--on-accent);
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
      color: var(--on-accent);
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
      padding: 0;
      background: transparent;
      border: 0;
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

    :global(:root[data-theme="light"]) .nav-center {
      background: transparent;
      border: 0;
    }

    :global(:root[data-theme="light"]) .links.active {
      background: linear-gradient(90deg, rgba(184, 63, 17, 0.12), rgba(40, 95, 115, 0.04));
      border-color: rgba(184, 63, 17, 0.28);
    }

    .links:hover {
      border-color: var(--border-2);
    }

    .links.active {
      border-color: var(--border-2);
      background: linear-gradient(90deg, rgba(255, 106, 42, 0.12), rgba(125, 220, 255, 0.035));
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
