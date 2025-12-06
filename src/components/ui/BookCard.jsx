import { motion } from "motion/react"
import { useState } from "react"
import { Button, Image, Modal, Popover, TextInput } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import BooksImage from "../../../public/kitob.jpg"
import { useMutation } from "@tanstack/react-query"
import { API } from "../../api/API"
import { queryClient } from "../../main"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { useStore } from "../../store/useStore"

const BookCard = ({ book, index }) => {
    const navigate = useNavigate()
    const [opened, { open, close }] = useDisclosure(false)

    const { isAuth } = useStore()

    const [editedBook, setEditedBook] = useState({
        name: "",
        author: "",
        publisher: "",
        quantity_in_library: 0,
    })

    const handleClickToDetail = (id) => {
        navigate(`/books/${id}`)
    }

    const { mutate: deleteBook } = useMutation({
        mutationFn: async (id) => {
            return await API.delete(`/api/v1/books/book/${id}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allBook"] })
        },
    })

    const handleDeleteBook = (id) => {
        if (confirm("O'chirilsinmi?")) {
            deleteBook(id)
        }
    }

    const { mutate: editBook } = useMutation({
        mutationFn: async ({ id, data }) => {
            return await API.put(`/api/v1/books/book/${id}/`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allBook"] })
            close()
        },
    })

    const handleEditBookClick = (book) => {
        setEditedBook({
            name: book.name || "",
            author: book.author || "",
            publisher: book.publisher || "",
            quantity_in_library: book.quantity_in_library || 0,
        })
        open()
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        editBook({ id: book.id, data: editedBook })
    }

    return (
        <motion.div
            className="glass rounded-2xl p-4 h-full cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4">
                <Image
                    onClick={() => handleClickToDetail(book.id)}
                    src={BooksImage}
                    alt={book.title}
                    fill
                    className="object-cover h-full transition-transform duration-500 group-hover:scale-110"
                />

                {
                    isAuth &&
                    <div className="absolute top-1 right-1 z-10 glass rounded-2xl px-2">
                        <Popover width={150} trapFocus position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <IconDots className="cursor-pointer" />
                            </Popover.Target>
                            <Popover.Dropdown>
                                <div className="flex flex-col gap-3">
                                    <div
                                        className="cursor-pointer flex items-center gap-2 text-red-500"
                                        onClick={() => handleDeleteBook(book.id)}
                                    >
                                        <IconTrash size={15} />
                                        <p className="text-[15px]">O'chirish</p>
                                    </div>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    </div>
                }
            </div>

            <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {book.name}
            </h3>
            <p className="text-sm line-clamp-1 mt-1">{book.author}</p>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                {book.publisher}
            </p>

            {
                isAuth &&
                <div
                    className="cursor-pointer flex items-center gap-2 text-amber-500 mt-2"
                    onClick={() => handleEditBookClick(book)}
                >
                    <IconEdit size={15} />
                    <p>Tahrirlash</p>
                </div>
            }

            <p className="text-sm mt-1">
                Kitoblar soni: {book.quantity_in_library}
            </p>

            <Modal opened={opened} onClose={close} title="Kitobni tahrirlash" centered>
                <form onSubmit={handleSubmitEdit}>
                    <TextInput
                        label="Kitob nomi"
                        value={editedBook.name}
                        onChange={(e) =>
                            setEditedBook({ ...editedBook, name: e.target.value })
                        }
                        mt="md"
                        required
                    />
                    <TextInput
                        label="Muallif"
                        value={editedBook.author}
                        onChange={(e) =>
                            setEditedBook({ ...editedBook, author: e.target.value })
                        }
                        mt="md"
                        required
                    />
                    <TextInput
                        label="Nashriyot"
                        value={editedBook.publisher}
                        onChange={(e) =>
                            setEditedBook({ ...editedBook, publisher: e.target.value })
                        }
                        mt="md"
                        required
                    />
                    <TextInput
                        type="number"
                        label="Kitoblar soni"
                        value={editedBook.quantity_in_library}
                        onChange={(e) =>
                            setEditedBook({
                                ...editedBook,
                                quantity_in_library: Number(e.target.value),
                            })
                        }
                        mt="md"
                        required
                    />

                    <div className="mt-4 flex justify-end gap-3">
                        <Button variant="outline" onClick={close}>
                            Bekor qilish
                        </Button>
                        <Button type="submit">O'zgartirish</Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    )
}

export default BookCard
