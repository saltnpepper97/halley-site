import type { ConfigOption, ConfigPage, ConfigSection } from "$lib/wiki/config-reference";

const option = (option: string, type: string, defaultValue: string, notes: string): ConfigOption => ({
  option,
  type,
  defaultValue,
  notes
});

const section = (
  slug: string,
  name: string,
  title: string,
  summary: string,
  options: ConfigOption[]
): ConfigSection => ({ slug, name, title, summary, options });

const page = (
  slug: string,
  navLabel: string,
  title: string,
  summary: string,
  sections: ConfigSection[],
  example: string
): ConfigPage => ({
  slug,
  navLabel,
  title,
  summary,
  sections,
  links: sections.length > 1
    ? sections.map((entry) => ({ label: entry.name, href: `/wiki/config/${slug}#${entry.slug}` }))
    : undefined,
  example
});

const unavailable = (slug: string): ConfigPage => page(
  slug,
  slug,
  "Not available in 0.6.0",
  "This legacy section is retained only in archived wiki versions.",
  [],
  "# Select an archived wiki version to view this section."
);

const pointerOptions = [
  option("enabled", "bool", "libinput", "Enables or disables this device class. Omit to retain the device default."),
  option("natural-scroll", "bool", "libinput", "Controls natural scrolling."),
  option("accel-speed", "f32", "libinput", "Acceleration speed from -1.0 through 1.0."),
  option("accel-profile", "string", "libinput", "Accepted values: adaptive, flat."),
  option("scroll-method", "string", "libinput", "Accepted values: none, two-finger, edge, on-button-down."),
  option("scroll-button", "u32", "libinput", "Linux input button code used by on-button scrolling."),
  option("scroll-button-lock", "bool", "libinput", "Keeps on-button scrolling active after the button is released."),
  option("left-handed", "bool", "libinput", "Controls left-handed button mapping."),
  option("middle-emulation", "bool", "libinput", "Controls middle-button emulation.")
];

