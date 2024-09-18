import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Player {
  id: string
  name: string
  role: 'Batsman' | 'Bowler' | 'All Rounder' | 'WK'
  isCaptain: boolean
  isViceCaptain: boolean
}

interface Team {
  id: string
  name: string
  players: Player[]
}

interface TeamsState {
  teams: Team[]
}

const initialState: TeamsState = {
  teams: [
    { id: '1', name: 'Royal Challengers', players: [] },
    { id: '2', name: 'Mumbai Indians', players: [] },
    { id: '3', name: 'Chennai Super Kings', players: [] },
    { id: '4', name: 'Kolkata Knight Riders', players: [] },
    { id: '5', name: 'Delhi Capitals', players: [] },
    { id: '6', name: 'Sunrisers Hyderabad', players: [] },
    { id: '7', name: 'Rajasthan Royals', players: [] },
  ]
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<{ teamId: string, player: Player }>) => {
      const team = state.teams.find(t => t.id === action.payload.teamId)
      if (team) {
        if (action.payload.player.isCaptain) {
          team.players.forEach(p => p.isCaptain = false)
        }
        if (action.payload.player.isViceCaptain) {
          team.players.forEach(p => p.isViceCaptain = false)
        }
        team.players.push(action.payload.player)
      }
    },
    removePlayer: (state, action: PayloadAction<{ teamId: string, playerId: string }>) => {
      const team = state.teams.find(t => t.id === action.payload.teamId)
      if (team) {
        team.players = team.players.filter(p => p.id !== action.payload.playerId)
      }
    },
    updatePlayer: (state, action: PayloadAction<{ teamId: string, player: Player }>) => {
      const team = state.teams.find(t => t.id === action.payload.teamId)
      if (team) {
        const index = team.players.findIndex(p => p.id === action.payload.player.id)
        if (index !== -1) {
          if (action.payload.player.isCaptain) {
            team.players.forEach(p => p.isCaptain = false)
          }
          if (action.payload.player.isViceCaptain) {
            team.players.forEach(p => p.isViceCaptain = false)
          }
          team.players[index] = action.payload.player
        }
      }
    },
  },
})

export const { addPlayer, removePlayer, updatePlayer } = teamsSlice.actions
export default teamsSlice.reducer