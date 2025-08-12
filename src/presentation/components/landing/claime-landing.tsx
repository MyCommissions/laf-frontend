"use client"

import { Button } from "../ui/button"
import { Hand } from "lucide-react"

/**
 * ClaiMe Landing Page Component
 *
 * A minimalist landing page for the ClaiMe service that helps users
 * claim what belongs to them in a fast, easy, and secure manner.
 *
 * Features:
 * - Responsive design that works on all screen sizes
 * - Clean, professional typography
 * - Accessible button with hover states
 * - Semantic HTML structure
 * - TypeScript for type safety
 *
 * @returns JSX.Element - The complete landing page
 */
export default function ClaimeLanding() {
  /**
   * Handles the proceed button click
   * In a real application, this would navigate to the next step
   * or trigger the claiming process
   */
  const handleProceed = () => {
    console.log("Proceeding to claim process...")
    // Add your navigation or API call logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo/Icon Section */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
            <Hand className="w-8 h-8 text-white" aria-label="ClaiMe logo - hand icon" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">ClaiMe</h1>

        {/* Tagline Section */}
        <div className="space-y-2">
          <p className="text-lg md:text-xl text-gray-800 font-medium">Claim what is yours</p>
          <p className="text-base md:text-lg text-gray-600">— fast, easy, secure.</p>
        </div>

        {/* Call to Action Button */}
        <div className="pt-4">
          <Button
            onClick={handleProceed}
            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium transition-colors duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            aria-label="Proceed to start claiming process"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  )
}
