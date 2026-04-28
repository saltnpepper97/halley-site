export type ConfigOption = {
  option: string;
  type: string;
  defaultValue: string;
  notes: string;
  addedIn?: string;
};

export type ConfigSection = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  options: ConfigOption[];
  addedIn?: string;
};

export type ConfigPage = {
  slug: string;
  navLabel: string;
  title: string;
  summary: string;
  sections: ConfigSection[];
  links?: { label: string; href: string }[];
  example: string;
};

export const configSections: ConfigSection[] = [
  {
    slug: "env",
    name: "env",
    title: "Environment Variables",
    summary: "Environment variables exported to apps launched by Halley.",
    options: [
      { option: "<VAR_NAME>", type: "string", defaultValue: "none", notes: "Adds an environment variable exported to apps launched by Halley." }
    ]
  },
  {
    slug: "autostart",
    name: "autostart",
    title: "Autostart Commands",
    summary: "Commands Halley runs on compositor startup or config reload.",
    options: [
      { option: "once", type: "command string", defaultValue: "none", notes: "Runs once when the compositor starts." },
      { option: "on-reload", type: "command string", defaultValue: "none", notes: "Runs after a config reload." }
    ]
  },
  {
    slug: "cursor",
    name: "cursor",
    title: "Cursor",
    summary: "Cursor theme, size, and idle/typing visibility settings.",
    options: [
      { option: "theme", type: "string", defaultValue: "Adwaita", notes: "Cursor theme name exported to child apps too." },
      { option: "size", type: "u32", defaultValue: "24", notes: "Cursor size in pixels." },
      { option: "hide-when-typing", type: "bool", defaultValue: "true", notes: "Hides the cursor while typing." },
      { option: "hide-after-ms", type: "u64", defaultValue: "2000", notes: "Idle timeout before hiding the cursor." }
    ]
  },
  {
    slug: "input",
    name: "input",
    title: "Input",
    summary: "Keyboard repeat behavior and focus policy.",
    options: [
      { option: "repeat-rate", type: "i32", defaultValue: "30", notes: "Keyboard repeat rate." },
      { option: "repeat-delay", type: "i32", defaultValue: "500", notes: "Delay before keyboard repeat starts, in milliseconds." },
      { option: "focus-mode", type: "string", defaultValue: "click", notes: "Accepted values: click, hover. hover focuses windows under the pointer and, when the pointer is on an otherwise empty monitor, default new windows spawn on that monitor." },
      { option: "keyboard", type: "nested block", defaultValue: "see input.keyboard", notes: "Keyboard layout, variant, and option strings.", addedIn: "0.2.0" }
    ]
  },
  {
    slug: "input-keyboard",
    name: "keyboard",
    title: "Keyboard",
    summary: "Keyboard layout, variant, and XKB options.",
    addedIn: "0.2.0",
    options: [
      { option: "layout", type: "string", defaultValue: "us", notes: "XKB keyboard layout." },
      { option: "variant", type: "string", defaultValue: "", notes: "XKB keyboard variant." },
      { option: "options", type: "string", defaultValue: "", notes: "XKB keyboard options such as compose:ralt." }
    ]
  },
  {
    slug: "font",
    name: "font",
    title: "Font",
    summary: "Font used by Halley labels and overlays.",
    options: [
      { option: "family", type: "string", defaultValue: "monospace", notes: "UI font family used for labels and overlays." },
      { option: "size", type: "u32", defaultValue: "11", notes: "UI font size in pixels." }
    ]
  },
  {
    slug: "screenshot",
    name: "screenshot",
    title: "Screenshot",
    summary: "Screenshot output directory and capture overlay colors.",
    options: [
      { option: "directory", type: "string", defaultValue: "$env.HOME/Pictures/Screenshots/", notes: "Output directory for screenshots." },
      { option: "highlight-color", type: "string", defaultValue: "auto", notes: "Overlay highlight color for screenshot UI. Accepted values: auto, light, dark, or a hex color." },
      { option: "background-color", type: "string", defaultValue: "auto", notes: "Overlay background color for screenshot UI. Accepted values: auto, light, dark, or a hex color." }
    ]
  },
  {
    slug: "viewport",
    name: "viewport",
    title: "Viewport",
    summary: "Global fallback viewport defaults and per-output blocks.",
    options: [
      { option: "center-x", type: "f32", defaultValue: "derived", notes: "Fallback global viewport center x. Derived from the first enabled output when outputs are configured; otherwise 0.0." },
      { option: "center-y", type: "f32", defaultValue: "derived", notes: "Fallback global viewport center y. Derived from the first enabled output when outputs are configured; otherwise 0.0." },
      { option: "size-w", type: "f32", defaultValue: "derived", notes: "Fallback global viewport width. Derived from the first enabled output when outputs are configured; otherwise 1920.0." },
      { option: "size-h", type: "f32", defaultValue: "derived", notes: "Fallback global viewport height. Derived from the first enabled output when outputs are configured; otherwise 1080.0." },
      { option: "<connector>", type: "nested block", defaultValue: "none", notes: "Per-output block such as DP-1: or HDMI-A-1:." }
    ]
  },
  {
    slug: "viewport-connector",
    name: "<connector>",
    title: "Viewport Connector",
    summary: "Per-output settings for a configured monitor connector.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables or disables the output." },
      { option: "offset-x", type: "i32", defaultValue: "0", notes: "Output origin x in the global monitor layout." },
      { option: "offset-y", type: "i32", defaultValue: "0", notes: "Output origin y in the global monitor layout." },
      { option: "width", type: "u32", defaultValue: "required", notes: "Output width in pixels." },
      { option: "height", type: "u32", defaultValue: "required", notes: "Output height in pixels." },
      { option: "rate", type: "positive f32", defaultValue: "unset", notes: "Refresh rate in Hz. When omitted, Halley uses the output default." },
      { option: "transform", type: "u32", defaultValue: "0", notes: "Output rotation. Accepted values: 0, 90, 180, 270." },
      { option: "vrr", type: "string", defaultValue: "off", notes: "Variable refresh rate mode. Accepted values: off, on, on-demand." },
      { option: "focus-ring", type: "nested block", defaultValue: "inherited", notes: "Optional per-output focus ring override." }
    ]
  },
  {
    slug: "viewport-connector-focus-ring",
    name: "<connector>.focus-ring",
    title: "Viewport Focus Ring",
    summary: "Per-output focus-ring override values.",
    options: [
      { option: "primary-rx", type: "f32", defaultValue: "820.0", notes: "Horizontal focus-ring radius for this output." },
      { option: "primary-ry", type: "f32", defaultValue: "420.0", notes: "Vertical focus-ring radius for this output." },
      { option: "offset-x", type: "f32", defaultValue: "0.0", notes: "Focus-ring x offset on this output." },
      { option: "offset-y", type: "f32", defaultValue: "0.0", notes: "Focus-ring y offset on this output." }
    ]
  },
  {
    slug: "focus-ring",
    name: "focus-ring",
    title: "Focus Ring",
    summary: "Global focus-ring radius and offset defaults.",
    options: [
      { option: "primary-rx", type: "f32", defaultValue: "820.0", notes: "Global focus-ring horizontal radius. Aliases like rx and radius-x are also accepted." },
      { option: "primary-ry", type: "f32", defaultValue: "420.0", notes: "Global focus-ring vertical radius. Aliases like ry and radius-y are also accepted." },
      { option: "offset-x", type: "f32", defaultValue: "0.0", notes: "Global focus-ring x offset." },
      { option: "offset-y", type: "f32", defaultValue: "0.0", notes: "Global focus-ring y offset." }
    ]
  },
  {
    slug: "field",
    name: "field",
    title: "Field",
    summary: "Camera, spacing, active-window, and field zoom settings.",
    options: [
      { option: "gap", type: "f32", defaultValue: "20.0", notes: "Gap between windows and layout elements in the field." },
      { option: "active-windows-allowed", type: "usize", defaultValue: "5", notes: "Maximum number of non-node active windows before decay becomes more aggressive." },
      { option: "pan-to-new", type: "string", defaultValue: "if-needed", notes: "Controls how strongly the camera pans to newly opened windows. Accepted values: never, if-needed, always." },
      { option: "close-restore-focus", type: "bool", defaultValue: "true", notes: "Restores focus when a window closes." },
      { option: "close-restore-pan", type: "string", defaultValue: "if-offscreen", notes: "Controls camera pan restoration after close. Accepted values: never, if-offscreen, always." },
      { option: "zoom", type: "nested block", defaultValue: "see field.zoom", notes: "Field zoom settings." }
    ]
  },
  {
    slug: "field-zoom",
    name: "field.zoom",
    title: "Field Zoom",
    summary: "Zoom controls, limits, and smoothing for the field camera.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables field zoom controls." },
      { option: "step", type: "f32", defaultValue: "1.10", notes: "Per-step zoom multiplier." },
      { option: "min", type: "f32", defaultValue: "0.35", notes: "Minimum zoom scale." },
      { option: "max", type: "f32", defaultValue: "1.35", notes: "Maximum zoom scale." },
      { option: "smooth", type: "bool", defaultValue: "true", notes: "Enables smooth zoom interpolation." },
      { option: "smooth-rate", type: "f32", defaultValue: "12.5", notes: "Rate used for smooth zooming." }
    ]
  },
  {
    slug: "node",
    name: "node",
    title: "Node",
    summary: "Collapsed node appearance, labels, icons, and click behavior.",
    options: [
      { option: "primary-to-node-ms", type: "u64", defaultValue: "1260000", notes: "Advanced decay timing from active surface to node." },
      { option: "primary-hot-inner-frac", type: "f32", defaultValue: "0.88", notes: "Inner active-zone fraction used by node/focus heuristics." },
      { option: "show-labels", type: "string", defaultValue: "hover", notes: "Node label visibility policy. Accepted values: off, hover, always." },
      { option: "show-app-icons", type: "string", defaultValue: "always", notes: "App icon visibility policy. Accepted values: off, hover, always." },
      { option: "node-shape", type: "string", defaultValue: "square", notes: "Base node shape. Accepted values: square, squircle." },
      { option: "node-label-shape", type: "string", defaultValue: "square", notes: "Node label badge shape. Accepted values: square, squircle." },
      { option: "icon-size", type: "f32", defaultValue: "0.72", notes: "Icon size as a fraction of node diameter." },
      { option: "background-colour", type: "string", defaultValue: "auto", notes: "Node fill source. Accepted values: auto, theme, light, dark, or a hex color." },
      { option: "border-colour-hover", type: "string", defaultValue: "use-window-active", notes: "Accepted values: use-window-active, use-window-inactive, use-window-secondary-active, use-window-secondary-inactive." },
      { option: "border-colour-inactive", type: "string", defaultValue: "use-window-inactive", notes: "Same accepted values as border-colour-hover." },
      { option: "click-collapsed-outside-focus", type: "string", defaultValue: "activate", notes: "Behavior when clicking away from a collapsed node. Accepted values: ignore, activate." },
      { option: "click-collapsed-pan", type: "string", defaultValue: "if-offscreen", notes: "Camera behavior when opening a collapsed node. Accepted values: never, if-offscreen, always." }
    ]
  },
  {
    slug: "decay",
    name: "decay",
    title: "Decay",
    summary: "Timing for active, inactive, and offscreen docked window decay.",
    options: [
      { option: "active-delay", type: "u64 seconds", defaultValue: "240", notes: "Delay before an active window outside the focus ring decays." },
      { option: "inactive-delay", type: "u64 seconds", defaultValue: "120", notes: "Delay before an inactive window decays." },
      { option: "docked-offscreen-delay", type: "u64 seconds", defaultValue: "300", notes: "Delay before offscreen docked windows decay." }
    ]
  },
  {
    slug: "trail",
    name: "trail",
    title: "Trail",
    summary: "Recent-focus history behavior.",
    options: [
      { option: "history-length", type: "usize", defaultValue: "25", notes: "Number of trail entries kept." },
      { option: "wrap", type: "bool", defaultValue: "true", notes: "Allows trail navigation to wrap around." }
    ]
  },
  {
    slug: "bearings",
    name: "bearings",
    title: "Bearings",
    summary: "Directional orientation overlay display settings.",
    options: [
      { option: "show-distance", type: "bool", defaultValue: "true", notes: "Shows distance text for bearings." },
      { option: "show-icons", type: "bool", defaultValue: "true", notes: "Shows icons in bearings." },
      { option: "fade-distance", type: "f32", defaultValue: "1200.0", notes: "Distance over which bearings fade." }
    ]
  },
  {
    slug: "clusters",
    name: "clusters",
    title: "Clusters",
    summary: "Cluster dwell timing, spread, bloom direction, and default layout.",
    options: [
      { option: "cluster-dwell-ms", type: "u64", defaultValue: "2000", notes: "Hover dwell before cluster interactions trigger." },
      { option: "distance-px", type: "f32", defaultValue: "280.0", notes: "Default cluster spread distance." },
      { option: "bloom-direction", type: "string", defaultValue: "clockwise", notes: "Cluster bloom direction. Accepted values: clockwise, counterclockwise." },
      { option: "show-icons", type: "bool", defaultValue: "true", notes: "Shows icons in cluster UI." },
      { option: "default-layout", type: "string", defaultValue: "stacking", notes: "Default cluster workspace layout. Accepted values: stacking, tiling." }
    ]
  },
  {
    slug: "tile",
    name: "tile",
    title: "Tile",
    summary: "Tiling layout gaps, stack depth, and queued-window icon behavior.",
    options: [
      { option: "new-on-top", type: "bool", defaultValue: "false", notes: "Inserts new tiled windows at the top of the stack when possible." },
      { option: "gaps-inner", type: "f32", defaultValue: "20.0", notes: "Inner gap between tiled windows." },
      { option: "gaps-outer", type: "f32", defaultValue: "20.0", notes: "Outer gap around the tiled layout." },
      { option: "max-stack", type: "usize", defaultValue: "4", notes: "Max visible stack depth before queueing." },
      { option: "queue-show-icons", type: "bool", defaultValue: "true", notes: "Shows icons for queued tiled windows." }
    ]
  },
  {
    slug: "stacking",
    name: "stacking",
    title: "Stacking",
    summary: "Stacking layout visibility limits.",
    options: [
      { option: "max-visible", type: "usize", defaultValue: "5", notes: "Maximum number of visible windows in stacking layout." }
    ]
  },
  {
    slug: "physics",
    name: "physics",
    title: "Physics",
    summary: "Physics-style motion smoothing settings.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables physics-style motion smoothing." },
      { option: "damping", type: "f32", defaultValue: "0.45", notes: "Damping used for non-overlap bump behavior." }
    ]
  },
  {
    slug: "animations",
    name: "animations",
    title: "Animations",
    summary: "Master animation toggle and nested animation blocks.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Master animation toggle." },
      { option: "smooth-resize", type: "nested block", defaultValue: "see animations.smooth-resize", notes: "Resize animation settings." },
      { option: "maximize", type: "nested block", defaultValue: "see animations.maximize", notes: "Maximize transition settings.", addedIn: "0.2.0" },
      { option: "window-open", type: "nested block", defaultValue: "see animations.window-open", notes: "Window open animation settings." },
      { option: "window-close", type: "nested block", defaultValue: "see animations.window-close", notes: "Window close animation settings." },
      { option: "tile", type: "nested block", defaultValue: "see animations.tile", notes: "Tile animation settings." },
      { option: "stack", type: "nested block", defaultValue: "see animations.stack", notes: "Stack animation settings." }
    ]
  },
  {
    slug: "animations-maximize",
    name: "maximize",
    title: "Maximize Animation",
    summary: "Maximize transition timing.",
    addedIn: "0.2.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables animated maximize transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "240", notes: "Maximize animation duration." }
    ]
  },
  {
    slug: "animations-smooth-resize",
    name: "smooth-resize",
    title: "Smooth Resize Animation",
    summary: "Resize transition timing.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables animated resize transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "90", notes: "Resize animation duration." }
    ]
  },
  {
    slug: "animations-window-open",
    name: "window-open",
    title: "Window Open Animation",
    summary: "Window open transition settings.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables animated window open transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "620", notes: "Open animation duration." }
    ]
  },
  {
    slug: "animations-window-close",
    name: "window-close",
    title: "Window Close Animation",
    summary: "Window close transition timing and style.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables animated window close transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "270", notes: "Close animation duration." },
      { option: "style", type: "string", defaultValue: "shrink", notes: "Current close animation style. Accepted value: shrink." }
    ]
  },
  {
    slug: "animations-tile",
    name: "tile",
    title: "Tile Animation",
    summary: "Tile layout animation settings.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables tile layout animations." },
      { option: "duration-ms", type: "u64", defaultValue: "240", notes: "Tile animation duration." }
    ]
  },
  {
    slug: "animations-stack",
    name: "stack",
    title: "Stack Animation",
    summary: "Stack layout animation settings.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables stack layout animations." },
      { option: "duration-ms", type: "u64", defaultValue: "220", notes: "Stack animation duration." }
    ]
  },
  {
    slug: "decorations",
    name: "decorations",
    title: "Decorations",
    summary: "Managed borders and resize behavior.",
    options: [
      { option: "border", type: "nested block", defaultValue: "see decorations.border", notes: "Primary compositor-managed border." },
      { option: "secondary-border", type: "nested block", defaultValue: "see decorations.secondary-border", notes: "Optional secondary border." },
      { option: "shadows", type: "nested block", defaultValue: "see decorations.shadows", notes: "Window, node, and overlay shadow layers.", addedIn: "0.2.0" },
      { option: "resize-using-border", type: "bool", defaultValue: "true", notes: "Lets border hit areas drive resize interactions." }
    ]
  },
  {
    slug: "decorations-shadows-window",
    name: "shadows.window",
    title: "Window Shadow",
    summary: "Shadow layer used by windows.",
    addedIn: "0.2.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables window shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "10", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "10", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "12", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#00000005", notes: "Shadow color, including alpha." }
    ]
  },
  {
    slug: "decorations-shadows-node",
    name: "shadows.node",
    title: "Node Shadow",
    summary: "Shadow layer used by collapsed nodes.",
    addedIn: "0.2.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables node shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "10", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "5", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "6", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#0000002e", notes: "Shadow color, including alpha." }
    ]
  },
  {
    slug: "decorations-shadows-overlay",
    name: "shadows.overlay",
    title: "Overlay Shadow",
    summary: "Shadow layer used by overlay containers.",
    addedIn: "0.2.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables overlay shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "16", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "4", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "8", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#00000038", notes: "Shadow color, including alpha." }
    ]
  },
  {
    slug: "decorations-border",
    name: "border",
    title: "Primary Border",
    summary: "Primary compositor-managed border size, radius, and colors.",
    options: [
      { option: "size", type: "i32", defaultValue: "3", notes: "Primary border width in pixels." },
      { option: "radius", type: "i32", defaultValue: "0", notes: "Primary border radius in pixels." },
      { option: "colour-focused", type: "hex color", defaultValue: "#d65d26", notes: "Border color for focused windows." },
      { option: "colour-unfocused", type: "hex color", defaultValue: "#333333", notes: "Border color for unfocused windows." }
    ]
  },
  {
    slug: "decorations-secondary-border",
    name: "secondary-border",
    title: "Secondary Border",
    summary: "Optional secondary border width, gap, and colors.",
    options: [
      { option: "enabled", type: "bool", defaultValue: "false", notes: "Enables the secondary border." },
      { option: "size", type: "i32", defaultValue: "1", notes: "Secondary border width in pixels." },
      { option: "gap", type: "i32", defaultValue: "2", notes: "Gap between primary and secondary borders." },
      { option: "colour-focused", type: "hex color", defaultValue: "#fabd2f", notes: "Secondary border color for focused windows." },
      { option: "colour-unfocused", type: "hex color", defaultValue: "#1f1f1f", notes: "Secondary border color for unfocused windows." }
    ]
  },
  {
    slug: "overlays",
    name: "overlays",
    title: "Overlays",
    summary: "Overlay color, shape, and border styling.",
    options: [
      { option: "background-colour", type: "string", defaultValue: "auto", notes: "Overlay background color. Accepted values: auto, light, dark, or a hex color." },
      { option: "text-colour", type: "string", defaultValue: "auto", notes: "Overlay text color. Accepted values: auto, light, dark, or a hex color." },
      { option: "shape", type: "string", defaultValue: "square", notes: "Overlay shape style. Accepted values: square, rounded." },
      { option: "borders", type: "bool", defaultValue: "true", notes: "Enables overlay borders." },
      { option: "border-source", type: "string", defaultValue: "primary", notes: "Border palette source. Accepted values: primary, secondary." }
    ]
  },
  {
    slug: "keybinds",
    name: "keybinds",
    title: "Keybinds",
    summary: "Modifier token and chord-to-action mappings.",
    options: [
      { option: "mod", type: "modifier token", defaultValue: "super", notes: "Base modifier token used by $var.mod and $mod." },
      { option: "<chord>", type: "action string", defaultValue: "starter config bindings", notes: "Any additional entry maps a chord such as $var.mod+return, alt+tab, or $var.mod+1 to an action string. v0.2.0 adds defaults for maximize-focused, cycle-focus, cycle-focus-backward, and cluster slot 1 through 10." }
    ]
  },
  {
    slug: "rules",
    name: "rules",
    title: "Rules",
    summary: "Window-rule blocks.",
    options: [
      { option: "rule", type: "nested block", defaultValue: "none", notes: "Repeated window-rule block." }
    ]
  },
  {
    slug: "rules-rule",
    name: "rule",
    title: "Window Rule",
    summary: "Individual window matching and placement policy.",
    options: [
      { option: "app-id", type: "quoted string, regex, or array", defaultValue: "required if title omitted", notes: "Matches window app IDs. Arrays can mix literals and regex literals like r\"Firefox.*\"." },
      { option: "title", type: "quoted string, regex, or array", defaultValue: "required if app-id omitted", notes: "Matches window titles." },
      { option: "overlap-policy", type: "string", defaultValue: "none", notes: "Controls overlap allowed during initial placement. Accepted values: none, parent-only, all." },
      { option: "spawn-placement", type: "string", defaultValue: "adjacent", notes: "Initial placement strategy for matching windows. Accepted values: adjacent, center, viewport-center, cursor, app." },
      { option: "cluster-participation", type: "string", defaultValue: "layout", notes: "Controls whether matching windows join layout management or float. Accepted values: layout, float." }
    ]
  }
];

