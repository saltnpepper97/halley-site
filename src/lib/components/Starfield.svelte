<!--
  Layered starfield. Three depth planes drift at different speeds and directions
  for parallax; the near plane twinkles. Sizes are deliberately non-commensurate
  so the dot pattern never visibly tiles. Decorative only.
-->
<div class="starfield" aria-hidden="true">
  <div class="star-layer layer-far"></div>
  <div class="star-layer layer-mid"></div>
  <div class="star-layer layer-near"></div>
</div>

<style>
  .starfield {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    mask-image: linear-gradient(to bottom, black 0%, black 58%, transparent 94%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 58%, transparent 94%);
  }

  .star-layer {
    position: absolute;
    inset: -25%;
    background-repeat: repeat;
    will-change: transform;
  }

  /* Far plane: dense, faint, tiny — the dust of the sky. */
  .layer-far {
    background-image:
      radial-gradient(circle, rgba(246, 239, 231, 0.5) 0 0.6px, transparent 1.2px),
      radial-gradient(circle, rgba(125, 220, 255, 0.34) 0 0.6px, transparent 1.2px),
      radial-gradient(circle, rgba(246, 239, 231, 0.28) 0 0.5px, transparent 1px);
    background-size:
      6.7rem 6.7rem,
      9.3rem 9.3rem,
      5.1rem 5.1rem;
    background-position:
      0 0,
      3.2rem 5.4rem,
      1.7rem 2.1rem;
    opacity: 0.7;
    animation: drift-far 320s linear infinite;
  }

  /* Mid plane: medium brightness, looser spacing. */
  .layer-mid {
    background-image:
      radial-gradient(circle, rgba(246, 239, 231, 0.72) 0 0.9px, transparent 1.6px),
      radial-gradient(circle, rgba(125, 220, 255, 0.6) 0 0.9px, transparent 1.7px);
    background-size:
      12.9rem 12.9rem,
      16.3rem 16.3rem;
    background-position:
      4.5rem 1.2rem,
      8.1rem 9.7rem;
    opacity: 0.82;
    animation: drift-mid 220s linear infinite;
  }

  /* Near plane: sparse bright stars (incl. a few warm ones) — twinkles. */
  .layer-near {
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.95) 0 1.1px, transparent 2px),
      radial-gradient(circle, rgba(125, 220, 255, 0.85) 0 1px, transparent 1.9px),
      radial-gradient(circle, rgba(255, 155, 84, 0.8) 0 1px, transparent 2px);
    background-size:
      19.7rem 19.7rem,
      23.3rem 23.3rem,
      31.1rem 31.1rem;
    background-position:
      2.3rem 7.9rem,
      11.4rem 3.6rem,
      6.6rem 14.2rem;
    animation:
      drift-near 160s linear infinite,
      twinkle 7s ease-in-out infinite;
  }

  /* Light theme: muted dark specks instead of bright stars. */
  :global(:root[data-theme="light"]) .layer-far {
    background-image:
      radial-gradient(circle, rgba(45, 30, 20, 0.4) 0 0.6px, transparent 1.2px),
      radial-gradient(circle, rgba(40, 95, 115, 0.26) 0 0.6px, transparent 1.2px),
      radial-gradient(circle, rgba(45, 30, 20, 0.22) 0 0.5px, transparent 1px);
    opacity: 0.5;
  }

  :global(:root[data-theme="light"]) .layer-mid {
    background-image:
      radial-gradient(circle, rgba(45, 30, 20, 0.42) 0 0.9px, transparent 1.6px),
      radial-gradient(circle, rgba(40, 95, 115, 0.32) 0 0.9px, transparent 1.7px);
    opacity: 0.5;
  }

  :global(:root[data-theme="light"]) .layer-near {
    background-image:
      radial-gradient(circle, rgba(45, 30, 20, 0.5) 0 1.1px, transparent 2px),
      radial-gradient(circle, rgba(40, 95, 115, 0.4) 0 1px, transparent 1.9px),
      radial-gradient(circle, rgba(184, 63, 17, 0.36) 0 1px, transparent 2px);
    opacity: 0.55;
  }

  @keyframes drift-far {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-3rem, 5rem, 0); }
  }

  @keyframes drift-mid {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(4rem, 6rem, 0); }
  }

  @keyframes drift-near {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-5rem, 8rem, 0); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.92; }
    50% { opacity: 0.5; }
  }

  @media (prefers-reduced-motion: reduce) {
    .star-layer {
      animation: none;
    }
  }
</style>
