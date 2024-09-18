'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamsPage() {
  const teams = useSelector((state: RootState) => state.teams.teams)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Cricket Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link href={`/teams/${team.id}`} key={team.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Players: {team.players.length}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}