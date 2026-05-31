export type NewsFeature = {
  title: string;
  description: string;
};

export type NewsPost = {
  slug: string;
  title: string;
  version: string;
  eyebrow: string;
  summary: string;
  intro: string[];
  features: NewsFeature[];
  install: {
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
        title: "Aperture improvements",
        description: "Aperture can follow the cursor, target fixed outputs, or run on every output, with styling controls and status IPC."
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
