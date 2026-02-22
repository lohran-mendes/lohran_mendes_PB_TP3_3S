export interface ApiResponse {
  id: number;
  name: string;
  summary: string;
  image: {
    original: string;
  }, 
  videos?: VideoLesson[];
}

export interface VideoLesson {
  id: number;
  number: number;
  name: string;
  season: number;
  summary: string;
  runtime: number;
  image: {
    original: string;
  }
}

export interface RawShow {
  id?: unknown;
  name?: unknown;
  summary?: unknown;
  image?: {
    original?: unknown;
  } | null;
};