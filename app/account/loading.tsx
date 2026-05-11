export default function AccountLoading() {
    return (
        <div className="max-w-2xl mx-auto">
            {/* Card skeleton */}
            <div className="glass-card p-8 space-y-6">
                {/* Header skeleton */}
                <div className="space-y-3">
                    <div className="w-48 h-8 bg-white/20 rounded animate-pulse"></div>
                    <div className="w-64 h-4 bg-white/20 rounded animate-pulse"></div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
                            <div className="w-full h-6 bg-white/20 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
