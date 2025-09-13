import { Routes, Route } from "react-router-dom"
import PageLayout from "./PageLayout/PageLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  )
}

export default App
 