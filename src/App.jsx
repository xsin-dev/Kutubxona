import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Books from "./pages/books/Books"
import Libraries from "./pages/libraries/Libraries"
import BooksDetail from "./pages/books/BooksDetail"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BooksDetail />} />
      </Route>
    </Routes>
  )
}

export default App
