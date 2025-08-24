import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HowItWorksPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // background shift
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]); // floating title

  return (
    <motion.section
      ref={ref}
      className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
    >
      {/* Background Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          y: bgY,
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-3 text-white"
          style={{ y: titleY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>

        <motion.p
          className="text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Simple steps to bring your ideas to life
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Create Your Campaign",
              desc: "Set up your project with compelling content, images, and funding goals.",
            },
            {
              step: "02",
              title: "Share Your Vision",
              desc: "Tell your story and connect with potential backers who believe in your idea.",
            },
            {
              step: "03",
              title: "Receive Funding",
              desc: "Get funded through secure cryptocurrency transactions on the blockchain.",
            },
            {
              step: "04",
              title: "Deliver Results",
              desc: "Execute your project and keep your community updated on your progress.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 p-6 rounded-2xl shadow-lg transition duration-500 hover:scale-105 hover:bg-white/20 backdrop-blur-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Meet Our Team Section */}
      <motion.section
        className="relative z-10 px-6 md:px-20 py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-3 text-white">Meet Our Team</h2>
        <p className="text-gray-300 mb-12">
          Passionate innovators driving the future of crowdfunding
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            {
              img: "/team/alex.jpg",
              name: "Jai Patel",
              role: "CEO & Founder",
              desc: "Blockchain enthusiast with 10+ years in fintech",
            },
            {
              img: "/team/sarah.jpg",
              name: "Ansh Mishra",
              role: "CTO",
              desc: "Full-stack developer passionate about decentralized technology",
            },
            {
              img: "/team/marcus.jpg",
              name: "Shivam Badade",
              role: "Head of Marketing",
              desc: "Digital marketing expert with a focus on community building",
            },
            {
              img: "/team/emily.jpg",
              name: "Rashi Yadav",
              role: "Head of Security",
              desc: "Cybersecurity specialist ensuring platform safety",
            },
            {
              img: "/team/david.jpg",
              name: "Ranjeet Shahu",
              role: "Chief Product Officer",
              desc: "Product strategist focused on building user-first blockchain solutions",
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 p-6 rounded-2xl shadow-lg text-center transition duration-500 hover:scale-105 hover:bg-white/20 backdrop-blur-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 transition duration-500 hover:scale-110"
              />
              <h3 className="font-bold text-white">{member.name}</h3>
              <p className="text-orange-400 text-sm mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="relative z-10 px-6 md:px-20 py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-gradient-to-r from-purple-800 to-blue-900 rounded-2xl p-10 text-center shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-6">
            Join thousands of creators and supporters who are already using FUNDORA
            to bring innovative ideas to life. Start your journey today!
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/createcampaign">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-transform duration-500 hover:scale-105">
                Start Your Campaign
              </button>
            </Link>
            <Link href="/">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-transform duration-500 hover:scale-105">
                Explore Projects
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </motion.section>
  );
}