const configExamples: Record<string, string> = {
  env: `env:
  QT_QPA_PLATFORM "wayland"
  QT_QPA_PLATFORMTHEME "qt6ct"
end`,
  autostart: `autostart:
  once "waybar"
  on-reload "makoctl reload"
end`,
  cursor: `cursor:
  theme "Adwaita"
  size 24
  hide-when-typing true
  hide-after-ms 2000
end`,
  input: `input:
  repeat-rate 30
  repeat-delay 500
  focus-mode "click"
  keyboard:
    layout "us"
    variant ""
    options ""
  end
end`,
  font: `font:
  family "monospace"
  size 11
end`,
  screenshot: `screenshot:
  directory "$env.HOME/Pictures/Screenshots/"
  highlight-color "auto"
  background-color "auto"
end`,
  viewport: `viewport:
  DP-1:
    enabled true
    offset-x 0
    offset-y 0
    width 2560
    height 1440
    rate 180.0
    transform 0
    vrr "on"

    focus-ring:
      primary-rx 820.0
      primary-ry 420.0
      offset-x 0
      offset-y 0
    end
  end
end`,
  field: `field:
  gap 20.0
  active-windows-allowed 5
  pan-to-new "if-needed"
  close-restore-focus true
  close-restore-pan "if-offscreen"

  zoom:
    enabled true
    step 1.10
    min 0.35
    max 1.35
    smooth true
    smooth-rate 12.5
  end
end`,
  "field-zoom": `field:
  zoom:
    enabled true
    step 1.10
    min 0.35
    max 1.35
    smooth true
    smooth-rate 12.5
  end
end`,
  node: `node:
  show-labels "hover"
  show-app-icons "always"
  node-shape "square"
  node-label-shape "square"
  icon-size 0.72
  background-colour "auto"
  border-colour-hover "use-window-active"
  border-colour-inactive "use-window-inactive"
  click-collapsed-outside-focus "activate"
  click-collapsed-pan "if-offscreen"
end`,
  decay: `decay:
  active-delay 240
  inactive-delay 120
  docked-offscreen-delay 300
end`,
  trail: `trail:
  history-length 25
  wrap true
end`,
  bearings: `bearings:
  show-distance true
  show-icons true
  fade-distance 1200
end`,
  clusters: `clusters:
  cluster-dwell-ms 2000
  distance-px 280.0
  bloom-direction "clockwise"
  show-icons true
  default-layout "stacking"
end`,
  tile: `tile:
  new-on-top false
  gaps-inner 20
  gaps-outer 20
  max-stack 4
  queue-show-icons true
end`,
  stacking: `stacking:
  max-visible 5
end`,
  physics: `physics:
  enabled true
  damping 0.45
end`,
  animations: `animations:
  enabled true

  smooth-resize:
    enabled true
    duration-ms 90
  end

  maximize:
    enabled true
    duration-ms 240
  end

  window-open:
    enabled true
    duration-ms 620
  end

  window-close:
    enabled true
    duration-ms 270
    style "shrink"
  end

  tile:
    enabled true
    duration-ms 240
  end

  stack:
    enabled true
    duration-ms 220
  end
end`,
  decorations: `decorations:
  border:
    size 3
    radius 0
    colour-focused "#d65d26"
    colour-unfocused "#333333"
  end

  secondary-border:
    enabled false
    size 1
    gap 2
    colour-focused "#fabd2f"
    colour-unfocused "#1f1f1f"
  end

  shadows:
    window:
      enabled true
      blur-radius 10
      spread 10
      offset-x 0
      offset-y 12
      colour "#00000005"
    end

    node:
      enabled true
      blur-radius 10
      spread 5
      offset-x 0
      offset-y 6
      colour "#0000002e"
    end

    overlay:
      enabled true
      blur-radius 16
      spread 4
      offset-x 0
      offset-y 8
      colour "#00000038"
    end
  end

  resize-using-border true
end`,
  overlays: `overlays:
  background-colour "auto"
  text-colour "auto"
  shape "square"
  borders true
  border-source "primary"
end`,
  keybinds: `keybinds:
  mod "super"
  "$var.mod+m" "maximize-focused"
  "$var.mod+1" "cluster slot 1"
  "alt+tab" "cycle-focus"
  "alt+shift+tab" "cycle-focus-backward"
  "$var.mod+return" "spawn ghostty"
end`,
  rules: `rules:
  rule:
    app-id "firefox"
    title [r"File Upload.*", r"Open File.*"]
    overlap-policy "all"
    spawn-placement "center"
    cluster-participation "float"
  end
end`,
  "rules-rule": `rules:
  rule:
    app-id "firefox"
    overlap-policy "none"
    spawn-placement "adjacent"
    cluster-participation "layout"
  end
end`
};

