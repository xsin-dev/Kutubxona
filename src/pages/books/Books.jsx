import { motion } from "motion/react"
import { Select, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import { API } from "../../api/API"
import BookCard from "../../components/ui/BookCard"
import { useState } from "react"
import { useStore } from "../../store/useStore"
import { useEffect } from "react"


const Books = () => {


  const { searchQuery: globalQuery, setSearchQuery } = useStore()
  const [query, setQuery] = useState(globalQuery ?? "")
  const [sort, setSort] = useState("title-asc")

  const { data: allBook } = useQuery({
    queryKey: ["allBook"],
    queryFn: async () => {
      const res = await API.get("/api/v1/books/books")
      console.log(res.data);

      return res.data
    }
  })

  useEffect(() => {
    setQuery(globalQuery)
  }, [globalQuery])

  const filteredData = allBook?.filter((book) =>
    book.name?.toLowerCase().includes(query.toLowerCase())
  ) ?? []


  const sortData = [...filteredData].sort((a, b) => {
    if (sort === "title-asc") return a.name.localeCompare(b.name)
    if (sort === "title-desc") return b.name.localeCompare(a.name)
  })




  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Kitoblar ro'yxati</h1>
            <p className="mt-4 text-xl text-muted-foreground">Kitoblar dunyosiga xush kelibsiz</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <TextInput
                className="flex-1"
                size="md"
                radius="xl"
                placeholder="Kitob nomini bilan qidirish"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSearchQuery(e.target.value)
                }}
                leftSection={<IconSearch size={18} />}
                styles={{
                  input: {
                    background: "transparent",
                    border: "1px solid var(--border)",
                  },
                }}
              />

              <Select
                size="md"
                radius="xl"
                value={sort}
                onChange={(value) => setSort(value)}
                data={[
                  { value: "title-asc", label: "Title (A-Z)" },
                  { value: "title-desc", label: "Title (Z-A)" },
                ]}
                className="w-full md:w-48"
                styles={{
                  input: {
                    background: "transparent",
                    border: "1px solid var(--border)",
                  },
                }}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {sortData?.map((book, index) => (
                <motion.div
                  
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>

            {sortData?.length === 0 && (
              <div className="glass rounded-2xl p-12 text-center">
                <p className="text-muted-foreground">Siz qidirayotgan kitoblar topilmadi</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Books
