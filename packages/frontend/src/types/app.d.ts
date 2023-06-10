import { Category } from './category'

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
}

type Author = {
    id: number
    name: string
    avatarUrl?: string
    isVerified: boolean
    numberOfReviews: number
    rating: number
}

export { Marker, Offer, Author }