const groupedPageDefinitions = [
  {
    slug: "input",
    title: "Input",
    summary: "Keyboard repeat behavior, focus policy, and keyboard layout settings.",
    sectionSlugs: ["input", "input-keyboard"]
  },
  {
    slug: "viewport",
    title: "Viewport",
    summary: "Monitor viewport settings, output connector blocks, and focus-ring defaults.",
    sectionSlugs: ["viewport", "viewport-connector", "viewport-connector-focus-ring", "focus-ring"]
  },
  {
    slug: "animations",
    title: "Animations",
    summary: "Master animation defaults and nested animation blocks.",
    sectionSlugs: [
      "animations",
      "animations-smooth-resize",
      "animations-maximize",
      "animations-window-open",
      "animations-window-close",
      "animations-tile",
      "animations-stack"
    ]
  },
  {
    slug: "decorations",
    title: "Decorations",
    summary: "Primary and secondary borders, compositor-drawn shadows, and border-driven resize behavior.",
    sectionSlugs: [
      "decorations",
      "decorations-border",
      "decorations-secondary-border",
      "decorations-shadows-window",
      "decorations-shadows-node",
      "decorations-shadows-overlay"
    ]
  },
  {
    slug: "rules",
    title: "Rules",
    summary: "Window rule blocks and individual matching/placement policy options.",
    sectionSlugs: ["rules", "rules-rule"]
  }
];

