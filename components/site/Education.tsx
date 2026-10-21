import { EducationInput } from '@/app/types/education';
import SectionHead from './SectionHead';

export default function Education({ items }: { items: EducationInput[] }) {
  return (
    <section id="education" className="sec sec--last" aria-labelledby="education-title">
      <SectionHead id="education" rail="r" title="Education" />
      <ol className="edu">
        {items.map((e) => {
          const years = e.period.match(/\d{4}/g) ?? [e.period];
          return (
            <li className="edu__row fw" key={e.degree}>
              <span className="wire-pt wire-pt--r wire-pt--first" data-wire="tick" />
              <p className="edu__year" data-reveal="clip">
                <span className="tabular">{years[years.length - 1]}</span>
                {years.length > 1 && <span className="edu__span">from {years[0]}</span>}
              </p>
              <div className="edu__what" data-reveal="up">
                <h3>{e.degree}</h3>
                <p className="edu__where">{e.institution}</p>
              </div>
              <p className="edu__desc" data-reveal="fade">{e.description}</p>
            </li>
          );
        })}
      </ol>
      <span className="wire-pt wire-pt--edge-r wire-pt--end" data-wire="node" />
    </section>
  );
}
