import { Skeleton } from '@/components/ui/skeleton'

// Streaming fallback shown while a homepage section fetches its data
export default function SectionSkeleton({ title }: { title: string }) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-black dark:text-white">{title}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="h-40 w-full" />
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
