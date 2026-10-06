import { configPageForVersion, configPages } from "$lib/wiki/config-reference";
import { commandAvailableInVersion, ipcGroups } from "$lib/wiki/ipc-reference";
import type { WikiNavItem } from "$lib/wiki/navigation";

export type WikiSearchEntry = { label: string; category: string; href: string; keywords: string };

export const ipcGroupAnchor = (title: string) => `ipc-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function wikiSearchEntries(items: WikiNavItem[], version: string): WikiSearchEntry[] {
  const entries = new Map<string, WikiSearchEntry>();
  const visit = (item: WikiNavItem, parents: string[] = []) => {
    if (!entries.has(item.href)) {
      entries.set(item.href, {
        label: item.label, category: parents.join(" / ") || "Wiki",
        href: item.href, keywords: [...parents, item.label].join(" ")
      });
    }
    item.children?.forEach((child) => visit(child, [...parents, item.label]));
  };
  items.forEach((item) => visit(item));
  for (const source of configPages) {
    const page = configPageForVersion(source, version);
    for (const section of page.sections) {
      const href = `/wiki/config/${page.slug}#${section.slug}`;
      entries.set(href, {
        label: section.title, category: `Config / ${page.navLabel}`, href,
        keywords: [section.name, section.title, section.summary, ...section.options.flatMap((option) => [option.option, option.notes])].join(" ")
      });
    }
  }
  for (const group of ipcGroups) {
    const commands = group.commands.filter((command) => commandAvailableInVersion(command, version));
    if (commands.length) {
      const href = `/wiki/ipc#${ipcGroupAnchor(group.title)}`;
      entries.set(href, {
        label: group.title, category: "IPC commands", href,
        keywords: [group.title, group.summary, ...commands.flatMap((command) => [command.command, command.description])].join(" ")
      });
    }
  }
  return [...entries.values()];
}

export function searchWiki(entries: WikiSearchEntry[], query: string): WikiSearchEntry[] {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return entries.filter((entry) => words.every((word) => `${entry.label} ${entry.category} ${entry.keywords}`.toLowerCase().includes(word)))
    .sort((a, b) => {
      const rank = (entry: WikiSearchEntry) => words.filter((word) => entry.label.toLowerCase().includes(word)).length;
      return rank(b) - rank(a) || a.label.localeCompare(b.label);
    });
}
