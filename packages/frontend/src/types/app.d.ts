type Marker = {
    id: number
    location: {
        latitude: number;
        longitude: number;
    };
}

type Offer = Marker & {
    price: number;
}

export {
    Marker,
    Offer
}