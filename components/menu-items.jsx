"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const menuCategories = [
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Signature Coffee", price: "₹180", description: "Our house blend with a rich, smooth flavor" },
      { name: "Bubble Tea", price: "₹220", description: "Classic milk tea with tapioca pearls" },
      { name: "Fruit Smoothies", price: "₹200", description: "Freshly blended fruits with yogurt" },
      { name: "Iced Latte", price: "₹190", description: "Espresso with cold milk and ice" },
      { name: "Hot Chocolate", price: "₹170", description: "Rich chocolate with steamed milk and whipped cream" },
    ],
  },
  {
    id: "food",
    name: "Food",
    items: [
      { name: "Gourmet Pizza", price: "₹350", description: "Thin crust pizza with premium toppings" },
      { name: "American Burger", price: "₹280", description: "Juicy beef patty with cheese and fresh veggies" },
      { name: "Pasta Bowl", price: "₹320", description: "Al dente pasta with your choice of sauce" },
      { name: "Club Sandwich", price: "₹250", description: "Triple-decker sandwich with chicken and bacon" },
      { name: "Caesar Salad", price: "₹220", description: "Crisp romaine lettuce with our signature dressing" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "New York Cheesecake", price: "₹220", description: "Creamy cheesecake with graham cracker crust" },
      { name: "Chocolate Brownie", price: "₹180", description: "Warm chocolate brownie with vanilla ice cream" },
      { name: "Ice Cream Sundae", price: "₹250", description: "Three scoops with toppings and whipped cream" },
      { name: "Tiramisu", price: "₹230", description: "Classic Italian dessert with coffee-soaked ladyfingers" },
      { name: "Apple Pie", price: "₹200", description: "Warm apple pie with a scoop of vanilla ice cream" },
    ],
  },
]

export default function MenuItems() {
  const [activeCategory, setActiveCategory] = useState("beverages")

  return (
    <div className="w-full">
      <Tabs defaultValue="beverages" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {menuCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-lg">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {menuCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/placeholder.svg?height=300&width=800`}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className="font-bold">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