const overrides = new Map<string, ConfigPage>([
  ["input", page(
    "input",
    "input",
    "Input",
    "Keyboard, pointer focus, gestures, physical device classes, touch, and exact-name overrides.",
    [
      section("input", "input", "Input", "Top-level input behavior and nested device groups.", [
        option("repeat-rate", "i32", "30", "Keyboard repeat frequency. 0 disables repeat."),
        option("repeat-delay", "i32 ms", "500", "Delay before repeat begins."),
        option("focus-mode", "click | hover", "click", "Hover follows the pointer without implicitly raising windows."),
        option("raise-on-click", "bool", "true", "Raises a clicked window independently of focus mode."),
        option("keyboard", "nested block", "see input.keyboard", "XKB layout, model, variant, and options."),
        option("gestures", "nested block", "see input.gestures", "Client passthrough and compositor gesture routing."),
        option("touchpad | mouse | trackpoint | trackball | touchscreen", "nested blocks", "libinput", "Class defaults applied to matching native devices."),
        option("devices", "nested block", "none", "Exact, ASCII-case-insensitive full device-name overrides.")
      ]),
      section("input-keyboard", "input.keyboard", "Keyboard", "XKB keyboard configuration.", [
        option("layout", "string", "us", "XKB layout name."),
        option("model", "string", "", "XKB model; empty uses the XKB default."),
        option("variant", "string", "", "XKB layout variant."),
        option("options", "string", "", "Comma-separated XKB options.")
      ]),
      section("input-gestures", "input.gestures", "Gestures", "Hybrid client/compositor gesture routing and remappable discrete actions.", [
        option("enabled", "bool", "true", "Master switch for Halley camera gestures."),
        option("client-passthrough", "bool", "true", "Forwards swipe, pinch, and hold sequences to clients when Halley does not consume them."),
        option("touch-passthrough", "bool", "true", "Exposes raw touchscreen contacts through wl_touch."),
        option("pinch-to-zoom", "bool", "true", "Enables compositor pinch zoom."),
        option("pinch-scope", "empty-field | global", "empty-field", "Where pinch zoom is eligible."),
        option("compositor-scope", "empty-field | global", "empty-field", "Where compositor pan and ordinary action gestures are eligible."),
        option("modifier", "modifier | mod | off", "mod", "Modifier that forces eligible gestures to Halley; exact left/right modifiers are accepted."),
        option("scroll-pan", "off | empty-field", "empty-field", "Controls two-finger scroll panning."),
        option("pan-fingers", "u32", "3", "Finger count for continuous swipe panning; 0 disables it."),
        option("pan-momentum", "bool", "true", "Continues camera motion after a flick."),
        option("pan-decay-rate", "f32", "6.0", "Momentum decay rate."),
        option("flick-min-px-per-s", "f32", "200.0", "Minimum velocity treated as a flick."),
        option("swipe-threshold-px", "f32", "120.0", "Distance required to commit a discrete swipe."),
        option("swipe-<direction>-<fingers>", "action", "map defaults", "Maps a 1-32 finger swipe to a built-in compositor action."),
        option("apogee-swipe-<direction>-<fingers>", "action", "map defaults", "Independent action map used while Apogee is open."),
        option("hold-<fingers>", "action", "none", "Maps a 1-32 finger hold to a built-in compositor action.")
      ]),
      section("input-pointer-classes", "input.touchpad / mouse / trackpoint / trackball", "Pointer Device Classes", "Optional libinput defaults; omitted fields retain each device's own default.", [
        ...pointerOptions,
        option("tap", "bool", "libinput", "Touchpad tap-to-click."),
        option("tap-button-map", "string", "libinput", "left-right-middle or left-middle-right."),
        option("dwt", "bool", "libinput", "Touchpad disable-while-typing."),
        option("click-method", "string", "libinput", "clickfinger or button-areas."),
        option("drag", "bool", "libinput", "Touchpad tap-and-drag."),
        option("drag-lock", "bool", "libinput", "Touchpad drag lock."),
        option("disabled-on-external-mouse", "bool", "libinput", "Disables a touchpad while an external mouse is present.")
      ]),
      section("input-touchscreen", "input.touchscreen", "Touchscreen", "Touch device enablement, output mapping, and calibration.", [
        option("enabled", "bool", "libinput", "Enables or disables touchscreen events."),
        option("map-to-output", "string", "unset", "Exact connector to which contacts are mapped."),
        option("calibration-matrix", "[f32; 6]", "libinput", "Row-major 2x3 affine calibration matrix.")
      ]),
      section("input-devices", "input.devices.<name>", "Device Overrides", "Per-device values layered over the relevant class block.", [
        option("<full device name>", "nested block", "none", "Exact full device name, compared without ASCII case."),
        option("<supported device option>", "class option", "inherited", "Overrides a supported setting for this device only.")
      ])
    ],
    `input:
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
    client-passthrough true
    pinch-to-zoom true
    compositor-scope "empty-field"
    modifier "mod"
  end
end`
  )],
  ["cursor", page(
    "cursor", "cursor", "Cursor", "Cursor theme, logical size, and independent visibility policies.",
    [section("cursor", "cursor", "Cursor", "Cursor rendering and hiding behavior.", [
      option("theme", "string", "default", "Authoritative, case-sensitive Xcursor theme name."),
      option("size", "u32", "24", "Base logical cursor size."),
      option("hide-when-typing", "bool", "false", "Hides after a physical keyboard press."),
      option("hide-on-keyboard-nav", "bool", "true", "Hides while navigating Halley by keyboard."),
      option("hide-on-touch", "bool", "true", "Hides on touch-down."),
      option("hide-after-ms", "u64", "2000", "Pointer inactivity timeout; 0 disables idle hiding.")
    ])],
    `cursor:
  theme "default"
  size 24
  hide-when-typing false
  hide-on-keyboard-nav true
  hide-on-touch true
  hide-after-ms 2000
end`
  )],
  ["viewport", page(
    "viewport", "view", "View", "Repeated per-output hardware and focus-ring policy. The stable page URL is retained from older releases.",
    [
      section("viewport", "view", "View", "The single canonical container for repeated output blocks.", [
        option("output", "repeated nested block", "none", "One entry per exact output connector. Duplicate names are rejected.")
      ]),
      section("viewport-connector", "view.output", "View Output", "Hardware selection and output-local focus-ring policy.", [
        option("name", "string", "required", "Exact connector printed by halleyctl outputs."),
        option("width + height", "u32 pair", "unset", "Both are required together to select hardware mode policy."),
        option("offset-x | offset-y", "i32", "0", "Output origin; valid only with width and height."),
        option("rate", "positive f32", "highest matching", "Must exactly match an advertised refresh rate."),
        option("transform", "0 | 90 | 180 | 270", "0", "Clockwise output rotation; valid only with width and height."),
        option("vrr", "off | on | auto", "off", "Auto enables VRR for a settled fullscreen window when supported."),
        option("focus-ring", "nested block", "builtin", "Camera-relative decay ellipse. A ring-only output entry is portable.")
      ]),
      section("viewport-connector-focus-ring", "view.output.focus-ring", "Output Focus Ring", "Per-output attention ellipse.", [
        option("radius-x", "f32", "820.0", "Horizontal ellipse radius."),
        option("radius-y", "f32", "420.0", "Vertical ellipse radius."),
        option("offset-x", "f32", "0.0", "Camera-relative horizontal offset."),
        option("offset-y", "f32", "0.0", "Camera-relative vertical offset.")
      ])
    ],
    `view:
  output:
    name "DP-1"
    # width 2560
    # height 1440
    # rate 179.998
    # vrr "auto"

    focus-ring:
      radius-x 820.0
      radius-y 420.0
      offset-x 0.0
      offset-y 0.0
    end
  end
end`
  )],
  ["decorations", page(
    "decorations", "decorations", "Decorations", "Managed borders, border resize, and compositor-owned server-side titlebars.",
    [
      section("decorations", "decorations", "Decorations", "Window chrome groups.", [
        option("border", "nested block", "see decorations.border", "Primary compositor border."),
        option("resize-using-border", "bool", "true", "Enables edge and corner resize hit areas."),
        option("titlebars", "nested block", "see decorations.titlebars", "Chrome for server-decorated windows.")
      ]),
      section("decorations-border", "decorations.border", "Border", "Primary managed-window border.", [
        option("size", "i32", "3", "Border width in output pixels."),
        option("radius", "i32", "8", "Client-content corner radius."),
        option("colour-focused", "hex RGB", "#38d1eb", "Focused border color."),
        option("colour-unfocused", "hex RGB", "#474d59", "Unfocused border color.")
      ]),
      section("decorations-titlebars", "decorations.titlebars", "Titlebars", "Server-side titlebar layout and palette.", [
        option("enabled", "bool", "true", "Draws titlebars for server-decorated windows."),
        option("button-position", "left | right", "left", "Control button group side."),
        option("title-position", "left | center | right", "center", "Title and app-icon group alignment."),
        option("show-buttons", "bool", "true", "Shows close, maximize, and minimize controls."),
        option("show-icons", "bool", "false", "Shows the app icon beside the title."),
        option("show-title", "bool", "true", "Shows the window title."),
        option("radius", "i32", "8", "Titlebar corner radius."),
        option("height", "i32", "32", "Requested titlebar height."),
        option("colour-focused", "hex RGB", "#38d1eb", "Focused background."),
        option("colour-unfocused", "hex RGB", "#474d59", "Unfocused background."),
        option("foreground-colour-focused", "hex RGB", "#101418", "Focused title and icon color."),
        option("foreground-colour-unfocused", "hex RGB", "#f4f5f7", "Unfocused title and icon color."),
        option("button-hover-colour", "hex RGB", "#ffffff", "Control hover color."),
        option("button-pressed-colour", "hex RGB", "#101418", "Control pressed color.")
      ])
    ],
    `decorations:
  border:
    size 3
    radius 8
    colour-focused "#38d1eb"
    colour-unfocused "#474d59"
  end
  resize-using-border true
  titlebars:
    enabled true
    button-position "left"
    title-position "center"
    show-buttons true
    show-icons false
    show-title true
    height 32
  end
end`
  )],
  ["screenshot", page(
    "screenshot", "screenshot", "Screenshot", "Destination for native and portal PNG captures.",
    [section("screenshot", "screenshot", "Screenshot", "Screenshot file output.", [
      option("directory", "string", "$env.HOME/Pictures/Screenshots/", "Supports $env.HOME, $HOME, and ~; missing directories are created.")
    ])],
    `screenshot:
  directory "$env.HOME/Pictures/Screenshots/"
end`
  )],
  ["overlays", page(
    "overlays", "overlays", "Overlays", "Shared styling for compositor-owned UI and notifications.",
    [
      section("overlays", "overlays", "Overlays", "Shared overlay palette and geometry.", [
        option("background-colour", "auto | light | dark | hex", "auto", "Overlay background color."),
        option("text-colour", "auto | light | dark | hex", "auto", "Overlay text color."),
        option("error-colour", "auto | light | dark | hex", "#fb4934", "Error-state color."),
        option("radius", "i32", "8", "Overlay corner radius."),
        option("borders", "bool", "true", "Draws overlay borders."),
        option("notifications", "nested block", "see overlays.notifications", "Notification placement and duration."),
        option("zoom-indicator", "nested block", "see overlays.zoom-indicator", "Live per-monitor camera scale shown during zoom activity.")
      ]),
      section("overlays-notifications", "overlays.notifications", "Notifications", "Compositor notification policy.", [
        option("position", "six-corner/center positions", "top-center", "Accepted positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right."),
        option("success-duration-ms", "u64", "4000", "Success notice duration; must be greater than zero."),
        option("error-duration-ms", "u64", "9000", "Error notice duration; must be greater than zero.")
      ]),
      section("overlays-zoom-indicator", "overlays.zoom-indicator", "Zoom Indicator", "Live camera scale with activity-aware hold and fade timing.", [
        option("enabled", "bool", "true", "Shows the affected monitor's scale to two decimal places while zooming."),
        option("position", "six-corner/center positions", "bottom-center", "Accepted positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right."),
        option("hold-duration-ms", "u64", "750", "Time the final scale remains fully visible after input and smooth camera motion stop; must be greater than zero."),
        option("fade-duration-ms", "u64", "180", "Fade-out duration after the hold; must be greater than zero."),
        option("background", "bool", "true", "When false, draws text only and removes the card, border, backdrop blur, and shadow."),
        option("text-size", "u16", "inherit font.size", "Optional private text size, clamped from 6 to 96 pixels."),
        option("text-colour", "auto | light | dark | hex", "inherit overlays.text-colour", "Optional text color override. The text-color alias is accepted."),
        option("background-colour", "auto | light | dark | hex", "inherit overlays.background-colour", "Optional card color override. The background-color alias is accepted."),
        option("opacity", "f32", "1.0", "Multiplies the indicator's activity fade and is clamped from 0.0 to 1.0."),
        option("borders", "bool", "inherit overlays.borders", "Optional card border override; it has no visible effect when background is false."),
        option("radius", "i32", "inherit overlays.radius", "Optional card radius override, clamped from 0 to 256 pixels; it has no visible effect when background is false.")
      ])
    ],
    `overlays:
  background-colour "auto"
  text-colour "auto"
  error-colour "#fb4934"
  radius 8
  borders true
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
    # text-colour "auto"
    # background-colour "auto"
    # borders true
    # radius 8
  end
end`
  )],
  ["effects", page(
    "effects", "effects", "Effects", "Backdrop quality for compositor overlays and renderer-level shadow layers.",
    [
      section("effects", "effects", "Effects", "Renderer effect groups.", [
        option("blur", "nested block", "see effects.blur", "Backdrop blur quality. Client activation belongs in rules."),
        option("shadows", "nested block", "see effects.shadows", "Window, node, and overlay shadows.")
      ]),
      section("effects-blur", "effects.blur", "Blur", "Dual Kawase blur used by opted-in compositor overlays and rules.", [
        option("overlays", "bool", "true", "Allows compositor-owned overlays to use blur."),
        option("method", "string", "dual-kawase", "The supported blur method."),
        option("radius", "u32", "24", "Backdrop blur radius."),
        option("passes", "u32", "3", "Downsample/upsample pass count."),
        option("saturation", "f32", "1.10", "Backdrop saturation multiplier."),
        option("noise", "f32", "0.012", "Frosted-glass noise amount.")
      ]),
      section("effects-shadows-window", "effects.shadows.window", "Window Shadow", "Shadow beneath managed windows.", [
        option("enabled | blur-radius | spread | offset-x | offset-y | colour", "shadow fields", "true | 8 | 0 | 0 | 5 | #05030530", "Window shadow switch, geometry, and RGBA color.")
      ]),
      section("effects-shadows-node", "effects.shadows.node", "Node Shadow", "Shadow beneath nodes and cluster cores.", [
        option("enabled | blur-radius | spread | offset-x | offset-y | colour", "shadow fields", "true | 14 | 0 | 0 | 3 | #05030524", "Node shadow switch, geometry, and RGBA color.")
      ]),
      section("effects-shadows-overlay", "effects.shadows.overlay", "Overlay Shadow", "Shadow beneath overlay containers.", [
        option("enabled | blur-radius | spread | offset-x | offset-y | colour", "shadow fields", "true | 24 | 1 | 0 | 7 | #05030538", "Overlay shadow switch, geometry, and RGBA color.")
      ])
    ],
    `effects:
  blur:
    overlays true
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
      offset-y 5
      colour "#05030530"
    end
  end
end`
  )],
  ["background", unavailable("background")],
  ["wallpaper", page(
    "wallpaper", "wallpaper", "Wallpaper", "Plain black, classic image, or spatial field-shader wallpaper.",
    [section("wallpaper", "wallpaper", "Wallpaper", "The absolute back of the compositor scene.", [
      option("mode", "none | classic | field-shader", "none", "Selects no compositor wallpaper, an image, or a spatial shader."),
      option("path", "string", "", "Image path for classic mode; relative paths resolve beside the config."),
      option("shader", "space | path", "space", "Bundled old-Halley shader or a compatible fragment-shader path."),
      option("fit", "cover | contain | stretch", "cover", "Classic image fit."),
      option("colour", "hex RGB", "#181a26", "Base shader color."),
      option("accent-colour", "hex RGB", "#8fa8d8", "Shader accent color."),
      option("intensity", "f32", "1.0", "Non-negative image or shader intensity."),
      option("animated", "bool", "false", "Keeps the field shader repainting for animation.")
    ])],
    `wallpaper:
  mode "none"
  # mode "field-shader"
  # shader "space"
  # animated true
end`
  )],
  ["rules", page(
    "rules", "rules", "Rules", "Strict first-match policy for managed windows and layer-shell surfaces.",
    [
      section("rules", "rules", "Rules", "Repeated rule blocks.", [
        option("window-rule", "repeated nested block", "none", "Matches a managed Wayland or XWayland toplevel."),
        option("layer-rule", "repeated nested block", "none", "Matches a layer-shell namespace and optional layer.")
      ]),
      section("rules-window-rule", "rules.window-rule", "Window Rule", "Window matching, initial geometry, visual policy, and cluster participation.", [
        option("app-id", "string | regex | array", "optional", "Exact or regex application-id match."),
        option("title", "string | regex | array", "optional", "Exact or regex title match."),
        option("width | height", "u32", "unset", "Optional fixed initial dimensions."),
        option("opacity", "f32", "1.0", "Opacity from 0.0 through 1.0."),
        option("blur", "bool", "unset", "Explicit client blur activation policy."),
        option("spawn-placement", "center | viewport-center | cursor | app | find-empty", "center", "Initial window placement."),
        option("cluster-participation", "layout | float", "layout", "Whether the window joins cluster layout management.")
      ]),
      section("rules-layer-rule", "rules.layer-rule", "Layer Rule", "Layer-shell blur matching.", [
        option("namespace", "string | regex | array", "required", "Layer-shell namespace match."),
        option("layer", "string | array", "any", "Optional background, bottom, top, or overlay layer match."),
        option("blur", "bool", "required", "Enables or disables blur for the matching surface.")
      ])
    ],
    `rules:
  window-rule:
    app-id "firefox"
    title r"Picture.*"
    opacity 0.96
    blur true
    spawn-placement "cursor"
    cluster-participation "float"
  end

  layer-rule:
    namespace "waybar"
    layer "top"
    blur true
  end
end`
  )],
  ["field", page(
    "field", "field", "Field", "Shared Field clearance, pin badges, close-focus restoration, and outward-only zoom.",
    [
      section("field", "field", "Field", "Spatial Field policy.", [
        option("gap", "f32", "20.0", "Clearance for maximized windows and readable landmarks."),
        option("pins", "nested block", "see field.pins", "Pinned entity badge styling."),
        option("close-restore-focus", "bool", "true", "Selects a cluster, same-output, or global MRU successor after close."),
        option("close-restore-nodes", "bool", "false", "Restores a collapsed successor before focusing it."),
        option("close-restore-pan", "never | if-offscreen | always", "if-offscreen", "Camera policy for the selected successor."),
        option("zoom", "nested block", "see field.zoom", "Outward-only camera zoom.")
      ]),
      section("field-pins", "field.pins", "Pins", "Pinned badge position, palette, and scale.", [
        option("corner", "top-left | top-right", "top-right", "Badge corner; titlebar pins are placed opposite controls."),
        option("colour", "auto | light | dark | hex", "auto", "Pin glyph color."),
        option("background-colour", "auto | light | dark | hex", "auto", "Badge background color."),
        option("size", "f32", "1.0", "Badge scale from 0.5 through 3.0.")
      ]),
      section("field-zoom", "field.zoom", "Zoom", "Zoom only moves outward from native scale and back to 1.0.", [
        option("enabled", "bool", "true", "Enables field zoom."),
        option("min", "f32", "0.35", "Minimum scale."),
        option("step", "f32", "1.10", "Per-step multiplier."),
        option("smooth-rate", "f32", "12.5", "Camera interpolation rate. max and smooth are intentionally unsupported.")
      ])
    ],
    `field:
  gap 20.0
  pins:
    corner "top-right"
    colour "auto"
    background-colour "auto"
    size 1.0
  end
  close-restore-focus true
  close-restore-nodes false
  close-restore-pan "if-offscreen"
  zoom:
    enabled true
    min 0.35
    step 1.10
    smooth-rate 12.5
  end
end`
  )],
  ["placement", page(
    "placement", "placement", "Placement", "Landmark placement compatibility retained by the 0.6 config shape.",
    [section("placement-landmarks", "placement.landmarks", "Landmarks", "Placement policy for collapsed readable objects.", [
      option("strategy", "string", "nearest-free", "Places landmarks at the nearest readable position."),
      option("normal-blocker", "string", "relocate", "Relocates an unpinned landmark when it blocks placement.")
    ])],
    `placement:
  landmarks:
    strategy "nearest-free"
    normal-blocker "relocate"
  end
end`
  )],
  ["node", page(
    "node", "node", "Node", "Collapsed node shape, labels, icon, opacity, color, and restore panning.",
    [section("node", "node", "Node", "Collapsed node appearance and click behavior.", [
      option("show-labels", "off | hover | always", "hover", "Node label visibility."),
      option("show-app-icons", "off | hover | always", "always", "Application icon visibility."),
      option("shape", "square | squircle", "squircle", "Node shape. The old node-shape key is rejected."),
      option("label-shape", "square | squircle", "squircle", "Label badge shape. The old node-label-shape key is rejected."),
      option("icon-size", "f32", "0.72", "Icon fraction from 0.1 through 1.0."),
      option("opacity", "f32", "1.0", "Fill opacity from 0.0 through 1.0."),
      option("background-colour", "auto | light | dark | hex", "auto", "Node fill color."),
      option("click-collapsed-pan", "never | if-offscreen | always", "never", "Camera policy when restoring a node.")
    ])],
    `node:
  show-labels "hover"
  show-app-icons "always"
  shape "squircle"
  label-shape "squircle"
  icon-size 0.72
  opacity 1.0
  background-colour "auto"
  click-collapsed-pan "never"
end`
  )],
  ["decay", page(
    "decay", "decay", "Decay", "Automatic collapse timing inside and outside the focus ring.",
    [section("decay", "decay", "Decay", "Node decay policy.", [
      option("enabled", "bool", "true", "Enables automatic decay into nodes."),
      option("outside-delay-seconds", "u64", "180", "Delay outside the focus ring."),
      option("inside-delay-seconds", "u64", "1800", "Delay inside the focus ring.")
    ])],
    `decay:
  enabled true
  outside-delay-seconds 180
  inside-delay-seconds 1800
end`
  )],
  ["clusters", page(
    "clusters", "clusters", "Clusters", "Cluster creation, bloom joining, and nested tiling/stacking layout defaults.",
    [
      section("clusters", "clusters", "Clusters", "Cluster-wide behavior.", [
        option("default-layout", "stacking | tiling", "stacking", "Initial layout for new clusters."),
        option("join-dwell-ms", "u64", "2000", "Dwell before a bloom join arms."),
        option("join-distance-px", "f32", "280.0", "Legacy compatibility value; current joining uses real bounds and field.gap."),
        option("show-icons", "bool", "true", "Shows the restored cluster glyph."),
        option("bloom-direction", "clockwise | counter-clockwise", "clockwise", "Member ordering around a bloomed core."),
        option("tiling | stacking", "nested blocks", "builtin", "Layout-specific options now live under clusters.")
      ]),
      section("clusters-tiling", "clusters.tiling", "Cluster Tiling", "Master/stack layout policy.", [
        option("new-on-top", "bool", "false", "Inserts new members at the front."),
        option("gaps-inner", "f32", "20.0", "Gap between cluster windows."),
        option("gaps-outer", "f32", "20.0", "Gap around the output work area."),
        option("max-stack", "usize", "4", "Visible stack slots beside the master."),
        option("overflow-show-icons", "bool", "true", "Shows icons for overflow queue members.")
      ]),
      section("clusters-stacking", "clusters.stacking", "Cluster Stacking", "Overlapping card visibility.", [
        option("max-visible", "usize", "5", "Maximum cards drawn at once; 0 means unlimited.")
      ])
    ],
    `clusters:
  default-layout "stacking"
  join-dwell-ms 2000
  show-icons true
  bloom-direction "clockwise"
  tiling:
    new-on-top false
    gaps-inner 20.0
    gaps-outer 20.0
    max-stack 4
    overflow-show-icons true
  end
  stacking:
    max-visible 5
  end
end`
  )],
  ["animations", page(
    "animations", "animations", "Animations", "Window, fullscreen, maximize, resize, node, and cluster motion.",
    [
      section("animations", "animations", "Animations", "Master and nested animation groups.", [
        option("enabled", "bool", "true", "Master animation switch."),
        option("smooth-resize | window-open | window-close | fullscreen | maximize | node | cluster", "nested blocks", "builtin", "Independent motion groups.")
      ]),
      section("animations-smooth-resize", "animations.smooth-resize", "Smooth Resize", "Pointer-driven low-pass resize.", [
        option("enabled", "bool", "true", "Enables smoothed interactive resize."),
        option("duration-ms", "u64", "90", "Filter duration; release stops at the presented size.")
      ]),
      section("animations-window-open", "animations.window-open", "Window Open", "Newly mapped window motion.", [
        option("enabled", "bool", "true", "Enables window-open animation."),
        option("type", "center-out | fade | launch", "center-out", "Open visual style."),
        option("duration-ms", "u64", "300", "Easing duration."),
        option("curve", "easing name", "linear", "linear, ease-out-quad/cubic/expo, or elastic; spring motion uses damping and stiffness.")
      ]),
      section("animations-window-close", "animations.window-close", "Window Close", "Ordinary window close motion.", [
        option("enabled", "bool", "true", "Enables close animation."),
        option("type", "shrink | fade | retract", "shrink", "Close visual style."),
        option("duration-ms", "u64", "270", "Close duration.")
      ]),
      section("animations-fullscreen", "animations.fullscreen", "Fullscreen", "Fullscreen enter and exit motion.", [
        option("enabled", "bool", "true", "Enables fullscreen transitions."),
        option("motion", "spring | easing", "spring", "Motion model."),
        option("damping-ratio", "f32", "1.0", "Spring damping."),
        option("stiffness", "f32", "800.0", "Spring strength."),
        option("duration-ms | curve", "easing fields", "250 | ease-out-cubic", "Used when motion is easing.")
      ]),
      section("animations-maximize", "animations.maximize", "Maximize", "Maximize and restore motion.", [
        option("enabled", "bool", "true", "Enables maximize transitions."),
        option("motion", "spring | easing", "easing", "Motion model."),
        option("duration-ms", "u64", "240", "Default easing duration."),
        option("curve", "easing name", "ease-in-out-cubic", "Default easing curve."),
        option("damping-ratio | stiffness", "spring fields", "1.0 | 800.0", "Used when motion is spring.")
      ]),
      section("animations-node", "animations.node", "Node", "Window/node transitions.", [
        option("enabled", "bool", "true", "Enables node transition motion."),
        option("duration-ms", "u64", "280", "Transition duration.")
      ]),
      section("animations-cluster", "animations.cluster", "Cluster", "Cluster workspace motion.", [
        option("enabled", "bool", "true", "Enables cluster workspace motion."),
        option("tiling", "nested block", "builtin", "Open, close, reflow, and stagger timings."),
        option("stacking", "nested block", "builtin", "Open, close, and cycle timings.")
      ]),
      section("animations-cluster-tiling", "animations.cluster.tiling", "Cluster Tiling", "Tiling cluster timings.", [
        option("open-duration-ms", "u64", "300", "Workspace open duration."),
        option("close-duration-ms", "u64", "420", "Workspace close duration."),
        option("reflow-duration-ms", "u64", "240", "Tile reflow duration."),
        option("stagger-ms", "u64", "55", "Delay between member starts.")
      ]),
      section("animations-cluster-stacking", "animations.cluster.stacking", "Cluster Stacking", "Stacking cluster timings.", [
        option("open-duration-ms", "u64", "240", "Workspace open duration."),
        option("close-duration-ms", "u64", "360", "Workspace close duration."),
        option("cycle-duration-ms", "u64", "220", "Card cycle duration.")
      ])
    ],
    `animations:
  enabled true
  smooth-resize:
    enabled true
    duration-ms 90
  end
  window-open:
    enabled true
    type "center-out"
    duration-ms 300
    curve "linear"
  end
  window-close:
    enabled true
    type "shrink"
    duration-ms 270
  end
  fullscreen:
    enabled true
    motion "spring"
    damping-ratio 1.0
    stiffness 800.0
  end
  maximize:
    enabled true
    motion "easing"
    duration-ms 240
    curve "ease-in-out-cubic"
  end
end`
  )],
  ["gamescope", unavailable("gamescope")],
  ["keybinds", page(
    "keybinds", "keybinds", "Keybinds", "Required chord map with exact modifiers, optional repeat overrides, and context scopes.",
    [
      section("keybinds", "keybinds", "Keybinds", "Keyboard, pointer-button, and physical-wheel triggers.", [
        option("mod", "modifier", "super", "Base modifier; generic or exact left/right super, alt, ctrl, or shift."),
        option("<chord> <action>", "binding", "fresh config", "Exact modifier matching; unrecognized actions launch commands."),
        option("with repeat true|false", "binding attribute", "action default", "Overrides held-key repeat."),
        option("with scope global|field|cluster|tile|stack", "binding attribute", "action default", "Allows duplicate chords in non-overlapping contexts."),
        option("click-* | scroll-* | keycode-* | button-*", "physical triggers", "none", "Pointer, wheel, and numeric evdev trigger forms.")
      ]),
      section("keybinds-actions", "built-in actions", "Built-in Actions", "Actions parsed before command fallback.", [
        option("quit | close-focused | reload | screenshot", "global actions", "builtin", "Session, close, reload, and native capture actions."),
        option("toggle-fullscreen | maximize-focused | toggle-state | toggle-focused-pin", "window actions", "builtin", "Focused-window state actions."),
        option("focus-<direction> | cycle-focus | cycle-focus-backward", "navigation", "builtin", "Contextual direction and MRU navigation."),
        option("trail-prev | trail-next | center-last-focused", "Field navigation", "builtin", "Per-output history and Field centering."),
        option("node-move <direction> | resize-window-<direction>", "Field actions", "builtin", "Moves a node or resizes a Field window."),
        option("monitor-focus <direction|output>", "global action", "builtin", "Focuses an adjacent or exact named output."),
        option("cluster-mode | cluster-layout-cycle | cluster-slot-<1-10>", "cluster actions", "builtin", "Creates, lays out, and activates clusters."),
        option("cluster-toggle-float | cluster-tile-swap-<direction>", "cluster actions", "builtin", "Floats a member or reorders a tiling layout."),
        option("apogee | bearings-show | bearings-toggle", "overlay actions", "builtin", "Spatial overview and navigation overlays."),
        option("move-window | resize-window | pan-field", "pointer actions", "builtin", "Remappable compositor grabs."),
        option("zoom-in | zoom-out | zoom-reset | default-terminal", "global actions", "builtin", "Camera zoom and terminal launch."),
        option("<command>", "command line", "fallback", "Any non-built-in action is launched as a command.")
      ])
    ],
    `keybinds:
  mod "super"
  "$var.mod+left" "focus-left"
  "$var.mod+ctrl+left" "resize-window-left" with scope "field"
  "$var.mod+ctrl+left" "cluster-tile-swap-left" with scope "tile"
  "$var.mod+comma" "trail-prev"
  "$var.mod+period" "trail-next"
  "$var.mod+shift+r" "reload"
  "$var.mod+click-left" "move-window"
  "$var.mod+click-right" "resize-window"
  "click-left" "pan-field"
end`
  )],
  ["debug", page(
    "debug", "debug", "Debug", "Optional focus-ring and per-output FPS diagnostics.",
    [section("debug", "debug", "Debug", "Renderer diagnostics.", [
      option("show-focus-ring", "bool", "false", "Keeps the focus ring visible; config changes still preview it briefly."),
      option("overlay-fps", "bool", "false", "Shows a live per-output FPS chip and keeps unlocked outputs repainting.")
    ])],
    `debug:
  show-focus-ring false
  overlay-fps false
end`
  )],
  ["tile", unavailable("tile")],
  ["stacking", unavailable("stacking")]
]);

export const configPageV06Override = (slug: string) => overrides.get(slug);
