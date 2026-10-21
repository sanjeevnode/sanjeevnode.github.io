import type { Metadata } from 'next';

// The PDF lives in public/. Update this when a new build is dropped in.
const RESUME_FILE = '/sanjeev_1_resume.pdf';

export const metadata: Metadata = {
  title: 'Resume | Sanjeev Singh',
  description: 'Resume of Sanjeev Singh, Software Development Engineer II: read it here, open it in a new tab, or download the PDF.',
  // The PDF carries a phone number and email: shareable by link, but kept out
  // of search results so the contact details are not crawled and archived.
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return (
    <div className="resume">
      <header className="resume__head fw">
        <h1 className="resume__title">Resume</h1>
        <p className="resume__note" data-reveal="fade" data-intro>
          Software Development Engineer II at AlignTogether, Bhopal. Read it here or take the PDF with you.
        </p>
        <div className="resume__actions" data-reveal="fade" data-intro data-delay="0.15">
          <a className="btn" href={RESUME_FILE} target="_blank" rel="noopener noreferrer">
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">Open in new tab</span>
            <span className="btn__arrow" aria-hidden="true">{'↗︎'}</span>
          </a>
          <a className="btn btn--solid" href={RESUME_FILE} download>
            <span className="btn__fill" aria-hidden="true" />
            <span className="btn__label">Download PDF</span>
            <span className="btn__arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      {/* some browsers refuse to render PDFs inline, hence the fallback inside <object> */}
      <div className="resume__sheet fw">
        <object data={RESUME_FILE} type="application/pdf" aria-label="Resume of Sanjeev Singh (PDF)">
          <div className="resume__fallback">
            <p>This browser does not show PDFs inline.</p>
            <a className="link" href={RESUME_FILE} target="_blank" rel="noopener noreferrer">Open the PDF</a>
          </div>
        </object>
      </div>
    </div>
  );
}
