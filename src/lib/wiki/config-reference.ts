export type ConfigOption = {
  option: string;
  type: string;
  defaultValue: string;
  notes: string;
  addedIn?: string;
  removedIn?: string;
};

export type ConfigSection = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  options: ConfigOption[];
  addedIn?: string;
  removedIn?: string;
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
      { option: "raise-on-click", type: "bool", defaultValue: "true", notes: "Raises clicked windows independently from focus mode. Hover focus does not imply raise.", addedIn: "0.3.0" },
      { option: "keyboard", type: "nested block", defaultValue: "see input.keyboard", notes: "Keyboard layout, model, variant, and option strings.", addedIn: "0.2.0" },
      { option: "gestures", type: "nested block", defaultValue: "see input.gestures", notes: "Touchpad gesture, touchscreen passthrough, pinch, swipe, and hold behavior.", addedIn: "0.5.0" },
      { option: "touchpad", type: "nested block", defaultValue: "see input.touchpad", notes: "Class-wide libinput touchpad settings. Omitted keys keep libinput defaults.", addedIn: "0.5.0" },
      { option: "mouse", type: "nested block", defaultValue: "see input.mouse", notes: "Class-wide libinput mouse/generic pointer settings. Omitted keys keep libinput defaults.", addedIn: "0.5.0" },
      { option: "devices", type: "nested block", defaultValue: "none", notes: "Per-device libinput overrides matched against libinput device names.", addedIn: "0.5.0" }
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
      { option: "model", type: "string", defaultValue: "", notes: "XKB keyboard model.", addedIn: "0.5.0" },
      { option: "variant", type: "string", defaultValue: "", notes: "XKB keyboard variant." },
      { option: "options", type: "string", defaultValue: "", notes: "XKB keyboard options such as compose:ralt." }
    ]
  },
  {
    slug: "input-gestures",
    name: "gestures",
    title: "Input Gestures",
    summary: "Touchpad gesture, touch passthrough, pinch, swipe, and hold behavior.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables compositor gesture handling." },
      { option: "client-passthrough", type: "bool", defaultValue: "true", notes: "Forwards touchpad gestures to clients through pointer gesture protocols when no compositor binding consumes them." },
      { option: "touch-passthrough", type: "bool", defaultValue: "true", notes: "Forwards touchscreen contacts to clients through wl_touch when appropriate." },
      { option: "pinch-to-zoom", type: "bool", defaultValue: "true", notes: "Maps compositor pinch gestures to field zoom." },
      { option: "pinch-scope", type: "string", defaultValue: "empty-field", notes: "Where compositor pinch zoom applies. Example value: empty-field." },
      { option: "compositor-scope", type: "string", defaultValue: "global", notes: "Where compositor gesture bindings are eligible. Example values include global and empty-field." },
      { option: "modifier", type: "modifier token", defaultValue: "$mod", notes: "Modifier token used by modifier-scoped gestures." },
      { option: "scroll-pan", type: "string", defaultValue: "empty-field", notes: "Where two-finger scroll pans the field." },
      { option: "swipe-threshold-px", type: "f32", defaultValue: "120", notes: "Swipe distance threshold before discrete swipe bindings commit." },
      { option: "pan-fingers", type: "u32", defaultValue: "3", notes: "Finger count used for continuous field panning." },
      { option: "pan-momentum", type: "bool", defaultValue: "true", notes: "Keeps gesture panning moving briefly after a flick." },
      { option: "pan-decay-rate", type: "f32", defaultValue: "6", notes: "Momentum decay rate for gesture panning." },
      { option: "flick-min-px-per-s", type: "f32", defaultValue: "200", notes: "Minimum velocity treated as a flick." },
      { option: "swipe-<dir>-<fingers>", type: "action string", defaultValue: "unset", notes: "Binds a swipe direction and finger count to a compositor action, such as swipe-up-4 \"apogee-open\"." },
      { option: "apogee-swipe-<dir>-<fingers>", type: "action string", defaultValue: "unset", notes: "Binds an Apogee-aware swipe, such as apogee-swipe-down-4 \"apogee-close\"." },
      { option: "hold-<fingers>", type: "action string", defaultValue: "unset", notes: "Binds a libinput hold gesture to an existing compositor gesture action.", addedIn: "0.5.0" }
    ]
  },
  {
    slug: "input-touchpad",
    name: "touchpad",
    title: "Touchpad",
    summary: "Class-wide libinput touchpad settings applied on device hotplug and config reload.",
    addedIn: "0.5.0",
    options: [
      { option: "tap", type: "bool", defaultValue: "libinput", notes: "Tap-to-click setting. Omit to keep libinput's own default." },
      { option: "natural-scroll", type: "bool", defaultValue: "libinput", notes: "Natural scrolling setting." },
      { option: "dwt", type: "bool", defaultValue: "libinput", notes: "Disable-while-typing setting." },
      { option: "accel-speed", type: "f32", defaultValue: "libinput", notes: "Pointer acceleration speed from -1.0 through 1.0." },
      { option: "accel-profile", type: "string", defaultValue: "libinput", notes: "Accepted values: adaptive, flat." },
      { option: "scroll-method", type: "string", defaultValue: "libinput", notes: "Accepted values: two-finger, edge, on-button-down, no-scroll." },
      { option: "click-method", type: "string", defaultValue: "libinput", notes: "Accepted values: clickfinger, button-areas." },
      { option: "tap-button-map", type: "string", defaultValue: "libinput", notes: "Tap button mapping, such as left-right-middle." },
      { option: "middle-emulation", type: "bool", defaultValue: "libinput", notes: "Middle-button emulation setting." },
      { option: "left-handed", type: "bool", defaultValue: "libinput", notes: "Left-handed button mapping setting." },
      { option: "disabled-on-external-mouse", type: "bool", defaultValue: "libinput", notes: "Disables the touchpad when an external mouse is present." },
      { option: "enabled", type: "bool", defaultValue: "libinput", notes: "Send-events on/off switch for the device class." }
    ]
  },
  {
    slug: "input-mouse",
    name: "mouse",
    title: "Mouse",
    summary: "Class-wide libinput mouse and generic pointer settings.",
    addedIn: "0.5.0",
    options: [
      { option: "natural-scroll", type: "bool", defaultValue: "libinput", notes: "Natural scrolling setting." },
      { option: "accel-speed", type: "f32", defaultValue: "libinput", notes: "Pointer acceleration speed from -1.0 through 1.0." },
      { option: "accel-profile", type: "string", defaultValue: "libinput", notes: "Accepted values: adaptive, flat." },
      { option: "middle-emulation", type: "bool", defaultValue: "libinput", notes: "Middle-button emulation setting." },
      { option: "left-handed", type: "bool", defaultValue: "libinput", notes: "Left-handed button mapping setting." },
      { option: "enabled", type: "bool", defaultValue: "libinput", notes: "Send-events on/off switch for the device class." }
    ]
  },
  {
    slug: "input-devices",
    name: "devices.<name>",
    title: "Input Device Overrides",
    summary: "Per-device libinput overrides layered on top of touchpad or mouse defaults.",
    addedIn: "0.5.0",
    options: [
      { option: "<device name>", type: "nested block", defaultValue: "none", notes: "Matches the name from libinput list-devices by exact, case-insensitive, or substring match." },
      { option: "<libinput option>", type: "same as touchpad/mouse", defaultValue: "inherited", notes: "Any supported touchpad or mouse option can be overridden field by field." }
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
    slug: "debug",
    name: "debug",
    title: "Debug",
    summary: "Optional compositor diagnostics for troubleshooting and tuning.",
    addedIn: "0.4.0",
    options: [
      { option: "overlay-fps", type: "bool", defaultValue: "false", notes: "Shows a small top-left FPS HUD for render diagnostics." },
      { option: "show-ring-when-resizing", type: "bool", defaultValue: "true", notes: "Controls whether focus-ring config-change previews stay visible while resizing or reloading focus-ring settings." }
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
    slug: "background",
    name: "background",
    title: "Background / Gesso",
    summary: "Compositor background renderer: solid fill, classic image, or spatial field shader.",
    addedIn: "0.5.0",
    options: [
      { option: "mode", type: "string", defaultValue: "field-shader", notes: "Background renderer. Accepted values: none, classic, field-shader. Alias section name: gesso." },
      { option: "shader", type: "string", defaultValue: "space", notes: "Field-shader source. space uses the builtin animated space shader; a path can load a custom fragment shader." },
      { option: "path", type: "string", defaultValue: "", notes: "Classic image path for mode classic. Empty means no image path is loaded." },
      { option: "fit", type: "string", defaultValue: "cover", notes: "Classic image fit mode. Accepted values: cover, contain, stretch." },
      { option: "colour", type: "hex color", defaultValue: "#181a26", notes: "Base color for builtin shaders. Alias: color." },
      { option: "accent-colour", type: "hex color", defaultValue: "#8fa8d8", notes: "Accent color for builtin shaders. Aliases: accent-color, accent_color." },
      { option: "intensity", type: "f32", defaultValue: "1.0", notes: "Overall brightness/intensity multiplier for shader and image backgrounds." },
      { option: "animated", type: "bool", defaultValue: "true", notes: "Keeps animated field shaders repainting for subtle twinkle and pulse motion." }
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
      { option: "pins", type: "nested block", defaultValue: "see field.pins", notes: "Pinned object badge styling and position.", addedIn: "0.3.0" },
      { option: "pan-to-new", type: "string", defaultValue: "if-needed", notes: "Controls how strongly the camera pans to newly opened windows. Accepted values: never, if-needed, always." },
      { option: "close-restore-focus", type: "bool", defaultValue: "true", notes: "Restores focus when a window closes." },
      { option: "close-restore-pan", type: "string", defaultValue: "if-offscreen", notes: "Controls camera pan restoration after close. Accepted values: never, if-offscreen, always." },
      { option: "zoom", type: "nested block", defaultValue: "see field.zoom", notes: "Field zoom settings." }
    ]
  },
  {
    slug: "field-pins",
    name: "field.pins",
    title: "Pins",
    summary: "Pinned object badge position, color, background, and scale.",
    addedIn: "0.3.0",
    options: [
      { option: "corner", type: "string", defaultValue: "top-right", notes: "Pin badge corner. Accepted values: top-left, top-right." },
      { option: "colour", type: "string", defaultValue: "auto", notes: "Pin glyph color. Accepted values: auto, light, dark, or a hex color." },
      { option: "background-colour", type: "string", defaultValue: "auto", notes: "Circular badge background color. Accepted values: auto, light, dark, or a hex color." },
      { option: "size", type: "f32", defaultValue: "1.0", notes: "Scale for the circular pin badge and glyph." }
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
    slug: "placement",
    name: "placement",
    title: "Placement",
    summary: "Initial expanded-window placement, landmark placement, and reveal behavior.",
    addedIn: "0.3.0",
    options: [
      { option: "expanded", type: "nested block", defaultValue: "see placement.expanded", notes: "Initial spawn placement for expanded windows." },
      { option: "landmarks", type: "nested block", defaultValue: "see placement.landmarks", notes: "Placement behavior for readable map objects such as nodes, cores, and collapsed clusters." },
      { option: "reveal", type: "nested block", defaultValue: "see placement.reveal", notes: "Post-placement camera reveal behavior." }
    ]
  },
  {
    slug: "placement-expanded",
    name: "placement.expanded",
    title: "Expanded Placement",
    summary: "Initial placement for newly opened expanded windows.",
    addedIn: "0.3.0",
    options: [
      { option: "strategy", type: "string", defaultValue: "center", notes: "Initial spawn strategy. Accepted values include center and find-empty." },
      { option: "fallback", type: "string", defaultValue: "center", notes: "Fallback strategy when the primary strategy cannot place a window." },
      { option: "find-empty-mode", type: "string", defaultValue: "best-effort", notes: "Find-empty behavior. Expanded windows are ignored as hard blockers because expanded overlap is normal in v0.3.0." }
    ]
  },
  {
    slug: "placement-landmarks",
    name: "placement.landmarks",
    title: "Landmark Placement",
    summary: "Placement behavior for collapsed readable objects on the field.",
    addedIn: "0.3.0",
    options: [
      { option: "strategy", type: "string", defaultValue: "nearest-free", notes: "Strategy for collapsed nodes, cluster cores, and landmarks." },
      { option: "normal-blocker", type: "string", defaultValue: "relocate", notes: "Behavior when an unpinned landmark blocks placement." },
      { option: "pinned-blocker", type: "string", defaultValue: "preserve", notes: "Behavior when a pinned landmark blocks placement." }
    ]
  },
  {
    slug: "placement-reveal",
    name: "placement.reveal",
    title: "Reveal Placement",
    summary: "Camera reveal behavior after window placement.",
    addedIn: "0.3.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables post-placement reveal panning." },
      { option: "max-pan-px", type: "f32", defaultValue: "360", notes: "Maximum reveal pan distance in pixels." },
      { option: "animation-ms", type: "u64", defaultValue: "180", notes: "Reveal pan animation duration." },
      { option: "pan-to-new", type: "string", defaultValue: "if-needed", notes: "Controls new-window reveal panning. Accepted values: never, if-needed, always." }
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
      { option: "opacity", type: "f32", defaultValue: "1.0", notes: "Node/core marker fill opacity from 0.0 through 1.0. The border ring and app icon stay fully opaque.", addedIn: "0.5.0" },
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
      { option: "show-pinned", type: "bool", defaultValue: "true", notes: "Shows pinned windows, nodes, and cores in Bearings.", addedIn: "0.3.0" },
      { option: "blur", type: "bool", defaultValue: "true", notes: "Allows bearing chips to draw frosted-glass backdrop blur when effects.blur permits overlays.", addedIn: "0.5.0" },
      { option: "fade-distance", type: "f32", defaultValue: "1200.0", notes: "Distance over which bearings fade." }
    ]
  },
  {
    slug: "aperture-peek",
    name: "aperture-peek",
    title: "Aperture Peek",
    summary: "Standalone Aperture clock panel styling used by the compositor reserve/peek integration.",
    addedIn: "0.3.0",
    options: [
      { option: "corner", type: "string", defaultValue: "top-right", notes: "Corner used for the floating clock panel." },
      { option: "background", type: "hex rgba", defaultValue: "#101014cc", notes: "Panel background color, including alpha." },
      { option: "radius-px", type: "u32", defaultValue: "24", notes: "Panel corner radius in pixels." },
      { option: "blur", type: "bool", defaultValue: "true", notes: "Allows the Aperture panel to draw frosted-glass backdrop blur when effects.blur permits layer-shell blur.", addedIn: "0.5.0" },
      { option: "clock", type: "nested block", defaultValue: "see aperture config", notes: "Clock font and colour settings." },
      { option: "clock-large", type: "nested block", defaultValue: "see aperture config", notes: "Normal floating clock size state." },
      { option: "clock-medium", type: "nested block", defaultValue: "see aperture config", notes: "Collapsed floating clock size state." },
      { option: "clock-small", type: "nested block", defaultValue: "see aperture config", notes: "Minimal reserved top-tab size state." }
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
    slug: "gamescope",
    name: "gamescope",
    title: "Gamescope",
    summary: "Defaults for launching selected games through gamescope from halleyctl.",
    addedIn: "0.4.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables gamescope wrapping for matching launches." },
      { option: "monitor", type: "string", defaultValue: "focused", notes: "Monitor selector used for automatic dimensions. Accepted values: focused, cursor, primary, or a connector name." },
      { option: "output-width", type: "u32 or auto", defaultValue: "auto", notes: "Gamescope output width. auto resolves from the selected monitor when possible." },
      { option: "output-height", type: "u32 or auto", defaultValue: "auto", notes: "Gamescope output height. auto resolves from the selected monitor when possible." },
      { option: "game-width", type: "u32 or auto", defaultValue: "auto", notes: "Internal game width passed to gamescope." },
      { option: "game-height", type: "u32 or auto", defaultValue: "auto", notes: "Internal game height passed to gamescope." },
      { option: "refresh", type: "u32 or auto", defaultValue: "auto", notes: "Refresh rate passed to gamescope when known." },
      { option: "fullscreen", type: "bool", defaultValue: "true", notes: "Launches gamescope fullscreen. Fullscreen wins if both fullscreen and borderless are true." },
      { option: "borderless", type: "bool", defaultValue: "false", notes: "Launches gamescope borderless when fullscreen is false." },
      { option: "suppress-overlays", type: "bool", defaultValue: "true", notes: "Suppresses Halley overlay reveals while a managed game holds pointer lock or confinement." },
      { option: "passthrough-pointer-lock", type: "bool", defaultValue: "true", notes: "Preserves game pointer lock behavior for wrapped launches." },
      { option: "bypass-spatial-camera", type: "bool", defaultValue: "true", notes: "Routes pointer input to gamescope-managed surfaces without spatial-camera remapping." },
      { option: "game", type: "nested block", defaultValue: "none", notes: "Repeated per-game profile block. Profiles match by app-id and inherit global defaults." }
    ]
  },
  {
    slug: "gamescope-game",
    name: "game",
    title: "Gamescope Game Profile",
    summary: "Per-game Gamescope overrides matched by app id.",
    addedIn: "0.4.0",
    options: [
      { option: "name", type: "string", defaultValue: "optional", notes: "Human-readable profile name." },
      { option: "app-id", type: "string", defaultValue: "required", notes: "Steam or app id matched by halleyctl gamescope run." },
      { option: "enabled", type: "bool", defaultValue: "inherited", notes: "Set false to opt a matching game out of wrapping." },
      { option: "monitor", type: "string", defaultValue: "inherited", notes: "Profile-specific monitor selector." },
      { option: "output-width", type: "u32 or auto", defaultValue: "inherited", notes: "Profile-specific gamescope output width." },
      { option: "output-height", type: "u32 or auto", defaultValue: "inherited", notes: "Profile-specific gamescope output height." },
      { option: "game-width", type: "u32 or auto", defaultValue: "inherited", notes: "Profile-specific internal game width." },
      { option: "game-height", type: "u32 or auto", defaultValue: "inherited", notes: "Profile-specific internal game height." },
      { option: "refresh", type: "u32 or auto", defaultValue: "inherited", notes: "Profile-specific refresh rate." },
      { option: "fullscreen", type: "bool", defaultValue: "inherited", notes: "Profile-specific fullscreen flag." },
      { option: "borderless", type: "bool", defaultValue: "inherited", notes: "Profile-specific borderless flag." }
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
      { option: "fullscreen", type: "nested block", defaultValue: "see animations.fullscreen", notes: "Fullscreen transition settings.", addedIn: "0.4.0" },
      { option: "window-open", type: "nested block", defaultValue: "see animations.window-open", notes: "Window open animation settings." },
      { option: "window-close", type: "nested block", defaultValue: "see animations.window-close", notes: "Window close animation settings." },
      { option: "tile", type: "nested block", defaultValue: "see animations.tile", notes: "Tile animation settings." },
      { option: "stack", type: "nested block", defaultValue: "see animations.stack", notes: "Stack animation settings." },
      { option: "cluster", type: "nested block", defaultValue: "see animations.cluster", notes: "Cluster workspace open and close animations for tiling and stacking layouts.", addedIn: "0.5.0" },
      { option: "raise", type: "nested block", defaultValue: "see animations.raise", notes: "Click/selection raise pulse settings.", addedIn: "0.3.0" }
    ]
  },
  {
    slug: "animations-maximize",
    name: "maximize",
    title: "Maximize Animation",
    summary: "Visual-only maximize transition timing.",
    addedIn: "0.2.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables visual maximize and unmaximize transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "240", notes: "Maximize animation duration. The animation only tweens the presented rect; field geometry stays unchanged in v0.3.0." }
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
    slug: "animations-fullscreen",
    name: "fullscreen",
    title: "Fullscreen Animation",
    summary: "Visual transition into compositor-managed fullscreen.",
    addedIn: "0.4.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables visual fullscreen transitions." },
      { option: "duration-ms", type: "u64", defaultValue: "240", notes: "Fullscreen animation duration." }
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
      { option: "style", type: "string", defaultValue: "shrink", notes: "Close animation style. Accepted values: shrink, fade. fade is available in v0.3.0 and newer." }
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
    slug: "animations-raise",
    name: "raise",
    title: "Raise Animation",
    summary: "Pulse animation used when a window is explicitly raised.",
    addedIn: "0.3.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables the raise pulse animation." },
      { option: "duration-ms", type: "u64", defaultValue: "140", notes: "Raise pulse duration." },
      { option: "trigger", type: "string", defaultValue: "overlap", notes: "Controls when raise animation triggers. Accepted values: overlap, always.", addedIn: "0.5.0" },
      { option: "scale", type: "f32", defaultValue: "1.025", notes: "Peak scale multiplier for the raised window." },
      { option: "shadow-boost", type: "f32", defaultValue: "0.18", notes: "Temporary shadow boost during the raise pulse." }
    ]
  },
  {
    slug: "animations-cluster",
    name: "cluster",
    title: "Cluster Animation",
    summary: "Cluster workspace open and close animations for tiling and stacking layouts.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables cluster workspace open and close animations." },
      { option: "tiling", type: "nested block", defaultValue: "see animations.cluster.tiling", notes: "Tiling layout open cascade and close suck-into-core timing." },
      { option: "stacking", type: "nested block", defaultValue: "see animations.cluster.stacking", notes: "Stacking layout card grow-in and close suck-into-core timing." }
    ]
  },
  {
    slug: "animations-cluster-tiling",
    name: "cluster.tiling",
    title: "Cluster Tiling Animation",
    summary: "Tiling cluster workspace open cascade, per-member stagger, and close timing.",
    addedIn: "0.5.0",
    options: [
      { option: "open-duration-ms", type: "u64", defaultValue: "300", notes: "Open animation duration. Members cascade in from the left." },
      { option: "stagger-ms", type: "u64", defaultValue: "55", notes: "Per-member open delay, slaves first and master last. 0 opens members together." },
      { option: "close-duration-ms", type: "u64", defaultValue: "420", notes: "Close animation duration. Members shrink and fade into the core node." }
    ]
  },
  {
    slug: "animations-cluster-stacking",
    name: "cluster.stacking",
    title: "Cluster Stacking Animation",
    summary: "Stacking cluster workspace card grow-in and close timing.",
    addedIn: "0.5.0",
    options: [
      { option: "open-duration-ms", type: "u64", defaultValue: "240", notes: "Open card grow-in animation duration." },
      { option: "close-duration-ms", type: "u64", defaultValue: "360", notes: "Close animation duration. Cards shrink and fade into the core node." }
    ]
  },
  {
    slug: "effects",
    name: "effects",
    title: "Effects",
    summary: "Renderer-level visual effects such as backdrop blur and compositor shadows.",
    addedIn: "0.5.0",
    options: [
      { option: "blur", type: "nested block", defaultValue: "see effects.blur", notes: "Backdrop blur policy for overlays, windows, and layer-shell surfaces." },
      { option: "shadows", type: "nested block", defaultValue: "see effects.shadows", notes: "Window, node, and overlay shadows. This replaces decorations.shadows." }
    ]
  },
  {
    slug: "effects-blur",
    name: "blur",
    title: "Backdrop Blur",
    summary: "Global and per-surface-class backdrop blur policy.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "false", notes: "Master switch. When false, no backdrop blur is computed anywhere." },
      { option: "overlays", type: "bool", defaultValue: "true", notes: "Allows compositor-owned overlays to use blur when they opt in." },
      { option: "windows", type: "string", defaultValue: "auto", notes: "Client window blur policy. Accepted values: off, auto, always. Rule-level blur true can opt a window in; rule-level blur false always wins." },
      { option: "layer-shell", type: "string", defaultValue: "off", notes: "Layer-shell blur policy for bars, launchers, notifications, and their popups. Accepted values: off, auto, always." },
      { option: "method", type: "string", defaultValue: "dual-kawase", notes: "Blur algorithm. dual-kawase is the shipped fast downsampled blur path." },
      { option: "radius", type: "u32", defaultValue: "24", notes: "Blur radius." },
      { option: "passes", type: "u32", defaultValue: "3", notes: "Number of blur passes." },
      { option: "saturation", type: "f32", defaultValue: "1.10", notes: "Backdrop saturation multiplier for frosted-glass surfaces." },
      { option: "noise", type: "f32", defaultValue: "0.012", notes: "Subtle noise amount for frosted-glass surfaces." }
    ]
  },
  {
    slug: "effects-shadows-window",
    name: "shadows.window",
    title: "Window Shadow",
    summary: "Shadow layer used by windows.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables window shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "8", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "0", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "5", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#05030530", notes: "Shadow color, including alpha." }
    ]
  },
  {
    slug: "effects-shadows-node",
    name: "shadows.node",
    title: "Node Shadow",
    summary: "Shadow layer used by collapsed nodes and cores.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables node shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "14", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "0", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "3", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#05030524", notes: "Shadow color, including alpha." }
    ]
  },
  {
    slug: "effects-shadows-overlay",
    name: "shadows.overlay",
    title: "Overlay Shadow",
    summary: "Shadow layer used by overlay containers.",
    addedIn: "0.5.0",
    options: [
      { option: "enabled", type: "bool", defaultValue: "true", notes: "Enables overlay shadows." },
      { option: "blur-radius", type: "f32", defaultValue: "24", notes: "Shadow blur radius." },
      { option: "spread", type: "f32", defaultValue: "1", notes: "Shadow spread." },
      { option: "offset-x", type: "f32", defaultValue: "0", notes: "Horizontal shadow offset." },
      { option: "offset-y", type: "f32", defaultValue: "7", notes: "Vertical shadow offset." },
      { option: "colour", type: "hex rgba", defaultValue: "#05030538", notes: "Shadow color, including alpha." }
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
      { option: "shadows", type: "nested block", defaultValue: "see decorations.shadows", notes: "Window, node, and overlay shadow layers. Moved to effects.shadows in v0.5.0.", addedIn: "0.2.0", removedIn: "0.5.0" },
      { option: "resize-using-border", type: "bool", defaultValue: "true", notes: "Lets border hit areas drive resize interactions." }
    ]
  },
  {
    slug: "decorations-shadows-window",
    name: "shadows.window",
    title: "Window Shadow",
    summary: "Shadow layer used by windows.",
    addedIn: "0.2.0",
    removedIn: "0.5.0",
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
    removedIn: "0.5.0",
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
    removedIn: "0.5.0",
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
      { option: "error-colour", type: "string", defaultValue: "#fb4934", notes: "Accent color used by startup and config reload error overlays.", addedIn: "0.3.0" },
      { option: "shape", type: "string", defaultValue: "square", notes: "Overlay shape style. Accepted values: square, rounded." },
      { option: "blur", type: "bool", defaultValue: "true", notes: "Allows compositor overlays that support blur to opt into effects.blur.overlays.", addedIn: "0.5.0" },
      { option: "borders", type: "bool", defaultValue: "true", notes: "Enables overlay borders." },
      { option: "border-source", type: "string", defaultValue: "primary", notes: "Border palette source. Accepted values: primary, secondary." }
    ]
  },
  {
    slug: "keybinds",
    name: "keybinds",
    title: "Keybinds",
    summary: "Modifier token and chord-to-action mappings. The 0.4.0 example mirrors the shipped fresh-config defaults.",
    options: [
      { option: "mod", type: "modifier token", defaultValue: "super", notes: "Base modifier token used by $var.mod and $mod." },
      { option: "<chord>", type: "action string", defaultValue: "fresh-config bindings", notes: "Any additional entry maps a chord such as $var.mod+return, alt+tab, or $var.mod+1 to an action string. v0.2.0 adds defaults for maximize-focused, cycle-focus, cycle-focus-backward, and cluster slot 1 through 10; v0.3.0 adds toggle-focused-pin; v0.4.0 adds toggle-fullscreen." }
    ]
  },
  {
    slug: "keybinds-actions",
    name: "action keywords",
    title: "Built-in Keybind Actions",
    summary: "Action strings parsed by Halley before falling back to launching a command.",
    addedIn: "0.4.0",
    options: [
      { option: "reload", type: "global action", defaultValue: "builtin", notes: "Reloads the active config." },
      { option: "open-terminal", type: "global action", defaultValue: "builtin", notes: "Opens the first supported Wayland terminal found in PATH. Alias: open_terminal." },
      { option: "toggle-state", type: "global action", defaultValue: "builtin", notes: "Toggles the focused window state. Aliases: toggle_state, minimize-focused, minimize_focused." },
      { option: "maximize-focused", type: "field action", defaultValue: "builtin", notes: "Toggles monitor-local maximize for the focused field window. Aliases: maximize_focused, toggle-maximize, toggle_maximize." },
      { option: "toggle-fullscreen", type: "field action", defaultValue: "builtin", notes: "Toggles compositor-initiated fullscreen for the focused window. Aliases: toggle_fullscreen, fullscreen." },
      { option: "toggle-focused-pin", type: "field action", defaultValue: "builtin", notes: "Pins or unpins the focused window. Aliases: toggle-pin, toggle_pin, pin-toggle, pin_toggle, toggle_focused_pin." },
      { option: "close-focused", type: "global action", defaultValue: "builtin", notes: "Closes the focused window. Aliases: close_focused, close-window, close_window." },
      { option: "quit", type: "global action", defaultValue: "builtin", notes: "Quits Halley. The default binding includes Shift." },
      { option: "zoom-in", type: "global action", defaultValue: "builtin", notes: "Zooms the field camera in. Alias: zoom_in." },
      { option: "zoom-out", type: "global action", defaultValue: "builtin", notes: "Zooms the field camera out. Alias: zoom_out." },
      { option: "zoom-reset", type: "global action", defaultValue: "builtin", notes: "Resets field zoom. Alias: zoom_reset." },
      { option: "node-move <dir>", type: "field action", defaultValue: "builtin", notes: "Moves the selected/latest field node. Directions: left, right, up, down. Legacy aliases: move-left, move-right, move-up, move-down." },
      { option: "monitor-focus <dir|output>", type: "global action", defaultValue: "builtin", notes: "Focuses a monitor by direction or output name. Directions: left, right, up, down. Alias: monitor_focus." },
      { option: "cluster-mode", type: "global action", defaultValue: "builtin", notes: "Enters cluster mode. Alias: cluster_mode." },
      { option: "cluster-layout cycle", type: "cluster action", defaultValue: "builtin", notes: "Cycles cluster layout. Accepted forms include cluster layout cycle and cluster_layout cycle." },
      { option: "cluster slot <1-10>", type: "global action", defaultValue: "builtin", notes: "Activates a per-monitor cluster slot. Accepted forms include cluster-slot N and cluster_slot N." },
      { option: "cycle-focus", type: "global action", defaultValue: "builtin", notes: "Cycles focus forward. Aliases: cycle_focus, focus-cycle, focus_cycle." },
      { option: "cycle-focus-backward", type: "global action", defaultValue: "builtin", notes: "Cycles focus backward. Aliases: cycle_focus_backward, focus-cycle-backward, focus_cycle_backward." },
      { option: "bearings-show", type: "global action", defaultValue: "builtin", notes: "Shows bearings while the binding is active. Alias: bearings_show." },
      { option: "bearings-toggle", type: "global action", defaultValue: "builtin", notes: "Toggles persistent bearings. Alias: bearings_toggle." },
      { option: "trail-prev", type: "global action", defaultValue: "builtin", notes: "Moves to the previous trail entry. Aliases: trail_prev, trail prev." },
      { option: "trail-next", type: "global action", defaultValue: "builtin", notes: "Moves to the next trail entry. Aliases: trail_next, trail next." },
      { option: "tile-focus <dir>", type: "tile action", defaultValue: "builtin", notes: "Focuses a tile in the given direction. Alias forms: tile_focus <dir>, tile focus <dir>." },
      { option: "tile-swap <dir>", type: "tile action", defaultValue: "builtin", notes: "Swaps a tile in the given direction. Alias forms: tile_swap <dir>, tile swap <dir>." },
      { option: "stack-cycle <dir>", type: "stack action", defaultValue: "builtin", notes: "Cycles a stack. Directions: forward, next, backward, back, prev, previous. Alias: stack_cycle." },
      { option: "move-window", type: "pointer action", defaultValue: "builtin", notes: "Moves a window when used with a pointer button chord. Alias: move_window." },
      { option: "resize-window", type: "pointer action", defaultValue: "builtin", notes: "Resizes a window when used with a pointer button chord. Alias: resize_window." },
      { option: "pan-field", type: "pointer action", defaultValue: "builtin", notes: "Pans the field when used with a pointer button chord. Aliases: pan_field, drag-pan, drag_pan, field-jump, field_jump." },
      { option: "<command>", type: "launch command", defaultValue: "fallback", notes: "Any unrecognized action string is treated as a command to launch, so fuzzel, halleyctl capture menu, wpctl commands, and spawn-style shell commands are valid." }
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
      { option: "opacity", type: "f32", defaultValue: "1.0", notes: "Matched opacity from 0.0 through 1.0. Translucent windows block direct scanout.", addedIn: "0.4.0" },
      { option: "blur", type: "bool", defaultValue: "unset", notes: "Per-rule backdrop blur override. false always disables blur; true opts a window in even when effects.blur.windows is off or auto.", addedIn: "0.5.0" },
      { option: "width", type: "u32", defaultValue: "unset", notes: "Optional fixed initial width for matching windows.", addedIn: "0.4.0" },
      { option: "height", type: "u32", defaultValue: "unset", notes: "Optional fixed initial height for matching windows.", addedIn: "0.4.0" },
      { option: "overlap-policy", type: "string", defaultValue: "deprecated", notes: "Deprecated no-op in v0.3.0. Expanded windows can overlap normally; use spawn-placement for initial position and cluster-participation \"float\" for floating dialogs." },
      { option: "spawn-placement", type: "string", defaultValue: "placement.expanded.strategy", notes: "Initial placement strategy for matching windows. Accepted values include center, viewport-center, cursor, app, and find-empty." },
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
  background: `background:
  mode "field-shader"
  shader "space"
  path ""
  fit "cover"
  colour "#181a26"
  accent-colour "#8fa8d8"
  intensity 1.0
  animated true
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
  raise-on-click true
  keyboard:
    layout "us"
    variant ""
    options ""
    model ""
  end

  gestures:
    enabled true
    client-passthrough true
    touch-passthrough true
    pinch-to-zoom true
    pinch-scope "empty-field"
    compositor-scope "global"
    modifier "$mod"
    scroll-pan "empty-field"
    swipe-threshold-px 120
    pan-fingers 3
    pan-momentum true
    pan-decay-rate 6
    flick-min-px-per-s 200
    swipe-up-4 "apogee-open"
    apogee-swipe-down-4 "apogee-close"
  end

  touchpad:
    tap true
    natural-scroll true
    dwt true
    accel-speed 0.3
    accel-profile "adaptive"
    scroll-method "two-finger"
    click-method "clickfinger"
    tap-button-map "left-right-middle"
    middle-emulation false
    left-handed false
    disabled-on-external-mouse false
    enabled true
  end

  mouse:
    natural-scroll false
    accel-speed 0.0
    accel-profile "flat"
    middle-emulation false
    left-handed false
    enabled true
  end

  devices:
    "Logitech MX Master 3":
      accel-speed 0.6
      natural-scroll true
    end
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
  debug: `debug:
  overlay-fps false
  show-ring-when-resizing true
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

  pins:
    corner "top-right"
    colour "auto"
    background-colour "auto"
    size 1.0
  end

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
  placement: `placement:
  expanded:
    strategy "center"
    fallback "center"
    find-empty-mode "best-effort"
  end

  landmarks:
    strategy "nearest-free"
    normal-blocker "relocate"
    pinned-blocker "preserve"
  end

  reveal:
    enabled true
    max-pan-px 360
    animation-ms 180
    pan-to-new "if-needed"
  end
end`,
  node: `node:
  show-labels "hover"
  show-app-icons "always"
  node-shape "square"
  node-label-shape "square"
  icon-size 0.72
  opacity 1.0
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
  show-pinned true
  blur true
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
  "aperture-peek": `aperture-peek:
  corner "top-right"
  background "#101014cc"
  radius-px 24
  blur true

  clock:
    font "CommitMono Nerd Font Bold"
    colour "#e8a1a7"
  end

  clock-large:
    size-px 80
  end

  clock-medium:
    size-px 44
  end

  clock-small:
    size-px 26
    height-px 32
  end
end`,
  gamescope: `gamescope:
  enabled true
  monitor "focused"
  output-width "auto"
  output-height "auto"
  game-width "auto"
  game-height "auto"
  refresh "auto"
  fullscreen true
  borderless false
  suppress-overlays true
  passthrough-pointer-lock true
  bypass-spatial-camera true

  game:
    name "Example Game"
    app-id "steam_app_123456"
    enabled true
  end
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

  fullscreen:
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

  cluster:
    enabled true

    tiling:
      open-duration-ms 300
      stagger-ms 55
      close-duration-ms 420
    end

    stacking:
      open-duration-ms 240
      close-duration-ms 360
    end
  end

  raise:
    enabled true
    duration-ms 140
    trigger "overlap"
    scale 1.025
    shadow-boost 0.18
  end
end`,
  effects: `effects:
  blur:
    enabled false
    overlays true
    windows "auto"
    layer-shell "off"
    method "dual-kawase"
    radius 24
    passes 3
    saturation 1.10
    noise 0.012
  end

  shadows:
    window:
      enabled true
      blur-radius 8
      spread 0
      offset-x 0
      offset-y 5
      colour "#05030530"
    end

    node:
      enabled true
      blur-radius 14
      spread 0
      offset-x 0
      offset-y 3
      colour "#05030524"
    end

    overlay:
      enabled true
      blur-radius 24
      spread 1
      offset-x 0
      offset-y 7
      colour "#05030538"
    end
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

  resize-using-border true
end`,
overlays: `overlays:
  background-colour "auto"
  text-colour "auto"
  error-colour "#fb4934"
  shape "square"
  blur true
  borders true
  border-source "primary"
end`,
  keybinds: `keybinds:
  mod "super"

  # Basic compositor controls.
  "$var.mod+shift+r" "reload"
  "$var.mod+n" "toggle-state"
  "$var.mod+m" "maximize-focused"
  "$var.mod+f" "toggle-fullscreen"
  "$var.mod+p" "toggle-focused-pin"
  "$var.mod+q" "close-focused"

  # Zoom controls for the field camera.
  "$var.mod+mousewheelup" "zoom-in"
  "$var.mod+mousewheeldown" "zoom-out"
  "$var.mod+middlemouse" "zoom-reset"

  "$var.mod+shift+e" "quit"

  # Move the selected/latest node in the field.
  "$var.mod+left" "node-move left"
  "$var.mod+right" "node-move right"
  "$var.mod+up" "node-move up"
  "$var.mod+down" "node-move down"

  # Switch active monitor focus.
  "$var.mod+shift+left" "monitor-focus left"
  "$var.mod+shift+right" "monitor-focus right"
  "$var.mod+shift+up" "monitor-focus up"
  "$var.mod+shift+down" "monitor-focus down"

  # Cluster controls.
  "$var.mod+shift+c" "cluster-mode"
  "$var.mod+l" "cluster-layout cycle"
  "$var.mod+1" "cluster slot 1"
  "$var.mod+2" "cluster slot 2"
  "$var.mod+3" "cluster slot 3"
  "$var.mod+4" "cluster slot 4"
  "$var.mod+5" "cluster slot 5"
  "$var.mod+6" "cluster slot 6"
  "$var.mod+7" "cluster slot 7"
  "$var.mod+8" "cluster slot 8"
  "$var.mod+9" "cluster slot 9"
  "$var.mod+0" "cluster slot 10"

  # Bearings controls.
  "$var.mod+z" "bearings-show"
  "$var.mod+shift+z" "bearings-toggle"

  # Trail navigation.
  "$var.mod+," "trail-prev"
  "$var.mod+." "trail-next"

  # Focus cycling.
  "alt+tab" "cycle-focus"
  "alt+shift+tab" "cycle-focus-backward"

  # Applications.
  "$var.mod+return" "open-terminal"
  "$var.mod+d" "fuzzel"

  # Mouse actions.
  "$var.mod+leftmouse" "move-window"
  "$var.mod+rightmouse" "resize-window"
  "$var.mod+shift+leftmouse" "pan-field"

  # Tile layout controls.
  "$var.mod+left" "tile-focus left"
  "$var.mod+right" "tile-focus right"
  "$var.mod+up" "tile-focus up"
  "$var.mod+down" "tile-focus down"

  "$var.mod+ctrl+left" "tile-swap left"
  "$var.mod+ctrl+right" "tile-swap right"
  "$var.mod+ctrl+up" "tile-swap up"
  "$var.mod+ctrl+down" "tile-swap down"

  # Stacking layout controls.
  "$var.mod+left" "stack-cycle forward"
  "$var.mod+right" "stack-cycle backward"

  # Screenshot UI.
  "$var.mod+shift+s" "halleyctl capture menu"

  # Media keys.
  "XF86AudioRaiseVolume" "wpctl set-volume -l 1 @default_audio_sink@ 5%+"
  "XF86AudioLowerVolume" "wpctl set-volume @default_audio_sink@ 5%-"
  "XF86AudioMute" "wpctl set-mute @default_audio_sink@ toggle"
end`,
  rules: `rules:
  rule:
    app-id "firefox"
    title [r"File Upload.*", r"Open File.*"]
    opacity 0.96
    blur true
    width 720
    height 520
    spawn-placement "center"
    cluster-participation "float"
  end
end`,
  "rules-rule": `rules:
  rule:
    app-id "firefox"
    opacity 1.0
    blur false
    spawn-placement "center"
    cluster-participation "layout"
  end
end`
};

const configExamplesV04: Partial<Record<string, string>> = {
  input: `input:
  repeat-rate 30
  repeat-delay 500
  focus-mode "click"
  raise-on-click true
  keyboard:
    layout "us"
    variant ""
    options ""
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
  bearings: `bearings:
  show-distance true
  show-icons true
  show-pinned true
  fade-distance 1200
end`,
  "aperture-peek": `aperture-peek:
  corner "top-right"
  background "#101014cc"
  radius-px 24

  clock:
    font "CommitMono Nerd Font Bold"
    colour "#e8a1a7"
  end

  clock-large:
    size-px 80
  end

  clock-medium:
    size-px 44
  end

  clock-small:
    size-px 26
    height-px 32
  end
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

  fullscreen:
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

  raise:
    enabled true
    duration-ms 140
    scale 1.025
    shadow-boost 0.18
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
  error-colour "#fb4934"
  shape "square"
  borders true
  border-source "primary"
end`,
  rules: `rules:
  rule:
    app-id "firefox"
    title [r"File Upload.*", r"Open File.*"]
    opacity 0.96
    width 720
    height 520
    spawn-placement "center"
    cluster-participation "float"
  end
end`,
  "rules-rule": `rules:
  rule:
    app-id "firefox"
    opacity 1.0
    spawn-placement "center"
    cluster-participation "layout"
  end
end`
};

const configExamplesV03: Partial<Record<string, string>> = {
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

  raise:
    enabled true
    duration-ms 140
    scale 1.025
    shadow-boost 0.18
  end
end`,
  keybinds: `keybinds:
  mod "super"
  "$var.mod+m" "maximize-focused"
  "$var.mod+p" "toggle-focused-pin"
  "$var.mod+1" "cluster slot 1"
  "alt+tab" "cycle-focus"
  "alt+shift+tab" "cycle-focus-backward"
  "$var.mod+return" "spawn ghostty"
end`,
  rules: `rules:
  rule:
    app-id "firefox"
    title [r"File Upload.*", r"Open File.*"]
    spawn-placement "center"
    cluster-participation "float"
  end
end`,
  "rules-rule": `rules:
  rule:
    app-id "firefox"
    spawn-placement "center"
    cluster-participation "layout"
  end
end`
};

const configExamplesV02: Partial<Record<string, string>> = {
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
  bearings: `bearings:
  show-distance true
  show-icons true
  fade-distance 1200
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
    slug: "field",
    title: "Field",
    summary: "Field spacing, active-window limits, pinned badge styling, close restore, and zoom settings.",
    sectionSlugs: ["field", "field-pins", "field-zoom"]
  },
  {
    slug: "placement",
    title: "Placement",
    summary: "Expanded window spawn placement, landmark blocker handling, and reveal panning.",
    sectionSlugs: ["placement", "placement-expanded", "placement-landmarks", "placement-reveal"]
  },
  {
    slug: "input",
    title: "Input",
    summary: "Keyboard repeat behavior, focus policy, keyboard layout, gestures, and libinput device settings.",
    sectionSlugs: ["input", "input-keyboard", "input-gestures", "input-touchpad", "input-mouse", "input-devices"]
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
      "animations-fullscreen",
      "animations-window-open",
      "animations-window-close",
      "animations-tile",
      "animations-stack",
      "animations-cluster",
      "animations-cluster-tiling",
      "animations-cluster-stacking",
      "animations-raise"
    ]
  },
  {
    slug: "effects",
    title: "Effects",
    summary: "Backdrop blur policy and renderer-level shadow settings.",
    sectionSlugs: ["effects", "effects-blur", "effects-shadows-window", "effects-shadows-node", "effects-shadows-overlay"]
  },
  {
    slug: "decorations",
    title: "Decorations",
    summary: "Primary and secondary borders plus border-driven resize behavior.",
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
    slug: "keybinds",
    title: "Keybinds",
    summary: "Fresh-config keybind defaults, chord mapping syntax, and built-in action keywords.",
    sectionSlugs: ["keybinds", "keybinds-actions"]
  },
  {
    slug: "rules",
    title: "Rules",
    summary: "Window rule blocks and individual matching/placement policy options.",
    sectionSlugs: ["rules", "rules-rule"]
  },
  {
    slug: "gamescope",
    title: "Gamescope",
    summary: "Gamescope launch defaults and per-game profile overrides.",
    sectionSlugs: ["gamescope", "gamescope-game"]
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

const availableInVersion = (item: { addedIn?: string; removedIn?: string }, version: string) =>
  (!item.addedIn || version >= item.addedIn) && (!item.removedIn || version < item.removedIn);

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
  if (version >= "0.5.0") {
    return configExamples[slug] ?? `${slug}:
end`;
  }

  if (version >= "0.4.0") {
    return configExamplesV04[slug] ?? configExamples[slug] ?? `${slug}:
end`;
  }

  if (version >= "0.3.0") {
    return configExamplesV03[slug] ?? configExamplesV04[slug] ?? configExamples[slug] ?? `${slug}:
end`;
  }

  if (version >= "0.2.0") {
    return configExamplesV02[slug] ?? configExamplesV04[slug] ?? configExamples[slug] ?? `${slug}:
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
