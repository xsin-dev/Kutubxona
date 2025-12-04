import { motion } from "motion/react"
import { TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { Candle } from "./Candle"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "../../store/useStore"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../api/API"

export function Hero() {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    const { setSearchQuery } = useStore()

    const { data: countBooks } = useQuery({
        queryKey: ['countBooks'],
        queryFn: async () => {
            const res = await API.get("/api/v1/books/books")
            // console.log(res.data)
            return res.data.length
        }
    })

    const handleSearch = (e) => {
        e.preventDefault()


        if (searchValue.trim()) {
            setSearchQuery(searchValue)
            navigate("/books")
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center lg:text-left"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance"
                        >
                            Keyingi sarguzashtingizni kashf eting
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 text-pretty"
                        >
                            Minglab kitoblarni o'rganing va ishtiyoqli o'quvchilar jamoasiga qo'shiling
                        </motion.p>

                        {/* === SEARCH === */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-8 max-w-lg mx-auto lg:mx-0"
                            onSubmit={handleSearch}
                        >
                            <div className="glass rounded-2xl p-2">
                                <TextInput
                                    size="lg"
                                    radius="xl"
                                    placeholder="Kitob nomi bilan qidirish"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    leftSection={<IconSearch size={20} className="text-muted-foreground" />}
                                    styles={{
                                        input: {
                                            background: "transparent",
                                            border: "none",
                                            fontSize: "1rem",
                                        },
                                    }}
                                    rightSection={
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium text-sm"
                                        >
                                            Qidirish
                                        </motion.button>
                                    }
                                    rightSectionWidth={100}
                                />
                            </div>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8"
                        >
                            {[
                                { value: countBooks + "K+", label: "Kitoblar" },
                                { value: "1K+", label: "Kitobxonalar" },
                                { value: "50K+", label: "O'quvchilar" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <div className="glass rounded-3xl p-8 md:p-12">
                            <Candle />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
