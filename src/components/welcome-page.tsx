import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const APP_SCHEME = "welovedeals://app";
const FALLBACK_URL = "https://welovedeals.lk";

const DEALS = [
  {
    tag: "Book Lovers",
    title: "20% off printed books",
    body: "Sarasavi Bookshop — save on your next read, min. spend LKR 2,000.",
  },
  {
    tag: "Today only",
    title: "50% off, Rs. 3,500",
    body: "Ladies' College partner promo — half price on original Rs. 7,000 value.",
  },
  {
    tag: "New vendor",
    title: "30% off stationery",
    body: "Weerodaara Stationary Saver — min. spend LKR 2,000.",
  },
] as const;

const CONFETTI_COLORS = ["#FF6D1F", "#FFF6EA", "#0B5C3E"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

async function burstConfetti(intense = false) {
  if (prefersReducedMotion()) return;
  const { default: confetti } = await import("canvas-confetti");
  if (intense) {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: CONFETTI_COLORS,
      zIndex: 100,
    });
    return;
  }
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() - 0.2 },
    colors: CONFETTI_COLORS,
    zIndex: 100,
  });
}

function loaderCopy(progress: number) {
  if (progress >= 100) return "Ready!";
  if (progress >= 80) return "Almost There!";
  if (progress > 40) return "Loading Offers...";
  return "Securing Deals...";
}

export function WelcomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeDeal, setActiveDeal] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const launchingRef = useRef(false);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((open) => !open);
  }, []);

  const startLaunch = useCallback(() => {
    if (launchingRef.current) return;
    launchingRef.current = true;
    setDrawerOpen(false);
    setLaunching(true);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!launching) return;

    const fireworks = window.setInterval(() => {
      void burstConfetti(false);
    }, 250);

    const loadingDuration = 2500;
    const intervalTime = 50;
    const increment = (intervalTime / loadingDuration) * 100;
    let current = 0;

    const ticker = window.setInterval(() => {
      current = Math.min(100, current + increment);
      setProgress(current);
      if (current >= 100) {
        window.clearInterval(ticker);
        window.clearInterval(fireworks);
        void burstConfetti(true);
        window.setTimeout(() => {
          executeDeepLink();
        }, 400);
      }
    }, intervalTime);

    return () => {
      window.clearInterval(ticker);
      window.clearInterval(fireworks);
    };
  }, [launching]);

  useEffect(() => {
    const onStart = (event: TouchEvent) => {
      touchStartY.current = event.changedTouches[0]?.screenY ?? 0;
    };
    const onEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.screenY ?? 0;
      const delta = touchStartY.current - endY;
      if (delta > 60 && !drawerOpen) setDrawerOpen(true);
      if (delta < -60 && drawerOpen) setDrawerOpen(false);
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [drawerOpen]);

  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-deal-card]");
    if (!card) return;
    const index = Math.round(el.scrollLeft / (card.offsetWidth + 14));
    setActiveDeal(Math.min(DEALS.length - 1, Math.max(0, index)));
  };

  return (
    <main className="kiosk-stage">
      <div
        className={cn("kiosk-scrim", drawerOpen && "show")}
        onClick={toggleDrawer}
        aria-hidden={!drawerOpen}
      />

      <div
        className={cn("loader-overlay", launching && "active")}
        role="status"
        aria-live="polite"
        aria-hidden={!launching}
      >
        <div className="loader-box">
          <h3 className="mb-5 font-display text-2xl leading-tight text-white">
            {loaderCopy(progress)}
          </h3>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
            <div
              className="h-full rounded-full bg-orange transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mascot-stage" aria-hidden="true">
        <div className="mascot-glow" />
        <img src="/fox-mascot.png" alt="" />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-10">
        <header className="flex items-start justify-between">
          <BrandLogo />
        </header>

        <section className="headline-block pop-in" style={{ animationDelay: "80ms" }}>
          <div className="headline-sparks">
            <span className="spark spark-1" />
            <span className="spark spark-2" />
            <span className="spark spark-3" />
            <span className="spark spark-4" />
            <span className="spark spark-5" />
            <span className="spark spark-6" />
          </div>
          <p className="line-small">WELCOME TO</p>
          <h1 className="line-hero mt-0.5">WE LOVE DEALS</h1>
          <p className="line-large mt-0.5">FAMILY</p>
        </section>

        <button type="button" className="live-deals-link" onClick={toggleDrawer}>
          Peek at live deals
          <ChevronUp className="size-4" strokeWidth={2.5} />
        </button>

        <div className="launch-wrap mt-auto mb-[4.5vh] sm:mb-[6vh]" style={{ animationDelay: "180ms" }}>
          <span className="btn-launch-pulse" />
          <button type="button" className="btn-launch pop-in" onClick={startLaunch} disabled={launching}>
            Launch Now
          </button>
        </div>
      </div>

      <aside
        id="live-deals"
        className={cn("deals-drawer", drawerOpen && "open")}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className="mb-5 h-1.5 w-12 rounded-full bg-slate-300"
          onClick={toggleDrawer}
          aria-label="Close deals"
        />
        <div className="flex w-full flex-col items-center px-5">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-mid px-4 py-2 font-sans text-sm font-bold text-white">
            <span className="size-2 rounded-full bg-orange shadow-[0_0_0_3px_rgba(255,109,31,0.25)]" />
            Live Now
          </div>

          <div
            ref={carouselRef}
            className="deal-carousel"
            onScroll={onCarouselScroll}
          >
            {DEALS.map((deal) => (
              <article key={deal.title} data-deal-card className="deal-card">
                <div>
                  <span className="mb-3 inline-block rounded-full bg-orange/15 px-2.5 py-1 font-sans text-xs font-bold uppercase tracking-wide text-orange">
                    {deal.tag}
                  </span>
                  <h3 className="mb-1.5 font-display text-xl leading-tight text-cream">
                    {deal.title}
                  </h3>
                  <p className="font-sans text-sm leading-snug text-cream/80">{deal.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-2 mb-7 flex justify-center gap-2">
            {DEALS.map((deal, index) => (
              <span
                key={deal.tag}
                className={cn(
                  "h-2 rounded-full bg-slate-300 transition-all duration-300",
                  index === activeDeal ? "w-5 bg-orange" : "w-2",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn-launch drawer-launch"
            onClick={startLaunch}
            disabled={launching}
          >
            Launch Now →
          </button>
        </div>
      </aside>
    </main>
  );
}

function executeDeepLink() {
  const start = Date.now();
  window.location.href = APP_SCHEME;
  window.setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.location.href = FALLBACK_URL;
    }
  }, 1500);
}
