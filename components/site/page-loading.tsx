type PageLoadingProps = {
  eyebrow: string;
  title: string;
  messages: string[];
};

export const PageLoading = ({ eyebrow, title, messages }: PageLoadingProps) => {
  return (
    <div className="pb-12 pt-2" role="status" aria-live="polite" aria-busy="true">
      <header className="pb-12">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-5xl tracking-[-0.03em] md:text-7xl">{title}</h1>
        <span className="sr-only">Loading content...</span>
        <div aria-hidden="true" className="loading-message-stack mt-5 h-7 text-sm text-muted md:text-base">
          {messages.map((message, index) => (
            <p key={message} className="loading-message" style={{ animationDelay: `${index * 2.1}s` }}>
              {message}
            </p>
          ))}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <article key={`loading-card-${index}`} className="surface rounded-3xl p-5">
            <div className="loading-shimmer h-4 w-24 rounded-full" />
            <div className="loading-shimmer mt-4 h-8 w-5/6 rounded-xl" />
            <div className="loading-shimmer mt-3 h-4 w-full rounded-full" />
            <div className="loading-shimmer mt-2 h-4 w-4/5 rounded-full" />
            <div className="loading-shimmer mt-6 h-9 w-32 rounded-full" />
          </article>
        ))}
      </div>
    </div>
  );
};