const groupedPageBySlug = new Map(groupedPageDefinitions.map((definition) => [definition.slug, definition]));
const groupedChildSlugs = new Set(
  groupedPageDefinitions.flatMap((definition) => definition.sectionSlugs.filter((slug) => slug !== definition.slug))
);

const sectionsFor = (slugs: string[]) =>
  slugs
    .map((slug) => configSections.find((section) => section.slug === slug))
    .filter((section): section is ConfigSection => Boolean(section));

export const configPages: ConfigPage[] = configSections
  .filter((section) => !groupedChildSlugs.has(section.slug))
  .map((section) => {
    const groupedPage = groupedPageBySlug.get(section.slug);

    if (groupedPage) {
      const sections = sectionsFor(groupedPage.sectionSlugs);

      return {
        slug: groupedPage.slug,
        navLabel: section.name,
        title: groupedPage.title,
        summary: groupedPage.summary,
        sections,
        links: sections.map((childSection) => ({
          label: childSection.name,
          href: `/wiki/config/${groupedPage.slug}#${childSection.slug}`
        })),
        example: configExamples[groupedPage.slug]
      };
    }

    return {
      slug: section.slug,
      navLabel: section.name,
      title: section.title,
      summary: section.summary,
      sections: [section],
      example: configExamples[section.slug] ?? `${section.name}:\nend`
    };
  });

