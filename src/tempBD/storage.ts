import { DB } from "src/types";

export const tempDB: DB = {
    users: [],
    artists: [],
    album: [],
    track: [],
    favorites: {
        albums: [],
        artists: [],
        tracks: []
    }
}