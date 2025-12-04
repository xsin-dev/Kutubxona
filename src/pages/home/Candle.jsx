import { motion, AnimatePresence } from "motion/react"
import { useStore } from "../../store/useStore"

export function Candle() {
    const isDark = useStore((state) => state.isDark)

    return (
        <div className="relative w-48 h-64 md:w-64 md:h-80">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
            >
                <div className="relative">
                    <div className="w-28 h-6 md:w-36 md:h-8 bg-gradient-to-b from-amber-600/80 to-amber-800/90 rounded-b-full mx-auto" />
                    <div className="w-24 h-4 md:w-32 md:h-5 bg-gradient-to-b from-amber-700/90 to-amber-900 rounded-full mx-auto -mt-1" />

                    <div className="w-16 h-32 md:w-20 md:h-44 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 dark:from-amber-100/90 dark:via-amber-200/80 dark:to-amber-300/70 rounded-t-lg mx-auto -mt-1 relative overflow-hidden">
                        <div className="absolute top-0 left-2 w-2 h-6 bg-amber-50/80 rounded-b-full" />
                        <div className="absolute top-0 right-3 w-1.5 h-4 bg-amber-50/60 rounded-b-full" />
                        <div className="absolute top-0 left-4 w-1 h-3 bg-amber-50/50 rounded-b-full" />

                        <div className="absolute inset-0 opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-px bg-amber-600 mt-4" style={{ marginTop: `${(i + 1) * 15}%` }} />
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 md:h-8 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-full -translate-y-full" />
                </div>
            </motion.div>

            <AnimatePresence>
                {!isDark && (
                    <motion.div
                        key="light-flame"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute top-4 md:top-2 left-1/2 -translate-x-1/2"
                    >
                        <div className="absolute inset-0 -translate-y-4">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-400/30 blur-2xl -translate-x-6 md:-translate-x-8"
                            />
                        </div>

                        <motion.svg
                            width="50"
                            height="70"
                            viewBox="0 0 50 70"
                            className="flame-flicker flame-glow md:w-[60px] md:h-[84px]"
                        >
                            <motion.path
                                d="M25 5C15 20 8 35 8 45C8 57 15 65 25 65C35 65 42 57 42 45C42 35 35 20 25 5Z"
                                fill="url(#flameGradientOuter)"
                                animate={{
                                    d: [
                                        "M25 5C15 20 8 35 8 45C8 57 15 65 25 65C35 65 42 57 42 45C42 35 35 20 25 5Z",
                                        "M25 3C13 18 6 33 6 43C6 55 14 64 25 64C36 64 44 55 44 43C44 33 37 18 25 3Z",
                                        "M25 5C15 20 8 35 8 45C8 57 15 65 25 65C35 65 42 57 42 45C42 35 35 20 25 5Z",
                                    ],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.path
                                d="M25 15C19 27 14 38 14 46C14 54 18 58 25 58C32 58 36 54 36 46C36 38 31 27 25 15Z"
                                fill="url(#flameGradientInner)"
                                animate={{
                                    d: [
                                        "M25 15C19 27 14 38 14 46C14 54 18 58 25 58C32 58 36 54 36 46C36 38 31 27 25 15Z",
                                        "M25 12C18 24 12 36 12 44C12 52 17 57 25 57C33 57 38 52 38 44C38 36 32 24 25 12Z",
                                        "M25 15C19 27 14 38 14 46C14 54 18 58 25 58C32 58 36 54 36 46C36 38 31 27 25 15Z",
                                    ],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.ellipse
                                cx="25"
                                cy="52"
                                rx="6"
                                ry="8"
                                fill="url(#flameGradientCore)"
                                animate={{
                                    ry: [8, 10, 8],
                                    opacity: [0.9, 1, 0.9],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                }}
                            />

                            <defs>
                                <linearGradient id="flameGradientOuter" x1="25" y1="65" x2="25" y2="5" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#f97316" />
                                    <stop offset="50%" stopColor="#fb923c" />
                                    <stop offset="100%" stopColor="#fbbf24" />
                                </linearGradient>
                                <linearGradient id="flameGradientInner" x1="25" y1="58" x2="25" y2="15" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="50%" stopColor="#fcd34d" />
                                    <stop offset="100%" stopColor="#fef3c7" />
                                </linearGradient>
                                <linearGradient id="flameGradientCore" x1="25" y1="60" x2="25" y2="44" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#fef9c3" />
                                    <stop offset="100%" stopColor="#ffffff" />
                                </linearGradient>
                            </defs>
                        </motion.svg>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isDark && (
                    <motion.div
                        key="dark-flame"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-8 left-1/2 -translate-x-1/2"
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                animate={{
                                    opacity: [0, 0.4, 0],
                                    y: [-10, -50 - i * 20],
                                    scale: [0.5, 1 + i * 0.2],
                                    x: [0, (i - 1) * 15],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeOut",
                                }}
                                className="absolute w-4 h-4 rounded-full bg-gray-400/50 blur-sm"
                                style={{ left: "50%", transform: "translateX(-50%)" }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
