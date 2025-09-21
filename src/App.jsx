import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import PageLayout from "./PageLayout/PageLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"


function App() {

  const [plants, setPlants] = useState([])
  // const [quantity, setQuantity] = useState(1)
  // const increase = () => setQuantity(quantity + 1)
  //   const decrease = () => {
  //       if (quantity > 1) setQuantity(quantity - 1)
  //   }
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route 
          path="/shop" 
          element={
            <ShopPage 
              plants={plants} 
              setPlants={setPlants}
            />}
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductPage 
              plants={plants} 
              setPlants={setPlants} 
            />}
        />
        <Route 
          path="/cart" 
          element={<CartPage/>}
        />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
}

export default App
 