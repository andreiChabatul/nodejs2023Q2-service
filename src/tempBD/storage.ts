import { DB } from "src/types";

export const tempDB: DB = {
    users: [],
    artists: [],
    albums: [],
    tracks: [],
    favorites: {
        albums: [],
        artists: [],
        tracks: []
    }
}