"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Search, Trophy, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Ambassador {
  name: string
  email: string
  score: number
}

interface LeaderboardSectionProps {
  ambassadors: Ambassador[]
  isLoading: boolean
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ ambassadors, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResult, setShowSearchResult] = useState(false)

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@")
    const maskedUsername = username.slice(0, 3) + "***"
    const [domainName, extension] = domain.split(".")
    const maskedDomain = domainName.slice(0, 1) + "***" + "." + extension
    return `${maskedUsername}@${maskedDomain}`
  }

  const sortedAmbassadors = useMemo(() => {
    return ambassadors && ambassadors.length > 0 ? [...ambassadors].sort((a, b) => b.score - a.score) : []
  }, [ambassadors])

  const topTen = sortedAmbassadors.slice(0, 10)

  const searchResult = useMemo(() => {
    if (!searchQuery || !ambassadors) return null

    const query = searchQuery.toLowerCase().trim()
    return ambassadors.find((amb) => amb.name.toLowerCase().includes(query) || amb.email.toLowerCase().includes(query))
  }, [searchQuery, ambassadors])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSearchResult(true)
  }

  const getRank = (ambassador: Ambassador) => {
    return sortedAmbassadors.findIndex((amb) => amb.email === ambassador.email) + 1
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResult(false)
  }

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Ambassador Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-green-400" />
            <p className="text-lg">Loading leaderboard...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!ambassadors) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg text-white">
        <CardContent className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-400" />
        </CardContent>
      </Card>
    )
  }

  if (ambassadors.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg text-white">
        <CardContent>
          <p className="text-yellow-300">No ambassadors registered yet. Be the first to join!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Ambassador Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (!e.target.value) {
                  setShowSearchResult(false)
                }
              }}
              className="flex-1 bg-white/20 text-white placeholder-gray-300"
            />
            <Button type="submit" disabled={!searchQuery} className="bg-green-500 hover:bg-green-600">
              <Search size={20} />
            </Button>
          </form>
        </div>

        {showSearchResult && (
          <div className="max-w-2xl mx-auto mb-8">
            {searchResult ? (
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Search Result:</h3>
                    <p className="font-medium mt-2">{searchResult.name}</p>
                    <p className="text-sm text-gray-300">{maskEmail(searchResult.email)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      {searchResult.score > 0 ? `Rank: ${getRank(searchResult)}` : "Not Ranked Yet"}
                    </p>
                    <p className="text-gray-300">Points: {searchResult.score}</p>
                  </div>
                </div>
                <Button onClick={clearSearch} variant="ghost" className="mt-4 text-sm text-gray-300 hover:text-white">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-white/20 backdrop-blur-lg rounded-lg">
                <p className="text-gray-300">No ambassador found with that name.</p>
                <Button onClick={clearSearch} variant="ghost" className="mt-4 text-sm text-gray-300 hover:text-white">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Rank</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-700">
              {topTen.map((ambassador, index) => (
                <tr key={ambassador.email} className="hover:bg-green-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">#{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{ambassador.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{maskEmail(ambassador.email)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-400">{ambassador.score}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaderboardSection

