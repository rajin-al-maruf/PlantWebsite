import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { TbLeaf, TbTruckDelivery, TbHeartHandshake } from "react-icons/tb";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-brand-primary/5 pt-40 md:pt-48 pb-20 px-4 md:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
        >
          Our Story
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary-dark tracking-tight max-w-4xl mx-auto leading-tight"
        >
          Bringing the beauty of nature <br className="hidden md:block" /> directly into your home.
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-0 mt-16 md:mt-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with floating card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative pr-6 md:pr-10 pb-6 md:pb-10"
          >
            <div className="bg-neutral-100 rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-sm relative">
              <img src="/assets/bg-web.jpg" className="w-full h-full object-cover" alt="About Bonomaya" />
            </div>
            <div className="absolute bottom-0 right-0 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-neutral-100 max-w-[240px]">
              <p className="text-3xl font-extrabold text-brand-primary">100%</p>
              <p className="text-sm font-bold text-brand-primary-dark mt-1">Organic & Sustainable</p>
              <p className="text-xs text-neutral-500 mt-2">Ethically sourced plants for your peace of mind.</p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 lg:pl-10 mt-10 md:mt-0"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-primary-dark mb-4">How It All Started</h2>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                Bonomaya started with a simple idea: everyone deserves a green corner. We are passionate about making plant parenting accessible, enjoyable, and sustainable for everyone, regardless of their experience level.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-primary-dark mb-4">Our Mission</h2>
              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                We carefully source, nurture, and deliver a wide variety of indoor plants, providing you with everything you need to create your own sanctuary. We believe that plants don't just decorate a space—they transform it, purifying the air and uplifting your mood.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}><Link to="/shop" className="w-max mt-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:-translate-y-1 cursor-pointer">
                Explore Our Plants <GoArrowRight size={18} />
              </button>
            </Link></motion.div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-50/50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
              <TbLeaf size={28} />
            </div>
            <h3 className="text-lg font-bold text-brand-primary-dark mb-2">Eco-Friendly</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">Sustainable packaging and organic soil for every plant we deliver.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-neutral-50/50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
              <TbHeartHandshake size={28} />
            </div>
            <h3 className="text-lg font-bold text-brand-primary-dark mb-2">Expert Care</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">Free guidance and plant-care tips from our team of botanical experts.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-neutral-50/50 p-8 rounded-3xl border border-neutral-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 sm:col-span-2 md:col-span-1"
          >
            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
              <TbTruckDelivery size={28} />
            </div>
            <h3 className="text-lg font-bold text-brand-primary-dark mb-2">Fast Delivery</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">Safe, secure, and fast delivery straight to your doorstep across Dhaka.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;