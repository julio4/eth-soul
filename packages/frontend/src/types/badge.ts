import { Category } from './category'

interface BadgeInfo {
    text: string
    color: string
}

const ProBadgeDetails: Record<Category, BadgeInfo> = {
    [Category.REPAIR_MAINTENANCE]: {
        text: 'Tool Master',
        color: '#00008b', // Dark blue color
    },
    [Category.LENDING_HOME_SERVICES]: {
        text: 'Home Hero',
        color: '#90ee90', // Light green color
    },
    [Category.EDUCATION_TUTORING]: {
        text: 'Tutoring Guru',
        color: '#ffa500', // Orange color
    },
    [Category.TRANSPORT_SERVICES]: {
        text: 'Route Runner"',
        color: '#87ceeb', // Sky blue color
    },
    [Category.PET_CARE]: {
        text: 'Paw Partner',
        color: '#8b4513', // Brown color
    },
    [Category.EVENTS_CONSULTING]: {
        text: 'Party Pioneer',
        color: '#800080', // Purple color
    },
    [Category.TECHNOLOGY]: {
        text: "Tech' expert",
        color: '#808080', // Gray color
    },
}

const CasualBadgeDetails: Record<Category, BadgeInfo> = {
    [Category.REPAIR_MAINTENANCE]: {
        text: 'DIY Enthusiast',
        color: '#add8e6', // Light blue color
    },
    [Category.LENDING_HOME_SERVICES]: {
        text: 'Neighborly Helper',
        color: '#98fb98', // Pale green color
    },
    [Category.EDUCATION_TUTORING]: {
        text: 'Learning Fan',
        color: '#ffe4b5', // Moccasin color
    },
    [Category.TRANSPORT_SERVICES]: {
        text: 'Road Tripper',
        color: '#b0e0e6', // Powder blue color
    },
    [Category.PET_CARE]: {
        text: 'Pet Friend',
        color: '#d2691e', // Chocolate color
    },
    [Category.EVENTS_CONSULTING]: {
        text: 'Festivity Fan',
        color: '#dda0dd', // Plum color
    },
    [Category.TECHNOLOGY]: {
        text: 'Tech Novice',
        color: '#d3d3d3', // Light gray color
    },
}


export { CasualBadgeDetails }
export { ProBadgeDetails }
export type { BadgeInfo }