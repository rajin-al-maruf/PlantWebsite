import { MdOutlineLocationOn, MdOutlineEmail, MdOutlineAccessTime } from "react-icons/md";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-brand-primary/5 pt-40 md:pt-48 pb-20 px-4 md:px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
        >
          Get In Touch
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary-dark tracking-tight max-w-4xl mx-auto leading-tight"
        >
          We'd love to hear <br className="hidden md:block" /> from you.
        </motion.h1>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-0 mt-16 md:mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col gap-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-brand-primary-dark mb-2">Let's talk about plants.</motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-neutral-600 leading-relaxed text-sm md:text-base mb-6">
              Whether you have a question about plant care, your recent order, or just want to share a picture of your new green friend, our team is ready to answer all your questions.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-neutral-50/50 p-6 md:p-8 rounded-3xl border border-neutral-100 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300"
            >
               <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                 <MdOutlineLocationOn size={24} />
               </div>
               <div>
                 <h3 className="text-base font-bold text-brand-primary-dark mb-1">Our Store</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">123 Green Street<br/>Dhaka, Bangladesh</p>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
               className="bg-neutral-50/50 p-6 md:p-8 rounded-3xl border border-neutral-100 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300"
            >
               <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                 <MdOutlineEmail size={24} />
               </div>
               <div>
                 <h3 className="text-base font-bold text-brand-primary-dark mb-1">Contact Information</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">Email: hello@bonomaya.com<br/>Phone: 01234-678901</p>
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
               className="bg-neutral-50/50 p-6 md:p-8 rounded-3xl border border-neutral-100 flex items-start gap-5 hover:-translate-y-1 transition-transform duration-300"
            >
               <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                 <MdOutlineAccessTime size={24} />
               </div>
               <div>
                 <h3 className="text-base font-bold text-brand-primary-dark mb-1">Business Hours</h3>
                 <p className="text-sm text-neutral-500 leading-relaxed">Monday - Friday: 9:00 AM - 8:00 PM<br/>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
               </div>
            </motion.div>
          </div>
          
          {/* Right: Form Section */}
          <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 border border-neutral-100 relative overflow-hidden lg:sticky lg:top-32"
          >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary to-brand-primary-light"></div>
              <h2 className="text-2xl font-bold text-brand-primary-dark mb-6">Send us a message</h2>
              <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! (Demo)'); }}>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Your Name</label>
                  <input type="text" required className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-brand-primary transition-colors" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" required className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-brand-primary transition-colors" placeholder="e.g. john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea required rows={5} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-brand-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark transition-all duration-300 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-md hover:-translate-y-1 cursor-pointer mt-2">
                  Send Message
                </button>
              </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;