"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Search, Trophy, Loader2, Medal, Award, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

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

  const searchResults = useMemo(() => {
    if (!searchQuery || !ambassadors) return []

    const query = searchQuery.toLowerCase().trim()
    return ambassadors.filter(
      (amb) =>
        amb.name.toLowerCase().includes(query) || amb.email.toLowerCase().includes(query)
    )
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
      <Card className="bg-green-950/50 backdrop-blur-lg text-white border-green-800/30 rounded-lg w-full max-w-lg mx-auto">
        <CardHeader className="p-6">
          <CardTitle className="text-xl text-center">Ambassador Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
            <p className="text-sm">Loading leaderboard...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!ambassadors) {
    return (
      <Card className="bg-green-950/50 backdrop-blur-lg text-white border-green-800/30 rounded-lg w-full max-w-lg mx-auto">
        <CardContent className="p-6 flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-green-400" />
        </CardContent>
      </Card>
    )
  }

  if (ambassadors.length === 0) {
    return (
      <Card className="bg-green-950/50 backdrop-blur-lg text-white border-green-800/30 rounded-lg w-full max-w-lg mx-auto">
        <CardContent className="p-6">
          <p className="text-yellow-300 text-center text-sm">No ambassadors registered yet. Be the first to join!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-green-950/50 backdrop-blur-lg text-white border-green-800/30 rounded-lg w-full max-w-lg mx-auto">
      <CardHeader className="p-6">
        <CardTitle className="text-xl text-center">Ambassador Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
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
              className="flex-1 bg-green-900/30 text-white placeholder-gray-400 border-green-700/30 focus:border-green-500 focus:ring-green-500 rounded-lg"
            />
            <Button
              type="submit"
              disabled={!searchQuery}
              className="bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 rounded-lg"
            >
              <Search size={16} />
            </Button>
          </form>
        </div>

        {showSearchResult && (
          <div className="mb-6">
            {searchResults.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {searchResults.map((result, index) => (
                  <div
                    key={result.email}
                    className="p-4 bg-green-900/30 backdrop-blur-lg rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-semibold">Search Result {index + 1}:</h3>
                        <p className="text-sm font-medium mt-1">{result.name}</p>
                        <p className="text-xs text-gray-400">{maskEmail(result.email)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">
                          {result.score > 0 ? `Rank: ${getRank(result)}` : "Not Ranked Yet"}
                        </p>
                        <p className="text-xs text-gray-400">Points: {result.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-green-900/30 backdrop-blur-lg rounded-lg"
              >
                <p className="text-sm text-gray-400">No ambassadors found with that name.</p>
              </motion.div>
            )}
            <Button
              onClick={clearSearch}
              variant="ghost"
              className="bg-green-700/50 backdrop-blur-lg hover:bg-green-600 text-white mt-4 text-xs"
            >
              Clear Search
            </Button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-900/30">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-800/30">
              {topTen.map((ambassador, index) => (
                <motion.tr
                  key={ambassador.email}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-green-900/20 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 ? (
                        <Trophy className="h-4 w-4 text-yellow-400 mr-2" />
                      ) : index === 1 ? (
                        <Medal className="h-4 w-4 text-gray-300 mr-2" />
                      ) : index === 2 ? (
                        <Award className="h-4 w-4 text-amber-600 mr-2" />
                      ) : (
                        <Star className="h-4 w-4 text-green-400 mr-2" />
                      )}
                      <span className="text-sm text-white">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-white">{ambassador.name}</div>
                    <div className="text-xs text-gray-400">{maskEmail(ambassador.email)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-400">{ambassador.score}</div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaderboardSection