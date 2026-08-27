export type NewsFeature = {
  title: string;
  description: string;
};

export type NewsFeatureSection = {
  eyebrow: string;
  title: string;
  intro?: string;
  features: NewsFeature[];
};

export type NewsPost = {
  slug: string;
  title: string;
  version: string;
  // ISO date (YYYY-MM-DD) the release shipped or the post was published.
  date: string;
  eyebrow: string;
  // "release" is a shipped version; "preview" is a forward-looking teaser
  // that hides release-only chrome (version badge, install commands).
  kind?: "release" | "preview";
  summary: string;
  intro: string[];
  features?: NewsFeature[];
  featureSections?: NewsFeatureSection[];
  install?: {
    aur: string[];
    aurDev: string[];
    source: string;
  };
  notes: string[];
  thanks: string[];
  closing: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "halley-rewritten",
    title: "Halley, Rewritten",
    version: "v0.6.0",
    date: "2026-08-26",
    eyebrow: "Release News",
    summary: "Halley v0.6.0 is a ground-up rewrite: the spatial desktop returns on a smaller, typed, damage-aware compositor core, with new titlebars, floating cluster members, native XWayland, stronger output protocols, and a stable client API.",
    intro: [
      "Halley 0.6 is not an incremental port. The compositor was rebuilt around Smithay's current renderer and protocol foundations, then the parts that make Halley Halley were brought back deliberately: per-monitor Fields, decay, nodes, clusters, Bearings, Trail, Apogee, Lift, capture, and the local control surface.",
      "That distinction matters. Some of 0.6 is genuinely new, some is restored parity on better foundations, and some old policy was intentionally left behind. This release note separates those threads so the rewrite is clear about what changed and why."
    ],
    featureSections: [
      {
        eyebrow: "New foundations",
        title: "A compositor rebuilt from the frame up",
        intro: "The rewrite replaces the old runtime beneath Halley's model instead of changing the model into a conventional desktop.",
        features: [
          {
            title: "Damage-aware GLES rendering",
            description: "A Smithay GLES renderer now tracks output damage, buffer age, presentation, scanout eligibility, and animation-driven redraws instead of repainting the whole scene by habit."
          },
          {
            title: "Native embedded XWayland",
            description: "Halley now starts and manages XWayland itself, including X11 window management and RandR state. The external xwayland-satellite process is no longer part of the session."
          },
          {
            title: "A typed client foundation",
            description: "halley-api is redesigned around persistent connections, capability negotiation, sequenced subscriptions, and typed IPC shared by halleyctl, Lift, and the portal."
          },
          {
            title: "Atomic, dependency-aware config reloads",
            description: "Rune configs keep the same format-version marker, but validation and migration are stricter. Nested gather dependencies are watched as one graph and invalid saves leave the last good config active."
          }
        ]
      },
      {
        eyebrow: "New in 0.6",
        title: "Capabilities the old compositor did not have",
        features: [
          {
            title: "Floating cluster members",
            description: "A cluster member can leave its tiling or stacking slot for retained floating geometry, then return without losing its place in the layout."
          },
          {
            title: "Server-side titlebars",
            description: "Halley can draw titlebars for server-decorated windows, with configurable controls, title and icon placement, colors, height, radius, and pin placement."
          },
          {
            title: "Context-scoped controls",
            description: "The same chord can perform different actions in the Field, a cluster, a tile layout, or a stack. Field keyboard resizing and cluster tile swapping can therefore share Mod+Ctrl+Arrow cleanly."
          },
          {
            title: "Stronger output protocols",
            description: "Clients gain writable wlr output-management, gamma control, richer output state, and exact connector targeting alongside Halley's per-output view policy."
          },
          {
            title: "Explicit node lifecycle control",
            description: "halleyctl can collapse, restore, or toggle a selected node directly, in addition to inspecting, focusing, moving, and closing it."
          }
        ]
      },
      {
        eyebrow: "Restored systems",
        title: "Halley's spatial memory returns",
        intro: "These are important parts of the release, but they are restored Halley systems rather than rewrite inventions.",
        features: [
          {
            title: "Field, decay, nodes, and clusters",
            description: "Per-monitor spatial Fields, the focus ring, automatic decay, collapsed landmarks, intentional clusters, tiling, stacking, bloom, and pinning all return on the new core."
          },
          {
            title: "Trail, Bearings, and Apogee",
            description: "Per-output focus history, offscreen navigation cues, and the multi-monitor overview are restored with keyboard, gesture, and remote-control paths."
          },
          {
            title: "Lift, portal, and capture",
            description: "The Halley-native launcher, screenshot and screencast portal, native capture menu, and source selection flows are rebuilt against the typed API."
          },
          {
            title: "Input and gestures",
            description: "Libinput tuning, remappable pointer grabs, swipes and holds, exact modifier sides, and smooth resize are present again."
          },
          {
            title: "The complete control surface",
            description: "halleyctl again reaches outputs, nodes, clusters, Trail, Bearings, capture, monitor focus, layouts, portal diagnostics, config migration, and reload."
          }
        ]
      },
      {
        eyebrow: "Intentional changes",
        title: "What did not come forward unchanged",
        features: [
          {
            title: "View replaces viewport",
            description: "The 0.6 config groups repeated output blocks under view. Hardware mode fields must be supplied as a complete width-and-height group, while ring-only entries remain portable."
          },
          {
            title: "No compositor gaming layer",
            description: "The old game classifier, gaming config section, and halleyctl Gamescope wrapper are gone. Games use normal fullscreen and pointer paths, and launchers can invoke Gamescope directly when wanted."
          },
          {
            title: "Wallpaper replaces background",
            description: "The compositor image and field-shader section is now named wallpaper. Existing background and gesso spellings remain accepted as compatibility aliases."
          },
          {
            title: "A simpler spatial contract",
            description: "Active windows may overlap freely, zoom stops at native scale, cross-output dragging is direct, and the old maximum-active-window policy and Field Jump behavior are not part of 0.6."
          }
        ]
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley", "yay -S halley-full", "paru -S halley-full", "yay -S halley-lift", "paru -S halley-lift"],
      aurDev: ["yay -S halley-git", "paru -S halley-git"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.6.0\ncargo build --release --workspace"
    },
    notes: [
      "The wiki now defaults to v0.6.0. v0.5.0 and earlier documentation remains available from the version picker for existing installs.",
      "The main workspace packages are versioned 0.6.0 for release; the redesigned halley-api is 0.3.0, while the rewritten Halley Lift and portal packages are 0.2.0.",
      "The config format marker is now halley-config-version: 2. Use halleyctl config migrate for an explicit compatibility migration, especially when a config is split across gathered files.",
      "Native sessions expect an Xwayland executable when X11 support is enabled. Nested development sessions now use halley --winit."
    ],
    thanks: [
      "Thanks to everyone who kept testing the spatial model while nearly every implementation detail underneath it changed.",
      "The reports around multi-monitor focus, Steam and X11 teardown, fullscreen restoration, pointer routing, capture, resize, and unnecessary redraws are what turned the rewrite back into Halley."
    ],
    closing: "The same field, with a new foundation under it."
  },
  {
    slug: "glass-and-gravity",
    title: "Glass and Gravity",
    version: "v0.5.0",
    date: "2026-06-30",
    eyebrow: "Release News",
    summary: "Halley v0.5.0 is a wide release: a brand-new native portal backend, frosted-glass effects, animated field backgrounds, the initial Halley Lift and Apogee releases, deeper input tuning, animation polish, and a steadier nested/session story.",
    intro: [
      "Halley's fifth release is where the field gets both clearer and heavier: clearer because windows, overlays, bearings, and the field background itself can now be drawn by the compositor; heavier because more of the desktop stack is owned by Halley itself.",
      "v0.5.0 is also one of the broadest updates so far. It ships Halley Lift and Apogee for the first time, adds Halley's own xdg-desktop-portal backend for screenshots and screencasts, exposes real libinput and gesture controls, sharpens the session/nested split, and lands a long run of animation, fullscreen, resize, and game-path fixes."
    ],
    features: [
      {
        title: "Frosted-glass effects",
        description: "A new effects block controls backdrop blur for overlays, windows, and layer-shell clients, with shadows moved out of decorations and into renderer-level effects."
      },
      {
        title: "Animated field backgrounds",
        description: "The new background/gesso block can render a solid background, a classic image, or a spatial field shader. The builtin space shader pans and zooms with each monitor's Field camera and animates without stealing the desktop's redraw cadence."
      },
      {
        title: "Brand-new Halley portal",
        description: "v0.5.0 introduces xdg-desktop-portal-halley, a native portal backend for ScreenCast and Screenshot requests instead of relying on the wlr capture backend."
      },
      {
        title: "Portal diagnostics",
        description: "halleyctl portal status and halleyctl portal version report backend discovery, compositor IPC, advertised sources, cursor modes, and version details."
      },
      {
        title: "Halley Lift arrives",
        description: "The initial Halley Lift release adds a compositor-integrated command palette for apps, nodes, clusters, actions, config search, and cluster drafts."
      },
      {
        title: "Lift terminal mode",
        description: "term, /term, and /t searches run the typed command line inside the configured terminal through the user's interactive shell, so aliases, pipes, and quoting work."
      },
      {
        title: "Lift polish and speed",
        description: "Background icon decoding, persistent icon indexing, caret settings, outline borders, search glyphs, apps-mode glyphs, and fallback row icons make Lift feel faster and more finished."
      },
      {
        title: "Input and gestures",
        description: "Touchpad, mouse, per-device libinput overrides, touch passthrough, pinch zoom, swipe bindings, and multi-finger holds are now configurable from Halley config."
      },
      {
        title: "Apogee arrives",
        description: "v0.5.0 introduces Apogee as Halley's overview surface for seeing windows and cluster cores spatially instead of losing them behind the current focus."
      },
      {
        title: "Alt+Tab in motion",
        description: "The focus-cycle switcher now opens with quick fade/scale motion and animates between candidates with smoother carousel-style card movement."
      },
      {
        title: "Apogee across monitors",
        description: "The new overview can open on every active monitor at once, improves preview capture scheduling, tightens hovered-window feedback, and avoids mutating the desktop until close animation finishes."
      },
      {
        title: "Apogee cluster preview",
        description: "Apogee now always shows the field overview even with a cluster workspace open. Hovering or keyboard-focusing a cluster core dissolves its icon and expands in place into a live cluster viewport — master, stack, and overflow — so you can peek into a cluster without leaving the overview."
      },
      {
        title: "Keyboard-navigable Apogee",
        description: "Apogee gains full keyboard navigation anchored on the last-focused window, so arrow-key selection stays oriented around where you came from instead of snapping back to the grid."
      },
      {
        title: "Cluster workspace animations",
        description: "Opening a cluster cascades tiled members in from the left with a per-member stagger and tunes the stacking card grow-in; closing sucks each member into its core. A new animations.cluster block controls open and close timing per layout."
      },
      {
        title: "Inertial field zoom",
        description: "Camera zoom now behaves like a powered lens, injecting velocity into log view-size space so repeated inputs accelerate and then coast with configurable friction."
      },
      {
        title: "Fullscreen and resize fixes",
        description: "Fullscreen exits animate back to restored geometry, genuine exits restore the previous camera, and border resize handling gets clearer edge grabs, hover handles, and persistent raise behavior."
      },
      {
        title: "Maximize and fullscreen, exclusive",
        description: "Maximize and fullscreen are now mutually exclusive per monitor: entering one exits the other, and a client unmaximize can no longer dismiss a user-initiated fullscreen. Both now ease the camera on the same fixed curve as the window grow and shrink, removing the asymptotic settle that made the zoom feel stuck near the end."
      },
      {
        title: "Nested on purpose",
        description: "halley --nested explicitly launches the winit backend in a visible host window without replacing the session IPC socket or running full-session autostart."
      },
      {
        title: "Portal chooser overlay",
        description: "Portal capture gets a Halley-native source chooser with monitor picking, window picking, direct single-source selection, and screenshot-style hovered-window highlighting."
      },
      {
        title: "Rendering stability",
        description: "Blur rendering now captures the framebuffer at the right z-order, masks transparent layer-shell surfaces correctly, survives per-frame blur failures, and handles overlay-only frames."
      },
      {
        title: "GPU-accelerated clients and persistent shells",
        description: "Halley now binds its EGL display to Wayland so GPU-accelerated clients (Quickshell, Qt/EGL, GL apps) get a server-side wl_drm and stop crashing with EGL_BAD_DISPLAY or EGL_BAD_SURFACE. Persistent layer-shell panels such as bars and launchers also no longer swallow hover-focus or clicks meant for the desktop behind them."
      },
      {
        title: "Game and Xwayland paths",
        description: "SDL apps can fall back to X11/Xwayland again, RandR primary output state is more reliable, and fullscreen/popup behavior gets another round of Steam and game-focused fixes."
      },
      {
        title: "Games go fullscreen on launch",
        description: "Game-like windows (steam_app_*, gamescope) now auto-fullscreen on top of whatever layout they joined once their app id arrives, mirroring what most games request via set_fullscreen anyway."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley", "yay -S halley-full", "paru -S halley-full", "yay -S halley-lift", "paru -S halley-lift"],
      aurDev: ["yay -S halley-git", "paru -S halley-git"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.5.0\ncargo build --release"
    },
    notes: [
      "The wiki now defaults to v0.5.0 while v0.4.0 and earlier releases remain available from the version picker.",
      "AUR packaging adds halley-git for the latest source build, halley-lift for the standalone command palette, and halley-full as the ecosystem bundle. For v0.5.0, halley-full installs Halley with Lift and selected first-party ecosystem pieces.",
      "Existing decorations.shadows config is migrated into effects.shadows by the updater, but the legacy key is no longer parsed after that move. New installs also get the background/gesso defaults for the animated builtin space shader.",
      "Packaged portal configuration now prefers the new xdg-desktop-portal-halley backend for capture while GTK remains the fallback for other portal interfaces."
    ],
    thanks: [
      "Thanks to everyone testing portals, OBS and Discord capture paths, Lift workflows, Apogee overview behavior, blur-heavy configs, nested compositor sessions, and touchpad gestures during the v0.5 cycle.",
      "The reports around capture black frames, popup blur, icon stalls, Apogee previews, fullscreen restoration, and device behavior shaped this release directly."
    ],
    closing: "Glass makes the field readable; gravity keeps it grounded."
  },
  {
    slug: "the-ecosystem-begins",
    title: "The Ecosystem Begins",
    version: "v0.5.0",
    date: "2026-06-14",
    eyebrow: "On the Horizon",
    kind: "preview",
    summary: "A look ahead: Halley's first ecosystem app — a compositor-integrated app launcher — is on approach in the next release, alongside a new halley-full package for everything the ecosystem will carry.",
    intro: [
      "Halley has always been one compositor on its own field. The next release is where that begins to change: it brings the first app built to live alongside it.",
      "This is a heads-up rather than a changelog — nothing to install yet. But the shape of what comes next is worth a quiet look."
    ],
    features: [
      {
        title: "A first ecosystem app",
        description: "The next release introduces a Halley-integrated app launcher — the first companion app designed to work directly with the compositor rather than beside it."
      },
      {
        title: "The halley-full package",
        description: "A new halley-full AUR package will pull in every ecosystem app at once, so you can adopt the whole set with a single install as it grows."
      },
      {
        title: "Still à la carte",
        description: "Each ecosystem app will also ship as its own package. halley-full is the convenience path; individual installs stay available for those who want only certain pieces."
      }
    ],
    notes: [
      "Nothing here is released yet — halley remains the current stable package until the launcher lands.",
      "When it ships, halley-full will bundle all ecosystem apps, current and future, and grow as the ecosystem grows.",
      "Ecosystem apps will also be published individually for users who prefer to pick and choose."
    ],
    thanks: [
      "Thanks to everyone who stuck around long enough to watch Halley grow past a single window on the field.",
      "This is the start of the ecosystem, not the end of the compositor work."
    ],
    closing: "More to come as it gets closer."
  },
  {
    slug: "big-picture",
    title: "Big Picture",
    version: "v0.4.0",
    date: "2026-06-12",
    eyebrow: "Release News",
    summary: "Halley v0.4.0 brings compositor fullscreen controls, Gamescope launch support, fixed-size and translucent window rules, and deeper game/session stability.",
    intro: [
      "Halley's fourth release is about making the compositor easier to launch, debug, and trust during fullscreen-heavy daily use.",
      "v0.4.0 adds compositor-owned fullscreen toggling, first-class Gamescope wrapping, explicit config selection, and new rule controls while tightening the cluster, Steam, popup, and game paths that matter most when the desktop is under load."
    ],
    features: [
      {
        title: "Fullscreen on demand",
        description: "A new mod+f default binding toggles compositor-initiated fullscreen on the focused window, with configurable fullscreen animations for browser videos and apps."
      },
      {
        title: "Gamescope launch support",
        description: "The new gamescope config block and halleyctl gamescope run helper wrap game launches with monitor-aware dimensions, per-game profiles, and safe fallback when gamescope is unavailable."
      },
      {
        title: "More capable window rules",
        description: "Rules can now set opacity and optional initial width or height, including live opacity updates when config or app metadata changes."
      },
      {
        title: "Explicit config selection",
        description: "halley --help documents startup options, and halley --config can select a config path with precedence over HALLEY_WL_CONFIG."
      },
      {
        title: "Debug controls",
        description: "A new debug block exposes an FPS overlay and focus-ring resize preview control for diagnosing compositor behavior without changing normal defaults."
      },
      {
        title: "Cluster workspace fixes",
        description: "Tiled and stacking clusters handle transitions, detachments, monitor transfers, stale captures, and drag/drop behavior more reliably."
      },
      {
        title: "Steam and game stability",
        description: "Gamescope-managed and Steam game windows get safer pointer routing, overlay suppression, popup placement, and fullscreen close/restore handling."
      },
      {
        title: "Rendering and lifecycle cleanup",
        description: "Window render routing, close teardown, spawn reveal state, frame-loop activity, and render-state ownership are split into clearer internal paths."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-dev", "paru -S halley-dev"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.4.0\ncargo build --release"
    },
    notes: [
      "The wiki now defaults to v0.4.0 while v0.3.2 and earlier releases remain available from the version picker.",
      "Existing configs are migrated forward where possible. New public config areas include debug, gamescope, animations.fullscreen, and window-rule opacity, width, and height.",
      "halley-session remains the recommended full-session launcher; halley --session is documented for session wrappers, packagers, and service files."
    ],
    thanks: [
      "Thanks to everyone testing fullscreen games, Steam workflows, cluster layouts, config reloads, and native sessions through the fourth release cycle.",
      "The detailed reports around pointer locks, stacked clusters, tiled transitions, popup placement, and fullscreen restore behavior shaped this release directly."
    ],
    closing: "v0.4.0 clears the path for the next one."
  },
  {
    slug: "v0-3-2-small-fixes",
    title: "0.3.2 Small Fixes",
    version: "v0.3.2",
    date: "2026-05-31",
    eyebrow: "Release News",
    summary: "Halley v0.3.2 is a focused patch for stale rendered textures in tiled cluster members.",
    intro: [
      "Halley v0.3.2 is a small follow-up release for one tiled-cluster reveal regression found after v0.3.1.",
      "The patch keeps the v0.3.x behavior unchanged while making newly committed tiled cluster members clear their pending reveal state at the right time."
    ],
    features: [
      {
        title: "Tiled cluster reveal fixed",
        description: "Pending initial reveal state is cleared once committed geometry arrives for tiled cluster members."
      },
      {
        title: "Focused terminals repaint correctly",
        description: "Focused terminals in tiled clusters no longer keep stale rendered textures while input continues to reach the client."
      },
      {
        title: "No config changes",
        description: "This release does not require wiki content or configuration changes; it only advances the current release links to v0.3.2."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-dev", "paru -S halley-dev"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.3.2\ncargo build --release"
    },
    notes: [
      "This release is recommended for v0.3.1 users working in tiled clusters.",
      "No config changes are required.",
      "The wiki version picker now defaults to v0.3.2 while keeping v0.3.1 available as an archived release."
    ],
    thanks: [
      "Thanks to the users who caught the tiled cluster stale-texture behavior quickly after v0.3.1.",
      "The focused reproduction kept this patch small."
    ],
    closing: "0.3.2 keeps the 0.3 line steady."
  },
  {
    slug: "v0-3-1-hotfix",
    title: "0.3.1 Hotfix",
    version: "v0.3.1",
    date: "2026-05-31",
    eyebrow: "Release News",
    summary: "Halley v0.3.1 is a focused hotfix for landmark/window overlap transfer and fullscreen game reveal regressions in v0.3.0.",
    intro: [
      "Halley v0.3.1 is a small emergency release for two regressions found after the v0.3.0 release.",
      "This update keeps the v0.3.0 presentation and overlap model intact while restoring the missing handoff paths that made landmark collisions and fullscreen game launches unreliable."
    ],
    features: [
      {
        title: "Landmark transfer restored",
        description: "Dragged windows once again transfer force through landmarks into passive expanded windows, preventing landmarks from sliding underneath neighboring windows after release."
      },
      {
        title: "Release overlap cleanup",
        description: "Any remaining landmark/window overlap is resolved after a drag ends while expanded windows can still overlap each other directly."
      },
      {
        title: "Game reveal fixed",
        description: "Fullscreen and presentation-state windows now finish their initial commit reveal path before later commits use the presentation-only fast path, fixing games that launched with audio but no image."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-dev", "paru -S halley-dev"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.3.1\ncargo build --release"
    },
    notes: [
      "This release is recommended for all v0.3.0 users.",
      "No config changes are required.",
      "The release keeps expanded-window overlap behavior from v0.3.0 while restoring non-overlap guarantees for landmark/window contacts."
    ],
    thanks: [
      "Thanks to the users who reproduced the landmark collision and fullscreen game launch regressions quickly after v0.3.0.",
      "The focused reports made it possible to isolate both fixes without rolling back the rest of the release."
    ],
    closing: "0.3.1 steadies the 0.3 line."
  },
  {
    slug: "steady-field",
    title: "Steady Field",
    version: "v0.3.0",
    date: "2026-05-30",
    eyebrow: "Release News",
    summary: "Halley v0.3.0 is preparing to launch with normal overlapping windows, presentation-only maximize and fullscreen, stricter config diagnostics, and smoother native tty performance.",
    intro: [
      "Halley's third release is about making the spatial model feel less fragile and more direct. Expanded windows can now overlap like real windows, while nodes, cluster cores, and pinned landmarks remain readable map objects on the field.",
      "v0.3.0 also changes maximize and fullscreen into presentation states instead of placement operations. They preserve field geometry, stop shoving nearby work out of the way, and participate in normal raise order so another window can appear above them until you explicitly raise the maximized or fullscreen window again."
    ],
    features: [
      {
        title: "Normal window overlap",
        description: "Expanded windows may overlap other expanded windows. Collapsed nodes, cluster cores, and pinned landmarks still keep non-overlapping readable positions."
      },
      {
        title: "Presentation-only maximize and fullscreen",
        description: "Maximize and fullscreen preserve field geometry, avoid displacing bystanders, and use normal focus and raise ordering."
      },
      {
        title: "Pinned field objects",
        description: "Pinned windows, nodes, and cluster cores stay locked in place, show pin badges, and remain visible in Bearings without forcing global top-layer rendering."
      },
      {
        title: "Placement controls",
        description: "A new placement block controls expanded spawn strategy, landmark blocker behavior, and post-placement reveal panning."
      },
      {
        title: "Config diagnostics",
        description: "Startup and reload failures now surface as scrollable compositor overlays with strict unknown-key diagnostics and suggestions."
      },
      {
        title: "Animation polish",
        description: "Close animations can shrink or fade, maximize animates visually without moving field geometry, and collapsed nodes slide out reliably when decay condenses crowded work."
      },
      {
        title: "Native tty pacing",
        description: "Presentation feedback, targeted redraws, direct-scanout guards, cursor pacing, and render filtering reduce unnecessary multi-monitor work."
      },
      {
        title: "Game and fullscreen stability",
        description: "Pointer constraints, client cursors, fullscreen video pacing, and direct scanout behavior are more stable across native tty sessions."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-dev", "paru -S halley-dev"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ngit checkout v0.3.0\ncargo build --release"
    },
    notes: [
      "The wiki now defaults to v0.3.0 while v0.2.0 and v0.1.0 remain available from the version picker.",
      "Existing configs are migrated forward where possible. New sections include placement, field.pins, input.raise-on-click, animation controls, and stricter overlay diagnostics.",
      "The old rule overlap-policy key is retained as a no-op compatibility alias; use spawn-placement and cluster-participation \"float\" for current floating dialog behavior."
    ],
    thanks: [
      "Thanks to everyone testing overlap, fullscreen games, native tty behavior, config reloads, and multi-monitor workflows during the 0.3.0 cycle.",
      "The detailed bug reports around maximize, fullscreen, cursor pacing, and collapsed-node motion directly shaped this release."
    ],
    closing: "v0.3.0 makes the field feel steadier."
  },
  {
    slug: "daily-driver",
    title: "Daily Driver",
    version: "v0.2.0",
    date: "2026-04-28",
    eyebrow: "Release News",
    summary: "Halley v0.2.0 is out with focus cycling, maximize sessions, cluster slots, session launch support, and native rendering fixes.",
    intro: [
      "Halley's second release is about making the compositor easier to live in every day. v0.2.0 adds faster focus switching, monitor-local maximize sessions, numbered cluster slots, display-manager session assets, and configurable compositor-drawn shadows.",
      "This release also spends a lot of work on native tty reliability: udev-driven output rescans, stronger DRM frame recovery, better vblank pacing, explicit sync waits, and safer fullscreen direct-scanout behavior for stricter drivers. Existing configs are carried forward through bootstrap merging so new defaults can arrive without wiping local rules, env, or autostart blocks."
    ],
    features: [
      {
        title: "Focus cycling",
        description: "Alt+Tab and Alt+Shift+Tab now open a modal switcher with window previews, app icons, monitor labels, and keyboard hints."
      },
      {
        title: "Monitor-local maximize",
        description: "mod+m centers and maximizes the focused field window on its monitor, snapshots displaced windows, then restores the camera and layout cleanly."
      },
      {
        title: "Cluster slots",
        description: "Each monitor gets slots 1 through 10 with default mod+1 through mod+0 bindings and matching halleyctl cluster slot commands."
      },
      {
        title: "Fullscreen overlap fixes",
        description: "Overlap-rule windows can appear above fullscreen content without immediately forcing apps windowed or breaking the fullscreen lock."
      },
      {
        title: "Smoother edge panning",
        description: "Drag edge panning now uses camera smoothing, zoom-aware speed, and edge pressure so field motion feels less abrupt."
      },
      {
        title: "Display-manager sessions",
        description: "Halley now ships Wayland session assets and a native halley --session path for SDDM and other display managers."
      },
      {
        title: "Config merging",
        description: "Existing user configs pick up new template sections, options, and default keybinds without overwriting custom rules, env, or autostart blocks."
      },
      {
        title: "Configurable shadows",
        description: "Window, node, and overlay shadows are now controlled through decorations.shadows with per-layer blur, spread, offset, and color."
      },
      {
        title: "Native tty recovery",
        description: "DRM page-flip recovery, udev rescans, timestamp-paced vblank throttling, explicit sync waits, and frame diagnostics reduce native rendering stalls."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-dev", "paru -S halley-dev"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ncargo build --release"
    },
    notes: [
      "The wiki now defaults to v0.2.0 while v0.1.0 remains available from the version picker.",
      "If you already have a config, Halley can merge in newly introduced defaults while preserving custom rules, env, and autostart blocks.",
      "For native tty troubleshooting, v0.2.0 includes direct-scanout controls and frame diagnostics such as HALLEY_DISABLE_DIRECT_SCANOUT, HALLEY_FORCE_COMPOSED, and HALLEY_FRAME_STATS."
    ],
    thanks: [
      "Thanks to everyone who tested fullscreen games, native tty sessions, config reloads, and multi-monitor workflows after the first release.",
      "The feedback from those rough edges directly shaped this release."
    ],
    closing: "v0.2.0 is about daily-driver stability."
  },
  {
    slug: "first-light",
    title: "First Light",
    version: "v0.1.0",
    date: "2026-04-17",
    eyebrow: "Release News",
    summary: "Halley's first public release is here.",
    intro: [
      "This is the foundation of a spatial Wayland compositor built around Fields, nodes, clusters, and intentional multi-monitor navigation. Each monitor gets its own independent infinite canvas. Windows live as nodes on that canvas, can be grouped into clusters you create deliberately, and can decay gracefully when they drift out of focus.",
      "Halley is still early, and there is a lot more ahead. This project is a long marathon, not a sprint, but this release marks the beginning."
    ],
    features: [
      {
        title: "Per-monitor Fields",
        description: "Each display has its own independent infinite 2D canvas with pan and zoom."
      },
      {
        title: "Nodes and decay",
        description: "Windows exist as nodes on the Field and can dim or collapse over time when they move significantly outside the configurable focus ring."
      },
      {
        title: "Focus Ring",
        description: "The active eye-shaped region that defines where windows stay active and where decay begins."
      },
      {
        title: "Clusters and cores",
        description: "Halley's answer to workspaces: intentionally built groups of windows that collapse into a core on the Field and can be re-entered later."
      },
      {
        title: "Cluster layouts",
        description: "Support for both weighted tiling and stacking layouts inside clusters."
      },
      {
        title: "Trail navigation",
        description: "Move backward and forward through recent focus history."
      },
      {
        title: "Bearings",
        description: "Directional overlays and navigation cues to help orient movement around the current view."
      },
      {
        title: "Jump / Field Jump",
        description: "Move grabbed windows across monitors between independent Fields."
      },
      {
        title: "IPC",
        description: "Unix socket control via $XDG_RUNTIME_DIR/halley/halley.sock."
      },
      {
        title: "Xwayland support",
        description: "On-demand X11 compatibility through xwayland-satellite."
      },
      {
        title: "Bootstrapped configuration",
        description: "On first launch, Halley generates a documented halley.rune config and inserts detected tty monitors into the viewport section."
      }
    ],
    install: {
      aur: ["yay -S halley", "paru -S halley"],
      aurDev: ["yay -S halley-git", "paru -S halley-git"],
      source: "git clone https://github.com/saltnpepper97/halley\ncd halley\ncargo build --release"
    },
    notes: [
      "This is an initial release, not the final shape of the project.",
      "More systems, refinement, polish, and iteration are still ahead.",
      "Halley is already usable and real, but it is also still growing into itself."
    ],
    thanks: [
      "Thanks to everyone following the project this early.",
      "There is a long way to go, and that is part of the point."
    ],
    closing: "This is where it starts."
  }
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Format an ISO date string (YYYY-MM-DD) without going through Date(), so the
// rendered day never shifts across timezones during prerender or hydration.
export function formatNewsDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

// Short label used on feed timeline markers, e.g. "Jun 30 2026".
export function formatNewsDateShort(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1].slice(0, 3)} ${day} ${year}`;
}

// Classifies a post for the small status chip shown on cards and articles.
export function newsKindLabel(post: NewsPost): string {
  if (post.kind === "preview") return "Preview";
  if (/^v\d+\.\d+\.[1-9]/.test(post.version)) return "Patch";
  return "Release";
}

// Posts sorted newest-first by date, with array order as a stable tiebreaker.
export const sortedNewsPosts: NewsPost[] = newsPosts
  .map((post, index) => ({ post, index }))
  .sort((a, b) =>
    a.post.date === b.post.date
      ? a.index - b.index
      : a.post.date < b.post.date
        ? 1
        : -1
  )
  .map((entry) => entry.post);
