<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import { defaultWikiVersion, wikiVersionFromSearch } from "$lib/wiki/versions";

  const activeVersion = () => browser ? wikiVersionFromSearch(page.url.searchParams) : defaultWikiVersion;
  const sourceInstall = () => `git clone https://github.com/saltnpepper97/halley
cd halley
git checkout v${activeVersion().label}
cargo build --release`;
  const helpCommand = "halley --help";
  const configCommand = "halley --config ~/.config/halley/halley.rune";
  const portalPackages = `xdg-desktop-portal-wlr
xdg-desktop-portal-gtk`;
  const portalEnvironment = `XDG_CURRENT_DESKTOP=Halley
XDG_SESSION_TYPE=wayland`;
  const portalRestart = `systemctl --user restart xdg-desktop-portal.service
systemctl --user start xdg-desktop-portal-wlr.service`;
  const sessionCommand = "halley-session";
  const sessionWrapperCommand = "halley --session";
</script>

<section id="install" class="install-guide surface hud-corners">
  <div class="section-heading">
    <p class="eyebrow">Getting started</p>
    <h1>Install Halley</h1>
    <p>
      Halley targets native Linux Wayland sessions. This page is showing install notes for
      <strong>v{activeVersion().label}</strong>.
    </p>
  </div>

  <article id="install-requirements" class="requirements-card">
    <div>
      <p class="card-kicker">Requirements</p>
      <h2>Before installing</h2>
      <p>Halley expects a real Wayland-capable Linux session with native graphics and input access.</p>
    </div>

    <ul>
      <li>DRM/KMS-capable graphics stack with GBM, EGL, and OpenGL support</li>
      <li>A seat/session backend through <code>libseat</code>, such as <code>seatd</code> or logind</li>
      <li><code>libinput</code> and <code>udev</code> access on a real TTY for the native backend</li>
      <li>Rust and Cargo if building from source</li>
    </ul>

    <p class="optional-title">Optional, but commonly useful:</p>
    <ul>
      <li><code>xwayland-satellite</code> for X11 app support</li>
      <li><code>gamescope</code> for wrapping game launches through <code>halleyctl gamescope</code></li>
      <li><code>xdg-desktop-portal-wlr</code> plus <code>xdg-desktop-portal-gtk</code> for portal screenshot and screencast flows</li>
      <li><code>fuzzel</code> and a Wayland terminal if using the default launch bindings</li>
    </ul>
  </article>

  <article id="install-arch" class="install-card">
    <div>
      <p class="card-kicker">Arch Linux</p>
      <h2>AUR packages</h2>
      <p>Install the stable package with your preferred AUR helper.</p>
    </div>

    <CodeBlock code="yay -S halley" label="yay" />
    <CodeBlock code="paru -S halley" label="paru" />

    <p>For the latest commit, install the development package.</p>

    <CodeBlock code="yay -S halley-dev" label="yay dev" />
    <CodeBlock code="paru -S halley-dev" label="paru dev" />
  </article>

  <article id="install-source" class="install-card">
    <div>
      <p class="card-kicker">Source</p>
      <h2>Build with Cargo</h2>
      <p>Clone the repository and build the release binary locally.</p>
    </div>

    <CodeBlock code={sourceInstall()} label="source build" />

    <p>The compositor binary will be available at <code>target/release/halley</code>.</p>
  </article>

  <article id="install-config" class="install-card">
    <div>
      <p class="card-kicker">Startup Options</p>
      <h2>Help and config selection</h2>
      <p>
        v0.4.0 documents startup flags through <code>halley --help</code>. Use
        <code>halley --config</code> to launch with an explicit config file; that path takes precedence over
        <code>HALLEY_WL_CONFIG</code>, the user config, the system config, and generated defaults.
      </p>
    </div>

    <CodeBlock code={helpCommand} label="help" />
    <CodeBlock code={configCommand} label="explicit config" />
  </article>

  <article id="install-session" class="install-card">
    <div>
      <p class="card-kicker">Display Manager</p>
      <h2>Launch as a Wayland session</h2>
      <p>
        Current Halley releases ship session assets for display managers such as SDDM. When
        installed from a package, pick Halley from the Wayland session list. The session entry
        starts Halley through the recommended public session launcher.
      </p>
    </div>

    <CodeBlock code={sessionCommand} label="session entry" />

    <p>
      Packagers, service files, and session wrappers can call the lower-level session flag directly
      when they already control the surrounding login environment.
    </p>

    <CodeBlock code={sessionWrapperCommand} label="session wrapper" />
  </article>

  <article id="install-portal" class="install-card portal-card">
    <div>
      <p class="card-kicker">Desktop Portal</p>
      <h2>Screenshot and screencast portal setup</h2>
      <p>
        Halley exposes the wlr screencopy protocol used by <code>xdg-desktop-portal-wlr</code>.
        Install the portal backend plus a general portal implementation so apps can request screen
        capture through the standard desktop portal APIs.
      </p>
    </div>

    <div class="portal-grid">
      <div class="portal-panel">
        <span>Packages</span>
        <CodeBlock code={portalPackages} label="packages" />
      </div>

      <div class="portal-panel">
        <span>Session environment</span>
        <CodeBlock code={portalEnvironment} label="environment" />
      </div>
    </div>

    <p>
      When Halley starts its native tty session, it exports the Wayland and desktop environment to
      D-Bus/systemd and queues a restart of <code>xdg-desktop-portal.service</code> plus a start of
      <code>xdg-desktop-portal-wlr.service</code>. If portal capture does not appear after login, restart those user services manually.
    </p>

    <CodeBlock code={portalRestart} label="portal services" />
  </article>
</section>

<style>
  .install-guide {
    display: grid;
    gap: 1rem;
    padding: clamp(1.2rem, 4vw, 2rem);
  }

  .section-heading {
    display: grid;
    gap: 0.7rem;
    max-width: 48rem;
    padding-bottom: 0.6rem;
  }

  .section-heading p:not(.eyebrow) {
    font-size: 1.05rem;
  }

  .requirements-card,
  .install-card {
    scroll-margin-top: calc(var(--header-height) + 2rem);
    display: grid;
    gap: 0.9rem;
    min-width: 0;
    max-width: 100%;
    padding: clamp(1rem, 3vw, 1.45rem);
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .requirements-card > *,
  .install-card > * {
    min-width: 0;
  }

  .requirements-card:target,
  .install-card:target {
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
  }

  ul {
    display: grid;
    gap: 0.55rem;
    min-width: 0;
    margin: 0;
    padding-left: 1.15rem;
    color: var(--text-2);
  }

  li,
  p {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  li::marker {
    color: var(--accent-soft);
  }

  .optional-title {
    color: var(--text-1);
    font-weight: 750;
  }

  .card-kicker {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1,
  h2 {
    text-wrap: balance;
  }

  h1 {
    font-size: clamp(2.1rem, 4vw, 3.4rem);
    letter-spacing: -0.04em;
  }

  h2 {
    margin-top: 0.25rem;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    letter-spacing: -0.03em;
  }

  code {
    color: inherit;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.92rem;
    overflow-wrap: anywhere;
    white-space: normal;
    word-break: break-word;
  }

  p code {
    padding: 0.12rem 0.35rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.1);
    border-radius: var(--radius-sm);
  }

  .portal-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;
  }

  .portal-panel {
    display: grid;
    gap: 0.45rem;
    min-width: 0;
    padding: 0.8rem;
    background: rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: var(--radius-md);
  }

  .portal-panel span {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 760px) {
    .portal-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .install-guide {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(1.85rem, 10vw, 2.5rem);
    }

  }
</style>
