import Category from './components/Category'
import FeaturedProducts from './components/FeaturedProducts'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='relative'>
      <Navbar />
      <Hero />
      <Category />
      <FeaturedProducts />
      <Footer />
    </div>
  )
}

export default App
 