export default function Loading() {
  return (
    <main
      className="min-h-screen pt-16"
      style={{ background: 'var(--bg-canvas)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8 sm:py-12">
        <div className="mb-10">
          <div
            className="h-3 w-24 rounded mb-3"
            style={{ background: 'var(--bg-surface-elevated)' }}
          />
          <div
            className="h-8 w-3/4 rounded mb-2"
            style={{ background: 'var(--bg-surface-elevated)' }}
          />
          <div
            className="h-4 w-2/3 rounded"
            style={{ background: 'var(--bg-surface-elevated)' }}
          />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[var(--r-lg)] border h-28"
              style={{
                borderColor: 'var(--border-base)',
                background: 'var(--bg-surface)',
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
