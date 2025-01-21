import { Check } from 'lucide-react'

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Free"
            price="$0"
            features={[
              "5 boards",
              "Basic shapes and tools",
              "7-day version history",
              "Limited collaboration"
            ]}
            ctaText="Get Started"
            ctaLink="/signup"
          />
          <PricingCard
            title="Pro"
            price="$12"
            period="month"
            features={[
              "Unlimited boards",
              "Advanced shapes and tools",
              "30-day version history",
              "Real-time collaboration",
              "Priority support"
            ]}
            ctaText="Try Pro"
            ctaLink="/signup?plan=pro"
            highlighted={true}
          />
          <PricingCard
            title="Enterprise"
            price="Custom"
            features={[
              "Everything in Pro",
              "Custom integrations",
              "Dedicated account manager",
              "On-premise deployment option",
              "24/7 phone support"
            ]}
            ctaText="Contact Sales"
            ctaLink="/contact"
          />
        </div>
      </div>
    </section>
  )
}

const PricingCard = ({ title, price, period, features, ctaText, ctaLink, highlighted = false }) => (
  <div className={`bg-gray-800 rounded-lg p-8 ${highlighted ? 'ring-2 ring-blue-500' : ''}`}>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-4xl font-bold mb-2">
      {price}
      {period && <span className="text-xl font-normal text-gray-400">/{period}</span>}
    </p>
    <ul className="mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <Check size={20} className="text-green-500 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <a
      href={ctaLink}
      className={`block text-center py-2 px-4 rounded ${
        highlighted
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-gray-700 hover:bg-gray-600'
      } transition-colors duration-200`}
    >
      {ctaText}
    </a>
  </div>
)

export default Pricing

