export interface IEvents {
  _id: string;
  title: string;
  location: string;
  eventType: string;
  thumbnail: string;
  eventDate: string;
  description: string;
  creatorEmail: string;
  creatorImage: string;
  creatorName: string;
}

export interface IJoinedEvent extends IEvents {
  name: string;
  email: string;
  image: string;
  joinedDate: string;
}