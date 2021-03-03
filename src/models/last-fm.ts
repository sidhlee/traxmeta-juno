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

export interface Artist {
  name: string;
  mbid: string;
  url: string;
  image: Image[];
  streamable: Streamable;
  onTour: 0 | 1;
  stats: ArtistStats;
  similar: Similar;
  bio: Bio;
}

export interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
}

export interface Attr {
  rank?: number;
}

export type Streamable = 0 | 1;

export interface ArtistStats {
  listeners: number;
  playcount: number;
}

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
    published: string;
    summary: string;
    content: string;
  };
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
