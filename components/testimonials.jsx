"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Priya S.",
    role: "Food Blogger",
    content:
      "ZOCA has the best coffee in town! The ambiance is perfect for both work and casual meetups. Highly recommend their signature bubble tea.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    role: "Regular Customer",
    content:
      "I visit ZOCA at least twice a week. Their menu is diverse and the quality is consistently excellent. The staff is friendly and the atmosphere is cozy.",
    rating: 5,
  },
  {
    name: "Ananya K.",
    role: "Food Critic",
    content:
      "ZOCA brings a fresh perspective to cafe culture in India. Their American menu is authentic and the presentation is Instagram-worthy.",
    rating: 4,
  },
  {
    name: "Vikram J.",
    role: "Business Owner",
    content:
      "Perfect place for business meetings. The quiet corners and reliable Wi-Fi make it ideal for work. Their coffee keeps me coming back!",
    rating: 5,
  },
  {
    name: "Meera P.",
    role: "College Student",
    content:
      "As a student, I love studying at ZOCA. The atmosphere is conducive to productivity and their student discounts are a plus!",
    rating: 4,
  },
]

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 3
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage)

  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount)
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their ZOCA experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={`/placeholder.svg?height=100&width=100`}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full border-black text-black hover:bg-black hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[...Array(pageCount)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(i)}
                className={`rounded-full ${
                  currentPage === i ? "bg-black text-white" : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full border-black text-black hover:bg-black hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
