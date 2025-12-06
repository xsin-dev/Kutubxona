import { motion } from "motion/react"
import { Flex, FocusTrap, Modal, Select, TextInput } from "@mantine/core"
import { IconBook, IconBook2, IconPlus, IconSearch } from "@tabler/icons-react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { API } from "../../api/API"
import BookCard from "../../components/ui/BookCard"
import { useRef, useState } from "react"
import { useStore } from "../../store/useStore"
import { useEffect } from "react"

import { Menu, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { queryClient } from "../../main"


const Books = () => {
  const { searchQuery, setSearchQuery } = useStore()
  const [query, setQuery] = useState(searchQuery ?? "")
  const [sort, setSort] = useState("title-asc")

  const { isAuth } = useStore()

  const [opened, { open, close }] = useDisclosure(false);

  const bookRef = useRef()
  const authorRef = useRef()
  const publisherRef = useRef()
  const bookCountRef = useRef()


  const { data: allBook } = useQuery({
    queryKey: ["allBook"],
    queryFn: async () => {
      const res = await API.get("/api/v1/books/books")
      console.log(res.data);
      return res.data
    }
  })

  const { mutate: createBook } = useMutation({
    mutationKey: ["createBook"],
    mutationFn: async (body) => {
      const res = await API.post("/api/v1/books/books/", body)
      console.log(res);

      return res
    }
  })


  const handleCreateBook = (e) => {
    e.preventDefault()
    const newBook = {
      name: bookRef.current.value,
      author: authorRef.current.value,
      publisher: publisherRef.current.value,
      quantity_in_library: bookCountRef.current.value,
    }

    createBook(newBook, {
      onSuccess: (res) => {
        console.log(res)
        // alert("okey")
        close()
        // e.target.reset()
        queryClient.invalidateQueries({
          queryKey: ["allBook"]
        })
      },
      onError: (err) => {
        alert(err.message)
      }
    })
  }

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

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
      {
        isAuth &&
        <div>
          <div className="fixed bottom-8 right-8 z-1">
            <Menu width={250} shadow="md">
              <Menu.Target>
                <Button>
                  <IconPlus size={15} />
                  <span className="ml-1"> Kitob qo'shish</span>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  {" "}
                  <Flex align="center" gap="xs" variant="default" onClick={open}>
                    <IconBook />
                    Bitta kitob qo'shish
                  </Flex>
                </Menu.Item>
                <Menu.Item>
                  {" "}
                  <Flex align="center" gap="xs">
                    <IconBook2 />
                    Bir nechta kitob qo'shish
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <Modal opened={opened} onClose={close} title="Kitob qo'shish">
            <form onSubmit={handleCreateBook}>
              <FocusTrap.InitialFocus />
              <TextInput ref={bookRef} label="Kitob nomi" placeholder="Kitob nomi" mt="md" />
              <TextInput ref={authorRef} label="Muallif" placeholder="Muallif" mt="md" />
              <TextInput ref={publisherRef} label="Nashriyot" placeholder="Nashriyot" mt="md" />
              <TextInput
                type="Number"
                ref={bookCountRef}
                data-autofocus
                label="Kitoblar soni"
                placeholder="Kitoblar soni"
                mt="md"
              />
              <div className="mt-4 ml-[180px] flex gap-3">
                <Button onClick={close} variant="outline">Bekor qilish</Button>
                <Button type="submit">Qo'shish</Button>
              </div>
            </form>
          </Modal>
        </div>
      }
    </div>
  )
}

export default Books
