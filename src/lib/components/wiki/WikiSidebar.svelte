<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import WikiVersionControl from "$lib/components/wiki/WikiVersionControl.svelte";
  import type { WikiNavItem } from "$lib/wiki/navigation";
  import { lockBodyScroll } from "$lib/utils/scroll-lock";
  import { ListIcon } from "phosphor-svelte";

  let { items }: { items: WikiNavItem[] } = $props();
  let mobileOpen = $state(false);

  const withBase = (href: string) => `${base}${href}`;

  const normalizePath = (path: string) => path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;

  const pathFromHref = (href: string) => normalizePath(href.split("#")[0].split("?")[0]);

  const currentPath = () => {
    const pathname = base && page.url.pathname.startsWith(base)
      ? page.url.pathname.slice(base.length) || "/"
      : page.url.pathname;

    return normalizePath(pathname);
  };

  const getHash = (href: string) => href.includes("#") ? `#${href.split("#")[1]}` : "";

  const isActive = (href: string) => {
    const hrefPath = pathFromHref(href);
    const hrefHash = getHash(href);

    if (currentPath() !== hrefPath) {
      return false;
    }

    return hrefHash ? page.url.hash === hrefHash : page.url.hash === "";
  };

  const hasActiveChild = (item: WikiNavItem): boolean =>
    item.children?.some((child) => isActive(child.href) || hasActiveChild(child)) ?? false;

  const hasActiveTopLevel = () => items.some((item) => isActive(item.href) || hasActiveChild(item));

  const isOpen = (item: WikiNavItem) =>
    isActive(item.href) || hasActiveChild(item) || (item.defaultOpen && !hasActiveTopLevel());

  const versionedHref = (href: string) => {
    if (!browser) {
      return withBase(href);
    }

    const version = page.url.searchParams.get("version");
    if (!version) {
      return withBase(href);
    }

    const [path, hash] = href.split("#");
    return withBase(`${path}?version=${encodeURIComponent(version)}${hash ? `#${hash}` : ""}`);
  };

  const closeMobileNav = () => {
    mobileOpen = false;
  };

  const closeMobileNavOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  };

  $effect(() => {
    if (mobileOpen) {
      return lockBodyScroll();
    }
  });
</script>

<svelte:window onkeydown={closeMobileNavOnEscape} />

