import { motion } from "motion/react"
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { API } from '../../api/API'

import bookImage from "../../../public/kitob.jpg"
import { ActionIcon, Badge, Image } from '@mantine/core'
import { IconArrowLeft, IconBook, IconCalendar, IconCategory } from '@tabler/icons-react'
import BookCard from '../../components/ui/BookCard'

const BooksDetail = () => {

    const { id } = useParams()

    const { data: detailBook } = useQuery({
        queryKey: ["detailBook", id],
        queryFn: async () => {
            const res = await API.get(`/api/v1/books/book/${id}`)
            return res.data
        }
    })

    const { data: similarBook } = useQuery({
        queryKey: ["similarBook"],
        queryFn: async () => {
            const res = await API.get('/api/v1/books/books')
            console.log(res.data);

            return res.data
        }
    })

    if (!detailBook) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground">Malumot topilmadi</h1>
                    <Link href="/books" className="text-primary mt-4 inline-block">
                        Orqaga →
                    </Link>
                </div>
            </div>
        )
    }

    const similarBooks = similarBook
        ?.filter(
            (b) =>
                b.publisher === detailBook.publisher &&
                b.id !== detailBook.id
        )
        .slice(0, 4);

    return (
        <div className="min-h-screen">
            <main className="pt-28 pb-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center">Detail sahifa</h1>

                        <Link to="/books">
                            <ActionIcon variant="subtle" size="lg" radius="xl" className="text-foreground">
                                <IconArrowLeft size={20} />
                            </ActionIcon>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="glass rounded-3xl p-6 md:p-12"
                    >
                        <div className="grid md:grid-cols-[300px_1fr] gap-8 lg:gap-12">
                            <div className="flex justify-center md:justify-start">
                                <div className="relative w-64 md:w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image src={bookImage} alt={detailBook.name} fill className="object-cover h-full" />
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <Badge color={detailBook.available ? "green" : "red"} variant="filled" size="lg">
                                        Ajoyib
                                    </Badge>
                                    <Badge variant="light" color="amber" size="lg">
                                        Fantastik
                                    </Badge>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{detailBook.name}</h1>

                                <p className="mt-2 text-xl text-muted-foreground">
                                    Author: <span className="text-foreground">{detailBook.author}</span>
                                </p>

                                <div className="mt-6 flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <IconCalendar size={20} className="text-primary" />
                                        <span>
                                            yili: <strong className="text-foreground">2003</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <IconBook size={20} className="text-primary" />
                                        <span>
                                            sahifalar: <strong className="text-foreground">112</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <IconCategory size={20} className="text-primary" />
                                        <span>
                                            soni: <strong className="text-foreground">{detailBook.quantity_in_library} dona</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Tarif</h3>
                                    <p className="text-muted-foreground leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, ab.</p>
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {similarBooks?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-12"
                        >
                            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">O'xshash kitoblar</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {similarBooks?.map((book, index) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <BookCard book={book} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default BooksDetail
