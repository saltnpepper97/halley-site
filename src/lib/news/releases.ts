export type NewsFeature = {
  title: string;
  description: string;
};

export type NewsPost = {
  slug: string;
  title: string;
  version: string;
  eyebrow: string;
  // "release" is a shipped version; "preview" is a forward-looking teaser
  // that hides release-only chrome (version badge, install commands).
  kind?: "release" | "preview";
  summary: string;
  intro: string[];
  features: NewsFeature[];
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
    slug: "the-ecosystem-begins",
    title: "The Ecosystem Begins",
    version: "v0.5.0",
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
    slug: "fourth-orbit",
    title: "Fourth Orbit",
    version: "v0.4.0",
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
    closing: "Fourth orbit clears the path for the next one."
  },
  {
    slug: "v0-3-2-small-fixes",
    title: "0.3.2 Small Fixes",
    version: "v0.3.2",
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
    closing: "0.3.2 keeps the third orbit steady."
  },
  {
    slug: "v0-3-1-hotfix",
    title: "0.3.1 Hotfix",
    version: "v0.3.1",
    eyebrow: "Release News",
    summary: "Halley v0.3.1 is a focused hotfix for landmark/window overlap transfer and fullscreen game reveal regressions in v0.3.0.",
    intro: [
      "Halley v0.3.1 is a small emergency release for two regressions found after the third orbit release.",
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
    closing: "0.3.1 steadies the third orbit."
  },
  {
    slug: "third-orbit",
    title: "Third Orbit",
    version: "v0.3.0",
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
    closing: "Third orbit makes the field feel steadier."
  },
  {
    slug: "second-orbit",
    title: "Second Orbit",
    version: "v0.2.0",
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
    closing: "Second orbit is about daily-driver stability."
  },
  {
    slug: "first-orbit",
    title: "First Orbit",
    version: "v0.1.0",
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
    closing: "First orbit starts here."
  }
];
