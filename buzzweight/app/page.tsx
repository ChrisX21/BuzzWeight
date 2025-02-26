import Hero from "@/components/hero";

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Smart Bee Hive Monitoring
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4">
                Our advanced monitoring system provides real-time insights into
                the health and productivity of your bee colonies. Track
                temperature, humidity, and activity patterns to ensure optimal
                conditions for your bees.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>24/7 remote monitoring of vital hive metrics</li>
                <li>Early detection of potential health issues</li>
                <li>Historical data analysis for seasonal patterns</li>
                <li>Custom alerts for critical threshold breaches</li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <img
                src="/images/dashboard.png"
                alt="Hive Monitoring Dashboard"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Precision Pollen Collection
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center order-last md:order-first">
              <img
                src="/images/pollen_scale.png"
                alt="Pollen Scale System"
                width={500}
                height={300}
              />
            </div>
            <div>
              <p className="text-lg mb-4">
                Our innovative scale system accurately measures pollen
                collection in real-time, helping you track productivity and
                optimize harvesting schedules.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>High-precision weight monitoring</li>
                <li>Automated data logging and reporting</li>
                <li>Harvest forecasting based on collection rates</li>
                <li>
                  Integration with hive health metrics for comprehensive
                  analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Mobile Eco-Friendly Apiaries
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-lg mb-4">
              Our custom-designed mobile trailers provide the perfect
              environment for bee colonies while minimizing environmental
              impact. Easily relocate your hives to optimize pollination and
              honey production throughout the season.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2">Sustainable Design</h3>
                <p>
                  Solar-powered systems with battery backup ensure continuous
                  operation with minimal carbon footprint.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2">Climate Control</h3>
                <p>
                  Intelligent temperature and ventilation systems maintain ideal
                  conditions in any environment.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-bold text-lg mb-2">Easy Mobility</h3>
                <p>
                  Lightweight, durable construction allows for quick relocation
                  to follow blooming patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Start Monitoring Today
          </h2>
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-lg text-center">
            <p className="text-xl mb-6">
              Join beekeepers across the country who are increasing productivity
              and colony health with our integrated monitoring solution.
            </p>
            <a
              href="/contact"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Request a Demo
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
