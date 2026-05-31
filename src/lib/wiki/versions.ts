export type WikiVersion = {
  label: string;
  value: string;
  status: "current" | "upcoming" | "archived";
};

export const wikiVersions: WikiVersion[] = [
  { label: "0.3.0", value: "0.3.0", status: "current" },
  { label: "0.2.0", value: "0.2.0", status: "archived" },
  { label: "0.1.0", value: "0.1.0", status: "archived" }
];

export const defaultWikiVersion = wikiVersions.find((version) => version.status === "current") ?? wikiVersions[0];

export const wikiVersionFromSearch = (searchParams: URLSearchParams) =>
  wikiVersions.find((version) => version.value === searchParams.get("version")) ?? defaultWikiVersion;
