"use client"
import Image from 'next/image'

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="ExcaliClone has revolutionized our brainstorming sessions. It's intuitive and powerful!"
            author="Sarah Johnson"
            role="Product Manager"
            avatar="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="The real-time collaboration feature is a game-changer for our remote team."
            author="Mike Chen"
            role="UX Designer"
            avatar="/placeholder.svg?height=80&width=80"
          />
          <TestimonialCard
            quote="I love how easy it is to create professional-looking diagrams with ExcaliClone."
            author="Emily Rodriguez"
            role="Software Engineer"
            avatar="/placeholder.svg?height=80&width=80"
          />
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ quote, author, role, avatar }) => (
  <div className="bg-gray-700 rounded-lg p-6">
    <p className="text-lg mb-4">"{quote}"</p>
    <div className="flex items-center">
      <Image
        src={avatar || "/placeholder.svg"}
        alt={author}
        width={40}
        height={40}
        className="rounded-full mr-4"
      />
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  </div>
)

export default Testimonials

