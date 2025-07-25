"use client"

import React, { useState, useCallback } from "react"
import { Plus } from "lucide-react"

interface Counter {
  id: string;
  count: number;
  name: string;
}

interface CounterItemProps {
  counter: Counter;
  onIncrease: () => void;
  onDecrease: () => void;
  onReset: () => void;
  onRename: (newName: string) => void;
}

function CounterItem({ counter, onIncrease, onDecrease, onReset, onRename }: CounterItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(counter.name)

  const handleNameSubmit = () => {
    const trimmed = tempName.trim()
    if (trimmed && trimmed !== counter.name) {
      onRename(trimmed)
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSubmit()
    } else if (e.key === "Escape") {
      setTempName(counter.name)
      setIsEditing(false)
    }
  }

  const isThresholdReached = counter.count >= 10

  return (
    <div className="bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/50 hover:border-green-400/50 transition-all duration-500 hover:shadow-green-400/20 hover:shadow-2xl group">
      {/* Counter Header */}
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyPress}
            className="text-lg font-semibold bg-gray-800/80 border border-green-400/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-white backdrop-blur-sm"
            autoFocus
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-lg font-semibold text-white cursor-pointer hover:text-green-400 transition-colors flex items-center gap-2"
            title="Click to rename"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {counter.name}
          </h3>
        )}
        {/* Delete button removed for single counter */}
      </div>

      {/* Counter Display */}
      <div className="text-center mb-6">
        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
          {counter.count}
        </div>

        {/* Threshold Message */}
        {isThresholdReached && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 p-3 mb-3 rounded-lg text-sm backdrop-blur-sm">
            <p className="text-yellow-300 font-semibold flex items-center justify-center gap-2">
              <span className="animate-bounce">⚡</span>
              Neural Threshold Achieved!
              <span className="animate-bounce">⚡</span>
            </p>
          </div>
        )}

        <p className="text-gray-400 text-sm">
          {counter.count === 0 ? "Node Idle" : `Processing: ${counter.count} cycles`}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => onIncrease(counter.id)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95 text-lg shadow-lg border border-green-400/30"
        >
          +
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onReset(counter.id)}
        disabled={counter.count === 0}
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-200 border border-gray-500/30"
      >
        Reset Node
      </button>

      {/* Counter Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            Status:{" "}
            <span className="text-green-400 font-semibold">
              {counter.count === 0
                ? "Idle"
                : counter.count < 5
                  ? "Active"
                  : counter.count < 10
                    ? "High Load"
                    : "Maximum"}
            </span>
          </span>
          <span className="text-gray-400">
            Load: <span className="text-blue-400 font-semibold">{Math.min(counter.count, 10)}/10</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [counter, setCounter] = useState<Counter>({ id: "1", count: 0, name: "Counter" })

  const increaseCounter = useCallback(() => {
    setCounter((prev) => ({ ...prev, count: prev.count + 1 }))
  }, [])

  const decreaseCounter = useCallback(() => {
    setCounter((prev) => ({ ...prev, count: prev.count > 0 ? prev.count - 1 : 0 }))
  }, [])

  const resetCounter = useCallback(() => {
    setCounter((prev) => ({ ...prev, count: 0 }))
  }, [])

  const renameCounter = useCallback((newName: string) => {
    setCounter((prev) => ({ ...prev, name: newName }))
  }, [])

  // GlobalStats for single counter
  const GlobalStats = ({ count }: { count: number }) => (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-2xl p-6 inline-block border border-gray-700/50" role="region" aria-label="Global Stats">
      <div className="flex gap-8 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1" aria-label="Active Nodes">1</div>
          <span className="text-gray-400">Active Node</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1" aria-label="Total Compute">{count}</div>
          <span className="text-gray-400">Total Compute</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1" aria-label="Avg Performance">
            {count.toFixed(1)}
          </div>
          <span className="text-gray-400">Performance</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-        npm run dev500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#00ff88" opacity="0.3" />
              <line x1="50" y1="50" x2="150" y2="50" stroke="#00ff88" strokeWidth="0.5" opacity="0.2" />
              <line x1="50" y1="50" x2="50" y2="150" stroke="#00ff88" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">∞</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Alkasim Counter Matrix
            </h1>
          </div>

          <p className="text-gray-300 mb-2 text-lg">Simple Counter System</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Powered by Alkasim Umar
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              3MTT Fellow
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              ID: FE/23/22542520
            </span>
          </div>

          {/* Global Stats */}
          <GlobalStats count={counter.count} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={increaseCounter}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl border border-green-400/30 flex items-center gap-3 backdrop-blur-sm"
            aria-label="Increase Counter"
          >
            <Plus size={24} />
            <span>Increase</span>
          </button>

          <button
            onClick={resetCounter}
            disabled={counter.count === 0}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl border border-orange-400/30 backdrop-blur-sm"
            aria-label="Reset Counter"
          >
            <span>Reset</span>
          </button>
        </div>

        {/* Single Counter Display */}
        <div className="flex justify-center">        
                    <CounterItem
            counter={counter}
            onIncrease={increaseCounter}
            onDecrease={decreaseCounter}
            onReset={resetCounter}
            onRename={(_, newName) => renameCounter(newName)}
          />
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 inline-block border border-gray-700/30">
            <p className="mb-2">🚀 Alkasim Counter Matrix v1.0 - Enterprise Edition</p>
            <p className="mb-4">
              © 2023 Alkasim Umar. All rights reserved. This project is a 3MTT Counter react App
            </p>
            </div>
          </div>
        </div>
      </div>
  )
}
