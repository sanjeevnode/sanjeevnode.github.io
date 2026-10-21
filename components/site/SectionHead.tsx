// Section opener: the wire crosses to this section's rail in the gap above, where a labelled stop
// names what it is routing into, then locks on the heading.
export default function SectionHead({
  id,
  rail,
  title,
  note,
  stop,
  children,
}: {
  id: string;
  rail: 'l' | 'r';
  title: string;
  note?: string;
  stop?: string; // e.g. "15 shipped": a real count shown on the stop
  children?: React.ReactNode;
}) {
  return (
    <>
      <span className={`wire-pt wire-pt--${rail} wire-pt--gap`} data-wire="node" />
      {stop && (
        <span className="wire-stop" aria-hidden="true">
          <span className="wire-stop__name">{id}</span>
          <span className="wire-stop__meta">{stop}</span>
        </span>
      )}
      <header className={`sec__head fw sec__head--${rail}`}>
        <span className={`wire-pt wire-pt--${rail} wire-pt--mid`} data-wire="node" />
        <h2 id={`${id}-title`} className="sec__title grad-text" data-split="lines">{title}</h2>
        {(note || children) && (
          <div className="sec__note" data-reveal="fade" data-delay="0.2">
            {note && <p>{note}</p>}
            {children}
          </div>
        )}
      </header>
    </>
  );
}
