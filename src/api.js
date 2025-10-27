import { players } from './players-data.js'

export function fakeFetchPlayers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(players)
        }, 1)
    });
}