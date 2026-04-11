import { useRef, useEffect } from "react";

interface ParallaxBgProps {
  imageUrl: string;
}

/**
 * Parallax background image that scrolls at ~60% of page scroll speed.
 * Uses a ref + direct style mutation to avoid React re-renders on every scroll event.
 * Parent must have position:relative and overflow:hidden.
 */
const ParallaxBg = ({ imageUrl }: ParallaxBgProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parent = el.parentElement;
    let rafId: number;

    const update = () => {
      if (!el || !parent) return;

      const mobile = window.innerWidth < 1024;
      const ext   = mobile ? "20%" : "15%";
      const speed = mobile ? 0.15  : 0.3;

      el.style.top    = `-${ext}`;
      el.style.bottom = `-${ext}`;

      // Re-measure sectionTop every frame so layout shifts (e.g. images loading
      // above the fold on the homepage) never stale the calculation.
      const sectionTop = parent.getBoundingClientRect().top + window.scrollY;
      const maxShift = parent.offsetHeight * parseFloat(ext) / 100;
      const raw  = (window.scrollY - sectionTop) * speed;
      const shift = Math.max(-maxShift, Math.min(maxShift, raw));
      el.style.transform = `translateY(${shift}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 hidden bg-cover bg-center lg:block"
      style={{ backgroundImage: `url(${imageUrl})`, willChange: "transform" }}
    />
  );
};

export default ParallaxBg;