export const getConfigPage = (slug: string) => configPages.find((page) => page.slug === slug);

const availableInVersion = (item: { addedIn?: string }, version: string) =>
  !item.addedIn || version >= item.addedIn;

export const configPageForVersion = (page: ConfigPage, version: string): ConfigPage => {
  const sections = page.sections
    .filter((section) => availableInVersion(section, version))
    .map((section) => ({
      ...section,
      options: section.options.filter((option) => availableInVersion(option, version))
    }))
    .filter((section) => section.options.length > 0);

  return {
    ...page,
    sections,
    links: page.links?.filter((link) => sections.some((section) => link.href.endsWith(`#${section.slug}`))),
    example: configExampleForVersion(page.slug, version)
  };
};

export const configExampleForVersion = (slug: string, version: string) => {
  if (version >= "0.2.0") {
    return configExamples[slug] ?? `${slug}:
end`;
  }

  switch (slug) {
    case "input":
      return `input:
  repeat-rate 30
  repeat-delay 500
  focus-mode "click"
end`;
    case "animations":
      return `animations:
  enabled true

  smooth-resize:
    enabled true
    duration-ms 90
  end

  window-open:
    enabled true
    duration-ms 620
  end

  window-close:
    enabled true
    duration-ms 270
    style "shrink"
  end

  tile:
    enabled true
    duration-ms 240
  end

  stack:
    enabled true
    duration-ms 220
  end
end`;
    case "decorations":
      return `decorations:
  border:
    size 3
    radius 0
    colour-focused "#d65d26"
    colour-unfocused "#333333"
  end

  secondary-border:
    enabled false
    size 1
    gap 2
    colour-focused "#fabd2f"
    colour-unfocused "#1f1f1f"
  end

  resize-using-border true
end`;
    case "keybinds":
      return `keybinds:
  mod "super"
  "$var.mod+return" "spawn ghostty"
end`;
    default:
      return configExamples[slug] ?? `${slug}:
end`;
  }
};
