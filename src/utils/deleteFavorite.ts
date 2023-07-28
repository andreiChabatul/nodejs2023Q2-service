import { tempDB } from "src/tempBD/storage";
import { Album, Artist, Track, typeFavorites } from "src/types"

export const deleteFavorite = (id: string, type: typeFavorites) => {

    const deleteFavorite = tempDB.favorites[type]?.findIndex((item: Album | Artist | Track) => item.id === id);
    if (deleteFavorite > -1) {
        tempDB.favorites[type].splice(deleteFavorite, 1);
    }

}