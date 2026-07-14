import { TRANSCRIPTS } from "./transcripts";

/**
 * TranscriptBlock — "Read the transcript" disclosure under each module panel.
 * Server-rendered real DOM (crawlable — the SEO copy twin), styled quiet.
 */
export default function TranscriptBlock({ module: mod }: { module: keyof typeof TRANSCRIPTS }) {
  return (
    <details className="sfilm-transcript mt-3">
      <summary>Read the transcript</summary>
      <div className="mt-2 space-y-3 pb-2">
        {TRANSCRIPTS[mod].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </details>
  );
}
