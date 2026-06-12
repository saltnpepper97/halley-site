export type IpcCommand = {
  command: string;
  description: string;
  json?: boolean;
  addedIn?: string;
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
};

export const ipcGroups: IpcGroup[] = [
  {
    title: "Compositor",
    summary: "Session-level compositor requests and output state.",
    commands: [
      { command: "halleyctl quit", description: "Ask the running compositor to exit." },
      { command: "halleyctl reload", description: "Reload Halley configuration." },
      { command: "halleyctl outputs", description: "Print output state.", json: true },
      { command: "halleyctl dpms off|on|toggle [-o OUTPUT]", description: "Set or toggle output power state." }
    ]
  },
  {
    title: "Gamescope",
    summary: "Resolve and launch game commands through the configured gamescope wrapper.",
    commands: [
      { command: "halleyctl gamescope run [--app-id ID] -- <command...>", description: "Wrap and exec a game command through gamescope using the gamescope config. Use this in Steam launch options as halleyctl gamescope run -- %command%.", addedIn: "0.4.0" },
      { command: "halleyctl gamescope print [--app-id ID] -- <command...>", description: "Print the resolved gamescope command without running it.", addedIn: "0.4.0" }
    ]
  },
  {
    title: "Capture",
    summary: "Start Halley-native screenshot capture modes.",
    commands: [
      { command: "halleyctl capture menu", description: "Open the native capture menu." },
      { command: "halleyctl capture region [-o OUTPUT]", description: "Start region capture." },
      { command: "halleyctl capture screen [-o OUTPUT]", description: "Capture an output." },
      { command: "halleyctl capture window [-o OUTPUT]", description: "Start window capture." }
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
      { command: "halleyctl cluster inspect [current|ID] [-o OUTPUT] [--json]", description: "Inspect the active cluster or an id.", json: true },
      { command: "halleyctl cluster layout cycle [-o OUTPUT]", description: "Toggle the active cluster layout." },
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
  }
];

export const commandAvailableInVersion = (command: IpcCommand, version: string) =>
  !command.addedIn || version >= command.addedIn;

export const fieldsForVersion = (shape: IpcResponseShape, version: string) => {
  if (version >= "0.2.0" && (shape.name === "ClusterSummary" || shape.name === "ClusterInfo")) {
    return ["slot", ...shape.fields];
  }

  return shape.fields;
};
