export interface Playlist {
  href: string;
  items: PlaylistItem[];
  limit: number;
  /** query url for next page of the same playlist */
  next: string | null;
  offset: number;
  /** /** query url for previous page of the same playlist */
  previous: null | string;
  total: number;
}

export interface PlaylistItem {
  /** "2021-03-03T18:00:06Z" */
  added_at: string;
  track: Track;
}

export interface Track extends Entity {
  album: Album;
  artists: ArtistInfo[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
}

export interface Album extends Entity {
  album_type: 'single' | 'full';
  artists: ArtistInfo[];
  images: Image[];
  /** 2021-01-08 */
  release_date: string;
  total_tracks: number;
}

export interface ArtistDetail {
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
}

export interface ArtistInfo extends Entity {}

export interface Artist extends ArtistInfo, ArtistDetail {}

export interface ExternalUrls {
  spotify?: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Entity {
  id: string;
  name: string;
  type: 'album' | 'artist' | 'track';
  external_urls: ExternalUrls;
  uri: string;
  href: string;
}
