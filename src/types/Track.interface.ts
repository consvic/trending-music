export interface Track {
  id: string;
  title: string;
  genre: string;
  mood: string;
  artwork: {
    "150x150": string;
  };
  liked?: boolean;
}
