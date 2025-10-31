import { players } from './players-data.js'
import { games } from './games-data.js'

export function fakeFetchPlayers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(players)
        }, 1)
    });
}

export function fakeFetchGames() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(games)
        }, 1)
    });
}