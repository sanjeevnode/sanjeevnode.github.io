// Section opener: the wire crosses to this section's rail in the gap above, then locks on the heading.
export default function SectionHead({
  id,
  rail,
  title,
  note,
  children,
}: {
  id: string;
  rail: 'l' | 'r';
  title: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <span className={`wire-pt wire-pt--${rail} wire-pt--gap`} data-wire="bend" />
      <header className={`sec__head fw sec__head--${rail}`}>
        <span className={`wire-pt wire-pt--${rail} wire-pt--mid`} data-wire="node" />
        <h2 id={`${id}-title`} className="sec__title" data-split="lines">{title}</h2>
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
