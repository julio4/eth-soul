
type Coordinates = { latitude: number, longitude: number };

interface Offer {
  coordinates: Coordinates;
  title: string;
  description: string;
  category: string
  pseudo: string;
  imageLink: string;
  // author: string;
}