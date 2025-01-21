"use client"
import { Zap, Users, Lock } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gray-800">
      <div className="container md:max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20">
          Why Choose{' '}
          <span className="text-blue-400">
            ExcaliClone
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap size={40} className="text-yellow-400" />}
            title="Lightning Fast"
            description="Experience seamless drawing and collaboration with our optimized performance."
          />
          <FeatureCard
            icon={<Users size={40} className="text-green-400" />}
            title="Real-time Collaboration"
            description="Work together with your team in real-time, no matter where you are."
          />
          <FeatureCard
            icon={<Lock size={40} className="text-blue-400" />}
            title="Secure & Private"
            description="Your data is encrypted and protected. We prioritize your privacy and security."
          />
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-700 rounded-lg p-6 transition-all duration-200 hover:transform hover:scale-105">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
)

export default Features

