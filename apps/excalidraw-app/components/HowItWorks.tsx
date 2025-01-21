import Image from 'next/image'

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container md:max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step
            number={1}
            title="Create Your Board"
            description="Start with a blank canvas or choose from our templates to kickstart your project."
          />
          <Step
            number={2}
            title="Collaborate in Real-time"
            description="Invite team members to join your board and work together seamlessly."
          />
          <Step
            number={3}
            title="Share & Export"
            description="Share your creations with others or export them in various formats."
          />
        </div>
      </div>
    </section>
  )
}

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)

export default HowItWorks

