"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trophy } from "lucide-react"

export default function ClickCounter() {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDecrease = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0))
  }

  const getCounterMessage = () => {
    if (count >= 10) {
      return "🎉 You've reached the limit! Amazing!"
    }
    if (count === 0) {
      return "Start clicking to begin!"
    }
    return `Keep going! ${10 - count} more to reach the limit.`
  }

  const getCounterColor = () => {
    if (count >= 10) return "text-green-600"
    if (count >= 5) return "text-orange-500"
    return "text-blue-600"
  }

  return (
    <div className="space-y-6">
      {/* Counter Display */}
      <Card className="border-2 border-gray-200">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className={`text-6xl font-bold ${getCounterColor()} transition-colors duration-300`}>{count}</div>
            <div className="text-sm text-gray-600 min-h-[2rem] flex items-center justify-center">
              {count >= 10 && <Trophy className="w-4 h-4 mr-2 text-yellow-500" />}
              {getCounterMessage()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleDecrease}
          variant="outline"
          size="lg"
          className="flex-1 h-14 text-lg font-semibold border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-transparent"
          disabled={count === 0}
        >
          <Minus className="w-5 h-5 mr-2" />
          Decrease
        </Button>

        <Button
          onClick={handleIncrease}
          size="lg"
          className="flex-1 h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Increase
        </Button>
      </div>

      {/* Stats Section */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-700">{count}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Current Count</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-700">{Math.max(0, 10 - count)}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">To Limit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>
          • Click <strong>Increase</strong> to add 1 to the counter
        </p>
        <p>
          • Click <strong>Decrease</strong> to subtract 1 (minimum is 0)
        </p>
        <p>• Reach 10 clicks to see a special message!</p>
      </div>
    </div>
  )
}
