<script lang="ts">
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import { base } from "$app/paths";
</script>
<svelte:head><title>The Field workflow | Halley 0.8</title><meta name="description" content="The Halley 0.8 Field workflow: launch, arrange, collapse, retrieve, and optionally create clusters." /></svelte:head>
<article class="workflow surface hud-corners">
  <p class="eyebrow">Halley 0.8</p><h1>The Field comes first</h1>
  <p>A fresh session starts with an empty Field. Open applications there, move them freely, and keep work visible. A cluster is an optional named context, not a prerequisite for using the desktop.</p>
  <h2>Five operations to start with</h2>
  <ul><li><strong>Mod+D:</strong> open Lift to launch apps or retrieve nodes, clusters, actions, and configuration.</li>
    <li><strong>Mod+left-drag:</strong> move a window across the Field.</li>
    <li><strong>Mod+A:</strong> arrange visible windows into a monitor-local mosaic; press it again to restore their exact saved geometry.</li>
    <li><strong>Mod+N:</strong> collapse or restore a window as a node.</li>
    <li><strong>Mod+O:</strong> open Apogee for an overview.</li></ul>
  <p>The generated configuration uses these bindings. Existing configurations retain their bindings. The non-modal basics card appears on the first native launch of each Halley version, including with an existing configuration, and stays dismissed for that version. Reopen it using Lift's action provider or <code>halleyctl basics</code>.</p>
  <h2>Attention, nodes, and retrieval</h2>
  <p>Nodes preserve windows as readable landmarks. Directional Field focus reaches expanded windows, nodes, and collapsed cluster cores. Automatic decay pauses for arranged windows and begins a fresh timer when the arrangement is undone.</p>
  <p>Fresh configurations wait 600 seconds outside the focus ring and 5,400 seconds inside it before decay. Existing explicit values stay unchanged; omitting the decay section retains the built-in 180 and 1,800 second values. A one-time notice explains the first automatic collapse.</p>
  <h2>Clusters when context helps</h2>
  <p>Create clusters deliberately through the Cluster Composer or Lift's cluster drafts. In a cluster search, Space stages apps or running nodes, then Ctrl+Enter hands the draft to Halley's naming and confirmation prompt. Empty named cores remain available after the last member closes.</p>
  <p>Startup clusters are optional. This declaration creates a named empty context without launching applications:</p>
  <CodeBlock code={`autostart:
  cluster:
    name "Work"
    members []
  end
end`} label="optional startup context" />
  <p>Declarations can also specify layout, output, and application members. Launch attribution groups matching new windows into the declared context. Fresh configurations contain no active cluster declarations.</p>
  <h2>Moving across and through outputs</h2>
  <p>Mod+Alt+Shift+Arrow transfers the focused Field window to a neighboring monitor. Mod+Shift+left-drag instead pans a grabbed window through its current output's Field when it dwells at an edge. Directional Field panning also has an optional keyboard action and <code>halleyctl pan</code> commands.</p>
  <h2>Screenshots and overlays</h2>
  <p>A native screenshot presents Copy and Open controls. Hover keeps its preview visible, and copied PNG contents survive the preview. Notification offsets are signed values relative to the chosen anchor. Custom opening/closing shaders preserve the configured geometry path and fall back when unavailable.</p>
  <h2>Updating an existing configuration</h2>
  <p>Halley does not rewrite or back up your configuration. The former config migrate command is removed. Edit the bindings or defaults you want, verify them, then reload:</p>
  <CodeBlock code={`halleyctl config verify
halleyctl reload`} label="verify and reload" />
  <p><a href={`${base}/wiki/config?version=0.8.0`}>Use the 0.8 configuration reference</a> for exact options and generated examples. The version picker retains older references.</p>
  <h2>Desktop integration notes</h2>
  <p>Taskbars and docks can list windows through foreign-toplevel protocols and enumerate clusters through ext-workspace-v1. Native input methods use upstream text-input-v3 and input-method-v2; locking disconnects IME clients, so reconnect or restart your IME after unlock.</p>
  <p>Hardware cursor planes are enabled where supported. Set cursor.disable-hardware-cursor to true and reload if your driver shows cursor artifacts. Blur and local animations retain conservative full-output repaints.</p>
  <h2>Independent ecosystem versions</h2>
  <p>Lift and Halley UI live in separate repositories and follow their own release versions. The compositor workspace builds Halley, halleyctl, and its portal backend. Install Lift separately or use the halley-full ecosystem package.</p>
</article>
<style>.workflow { padding: clamp(1.3rem, 4vw, 2.5rem); display: grid; gap: 1rem; min-width: 0; } h1 { font-size: clamp(2rem, 4vw, 3rem); } h2 { margin-top: 1.3rem; } p, li { color: var(--text-2); line-height: 1.7; } ul { padding-left: 1.5rem; } li { margin-bottom: .5rem; } a { color: var(--accent); }</style>
