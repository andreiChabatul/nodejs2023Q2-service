export type typeFavorites = 'artists' | 'albums' | 'tracks';
export type typeField = typeFavorites | 'users';

export interface DB {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites;
}

export interface UserAnswer {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface User extends UserAnswer {
  password: string;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
