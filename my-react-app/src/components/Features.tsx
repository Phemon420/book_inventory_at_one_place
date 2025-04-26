interface Feature {
  title: string
  description: string
  icon: string
}

const Features = (): JSX.Element => {
  const features: Feature[] = [
    {
      title: "Track Your Collection",
      description: "Easily catalog and organize your entire book collection in one place.",
      icon: "/images/track-icon.png",
    },
    {
      title: "Reading Stats",
      description: "Get insights into your reading habits with detailed statistics and progress tracking.",
      icon: "/images/stats-icon.png",
    },
    {
      title: "Discover New Books",
      description: "Find your next favorite read with personalized recommendations based on your preferences.",
      icon: "/images/discover-icon.png",
    },
    {
      title: "Reading Lists",
      description: "Create custom reading lists for different genres, topics, or goals.",
      icon: "/images/list-icon.png",
    },
  ]

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-deepblue-950 mb-4">Features Designed for Book Lovers</h2>
          <p className="text-lg text-deepblue-700 max-w-3xl mx-auto">
            Our platform offers everything you need to manage your personal book collection and enhance your reading
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <img src={feature.icon || "/placeholder.svg"} alt={feature.title} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-deepblue-950 mb-3">{feature.title}</h3>
              <p className="text-deepblue-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
