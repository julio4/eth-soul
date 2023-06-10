import { Category } from './category'
import {BadgeInfo} from './badge'

type Marker = {
    id: number
    location: {
        latitude: number
        longitude: number
    }
}

type Offer = Marker & {
    price: number
    category: Category
    author: Author
    title: string
    description: string
    images?: string[]
}

type RawOffer = {
    id: string;
    offerId: number;
    offerer: string;
    isActive: boolean;
    hash: string[2];
    tokens: number;
}

type Author = {
    id: number
    name: string
    description?: string
    avatar?: StaticImageData
    isVerified: boolean
    numberOfReviews: number
    rating: RatingType
    badges?: BadgeInfo[]
}

type RatingType = {
    average: number
    numberOfReviews: number
}
    

export { Marker, Offer, Author, RatingType, RawOffer }