<aside class:mobile-open={mobileOpen} class="wiki-sidebar" aria-label="Wiki navigation">
  <button
    class="wiki-mobile-toggle"
    type="button"
    aria-label={mobileOpen ? "Close wiki navigation" : "Open wiki navigation"}
    aria-expanded={mobileOpen}
    aria-controls="wiki-sidebar-content"
    onclick={() => (mobileOpen = !mobileOpen)}
  >
    <ListIcon color="currentColor" weight="bold" size={24} />
  </button>

  <button
    class:open={mobileOpen}
    class="wiki-mobile-backdrop"
    type="button"
    aria-label="Close wiki navigation"
    onclick={closeMobileNav}
  ></button>

  <div id="wiki-sidebar-content" class="sidebar-scroll">
    <a class="mobile-home-link" href={withBase("/")} onclick={closeMobileNav}>Back to Halley home</a>

    <WikiVersionControl />

    <div class="new-user-card">
      <span>New here?</span>
      <p>Start with install, then config. Use IPC only once Halley is running.</p>
      <a href={versionedHref("/wiki")} onclick={closeMobileNav}>Open quick start</a>
    </div>

    <a class="sidebar-title" href={versionedHref("/wiki")} onclick={closeMobileNav}>Wiki</a>

    <nav class="sidebar-nav">
      {#each items as item}
        <section class="nav-group">
          {#if item.children?.length}
            <details name="wiki-sidebar-section" open={isOpen(item)}>
              <summary class="nav-link parent">{item.label}</summary>

              <div class="subnav" aria-label={`${item.label} pages`}>
              {#each item.children as child}
                {#if child.children?.length}
                  <details class="nested-group" open={isOpen(child)}>
                    <summary class="nav-link child nested-parent">{child.label}</summary>

                    <div class="subnav nested-subnav" aria-label={`${child.label} pages`}>
                      <a class:active={isActive(child.href)} class="nav-link child" href={versionedHref(child.href)} onclick={closeMobileNav}>Overview</a>
                      {#each child.children as nestedChild}
                        <a class:active={isActive(nestedChild.href)} class="nav-link child" href={versionedHref(nestedChild.href)} onclick={closeMobileNav}>{nestedChild.label}</a>
                      {/each}
                    </div>
                  </details>
                {:else}
                  <a class:active={isActive(child.href)} class="nav-link child" href={versionedHref(child.href)} onclick={closeMobileNav}>{child.label}</a>
                {/if}
              {/each}
              </div>
            </details>
          {:else}
            <a class:active={isActive(item.href)} class="nav-link parent" href={versionedHref(item.href)} onclick={closeMobileNav}>{item.label}</a>
          {/if}
        </section>
      {/each}
    </nav>
  </div>
</aside>

<style>
  .wiki-sidebar {
    position: sticky;
    top: calc(var(--header-height) + 1.5rem);
    z-index: 2;
    width: 100%;
    max-height: calc(100vh - var(--header-height) - 2.5rem);
    overflow: hidden;
    padding: 0;
    background:
      linear-gradient(135deg, rgba(255, 106, 42, 0.1), transparent 42%),
      rgba(16, 23, 34, 0.74);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background-clip: padding-box;
    box-shadow: var(--shadow-1), inset 0 1px 0 rgba(246, 239, 231, 0.08);
    backdrop-filter: blur(16px);
  }

  .wiki-mobile-toggle {
    display: none;
  }

  .wiki-mobile-backdrop {
    display: none;
  }

  .mobile-home-link {
    display: none;
  }

  .sidebar-scroll {
    max-height: inherit;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    padding: 1rem 0.75rem 1rem 1rem;
  }

  .sidebar-scroll::-webkit-scrollbar {
    width: 0.45rem;
  }

  .sidebar-scroll::-webkit-scrollbar-track {
    margin-block: 0.75rem;
    background: transparent;
  }

  .sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 106, 42, 0.32);
    border-radius: 999px;
  }

  .sidebar-title {
    display: inline-flex;
    margin-bottom: 1rem;
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .new-user-card {
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1rem;
    padding: 0.85rem;
    background:
      radial-gradient(circle at 100% 0%, rgba(125, 220, 255, 0.08), transparent 8rem),
      rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.08);
    border-radius: var(--radius-md);
  }

  .new-user-card span {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .new-user-card p {
    color: var(--text-2);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .new-user-card a {
    justify-self: start;
    color: var(--text-1);
    font-size: 0.88rem;
    font-weight: 800;
  }

  .new-user-card a:hover {
    color: var(--accent-soft);
  }

  .sidebar-nav,
  .nav-group,
  .subnav,
  details {
    display: grid;
  }

  details {
    gap: 0.3rem;
  }

  .sidebar-nav {
    gap: 0.55rem;
  }

  .nav-group {
    gap: 0.3rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    min-width: 0;
    min-height: 2.25rem;
    color: var(--text-2);
    border-radius: var(--radius-sm);
    overflow-wrap: anywhere;
    line-height: 1.25;
    transition:
      color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .nav-link:hover {
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.06);
    transform: translateX(2px);
  }

  .nav-link.active {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.12);
    box-shadow: inset 2px 0 0 var(--accent);
  }

  .parent {
    padding: 0.35rem 0.55rem;
    color: var(--text-1);
    font-weight: 800;
  }

  summary.parent,
  summary.child {
    cursor: pointer;
    list-style: none;
  }

  summary.parent::-webkit-details-marker,
  summary.child::-webkit-details-marker {
    display: none;
  }

  .parent::before {
    flex: 0 0 auto;
    width: 0.45rem;
    height: 0.45rem;
    margin-right: 0.55rem;
    content: "";
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 16px rgba(255, 106, 42, 0.62);
  }

  summary.parent::after {
    flex: 0 0 auto;
    margin-left: auto;
    color: var(--text-3);
    content: "+";
    font-weight: 800;
  }

  details[open] > summary.parent::after {
    content: "-";
  }

  .nested-parent::after {
    flex: 0 0 auto;
    margin-left: auto;
    color: var(--text-3);
    content: "+";
    font-weight: 800;
  }

  .nested-group[open] > .nested-parent::after {
    content: "-";
  }

  .subnav {
    gap: 0.15rem;
    margin-left: 0.77rem;
    padding-left: 0.85rem;
    border-left: 1px solid rgba(255, 106, 42, 0.26);
  }

  :global(:root[data-theme="light"]) .wiki-sidebar {
    background:
      linear-gradient(135deg, rgba(184, 63, 17, 0.045), transparent 42%),
      rgba(255, 250, 244, 0.9);
    border-color: rgba(38, 27, 20, 0.14);
    box-shadow: var(--shadow-1), inset 0 1px 0 rgba(255, 255, 255, 0.72);
  }

  :global(:root[data-theme="light"]) .new-user-card,
  :global(:root[data-theme="light"]) .nav-link:hover,
  :global(:root[data-theme="light"]) .mobile-home-link {
    background: rgba(255, 255, 255, 0.42);
    border-color: rgba(38, 27, 20, 0.12);
  }

  :global(:root[data-theme="light"]) .nav-link.active {
    background: rgba(184, 63, 17, 0.1);
  }

  :global(:root[data-theme="light"]) .subnav {
    border-left-color: rgba(184, 63, 17, 0.22);
  }

  .child {
    padding: 0.25rem 0.55rem;
    font-size: 0.94rem;
    font-weight: 650;
  }

  .nested-subnav {
    margin-left: 0.45rem;
  }

  @media (max-width: 880px) {
    .wiki-sidebar {
      position: static;
      width: auto;
      max-height: none;
      overflow: visible;
      background: transparent;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      backdrop-filter: none;
    }

    .wiki-mobile-toggle {
      position: fixed;
      top: 0.75rem;
      left: 0.75rem;
      z-index: 52;
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
      backdrop-filter: blur(16px);
    }

    .wiki-mobile-toggle:hover {
      border-color: var(--border-2);
      color: var(--accent-soft);
    }

    .wiki-mobile-backdrop.open {
      position: fixed;
      inset: 0;
      z-index: 49;
      display: block;
      background: rgba(3, 6, 10, 0.48);
      border: 0;
      backdrop-filter: blur(2px);
    }

    .mobile-home-link {
      display: flex;
      align-items: center;
      min-height: 2.5rem;
      margin-bottom: 1rem;
      padding: 0.7rem 0.8rem;
      color: var(--text-1);
      font-family: var(--font-display);
      font-size: 0.9rem;
      font-weight: 800;
      background: rgba(246, 239, 231, 0.035);
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
    }

    .mobile-home-link:hover {
      color: var(--text-1);
      background: rgba(255, 106, 42, 0.1);
      border-color: var(--border-2);
    }

    .sidebar-scroll {
      position: fixed;
      top: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
      z-index: 51;
      display: block;
      width: min(21rem, calc(100vw - 1rem));
      max-height: none;
      margin-top: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4.25rem 0.85rem 0.85rem;
      background:
        linear-gradient(135deg, rgba(255, 106, 42, 0.1), transparent 42%),
        rgba(16, 23, 34, 0.94);
      border: 1px solid var(--border-1);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-1), inset 0 1px 0 rgba(246, 239, 231, 0.08);
      opacity: 0;
      pointer-events: none;
      transform: translateX(calc(-100% - 1rem));
      visibility: hidden;
      transition:
        opacity 180ms ease,
        transform 180ms ease,
        visibility 0s linear 180ms;
      backdrop-filter: blur(16px);
    }

    :global(:root[data-theme="light"]) .wiki-mobile-toggle {
      color: var(--accent-deep);
      background:
        linear-gradient(135deg, rgba(184, 63, 17, 0.12), transparent 52%),
        rgba(243, 238, 231, 0.92);
      border-color: rgba(38, 27, 20, 0.18);
      box-shadow:
        0 14px 34px rgba(54, 37, 26, 0.16),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    :global(:root[data-theme="light"]) .wiki-mobile-toggle:hover {
      color: #fffaf4;
      background: linear-gradient(135deg, rgba(184, 63, 17, 0.92), rgba(143, 47, 12, 0.88));
      border-color: rgba(94, 31, 9, 0.32);
      box-shadow:
        0 14px 34px rgba(54, 37, 26, 0.18),
        inset 0 1px 0 rgba(255, 255, 255, 0.14);
    }

    :global(:root[data-theme="light"]) .wiki-mobile-backdrop.open {
      background: rgba(38, 27, 20, 0.18);
    }

    :global(:root[data-theme="light"]) .sidebar-scroll {
      background:
        linear-gradient(135deg, rgba(184, 63, 17, 0.045), transparent 42%),
        rgba(255, 250, 244, 0.94);
      border-color: rgba(38, 27, 20, 0.14);
      box-shadow: var(--shadow-1), inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    .wiki-sidebar.mobile-open .sidebar-scroll {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
      visibility: visible;
      transition-delay: 0s;
    }

    .sidebar-nav {
      grid-template-columns: 1fr;
      gap: 0.35rem;
    }

    .sidebar-title {
      margin-bottom: 0.65rem;
    }

    .new-user-card {
      margin-bottom: 0.75rem;
    }

    .nav-link {
      min-height: 2.4rem;
    }

    .subnav {
      margin-left: 0.3rem;
      padding-left: 0.65rem;
    }
  }

  @media (max-width: 520px) {
    .wiki-mobile-toggle {
      top: 0.5rem;
      left: 0.5rem;
    }

    .wiki-mobile-toggle,
    .sidebar-scroll {
      border-radius: var(--radius-md);
    }

    .child {
      font-size: 0.9rem;
    }

    .nested-subnav {
      margin-left: 0.15rem;
    }
  }
</style>
