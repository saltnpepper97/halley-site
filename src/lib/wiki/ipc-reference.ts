export type IpcCommand = {
  command: string;
  description: string;
  json?: boolean;
  addedIn?: string;
  removedIn?: string;
};

export type IpcGroup = {
  title: string;
  summary: string;
  commands: IpcCommand[];
};

export type IpcResponseShape = {
  name: string;
  fields: string[];
  changedIn?: string;
  addedIn?: string;
};

export const ipcGroups: IpcGroup[] = [
  {
    title: "Compositor",
    summary: "Session-level compositor requests and output state.",
    commands: [
      { command: "halleyctl quit", description: "Open Halley's compositor-owned exit confirmation." },
      { command: "halleyctl reload", description: "Reload Halley configuration." },
      { command: "halleyctl outputs", description: "Print output state.", json: true, removedIn: "0.6.0" },
      { command: "halleyctl outputs", description: "Print connected outputs, modes, positions, VRR support, and current state.", addedIn: "0.6.0" },
      { command: "halleyctl dpms off|on|toggle [-o OUTPUT]", description: "Set or toggle output power state." }
    ]
  },
  {
    title: "Configuration",
    summary: "Edit, verify, migrate, or reload the selected Rune configuration.",
    commands: [
      { command: "halleyctl config edit [-c PATH|--config PATH]", description: "Open the selected config with $VISUAL, $EDITOR, or vi.", addedIn: "0.6.0" },
      { command: "halleyctl config verify [-c PATH|--config PATH]", description: "Strictly parse and validate a complete config without applying it.", addedIn: "0.6.0" },
      { command: "halleyctl config migrate [--dry-run] [-c PATH|--config PATH]", description: "Apply versioned compatibility entries, validate the result, and retain a timestamped backup. Dry-run prints the proposed result.", addedIn: "0.6.0" }
    ]
  },
  {
    title: "Gamescope",
    summary: "Resolve and launch game commands through the configured gamescope wrapper.",
    commands: [
      { command: "halleyctl gamescope run [--app-id ID] -- <command...>", description: "Wrap and exec a game command through gamescope using the gamescope config. Use this in Steam launch options as halleyctl gamescope run -- %command%.", addedIn: "0.4.0", removedIn: "0.6.0" },
      { command: "halleyctl gamescope print [--app-id ID] -- <command...>", description: "Print the resolved gamescope command without running it.", addedIn: "0.4.0", removedIn: "0.6.0" }
    ]
  },
  {
    title: "Capture",
    summary: "Start Halley-native screenshot capture modes.",
    commands: [
      { command: "halleyctl capture menu", description: "Open the native capture menu.", removedIn: "0.6.0" },
      { command: "halleyctl capture menu [-o OUTPUT]", description: "Open the native capture menu, optionally on an exact output.", addedIn: "0.6.0" },
      { command: "halleyctl capture region [-o OUTPUT]", description: "Start region capture." },
      { command: "halleyctl capture screen [-o OUTPUT]", description: "Capture an output." },
      { command: "halleyctl capture window [-o OUTPUT]", description: "Start window capture." }
    ]
  },
  {
    title: "Portal",
    summary: "Inspect Halley's native desktop portal backend.",
    commands: [
      { command: "halleyctl portal status [--json]", description: "Check portal backend discovery, compositor IPC, advertised sources, cursor modes, and version details.", json: true, addedIn: "0.5.0" },
      { command: "halleyctl portal version [--json]", description: "Print the installed portal backend and running compositor versions.", json: true, addedIn: "0.5.0" }
    ]
  },
  {
    title: "Nodes",
    summary: "Inspect, focus, move, and close windows represented as Halley nodes.",
    commands: [
      { command: "halleyctl node list [-o OUTPUT] [--json]", description: "List nodes by output.", json: true },
      { command: "halleyctl node info [SELECTOR] [-o OUTPUT] [--json]", description: "Inspect a selected node.", json: true },
      { command: "halleyctl node focus [SELECTOR] [-o OUTPUT]", description: "Focus a selected node." },
      { command: "halleyctl node move left|right|up|down [SELECTOR] [-o OUTPUT]", description: "Move a node in field space." },
      { command: "halleyctl node collapse [SELECTOR] [-o OUTPUT]", description: "Collapse a selected surface into a node.", addedIn: "0.6.0" },
      { command: "halleyctl node restore [SELECTOR] [-o OUTPUT]", description: "Restore a collapsed node to a live surface.", addedIn: "0.6.0" },
      { command: "halleyctl node toggle [SELECTOR] [-o OUTPUT]", description: "Toggle a selected surface between live and collapsed states.", addedIn: "0.6.0" },
      { command: "halleyctl node close [SELECTOR] [-o OUTPUT]", description: "Close a selected node." }
    ]
  },
  {
    title: "Trail",
    summary: "Navigate the focus trail for the focused or selected output.",
    commands: [
      { command: "halleyctl trail prev [-o OUTPUT]", description: "Focus the previous trail entry." },
      { command: "halleyctl trail next [-o OUTPUT]", description: "Focus the next trail entry." },
      { command: "halleyctl trail list [-o OUTPUT] [--json]", description: "List trail entries.", json: true },
      { command: "halleyctl trail goto <TARGET> [-o OUTPUT]", description: "Focus a trail index or node selector." }
    ]
  },
  {
    title: "Monitor",
    summary: "Move focus between configured outputs.",
    commands: [
      { command: "halleyctl monitor focus <left|right|up|down|OUTPUT>", description: "Focus an adjacent monitor or named output." }
    ]
  },
  {
    title: "Bearings",
    summary: "Control the bearings overlay.",
    commands: [
      { command: "halleyctl bearings show", description: "Show bearings." },
      { command: "halleyctl bearings hide", description: "Hide bearings." },
      { command: "halleyctl bearings toggle", description: "Toggle bearings." },
      { command: "halleyctl bearings status", description: "Print current bearings visibility." }
    ]
  },
  {
    title: "Clusters",
    summary: "Inspect and manipulate cluster workspaces.",
    commands: [
      { command: "halleyctl cluster list [-o OUTPUT] [--json]", description: "List clusters by output.", json: true },
      { command: "halleyctl cluster inspect [current|ID] [-o OUTPUT] [--json]", description: "Inspect the active cluster or an id.", json: true, removedIn: "0.6.0" },
      { command: "halleyctl cluster info [current|ID|id:ID] [-o OUTPUT] [--json]", description: "Inspect the active cluster or an id. inspect remains an accepted alias.", json: true, addedIn: "0.6.0" },
      { command: "halleyctl cluster layout cycle [-o OUTPUT]", description: "Toggle the active cluster layout.", removedIn: "0.6.0" },
      { command: "halleyctl cluster layout-cycle [-o OUTPUT]", description: "Toggle the active cluster layout.", addedIn: "0.6.0" },
      { command: "halleyctl cluster slot <1-10> [-o OUTPUT]", description: "Activate or toggle the cluster in a numbered slot.", addedIn: "0.2.0" }
    ]
  },
  {
    title: "Stack",
    summary: "Navigate active stacking decks.",
    commands: [
      { command: "halleyctl stack cycle forward [-o OUTPUT]", description: "Cycle the active stack forward." },
      { command: "halleyctl stack cycle backward [-o OUTPUT]", description: "Cycle the active stack backward." }
    ]
  },
  {
    title: "Tile",
    summary: "Move focus or swap tiles inside active tiled layouts.",
    commands: [
      { command: "halleyctl tile focus left|right|up|down [-o OUTPUT]", description: "Move focus to an adjacent visible tile." },
      { command: "halleyctl tile swap left|right|up|down [-o OUTPUT]", description: "Swap the focused tile with an adjacent visible tile." }
    ]
  }
];

