const ITEMS = [
    'Full Stack', 'Flutter', 'Next.js', 'Node.js', 'AWS Serverless',
    'Real-time Systems', 'Computer Vision', 'PostgreSQL', 'MongoDB', 'CI/CD',
];

// Infinite scrolling strip between hero and experience
export default function Marquee() {
    const row = (key: string) => (
        <div key={key} className="flex shrink-0 items-center">
            {ITEMS.map((item, i) => (
                <span key={i} className="flex items-center">
                    <span className="px-8 font-display text-lg md:text-xl uppercase tracking-widest text-pf-dim">{item}</span>
                    <span className="text-pf-accent">✦</span>
                </span>
            ))}
        </div>
    );

    return (
        <div className="border-y border-pf-line/10 bg-pf-soft py-5 overflow-hidden" aria-hidden>
            <div className="pf-marquee-track">
                {row('a')}
                {row('b')}
            </div>
        </div>
    );
}
