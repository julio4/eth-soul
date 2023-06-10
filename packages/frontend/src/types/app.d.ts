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

type Author = {
    id: number
    name: string
    avatar?: StaticImageData
    isVerified: boolean
    numberOfReviews: number
    rating: RatingType
    badges: BadgeInfo[]
}

type RatingType = {
    average: number
    numberOfReviews: number
}
    

export { Marker, Offer, Author, RatingType }
