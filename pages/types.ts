export interface LastFmResponse {
  recenttracks: Recenttracks;
}

export interface Recenttracks {
  track: Track[];
  "@attr": Attr2;
}

export interface Track {
  artist: Artist;
  streamable: string;
  image: Image[];
  mbid: string;
  album: Album;
  name: string;
  "@attr"?: Attr;
  url: string;
  date?: Date;
}

export interface Artist {
  mbid: string;
  "#text": string;
}

export interface Image {
  size: string;
  "#text": string;
}

export interface Album {
  mbid: string;
  "#text": string;
}

export interface Attr {
  nowplaying: string;
}

export interface Date {
  uts: string;
  "#text": string;
}

export interface Attr2 {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface lastFmData {
  artist: string;
  track: string;
  album: string;
  image: string;
  url: string;
}
