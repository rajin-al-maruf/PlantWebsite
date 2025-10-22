import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import PageLayout from "./PageLayout/PageLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"
import AuthPage from "./pages/AuthPage"
import AdminDashBoard from "./pages/Admin/AdminDashboard"
import Products from "./pages/Admin/Products"
import AddProducts from "./pages/Admin/AddProducts"

function App() {

  const [plants, setPlants] = useState([])
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route 
          index 
          element={
          <HomePage 
            plants={plants} 
            setPlants={setPlants}
          />
          }
        />
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
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route path="/admin" element={<AdminDashBoard />}>
        <Route path="add-products" element={<AddProducts />}/>
        <Route path="products" element={<Products />}/>
      </Route>
    </Routes>
  )
}

export default App
 