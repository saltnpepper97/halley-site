<script lang="ts">
  import type { ConfigOption } from "$lib/wiki/config-reference";

  let { options }: { options: ConfigOption[] } = $props();
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Option</th>
        <th>Type</th>
        <th>Default</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {#each options as option}
        <tr>
          <td data-label="Option"><code>{option.option}</code></td>
          <td data-label="Type"><span class="type-pill">{option.type}</span></td>
          <td data-label="Default"><code class="default-value">{option.defaultValue}</code></td>
          <td data-label="Notes">{option.notes}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    overflow: hidden;
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: rgba(3, 6, 10, 0.46);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    table-layout: fixed;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 23%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 8.5rem;
    text-align: center;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 10rem;
    text-align: center;
  }

  th,
  td {
    padding: 0.85rem 0.95rem;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid rgba(246, 239, 231, 0.08);
  }

  th {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.1);
    font-family: var(--font-display);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tbody tr {
    transition: background 140ms ease;
  }

  tbody tr:hover {
    background: rgba(246, 239, 231, 0.035);
  }

  :global(:root[data-theme="light"]) .table-wrap {
    background: rgba(255, 255, 255, 0.48);
    border-color: rgba(38, 27, 20, 0.13);
  }

  :global(:root[data-theme="light"]) th,
  :global(:root[data-theme="light"]) td {
    border-bottom-color: rgba(38, 27, 20, 0.1);
  }

  :global(:root[data-theme="light"]) th {
    background: rgba(184, 63, 17, 0.09);
  }

  :global(:root[data-theme="light"]) tbody tr:hover {
    background: rgba(38, 27, 20, 0.045);
  }

  :global(:root[data-theme="light"]) .type-pill {
    background: rgba(40, 95, 115, 0.09);
    border-color: rgba(40, 95, 115, 0.18);
  }

  code {
    color: var(--accent-soft);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.9em;
    overflow-wrap: anywhere;
  }

  .default-value {
    display: inline-block;
    max-width: 100%;
    color: var(--ion);
    overflow-wrap: anywhere;
  }

  .type-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 4.5rem;
    padding: 0.2rem 0.45rem;
    color: var(--text-1);
    background: rgba(125, 220, 255, 0.1);
    border: 1px solid rgba(125, 220, 255, 0.16);
    border-radius: 999px;
    font-size: 0.86rem;
    line-height: 1.25;
    text-align: center;
    white-space: normal;
  }

  @media (max-width: 720px) {
    table,
    thead,
    tbody,
    tr,
    th,
    td {
      display: block;
    }

    thead {
      display: none;
    }

    tr {
      padding: 0.8rem;
      border-bottom: 1px solid rgba(246, 239, 231, 0.08);
    }

    tr:last-child {
      border-bottom: 0;
    }

    td {
      display: grid;
      grid-template-columns: minmax(4.75rem, 0.36fr) minmax(0, 1fr);
      gap: 0.75rem;
      padding: 0.35rem 0;
      width: auto !important;
      min-width: 0;
      text-align: left !important;
      border-bottom: 0;
      overflow-wrap: anywhere;
    }

    td::before {
      color: var(--text-3);
      content: attr(data-label);
      font-family: var(--font-display);
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

  @media (max-width: 420px) {
    tr {
      padding: 0.7rem;
    }

    td {
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }
  }
</style>
