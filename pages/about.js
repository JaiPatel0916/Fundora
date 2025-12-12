import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import HowItWorks from "../pages/How_it_works";
import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-orange-900 via-purple-900 to-black text-white min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <Parallax speed={-20}>
        <motion.section
          className="pt-32 pb-20 px-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 transition duration-500 hover:scale-105">
             About FUNDORA
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto transition duration-500 hover:text-white/90">
            Revolutionizing crowdfunding through blockchain technology, connecting innovative creators
            with passionate supporters across the globe without limits.
          </p>
        </motion.section>
      </Parallax>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-6 px-6 md:px-20 py-12">
        <Parallax speed={3}>
          <motion.div
            className="bg-white/10 rounded-2xl p-6 shadow-lg transition duration-500 hover:scale-105 hover:bg-white/20"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-2 flex items-center">🎯 Our Mission</h2>
            <p className="text-gray-300">
              To democratize funding and empower creators worldwide by providing a secure, transparent,
              and accessible platform that breaks down traditional barriers in crowdfunding.
              We believe every innovative idea deserves the chance to become reality.
            </p>
          </motion.div>
        </Parallax>

        <Parallax speed={3}>
          <motion.div
            className="bg-white/10 rounded-2xl p-6 shadow-lg transition duration-500 hover:scale-105 hover:bg-white/20"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-2 flex items-center">❤️ Our Vision</h2>
            <p className="text-gray-300">
              To create a world where innovation knows no boundaries, where creators and supporters
              form meaningful connections that transcend geographical limits, and where breakthrough
              ideas receive the funding they need to change the world.
            </p>
          </motion.div>
        </Parallax>
      </section>

      {/* Why Choose Fundora */}
      <Parallax speed={-15}>
        <motion.section
          className="px-6 md:px-20 py-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose FUNDORA ?</h2>
          <p className="text-gray-300 mb-10">Built with cutting-edge technology for the future of funding</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "🛡 Secure & Transparent",
                desc: "Built on blockchain technology for maximum security and transparency in all transactions.",
              },
              {
                title: "🌍 Global Reach",
                desc: "Connect with supporters and creators worldwide without geographical limitations.",
              },
              {
                title: "⚡ Fast Funding",
                desc: "Quick campaign setup and instant funding with cryptocurrency payments.",
              },
              {
                title: "👥 Community Driven",
                desc: "Foster meaningful connections between creators and their community of supporters.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 p-6 rounded-2xl shadow-lg transition duration-500 hover:scale-105 hover:bg-white/20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </Parallax>

      {/* How It Works Section */}
      <Parallax speed={8}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <HowItWorks />
        </motion.div>
      </Parallax>

      {/* Footer */}
      <Parallax speed={-5}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>
      </Parallax>
    </div>
  );
}
