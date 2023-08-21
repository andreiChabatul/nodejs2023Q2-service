export type typeField = 'artists' | 'albums' | 'tracks' | 'users';
export type actionsFavorites = 'delete' | 'add';

export interface UserCreate {
  login: string;
  version: number; // integer number, increments on update
  createdAt: Date ; // timestamp of creation
  updatedAt: Date ; // timestamp of last update
  password: string;
}

export interface UserAnswer extends UserCreate {
  id: string;
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


export interface UserLogin {
  login: string;
  password: string;
  id: string;
}