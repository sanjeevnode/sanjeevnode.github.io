export default function StatusBadge({ active }: { active: boolean }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${active
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-200 text-gray-500'
            }`}>
            {active ? 'Active' : 'Inactive'}
        </span>
    )
}
