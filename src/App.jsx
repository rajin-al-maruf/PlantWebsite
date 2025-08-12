import { Routes, Route } from "react-router-dom"
import PageLayout from "./PageLayout/PageLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />}/>
        <Route path="shop" element={<ShopPage />}/>
      </Route>
    </Routes>
  )
}

export default App
 