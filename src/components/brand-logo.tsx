export function BrandLogo() {
  return (
    <div className="flex items-center gap-3 pop-in">
      <div className="logo-mark">
        <img src="/fox-mascot.png" alt="" />
      </div>
      <div className="leading-none">
        <p className="font-display text-lg font-extrabold tracking-wide text-cream sm:text-xl">
          WE LOVE DEALS
        </p>
        <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-widest text-orange">
          You love savings
        </p>
      </div>
    </div>
  );
}
