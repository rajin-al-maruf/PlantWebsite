import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import PageLayout from "./PageLayout/PageLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"
import AuthPage from "./pages/AuthPage"
import AdminDashBoard from "./pages/Admin/AdminDashboard"
import AdminHome from "./pages/Admin/AdminHome"
import AdminOrders from "./pages/Admin/AdminOrder"
import Products from "./pages/Admin/Products"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import AdminRoute from "./components/AdminRoute"
import UserProfile from "./pages/Profile/UserProfile"
import ProfileInfo from "./pages/Profile/ProfileInfo"
import ProfileOrders from "./pages/Profile/ProfileOrders"
import ProfileWishlist from "./pages/Profile/ProfileWishlist"
import { Toaster } from 'sonner';

export interface Plant {
  id: string
  name: string
  price: number
  imgurl: string
  description: string
  lightrequirement: string
  waterrequirement: string
  carelevel: string
  availability: string
  category: string
  stock: number
  created_at: string | null
}

function App() {

  const [plants, setPlants] = useState<Plant[]>([])
  return (
    <>
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
          <Route path="/product/:id" element={<ProductPage />}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/ordersuccess" element={<OrderSuccessPage />} />
          <Route path="/profile" element={<UserProfile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="wishlist" element={<ProfileWishlist />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminDashBoard />}>
            <Route index element={<AdminHome />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<Products />}/>
          </Route>
        </Route>
      </Routes>
      <Toaster richColors /> 
    </>

  )
}

export default App
 