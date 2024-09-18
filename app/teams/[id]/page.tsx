'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'next/navigation'
import { RootState } from '@/lib/store'
import { addPlayer, removePlayer, updatePlayer } from '@/lib/teamSlice'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

type Player = {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All Rounder' | 'WK';
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export default function TeamPage() {
  const { id } = useParams()
  const team = useSelector((state: RootState) => 
    state.teams.teams.find(t => t.id === id)
  )
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: '',
    name: '',
    role: 'Batsman',
    isCaptain: false,
    isViceCaptain: false
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null)

  const [hasCaptain, setHasCaptain] = useState(false)
  const [hasViceCaptain, setHasViceCaptain] = useState(false)

  useEffect(() => {
    if (team) {
      setHasCaptain(team.players.some(p => p.isCaptain))
      setHasViceCaptain(team.players.some(p => p.isViceCaptain))
    }
  }, [team])

  if (!team) return <div className="flex items-center justify-center h-screen text-2xl">Team not found</div>

  const filteredPlayers = team.players.filter(player => 
    filter === 'all' ? true : player.role === filter
  )

  const handleAddPlayer = () => {
    if (newPlayer.name) {
      dispatch(addPlayer({
        teamId: team.id,
        player: { ...newPlayer, id: Date.now().toString() }
      }))
      setNewPlayer({ id: '', name: '', role: 'Batsman', isCaptain: false, isViceCaptain: false })
      setIsDialogOpen(false)
    }
  }

  const handleUpdatePlayer = () => {
    if (editingPlayer) {
      dispatch(updatePlayer({
        teamId: team.id,
        player: editingPlayer
      }))
      setEditingPlayer(null)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{team.name}</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Players</SelectItem>
            <SelectItem value="Batsman">Batsman</SelectItem>
            <SelectItem value="Bowler">Bowler</SelectItem>
            <SelectItem value="All Rounder">All Rounder</SelectItem>
            <SelectItem value="WK">Wicket Keeper</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Player
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Player</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) => setNewPlayer({ ...newPlayer, role: value as any })}
                  value={newPlayer.role}
                >
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Batsman">Batsman</SelectItem>
                    <SelectItem value="Bowler">Bowler</SelectItem>
                    <SelectItem value="All Rounder">All Rounder</SelectItem>
                    <SelectItem value="WK">Wicket Keeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="isCaptain"
                  checked={newPlayer.isCaptain}
                  onCheckedChange={(checked) => {
                    if (checked && !hasCaptain) {
                      setNewPlayer({ ...newPlayer, isCaptain: true, isViceCaptain: false })
                    } else {
                      setNewPlayer({ ...newPlayer, isCaptain: false })
                    }
                  }}
                  disabled={hasCaptain}
                />
                <Label htmlFor="isCaptain">Captain</Label>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="isViceCaptain"
                  checked={newPlayer.isViceCaptain}
                  onCheckedChange={(checked) => {
                    if (checked && !hasViceCaptain) {
                      setNewPlayer({ ...newPlayer, isViceCaptain: true, isCaptain: false })
                    } else {
                      setNewPlayer({ ...newPlayer, isViceCaptain: false })
                    }
                  }}
                  disabled={hasViceCaptain}
                />
                <Label htmlFor="isViceCaptain">Vice-Captain</Label>
              </div>
            </div>
            <Button onClick={handleAddPlayer} className="w-full">Add Player</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-between">
                <span>{player.name}</span>
                <span className="text-sm font-normal">
                  {player.isCaptain ? '(C)' : player.isViceCaptain ? '(VC)' : ''}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-4xl text-gray-500">{player.name[0]}</span>
                </div>
                <p className="text-lg font-semibold mb-2">{player.role}</p>
                <p className="text-sm text-gray-500">
                  {player.isCaptain ? 'Captain' : player.isViceCaptain ? 'Vice-Captain' : 'Player'}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setEditingPlayer(player)}
                className="flex-1 mr-2"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  dispatch(removePlayer({ teamId: team.id, playerId: player.id }))
                }}
                className="flex-1 ml-2"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {editingPlayer && (
        <Dialog open={!!editingPlayer} onOpenChange={() => setEditingPlayer(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Player</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) => setEditingPlayer({ ...editingPlayer, role: value as any })}
                  value={editingPlayer.role}
                >
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Batsman">Batsman</SelectItem>
                    <SelectItem value="Bowler">Bowler</SelectItem>
                    <SelectItem value="All Rounder">All Rounder</SelectItem>
                    <SelectItem value="WK">Wicket Keeper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="edit-isCaptain"
                  checked={editingPlayer.isCaptain}
                  onCheckedChange={(checked) => {
                    if (checked && (!hasCaptain || editingPlayer.isCaptain)) {
                      setEditingPlayer({ ...editingPlayer, isCaptain: true, isViceCaptain: false })
                    } else {
                      setEditingPlayer({ ...editingPlayer, isCaptain: false })
                    }
                  }}
                  disabled={hasCaptain && !editingPlayer.isCaptain}
                />
                <Label htmlFor="edit-isCaptain">Captain</Label>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="edit-isViceCaptain"
                  checked={editingPlayer.isViceCaptain}
                  onCheckedChange={(checked) => {
                    if (checked && (!hasViceCaptain || editingPlayer.isViceCaptain)) {
                      setEditingPlayer({ ...editingPlayer, isViceCaptain: true, isCaptain: false })
                    } else {
                      setEditingPlayer({ ...editingPlayer, isViceCaptain: false })
                    }
                  }}
                  disabled={hasViceCaptain && !editingPlayer.isViceCaptain}
                />
                <Label htmlFor="edit-isViceCaptain">Vice-Captain</Label>
              </div>
            </div>
            <Button onClick={handleUpdatePlayer} className="w-full">Update Player</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}