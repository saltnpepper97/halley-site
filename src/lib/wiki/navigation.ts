import { configPageForVersion, configPages } from "$lib/wiki/config-reference";

export type WikiNavItem = {
  label: string;
  href: string;
  children?: WikiNavItem[];
  defaultOpen?: boolean;
};

export const wikiNavigationForVersion = (version: string): WikiNavItem[] => [
  { label: "Getting Started", href: "/wiki" },
  {
    label: "Install",
    href: "/wiki/install",
    defaultOpen: true,
    children: [
      { label: "Overview", href: "/wiki/install" },
      { label: "Requirements", href: "/wiki/install#install-requirements" },
      { label: "Arch", href: "/wiki/install#install-arch" },
      { label: "Source", href: "/wiki/install#install-source" },
      { label: "Startup Options", href: "/wiki/install#install-config" },
      { label: "Nested", href: "/wiki/install#install-nested" },
      { label: "Display Manager", href: "/wiki/install#install-session" },
      { label: "Desktop Portal", href: "/wiki/install#install-portal" }
    ]
  },
  {
    label: "Config Reference",
    href: "/wiki/config",
    children: [
      { label: "Overview", href: "/wiki/config" },
      ...configPages
        .map((page) => configPageForVersion(page, version))
        .filter((page) => page.sections.length > 0)
        .map((page) => ({
          label: page.navLabel,
          href: `/wiki/config/${page.slug}`,
          children: page.links
        }))
    ]
  },
  {
    label: "IPC",
    href: "/wiki/ipc",
    children: [
      { label: "Overview", href: "/wiki/ipc" },
      { label: "Socket", href: "/wiki/ipc#ipc-socket" },
      { label: "Commands", href: "/wiki/ipc#ipc-cli" },
      { label: "Selectors", href: "/wiki/ipc#ipc-selectors" },
      { label: "JSON Shapes", href: "/wiki/ipc#ipc-json" }
    ]
  }
];

export const wikiNavigation = wikiNavigationForVersion("0.6.0");
