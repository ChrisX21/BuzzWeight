export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center bg-gradient-to-b from-amber-50 to-white py-16">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-amber-600 mb-6">BuzzWeight</h1>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
          Smart Bee Hive Monitoring & Pollen Collection
        </h2>
        <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
          Track hive health, monitor pollen collection, and optimize colony
          productivity with our real-time sensor platform for mobile,
          eco-friendly apiaries.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="bg-transparent hover:bg-amber-50 text-amber-600 font-semibold py-3 px-6 border border-amber-600 rounded-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
