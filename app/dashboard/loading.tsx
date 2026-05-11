export default function DashboardLoading() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated gradient blobs in background */}
            <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-16 py-12 space-y-12 relative z-10">
                {/* Header skeleton */}
                <section className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
                        <div className="w-40 h-5 bg-white/20 rounded animate-pulse"></div>
                    </div>
                    <div className="w-96 h-12 bg-white/10 rounded-lg animate-pulse mx-auto"></div>
                    <div className="w-full max-w-2xl h-8 bg-white/10 rounded-lg animate-pulse mx-auto"></div>

                    {/* Button skeleton */}
                    <div className="pt-4">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 animate-pulse">
                            <div className="w-5 h-5 bg-white/20 rounded"></div>
                            <div className="w-48 h-5 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </section>

                {/* Stats skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-4"
                        >
                            <div className="w-12 h-12 bg-white/20 rounded mx-auto animate-pulse"></div>
                            <div className="w-16 h-8 bg-white/20 rounded mx-auto animate-pulse"></div>
                            <div className="w-20 h-5 bg-white/20 rounded mx-auto animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Mission & Vision skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                                <div className="w-40 h-6 bg-white/20 rounded animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
                                <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
                                <div className="w-3/4 h-4 bg-white/20 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Core Values skeleton */}
                <div className="space-y-6">
                    <div className="w-48 h-8 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-4"
                            >
                                <div className="w-8 h-8 bg-white/20 rounded animate-pulse"></div>
                                <div className="w-32 h-5 bg-white/20 rounded animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-white/20 rounded animate-pulse"></div>
                                    <div className="w-3/4 h-3 bg-white/20 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
