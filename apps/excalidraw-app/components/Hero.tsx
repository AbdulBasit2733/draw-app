import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-40 pb-20 px-4">
      <div className="container md:max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide animate-fade-in-up">
          Unleash Your Creativity with{' '}
          <span className="text-blue-400">
            ExcaliClone
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 animate-fade-in-up animation-delay-200">
          The ultimate whiteboard experience for teams and individuals
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 animate-fade-in-up animation-delay-400"
        >
          Get Started Free
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </section>
  )
}

export default Hero

