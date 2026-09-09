import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ChevronUp } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Btpvr6HC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 pop-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "logo-mark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/fox-mascot.png",
				alt: ""
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-extrabold tracking-wide text-cream sm:text-xl",
				children: "WE LOVE DEALS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-sans text-xs font-semibold uppercase tracking-widest text-orange",
				children: "You love savings"
			})]
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var APP_SCHEME = "welovedeals://app";
var FALLBACK_URL = "https://welovedeals.lk";
var DEALS = [
	{
		tag: "Book Lovers",
		title: "20% off printed books",
		body: "Sarasavi Bookshop — save on your next read, min. spend LKR 2,000."
	},
	{
		tag: "Today only",
		title: "50% off, Rs. 3,500",
		body: "Ladies' College partner promo — half price on original Rs. 7,000 value."
	},
	{
		tag: "New vendor",
		title: "30% off stationery",
		body: "Weerodaara Stationary Saver — min. spend LKR 2,000."
	}
];
var CONFETTI_COLORS = [
	"#FF6D1F",
	"#FFF6EA",
	"#0B5C3E"
];
function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
async function burstConfetti(intense = false) {
	if (prefersReducedMotion()) return;
	const { default: confetti } = await import("../_libs/canvas-confetti.mjs").then((n) => n.t);
	if (intense) {
		confetti({
			particleCount: 200,
			spread: 120,
			origin: { y: .6 },
			colors: CONFETTI_COLORS,
			zIndex: 100
		});
		return;
	}
	confetti({
		particleCount: 60,
		spread: 80,
		origin: {
			x: Math.random() * .6 + .2,
			y: Math.random() - .2
		},
		colors: CONFETTI_COLORS,
		zIndex: 100
	});
}
function loaderCopy(progress) {
	if (progress >= 100) return "Ready!";
	if (progress >= 80) return "Almost There!";
	if (progress > 40) return "Loading Offers...";
	return "Securing Deals...";
}
function WelcomePage() {
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [launching, setLaunching] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [activeDeal, setActiveDeal] = (0, import_react.useState)(0);
	const carouselRef = (0, import_react.useRef)(null);
	const touchStartY = (0, import_react.useRef)(0);
	const launchingRef = (0, import_react.useRef)(false);
	const toggleDrawer = (0, import_react.useCallback)(() => {
		setDrawerOpen((open) => !open);
	}, []);
	const startLaunch = (0, import_react.useCallback)(() => {
		if (launchingRef.current) return;
		launchingRef.current = true;
		setDrawerOpen(false);
		setLaunching(true);
		setProgress(0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!launching) return;
		const fireworks = window.setInterval(() => {
			burstConfetti(false);
		}, 250);
		const loadingDuration = 2500;
		const intervalTime = 50;
		const increment = intervalTime / loadingDuration * 100;
		let current = 0;
		const ticker = window.setInterval(() => {
			current = Math.min(100, current + increment);
			setProgress(current);
			if (current >= 100) {
				window.clearInterval(ticker);
				window.clearInterval(fireworks);
				burstConfetti(true);
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
	(0, import_react.useEffect)(() => {
		const onStart = (event) => {
			touchStartY.current = event.changedTouches[0]?.screenY ?? 0;
		};
		const onEnd = (event) => {
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
		const card = el.querySelector("[data-deal-card]");
		if (!card) return;
		const index = Math.round(el.scrollLeft / (card.offsetWidth + 14));
		setActiveDeal(Math.min(DEALS.length - 1, Math.max(0, index)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "kiosk-stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("kiosk-scrim", drawerOpen && "show"),
				onClick: toggleDrawer,
				"aria-hidden": !drawerOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("loader-overlay", launching && "active"),
				role: "status",
				"aria-live": "polite",
				"aria-hidden": !launching,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "loader-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-5 font-display text-2xl leading-tight text-white",
						children: loaderCopy(progress)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-3 w-full overflow-hidden rounded-full bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-orange transition-[width] duration-100 ease-linear",
							style: { width: `${progress}%` }
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mascot-stage",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mascot-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/fox-mascot.png",
					alt: ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-full min-h-0 flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "flex items-start justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "headline-block pop-in",
						style: { animationDelay: "80ms" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "headline-sparks",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spark spark-6" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-small",
								children: "WELCOME TO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "line-hero mt-0.5",
								children: "WE LOVE DEALS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-large mt-0.5",
								children: "FAMILY"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "live-deals-link",
						onClick: toggleDrawer,
						children: ["Peek at live deals", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
							className: "size-4",
							strokeWidth: 2.5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "launch-wrap mt-auto mb-[4.5vh] sm:mb-[6vh]",
						style: { animationDelay: "180ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "btn-launch-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-launch pop-in",
							onClick: startLaunch,
							disabled: launching,
							children: "Launch Now"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				id: "live-deals",
				className: cn("deals-drawer", drawerOpen && "open"),
				"aria-hidden": !drawerOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mb-5 h-1.5 w-12 rounded-full bg-slate-300",
					onClick: toggleDrawer,
					"aria-label": "Close deals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col items-center px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 inline-flex items-center gap-2 rounded-full bg-teal-mid px-4 py-2 font-sans text-sm font-bold text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-orange shadow-[0_0_0_3px_rgba(255,109,31,0.25)]" }), "Live Now"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: carouselRef,
							className: "deal-carousel",
							onScroll: onCarouselScroll,
							children: DEALS.map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								"data-deal-card": true,
								className: "deal-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-3 inline-block rounded-full bg-orange/15 px-2.5 py-1 font-sans text-xs font-bold uppercase tracking-wide text-orange",
										children: deal.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mb-1.5 font-display text-xl leading-tight text-cream",
										children: deal.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-sans text-sm leading-snug text-cream/80",
										children: deal.body
									})
								] })
							}, deal.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 mb-7 flex justify-center gap-2",
							children: DEALS.map((deal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 rounded-full bg-slate-300 transition-all duration-300", index === activeDeal ? "w-5 bg-orange" : "w-2") }, deal.tag))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-launch drawer-launch",
							onClick: startLaunch,
							disabled: launching,
							children: "Launch Now →"
						})
					]
				})]
			})
		]
	});
}
function executeDeepLink() {
	const start = Date.now();
	window.location.href = APP_SCHEME;
	window.setTimeout(() => {
		if (Date.now() - start < 2e3) window.location.href = FALLBACK_URL;
	}, 1500);
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomePage, {});
}
//#endregion
export { Home as component };
