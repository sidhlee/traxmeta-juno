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
