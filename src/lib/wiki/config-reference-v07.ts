import type { ConfigOption, ConfigPage } from "$lib/wiki/config-reference";
import { configPageV06Override } from "$lib/wiki/config-reference-v06";

const patchOption = (
  entry: ConfigOption,
  patch: Partial<ConfigOption>
): ConfigOption => ({ ...entry, ...patch });

const addedOption = (
  option: string,
  type: string,
  defaultValue: string,
  notes: string
): ConfigOption => ({ option, type, defaultValue, notes, addedIn: "0.7.0" });

const colorMode = "auto | system | light | dark | hex";

const decorationsPage = (base: ConfigPage): ConfigPage => ({
  ...base,
  summary: "Managed borders, border resize, and compositor-owned titlebars with the 0.7 neutral-and-orange defaults.",
  sections: base.sections.map((section) => {
    if (section.slug === "decorations-border") {
      return {
        ...section,
        options: section.options.map((entry) =>
          entry.option === "colour-focused"
            ? patchOption(entry, {
                defaultValue: "#f4f5f7",
                notes: "Focused border color; 0.7 defaults to neutral near-white."
              })
            : entry
        )
      };
    }
    if (section.slug === "decorations-titlebars") {
      return {
        ...section,
        options: section.options.map((entry) => {
          if (entry.option === "button-position") {
            return patchOption(entry, {
              defaultValue: "right",
              notes: "Control button group side; 0.7 places controls on the right by default."
            });
          }
          if (entry.option === "colour-focused") {
            return patchOption(entry, {
              defaultValue: "#d65d26",
              notes: "Focused background; 0.7 uses Halley orange."
            });
          }
          return entry;
        })
      };
    }
    return section;
  }),
  example: `decorations:
  border:
    size 3
    radius 8
    colour-focused "#f4f5f7"
    colour-unfocused "#474d59"
  end
  resize-using-border true
  titlebars:
    enabled true
    button-position "right"
    title-position "center"
    show-buttons true
    show-icons false
    show-title true
    height 32
    colour-focused "#d65d26"
    colour-unfocused "#474d59"
  end
end`
});

const overlaysPage = (base: ConfigPage): ConfigPage => ({
  ...base,
  summary: "Independent compositor-overlay palette, borders, geometry, notifications, and zoom-indicator overrides.",
  sections: base.sections.map((section) => {
    if (section.slug === "overlays") {
      return {
        ...section,
        summary: "Shared overlay palette and geometry, independent from window decorations.",
        options: section.options.flatMap((entry) => {
          const colorEntry = ["background-colour", "text-colour", "error-colour"].includes(entry.option)
            ? patchOption(entry, {
                type: colorMode,
                notes: `${entry.notes} system follows the XDG desktop colour-scheme preference; auto remains deterministic.`
              })
            : entry;
          if (entry.option === "error-colour") {
            return [
              colorEntry,
              addedOption(
                "border-colour",
                colorMode,
                "#d65d26",
                "Shared compositor-overlay border color. It no longer inherits decorations.border."
              )
            ];
          }
          if (entry.option === "borders") {
            return [
              colorEntry,
              addedOption(
                "border-size",
                "i32",
                "3",
                "Shared overlay border width in pixels, clamped from 0 through 64."
              )
            ];
          }
          return [colorEntry];
        })
      };
    }
    if (section.slug === "overlays-zoom-indicator") {
      return {
        ...section,
        options: section.options.flatMap((entry) => {
          const colorEntry = ["text-colour", "background-colour"].includes(entry.option)
            ? patchOption(entry, { type: colorMode })
            : entry;
          if (entry.option === "background-colour") {
            return [
              colorEntry,
              addedOption(
                "border-colour",
                colorMode,
                "inherit overlays.border-colour",
                "Optional zoom-card border override. The border-color alias is accepted."
              )
            ];
          }
          return [colorEntry];
        })
      };
    }
    return section;
  }),
  example: `overlays:
  background-colour "auto"
  text-colour "auto"
  error-colour "#fb4934"
  border-colour "#d65d26"
  radius 8
  borders true
  border-size 3
  notifications:
    position "top-center"
    success-duration-ms 4000
    error-duration-ms 9000
  end
  zoom-indicator:
    enabled true
    position "bottom-center"
    hold-duration-ms 750
    fade-duration-ms 180
    background true
    opacity 1.0

    # Optional visual overrides inherit the shared style when omitted.
    # text-size 18
    # text-colour "system"
    # background-colour "system"
    # border-colour "#d65d26"
    # borders true
    # radius 8
  end
end`
});

const nodePage = (base: ConfigPage): ConfigPage => ({
  ...base,
  summary: "Collapsed-node shape, labels, icons, fill, independent border colors, and restore panning.",
  sections: base.sections.map((section) =>
    section.slug !== "node"
      ? section
      : {
          ...section,
          options: section.options.flatMap((entry) => {
            if (entry.option !== "background-colour") {
              return [entry];
            }
            return [
              patchOption(entry, {
                type: colorMode,
                notes: "Node fill color. system follows the XDG desktop colour-scheme preference; auto remains deterministic."
              }),
              addedOption(
                "border-colour",
                "hex RGB",
                "#474d59",
                "Idle border color shared by collapsed nodes and cluster cores."
              ),
              addedOption(
                "border-colour-highlighted",
                "hex RGB",
                "#d65d26",
                "Highlighted border color used for hover, focus, and active core emphasis."
              )
            ];
          })
        }
  ),
  example: `node:
  show-labels "hover"
  show-app-icons "always"
  shape "squircle"
  label-shape "squircle"
  icon-size 0.72
  opacity 1.0
  background-colour "auto"
  border-colour "#474d59"
  border-colour-highlighted "#d65d26"
  click-collapsed-pan "never"
end`
});

export const configPageV07Override = (slug: string): ConfigPage | undefined => {
  const base = configPageV06Override(slug);
  if (!base) {
    return undefined;
  }
  switch (slug) {
    case "decorations":
      return decorationsPage(base);
    case "overlays":
      return overlaysPage(base);
    case "node":
      return nodePage(base);
    default:
      return base;
  }
};
