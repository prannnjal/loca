import { Building2, Award, Star } from "lucide-react"

export default function StatsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Established in 2015</h3>
            <p className="text-gray-600">More than 5 years in existence</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Successfully running 135+ outlets</h3>
            <p className="text-gray-600">PAN India</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <Star className="h-10 w-10 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">4.4 star rated</h3>
            <p className="text-gray-600">on Swiggy and Zomato</p>
          </div>
        </div>
      </div>
    </section>
  )
}
