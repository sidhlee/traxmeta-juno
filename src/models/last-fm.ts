export interface Track {
  name: string;
  playcount: number;
  listeners: number;
  bmid: string;
  url: string;
  streamable: Streamable;
  artist: Pick<Artist, 'name' | 'mbid' | 'url'>;
  image: Image[];
  '@attr': Attr;
}

export interface Artist extends ArtistDetail, ArtistInfo {}

export interface ArtistInfo {
  name: string;
  mbid?: string;
  url: string;
  image: Image[];
  streamable: Streamable;
}

export interface ArtistDetail {
  onTour: 0 | 1;
  stats: ArtistStats;
  similar: Similar;
  bio: Bio;
  tags: {
    tag: Tag[];
  };
}

export interface Tag {
  name: string;
  url: string;
}

export interface ArtistStats {
  listeners: number;
  playcount: number;
}

export interface TopArtist extends ArtistStats, ArtistInfo {}

export interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
}

export interface Attr {
  rank?: number;
  page?: number;
  perPage?: number;
  totalPages?: number;
  total?: number;
}

export type Streamable = 0 | 1;

export interface Similar {
  artist: Pick<Artist, 'name' | 'url' | 'image'>[];
}

export interface Bio {
  links: {
    link: {
      '#text': string;
      rel: string;
      href: string;
    };
    /** "27 Jul 2008, 15:55" */
  };
  published: string;
  summary: string;
  content: string;
}

export interface Album {
  name: string;
  artist: string;
  mbid: string;
  url: string;
  image: Image[];
  listeners: number;
  playcount: number;
  tracks: {
    track: {
      name: string;
      url: string;
      duration: number;
      '@attr': Attr;
      streamable: {
        '#text': 0 | 1;
        fulltrack: 0 | 1;
      };
      artist: Pick<Artist, 'name' | 'mbid' | 'url'>;
    }[];
  };
  tags: {
    tag: Tag[];
  };
  wiki: Wiki;
}

export interface Tag {
  name: string;
  url: string;
}

export type Wiki = Omit<Bio, 'links'>;