export const selectors = [
  { value: "focused", description: "The currently focused node." },
  { value: "latest", description: "The most recently active matching node." },
  { value: "id:<id>", description: "A session-scoped numeric node id." },
  { value: "title:<text>", description: "A title substring match." },
  { value: "app:<app-id>", description: "An app id match." }
];

export const responseShapes: IpcResponseShape[] = [
  {
    name: "NodeInfo",
    fields: [
      "id",
      "title",
      "app_id",
      "output",
      "kind",
      "state",
      "visible",
      "focused",
      "latest",
      "role",
      "protocol_family",
      "modal",
      "parent",
      "transient_for",
      "child_popup_count",
      "pos_x",
      "pos_y",
      "width",
      "height"
    ]
  },
  {
    name: "ClusterSummary",
    fields: ["id", "name", "output", "layout", "member_count", "active", "focused"]
  },
  {
    name: "ClusterInfo",
    fields: [
      "id",
      "name",
      "output",
      "layout",
      "member_count",
      "active",
      "focused",
      "focused_member_index",
      "focused_member_id",
      "members"
    ]
  },
  {
    name: "TrailInfo",
    fields: ["output", "cursor_index", "entries"],
    addedIn: "0.6.0"
  },
  {
    name: "OutputInfo",
    fields: ["name", "modes", "current_mode", "offset_x", "offset_y", "vrr", "vrr_supported", "vrr_active"],
    addedIn: "0.6.0"
  }
];

export const responseShapeAvailableInVersion = (shape: IpcResponseShape, version: string) =>
  !shape.addedIn || version >= shape.addedIn;

export const commandAvailableInVersion = (command: IpcCommand, version: string) =>
  (!command.addedIn || version >= command.addedIn) &&
  (!command.removedIn || version < command.removedIn);

export const fieldsForVersion = (shape: IpcResponseShape, version: string) => {
  if (version >= "0.6.0") {
    switch (shape.name) {
      case "NodeInfo":
        return [
          "id", "title", "app_id", "output", "kind", "state", "visible", "focused",
          "latest", "pinned", "role", "protocol_family", "modal", "parent",
          "transient_for", "child_popup_count", "x", "y", "width", "height"
        ];
      case "ClusterSummary":
        return ["id", "slot", "name", "output", "layout", "member_count", "active", "focused"];
      case "ClusterInfo":
        return ["summary", "core_node_id", "members"];
      case "TrailInfo":
        return ["output", "cursor_index", "entries"];
      case "OutputInfo":
        return ["name", "modes", "current_mode", "offset_x", "offset_y", "vrr", "vrr_supported", "vrr_active"];
    }
  }

  if (version >= "0.2.0" && (shape.name === "ClusterSummary" || shape.name === "ClusterInfo")) {
    return ["slot", ...shape.fields];
  }

  return shape.fields;
};
