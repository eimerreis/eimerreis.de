type PageLoadingProps = {
  eyebrow: string;
  title: string;
  messages: string[];
};

export const PageLoading = ({ eyebrow, title, messages }: PageLoadingProps) => {
  return (
    <div className="pb-16 pt-12 relative z-10" role="status" aria-live="polite" aria-busy="true">
      <header className="pb-16 border-b border-line mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[2px] w-12 bg-line" />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-muted">{eyebrow}</p>
        </div>

        <h1 className="max-w-4xl font-display text-[3.5rem] leading-[0.9] tracking-[-0.02em] text-ink md:text-[5rem] uppercase font-bold">
          {title}
        </h1>

        <span className="sr-only">Loading content...</span>
        <div
          aria-hidden="true"
          className="loading-message-stack mt-8 h-7 text-sm font-medium text-muted/80 flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <div className="relative w-full">
            {messages.map((message, index) => (
              <p
                key={message}
                className="loading-message absolute inset-0"
                style={{ animationDelay: `${index * 2.1}s` }}
              >
                {message}
              </p>
            ))}
          </div>
        </div>
      </header>

      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col items-start">
          <div className="loading-shimmer h-12 w-2/3 mb-6" />
          <div className="loading-shimmer h-4 w-5/6 mb-8" />
          <div className="loading-shimmer h-px w-full" />
        </div>

        <div className="md:col-span-8 flex flex-col">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`loading-card-${index}`} className="flex flex-col md:flex-row gap-6 py-8 border-b border-line">
              <div className="loading-shimmer h-6 w-8 shrink-0" />
              <div className="w-full space-y-4">
                <div className="loading-shimmer h-8 w-3/4" />
                <div className="loading-shimmer h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
