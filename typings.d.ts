export interface LeaderboardData {
  name: string;
  score: number;
  createdAt: Date;
  uid: string;
  country: string;
}

export interface TLocation {
  date: string;
  location: {
    lat: number;
    lng: number;
  };
}
