import { motion } from "motion/react"
import { Image } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import BooksImage from "../../../public/kitob.jpg"


const BookCard = ({ book, index }) => {
    const navigate = useNavigate()

    const handleClickToDetail = (id) => {
        navigate(`/books/${id}`)
        console.log(id);

    }
    return (
        <motion.div
            onClick={() => handleClickToDetail(book.id)}
            className="glass rounded-2xl p-4 h-full cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
        >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4">
                <Image
                    src={BooksImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform h-full duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {book.name}
            </h3>
            <p className="text-sm text-sidebar-foreground line-clamp-1 mt-1">{book.author}</p>
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{book.publisher}</p>

            <div className="flex items-center gap-1 mt-2">
                <p className="text-sm text-chart-2 line-clamp-1 mt-1">kitoblar soni: {book.quantity_in_library}</p>
            </div>
        </motion.div>
    )
}

export default BookCard
