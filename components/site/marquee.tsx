export const Marquee = ({ text, className = '' }: { text: string; className?: string }) => {
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-8 font-display text-sm font-bold uppercase tracking-[0.25em]">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{text}</span>
            <span className="text-accent opacity-50">✦</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-8 font-display text-sm font-bold uppercase tracking-[0.25em]"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{text}</span>
            <span className="text-accent opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
