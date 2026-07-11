import DrawLine from './fx/DrawLine'
import TitleReveal from './fx/TitleReveal'

export default function SectionHead({ num, title, sub }: { num: string; title: string; sub?: string }) {
    return (
        <div className="mb-14">
            <div className="flex items-center gap-4">
                <span className="font-mono text-pf-accent text-lg">{num}.</span>
                <h2 className="font-display font-semibold uppercase tracking-tight text-3xl md:text-5xl text-pf-text whitespace-nowrap">
                    <TitleReveal text={title} />
                </h2>
                <DrawLine className="h-px flex-1 bg-gradient-to-r from-pf-accent/60 via-pf-line/20 to-transparent" delay={0.2} />
            </div>
            {sub && <p className="mt-4 text-pf-dim max-w-2xl">{sub}</p>}
        </div>
    )
}
