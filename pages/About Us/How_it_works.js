export default function HowItWorksPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* How It Works Section */}
      <section className="pt-32 pb-20 px-6 text-center bg-[url('/background.jpg')] bg-cover bg-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
        <p className="text-gray-300 mb-12">
          Simple steps to bring your ideas to life
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-auto mb-4">
              01
            </div>
            <h3 className="font-bold text-lg mb-2">Create Your Campaign</h3>
            <p className="text-gray-300 text-sm">
              Set up your project with compelling content, images, and funding goals.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-auto mb-4">
              02
            </div>
            <h3 className="font-bold text-lg mb-2">Share Your Vision</h3>
            <p className="text-gray-300 text-sm">
              Tell your story and connect with potential backers who believe in your idea.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-auto mb-4">
              03
            </div>
            <h3 className="font-bold text-lg mb-2">Receive Funding</h3>
            <p className="text-gray-300 text-sm">
              Get funded through secure cryptocurrency transactions on the blockchain.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full mx-auto mb-4">
              04
            </div>
            <h3 className="font-bold text-lg mb-2">Deliver Results</h3>
            <p className="text-gray-300 text-sm">
              Execute your project and keep your community updated on your progress.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Meet Our Team</h2>
        <p className="text-gray-300 mb-12">
          Passionate innovators driving the future of crowdfunding
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center">
            <img
              src="/team/alex.jpg"
              alt="Alex Chen"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="font-bold">Alex Chen</h3>
            <p className="text-orange-400 text-sm mb-2">CEO & Founder</p>
            <p className="text-gray-300 text-sm">
              Blockchain enthusiast with 10+ years in fintech
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center">
            <img
              src="/team/sarah.jpg"
              alt="Sarah Johnson"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="font-bold">Sarah Johnson</h3>
            <p className="text-orange-400 text-sm mb-2">CTO</p>
            <p className="text-gray-300 text-sm">
              Full-stack developer passionate about decentralized technology
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center">
            <img
              src="/team/marcus.jpg"
              alt="Marcus Rodriguez"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="font-bold">Marcus Rodriguez</h3>
            <p className="text-orange-400 text-sm mb-2">Head of Marketing</p>
            <p className="text-gray-300 text-sm">
              Digital marketing expert with a focus on community building
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg text-center">
            <img
              src="/team/emily.jpg"
              alt="Dr. Emily Wong"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="font-bold">Dr. Emily Wong</h3>
            <p className="text-orange-400 text-sm mb-2">Head of Security</p>
            <p className="text-gray-300 text-sm">
              Cybersecurity specialist ensuring platform safety
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-16">
        <div className="bg-gradient-to-r from-purple-800 to-blue-900 rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-6">
            Join thousands of creators and supporters who are already using FUNDORA
            to bring innovative ideas to life. Start your journey today!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium">
              Start Your Campaign
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium">
              Explore Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
