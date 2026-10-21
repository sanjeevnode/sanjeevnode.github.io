import { SkillGroupInput } from '@/app/types/skill';
import SectionHead from './SectionHead';
import StackTable, { type System } from './StackTable';

// Loose match between a skill name and a stack entry: "AWS S3" = "S3", "Next.js" = "Next",
// "Tailwind CSS" = "Tailwind", "Odoo" covers "Odoo 19". Short names (SQL, Git) must match exactly.
const norm = (s: string) =>
  s.toLowerCase().replace(/^aws\s+/, '').replace(/\.js$/, '').replace(/\s+css$/, '').replace(/[^a-z0-9+#]/g, '');

export function matches(skill: string, tech: string) {
  const a = norm(skill), b = norm(tech);
  return a === b || (a.length >= 4 && b.startsWith(a));
}

export default function Stack({ groups, systems }: { groups: SkillGroupInput[]; systems: System[] }) {
  const links: Record<string, number[]> = {};
  for (const g of groups) {
    for (const s of g.skills) {
      links[s] = systems.flatMap((sys, i) => (sys.tech.some((t) => matches(s, t)) ? [i] : []));
    }
  }

  return (
    <section id="stack" className="sec" data-spy aria-labelledby="stack-title">
      <SectionHead
        id="stack"
        rail="l"
        stop={`${groups.reduce((n, g) => n + g.skills.length, 0)} technologies`}
        title="Stack, routed"
        note="Pick a technology to see every system on this page that runs on it."
      />
      <StackTable groups={groups.map((g) => ({ category: g.category, skills: g.skills }))} systems={systems} links={links} />
    </section>
  );
}
