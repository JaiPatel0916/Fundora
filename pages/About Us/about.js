export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🚀 About FUNDORA</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Revolutionizing crowdfunding through blockchain technology, connecting innovative creators with passionate supporters across the globe without limits.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-6 px-6 md:px-20 py-12">
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2 flex items-center">🎯 Our Mission</h2>
          <p className="text-gray-300">
            To democratize funding and empower creators worldwide by providing a secure, transparent, and accessible platform that breaks down traditional barriers in crowdfunding. We believe every innovative idea deserves the chance to become reality.
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2 flex items-center">❤️ Our Vision</h2>
          <p className="text-gray-300">
            To create a world where innovation knows no boundaries, where creators and supporters form meaningful connections that transcend geographical limits, and where breakthrough ideas receive the funding they need to change the world.
          </p>
        </div>
      </section>

      {/* Why Choose Fundora */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose FUNDORA?</h2>
        <p className="text-gray-300 mb-10">Built with cutting-edge technology for the future of funding</p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">🛡 Secure & Transparent</h3>
            <p className="text-gray-300 text-sm">
              Built on blockchain technology for maximum security and transparency in all transactions.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">🌍 Global Reach</h3>
            <p className="text-gray-300 text-sm">
              Connect with supporters and creators worldwide without geographical limitations.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">⚡ Fast Funding</h3>
            <p className="text-gray-300 text-sm">
              Quick campaign setup and instant funding with cryptocurrency payments.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">👥 Community Driven</h3>
            <p className="text-gray-300 text-sm">
              Foster meaningful connections between creators and their community of supporters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
