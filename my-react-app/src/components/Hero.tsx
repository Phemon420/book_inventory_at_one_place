const Hero = (): JSX.Element => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deepblue-950 mb-6">
            Your Personal Book Database
          </h1>
          <p className="text-lg md:text-xl text-deepblue-800 mb-8">
            Track, organize, and discover your favorite books all in one place. Never lose track of your reading journey
            again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/books"
              className="bg-deepblue-950 hover:bg-deepblue-800 text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center"
            >
              Browse Books
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <button className="border border-deepblue-950 text-deepblue-950 hover:bg-deepblue-50 px-6 py-3 rounded-md font-medium text-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="/images/hero-books.png"
            alt="Collection of books on a shelf"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
