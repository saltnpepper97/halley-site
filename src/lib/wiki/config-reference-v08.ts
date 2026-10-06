import type { ConfigPage, ConfigOption } from "$lib/wiki/config-reference";
const option = (option: string, type: string, defaultValue: string, notes: string): ConfigOption =>
  ({ option, type, defaultValue, notes, addedIn: "0.8.0" });
export const configExamplesV08: Record<string, string> = {
  "autostart": "autostart:\n\nend",
  "view": "view:\n  output:\n    name \"DP-1\"\n\n    focus-ring:\n      radius-x 820.0\n      radius-y 420.0\n      offset-x 0.0\n      offset-y 0.0\n    end\n  end\n\n  output:\n    name \"DP-2\"\n    focus-ring:\n      radius-x 820.0\n      radius-y 420.0\n      offset-x 0.0\n      offset-y 0.0\n    end\n  end\nend",
  "input": "input:\n  repeat-rate 30\n  repeat-delay 500\n\n  focus-mode \"click\"\n\n  raise-on-click true\n\n  keyboard:\n    layout \"us\"\n    variant \"\"\n    options \"\"\n    model \"\"\n  end\n\n  gestures:\n    enabled true\n\n    client-passthrough true\n    touch-passthrough true\n\n    pinch-to-zoom true\n    pinch-scope \"empty-field\"      # \"empty-field\" or \"global\"\n    compositor-scope \"empty-field\" # camera pan and ordinary action gestures\n    modifier \"mod\"                 # keybind Mod; also \"off\" or an exact modifier\n\n    scroll-pan \"empty-field\"\n\n    pan-fingers 3\n    pan-momentum true\n    pan-decay-rate 6.0\n    flick-min-px-per-s 200.0\n\n    swipe-threshold-px 120.0\n    swipe-up-4 \"apogee-open\"\n    apogee-swipe-down-4 \"apogee-close\"\n  end\n\n  touchpad:\n  end\n\n  mouse:\n  end\n\n  trackpoint:\n  end\n\n  trackball:\n  end\n\n  touchscreen:\n  end\n\nend",
  "cursor": "cursor:\n  theme \"default\"\n\n  size 24\n\n  disable-hardware-cursor false\n\n  hide-when-typing false\n\n  hide-on-keyboard-nav true\n\n  hide-on-touch true\n\n  hide-after-ms 2000\nend",
  "decorations": "decorations:\n  border:\n    size 3\n\n    radius 8\n\n    colour-focused \"#f4f5f7\"\n    colour-unfocused \"#474d59\"\n  end\n\n  resize-using-border true\n\n  titlebars:\n    enabled true\n    button-position \"right\"\n    title-position \"center\"\n    show-buttons true\n    show-icons false\n    show-title true\n    radius 8\n    height 32\n\n    colour-focused \"#d65d26\"\n    colour-unfocused \"#474d59\"\n    foreground-colour-focused \"#101418\"\n    foreground-colour-unfocused \"#f4f5f7\"\n    button-hover-colour \"#ffffff\"\n    button-pressed-colour \"#101418\"\n  end\nend",
  "screenshot": "screenshot:\n  directory \"$env.HOME/Pictures/Screenshots/\"\nend",
  "font": "font:\n  family \"monospace\"\n  size 11\nend",
  "overlays": "overlays:\n  background-colour \"auto\"\n  text-colour \"auto\"\n  error-colour \"#fb4934\"\n  border-colour \"#d65d26\"\n  radius 8\n  borders true\n  border-size 3\n\n  notifications:\n    position \"top-center\"\n    offset-x 0\n    offset-y 0\n    success-duration-ms 4000\n    error-duration-ms 9000\n  end\n\n  zoom-indicator:\n    enabled true\n    position \"bottom-center\"\n    hold-duration-ms 750\n    fade-duration-ms 180\n    background true\n    opacity 1.0\n\n  end\nend",
  "effects": "effects:\n  blur:\n    overlays true\n\n    method \"dual-kawase\"\n    radius 24\n    passes 3\n\n    saturation 1.10\n    noise 0.012\n  end\n\n  shadows:\n    window:\n      enabled true\n      blur-radius 8\n      spread 0\n      offset-x 0\n      offset-y 5\n      colour \"#05030530\"\n    end\n\n    node:\n      enabled true\n      blur-radius 14\n      spread 0\n      offset-x 0\n      offset-y 3\n      colour \"#05030524\"\n    end\n\n    overlay:\n      enabled true\n      blur-radius 24\n      spread 1\n      offset-x 0\n      offset-y 7\n      colour \"#05030538\"\n    end\n  end\nend",
  "wallpaper": "wallpaper:\n  mode \"none\" # no wallpaper; also \"classic\" or \"field-shader\"\n\nend",
  "rules": "rules:\nend",
  "bearings": "bearings:\n  show-distance true\n  show-icons true\n  show-pinned true\n  fade-distance 1200.0\n\n  blur true\nend",
  "decay": "decay:\n  enabled true\n  outside-delay-seconds 600\n  inside-delay-seconds 5400\nend",
  "field": "field:\n  gap 20.0\n\n  pins:\n    corner \"top-right\"\n    colour \"#d65d26\"\n    background-colour \"auto\"\n    size 1.0\n  end\n\n  close-restore-focus true\n\n  close-restore-nodes false\n\n  close-restore-pan \"if-offscreen\"\n\n  zoom:\n    enabled true\n    min 0.35\n    step 1.10\n    smooth-rate 12.5\n  end\nend",
  "physics": "physics:\n  enabled true\n  damping 0.45\nend",
  "placement": "placement:\n  landmarks:\n    strategy \"nearest-free\"\n    normal-blocker \"relocate\"\n  end\nend",
  "node": "node:\n  show-labels \"hover\"\n  show-app-icons \"always\"\n  shape \"squircle\"\n  label-shape \"squircle\"\n  icon-size 0.72\n  opacity 1.0\n  background-colour \"auto\"\n  border-colour \"#474d59\"\n  border-colour-highlighted \"#d65d26\"\n\n  click-collapsed-pan \"never\"\nend",
  "debug": "debug:\n  show-focus-ring false\n\n  overlay-fps false\nend",
  "clusters": "clusters:\n  default-layout \"stacking\"\n\n  join-dwell-ms 2000\n\n  show-icons true\n\n  bloom-direction \"clockwise\"\n\n  tiling:\n    new-on-top false\n\n    gaps-inner 20.0\n    gaps-outer 20.0\n\n    max-stack 4\n    overflow-show-icons true\n  end\n\n  stacking:\n    max-visible 5\n  end\nend",
  "apogee": "apogee:\n  enabled true\n  live-previews true\n  preview-max-fps 30\n  transition-ms 320\n  gap 24.0\n  max-rows 3\n  background-dim 0.85\nend",
  "trail": "trail:\n  history-length 32\n  wrap true\nend",
  "animations": "animations:\n  enabled true\n\n  smooth-resize:\n    enabled true\n    duration-ms 90\n  end\n\n  window-open:\n    enabled true\n\n    type \"center-out\"\n\n    duration-ms 300\n    curve \"linear\"\n\n  end\n\n  window-close:\n    enabled true\n\n    type \"shrink\"\n\n    duration-ms 270\n  end\n\n  fullscreen:\n    enabled true\n\n    motion \"spring\"\n\n    damping-ratio 1.0\n\n    stiffness 800.0\n\n  end\n\n  maximize:\n    enabled true\n\n    motion \"easing\"\n    duration-ms 240\n    curve \"ease-in-out-cubic\"\n\n  end\n\n  arrange:\n    enabled true\n    motion \"easing\"\n    duration-ms 360\n    curve \"ease-in-out-cubic\"\n\n  end\n\n  node:\n    enabled true\n    duration-ms 280 # Node marker appearance.\n    collapse-duration-ms 280 # Window snapshot shrinking/traveling into the node.\n  end\n\n  cluster:\n    enabled true\n\n    tiling:\n      open-duration-ms 300\n      close-duration-ms 420\n      reflow-duration-ms 240\n\n      stagger-ms 55\n    end\n\n    stacking:\n      open-duration-ms 240\n      close-duration-ms 360\n      cycle-duration-ms 220\n    end\n  end\nend",
  "keybinds": "keybinds:\n  mod \"super\"\n\n  \"$var.mod+shift+e\" \"quit\"\n  \"$var.mod+q\" \"close-focused\"\n  \"$var.mod+f\" \"toggle-fullscreen\"\n  \"$var.mod+m\" \"maximize-focused\"\n  \"$var.mod+n\" \"toggle-state\"\n  \"$var.mod+p\" \"toggle-focused-pin\"\n  \"$var.mod+o\" \"apogee\"\n  \"$var.mod+z\" \"bearings-show\"\n  \"$var.mod+shift+z\" \"bearings-toggle\"\n  \"alt+tab\" \"cycle-focus\"\n  \"alt+shift+tab\" \"cycle-focus-backward\"\n  \"$var.mod+h\" \"center-last-focused\"\n\n  \"$var.mod+shift+left\" \"monitor-focus left\"\n  \"$var.mod+shift+right\" \"monitor-focus right\"\n  \"$var.mod+shift+up\" \"monitor-focus up\"\n  \"$var.mod+shift+down\" \"monitor-focus down\"\n\n  \"$var.mod+shift+c\" \"cluster-mode\"\n  \"$var.mod+l\" \"cluster-layout-cycle\"\n  \"$var.mod+v\" \"cluster-toggle-float\"\n  \"$var.mod+1\" \"cluster-slot-1\"\n  \"$var.mod+2\" \"cluster-slot-2\"\n  \"$var.mod+3\" \"cluster-slot-3\"\n  \"$var.mod+4\" \"cluster-slot-4\"\n  \"$var.mod+5\" \"cluster-slot-5\"\n  \"$var.mod+6\" \"cluster-slot-6\"\n  \"$var.mod+7\" \"cluster-slot-7\"\n  \"$var.mod+8\" \"cluster-slot-8\"\n  \"$var.mod+9\" \"cluster-slot-9\"\n  \"$var.mod+0\" \"cluster-slot-10\"\n\n  \"$var.mod+left\" \"focus-left\"\n  \"$var.mod+right\" \"focus-right\"\n  \"$var.mod+up\" \"focus-up\"\n  \"$var.mod+down\" \"focus-down\"\n\n  \"$var.mod+comma\" \"trail-prev\"\n  \"$var.mod+period\" \"trail-next\"\n\n  \"$var.mod+alt+left\" \"node-move left\"\n  \"$var.mod+alt+right\" \"node-move right\"\n  \"$var.mod+alt+up\" \"node-move up\"\n  \"$var.mod+alt+down\" \"node-move down\"\n\n  \"$var.mod+alt+shift+left\" \"window-transfer left\"\n  \"$var.mod+alt+shift+right\" \"window-transfer right\"\n  \"$var.mod+alt+shift+up\" \"window-transfer up\"\n  \"$var.mod+alt+shift+down\" \"window-transfer down\"\n\n  \"$var.mod+ctrl+left\" \"cluster-tile-swap-left\" with scope \"tile\"\n  \"$var.mod+ctrl+right\" \"cluster-tile-swap-right\" with scope \"tile\"\n  \"$var.mod+ctrl+up\" \"cluster-tile-swap-up\" with scope \"tile\"\n  \"$var.mod+ctrl+down\" \"cluster-tile-swap-down\" with scope \"tile\"\n  \"$var.mod+ctrl+left\" \"resize-window-left\" with scope \"field\"\n  \"$var.mod+ctrl+right\" \"resize-window-right\" with scope \"field\"\n  \"$var.mod+ctrl+up\" \"resize-window-up\" with scope \"field\"\n  \"$var.mod+ctrl+down\" \"resize-window-down\" with scope \"field\"\n\n  \"$var.mod+a\" \"arrange-visible\"\n\n  \"$var.mod+shift+r\" \"reload\"\n\n  \"$var.mod+t\" \"default-terminal\"\n\n  \"$var.mod+d\" \"halley-lift\"\n\n  \"XF86AudioRaiseVolume\" \"wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+ --limit 1.0\" with repeat true\n  \"XF86AudioLowerVolume\" \"wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-\" with repeat true\n  \"XF86AudioMute\" \"wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle\"\n\n  \"$var.mod+minus\" \"zoom-out\"\n  \"$var.mod+equal\" \"zoom-in\"\n  \"$var.mod+shift+0\" \"zoom-reset\"\n\n  \"Print\" \"screenshot\"\n\n  \"$var.mod+click-left\" \"move-window\"\n  \"$var.mod+click-right\" \"resize-window\"\n  \"$var.mod+shift+click-left\" \"drag-pan\"\n  \"click-left\" \"pan-field\"\n\nend"
};
configExamplesV08.viewport = configExamplesV08.view;
export const configPageV08Override = (base: ConfigPage): ConfigPage => {
  const sections = base.sections.map((section) => {
    const options = [...section.options];
    const add = (...entries: ConfigOption[]) => options.push(...entries.filter((entry) => !options.some((old) => old.option === entry.option)));
    if (["input-pointer-classes", "input-devices"].includes(section.slug)) add(option("sensitivity", "f32 or numeric string", "libinput", "Alias for accel-speed, from -1.0 to 1.0. If both are supplied they must agree. Negative numeric values are supported directly."));
    if (section.slug === "cursor") add(option("disable-hardware-cursor", "bool", "false", "Force composed cursors on native outputs when a driver has cursor artifacts. Hardware cursors are enabled by default; cross-GPU outputs retain composition."));
    if (section.slug === "autostart") add(option("cluster", "repeated nested block", "none", "Optional named startup clusters with name, members, layout, and output. Fresh sessions declare no clusters. Empty members [] creates an empty named core."));
    if (section.slug === "animations-window-open" || section.slug === "animations-window-close") add(option("custom-shader", "path string", "unset", "Optional GLSL fragment shader. The configured animation type owns geometry, and missing or invalid shaders fall back to it. Open/close shader examples are included in the Halley repository."));
    if (section.slug === "animations-node") add(option("collapse-duration-ms", "u64", "280", "Duration for the window snapshot shrinking and traveling into its collapsed node, separate from node appearance and window-close animation."));
    if (section.slug === "decorations-titlebars") add(option("text-size", "u16", "global font size", "Independent titlebar text size. Omit it to inherit the compositor font size."));
    if (section.slug === "overlays-notifications") add(
      option("offset-x", "i32", "0", "Signed horizontal offset from the configured notification anchor."),
      option("offset-y", "i32", "0", "Signed vertical offset from the configured notification anchor."));
    if (section.slug === "decay") {
      for (let i = 0; i < options.length; i++) {
        if (options[i].option === "outside-delay-seconds") options[i] = { ...options[i], defaultValue: "180 (fresh config: 600)", notes: "Fresh configurations use 10 minutes outside the focus ring. Existing explicit values remain unchanged; omitting decay retains the built-in 180-second delay." };
        if (options[i].option === "inside-delay-seconds") options[i] = { ...options[i], defaultValue: "1800 (fresh config: 5400)", notes: "Fresh configurations use 90 minutes inside the focus ring. Existing explicit values remain unchanged; omitting decay retains the built-in 1800-second delay." };
      }
    }
    if (section.slug === "keybinds-actions") add(
      option("close-focused", "action", "Mod+Q", "Close the focused window. In an empty active cluster, two released presses delete only the cluster; Escape cancels, and launchers or new members clear confirmation."),
      option("arrange-visible", "action", "Mod+A", "Toggle a reversible, monitor-local Field mosaic. An untouched arrangement restores its saved geometry, including during animation. Moving, resizing, transferring or closing a participant ends that snapshot; the next invocation arranges the current windows."),
      option("window-transfer <direction>", "action", "Mod+Alt+Shift+Arrow", "Transfer the focused Field window to the neighboring monitor."),
      option("pan-field <direction>", "action", "unbound", "Pan the Field through an optional keyboard action."),
      option("drag-pan", "pointer action", "Mod+Shift+left-drag", "Carry a grabbed window through its output's Field by dwelling at the output edge."));
    if (section.slug === "rules-window-rule") {
      for (let i = 0; i < options.length; i++) if (options[i].option === "opacity") options[i] = { ...options[i], notes: "Client content and popups only. Borders, titlebars, pin badges, and compositor shadows remain opaque." };
    }
    return { ...section, options };
  });
  if (base.slug === "animations") sections.push({
    slug: "animations-arrange", name: "animations.arrange", title: "Arrange", addedIn: "0.8.0",
    summary: "Motion for the reversible visible-Field mosaic.",
    options: [
      option("enabled", "bool", "true", "Animate arrangement and restoration."),
      option("motion", "spring | easing", "easing", "Motion model."),
      option("duration-ms", "u64", "360", "Duration in easing mode."),
      option("curve", "easing name", "ease-in-out-cubic", "Curve in easing mode."),
      option("damping-ratio | stiffness", "spring fields", "1.0 | 800.0", "Used when motion is spring.")
    ]
  });
  if (base.slug === "autostart") sections.push({
    slug: "autostart-cluster", name: "autostart.cluster", title: "Startup Clusters", addedIn: "0.8.0",
    summary: "Repeat a cluster block for each intentional named startup workspace. Halley starts with no clusters unless declared.",
    options: [
      option("name", "string", "required", "Persistent cluster name."),
      option("members", "command string array", "required", "Commands launched into the cluster. Empty arrays create a named core without launching applications."),
      option("layout", "tiling | stacking", "clusters.default-layout", "Initial workspace layout."),
      option("output", "connector string", "primary output", "Optional output such as DP-2.")
    ]
  });
  const links = sections.length > 1 ? sections.map(entry => ({ label: entry.name, href: `/wiki/config/${base.slug}#${entry.slug}` })) : undefined;
  const summary = base.slug === "animations"
    ? "Window, fullscreen, maximize, resize, reversible arrangement, node, and cluster motion."
    : base.slug === "decorations" ? "Managed borders, border resize, and compositor-owned titlebars with independent text sizing."
    : base.slug === "autostart" ? "Startup/reload commands and optional named startup clusters."
    : base.summary;
  return { ...base, summary, sections, links, example: configExamplesV08[base.slug] ?? base.example };
};
