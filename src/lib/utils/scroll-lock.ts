const lockCountKey = "scrollLockCount";
const scrollYKey = "scrollLockY";
const previousStyleKey = "scrollLockPreviousStyle";

export const lockBodyScroll = () => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const { body } = document;
  const currentLockCount = Number(body.dataset[lockCountKey] ?? "0");

  if (currentLockCount === 0) {
    const scrollY = window.scrollY;

    body.dataset[scrollYKey] = String(scrollY);
    body.dataset[previousStyleKey] = JSON.stringify({
      left: body.style.left,
      overflow: body.style.overflow,
      position: body.style.position,
      right: body.style.right,
      top: body.style.top,
      width: body.style.width
    });

    body.classList.add("no-scroll");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }

  body.dataset[lockCountKey] = String(currentLockCount + 1);

  return () => {
    const nextLockCount = Math.max(Number(body.dataset[lockCountKey] ?? "1") - 1, 0);
    body.dataset[lockCountKey] = String(nextLockCount);

    if (nextLockCount > 0) {
      return;
    }

    const scrollY = Number(body.dataset[scrollYKey] ?? "0");
    const previousStyle = JSON.parse(body.dataset[previousStyleKey] ?? "{}") as Partial<
      Record<"left" | "overflow" | "position" | "right" | "top" | "width", string>
    >;

    body.classList.remove("no-scroll");
    body.style.position = previousStyle.position ?? "";
    body.style.top = previousStyle.top ?? "";
    body.style.left = previousStyle.left ?? "";
    body.style.right = previousStyle.right ?? "";
    body.style.width = previousStyle.width ?? "";
    body.style.overflow = previousStyle.overflow ?? "";

    delete body.dataset[lockCountKey];
    delete body.dataset[scrollYKey];
    delete body.dataset[previousStyleKey];

    window.scrollTo(0, scrollY);
  };
};
