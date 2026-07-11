export default function StatusBadge({ active }: { active: boolean }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${active
            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
            }`}>
            {active ? 'Active' : 'Inactive'}
        </span>
    )
}
