import { useRef } from "react"
import { motion } from "motion/react"
import { Carousel } from "@mantine/carousel"
import { IconChevronLeft, IconChevronRight, IconStar } from "@tabler/icons-react"
import Autoplay from "embla-carousel-autoplay"
import { useQuery } from "@tanstack/react-query"
import { API } from "../../api/API"

import '@mantine/carousel/styles.css';

import BookCard from "../../components/ui/BookCard"

export function BooksCarousel() {
    const autoplay = useRef(Autoplay({ delay: 4000 }))

    const { data: books } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await API.get("/api/v1/books/books")
            return res.data
        },
    })

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Eng ko'p o'qilgan ketoblar</h2>
                    <div className="mt-4 w-24 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Carousel
                        slideSize={{ base: "100%", xs: "50%", sm: "33.333%", md: "25%", lg: "20%" }}
                        slideGap="md"
                        align="start"
                        loop
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        nextControlIcon={<IconChevronRight size={40} />}
                        previousControlIcon={<IconChevronLeft size={40} />}
                        styles={{
                            control: {
                                background: "var(--glass-bg)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--foreground)",
                                "&:hover": {
                                    background: "var(--primary)",
                                    color: "var(--primary-foreground)",
                                },
                            },
                        }}

                    >
                        {books?.map((book, index) => (
                            <Carousel.Slide key={book.id}>
                                <BookCard index={index} book={book} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>

                </motion.div>
            </div>
        </section>
    )
}
