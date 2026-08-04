import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

// The PDF lives in public/. Update this when a new build is dropped in.
const RESUME_FILE = '/sanjeev_1_resume.pdf';

export const metadata: Metadata = {
  title: 'Resume | Sanjeev Singh',
  description: 'Resume of Sanjeev Singh — Software Development Engineer II.',
  // The PDF carries a phone number and email: shareable by link, but kept out
  // of search results so the contact details are not crawled and archived.
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  // dvh tracks mobile browser chrome, so the viewer isn't cut by the address bar
  return (
    <div className="h-[100dvh] overflow-hidden bg-pf-bg font-sans flex flex-col">
      <header className="container mx-auto px-6 pt-8 pb-5 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-sm text-pf-dim transition-colors hover:text-pf-accent"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          back home
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={RESUME_FILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-pf-line/20 px-5 py-2.5 text-sm font-semibold text-pf-text transition-colors duration-300 hover:border-pf-accent hover:text-pf-accent"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
          <a
            href={RESUME_FILE}
            download
            className="inline-flex items-center gap-2 bg-pf-accent px-5 py-2.5 text-sm font-semibold text-pf-bg transition-opacity duration-300 hover:opacity-90"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </header>

      {/* min-h-0 lets the flex child shrink so the viewer fills exactly the
          space left by the header; some mobile browsers refuse to render PDFs
          inline, hence the fallback link inside <object> */}
      <main className="container mx-auto px-6 pb-6 flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 border border-pf-line/10 bg-pf-soft">
          <object data={RESUME_FILE} type="application/pdf" className="w-full h-full">
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <p className="text-pf-dim">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href={RESUME_FILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pf-accent px-5 py-2.5 text-sm font-semibold text-pf-bg transition-opacity duration-300 hover:opacity-90"
              >
                <ExternalLink size={16} />
                Open the PDF
              </a>
            </div>
          </object>
        </div>
      </main>
    </div>
  );
}
