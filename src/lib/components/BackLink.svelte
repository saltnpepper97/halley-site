<!--
  Return link to a section index. Deliberately a plain text link rather than a
  button — it is navigation out of a page, not an action on it, so it should not
  compete with the page's own controls for weight.
-->
<script lang="ts">
  import { ArrowLeftIcon } from "phosphor-svelte";

  let { href, label }: { href: string; label: string } = $props();
</script>

<a class="back-link" {href}>
  <ArrowLeftIcon color="currentColor" weight="bold" size={16} />
  {label}
</a>

<style>
  .back-link {
    display: inline-flex;
    align-items: center;
    justify-self: start;
    gap: 0.4rem;
    color: var(--text-2);
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 800;
    transition: color 160ms ease;
  }

  .back-link:hover {
    color: var(--accent-soft);
  }
</style>
