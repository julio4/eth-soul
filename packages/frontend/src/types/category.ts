enum Category {
    REPAIR_MAINTENANCE = 'REPAIR_MAINTENANCE',
    LENDING_HOME_SERVICES = 'LENDING_HOME_SERVICES',
    EDUCATION_TUTORING = 'EDUCATION_TUTORING',
    TRANSPORT_SERVICES = 'TRANSPORT_SERVICES',
    PET_CARE = 'PET_CARE',
    EVENTS_CONSULTING = 'EVENTS_CONSULTING',
    TECHNOLOGY = 'TECHNOLOGY',
}

interface CategoryInfo {
    description: string
    emoji: string
}

const CategoryDetails: Record<Category, CategoryInfo> = {
    [Category.REPAIR_MAINTENANCE]: {
        description: 'Repair & Maintenance Services',
        emoji: '🔧',
    },
    [Category.LENDING_HOME_SERVICES]: {
        description: 'Lending & Home Services',
        emoji: '🏠',
    },
    [Category.EDUCATION_TUTORING]: {
        description: 'Education & Tutoring',
        emoji: '📚',
    },
    [Category.TRANSPORT_SERVICES]: {
        description: 'Transport Services',
        emoji: '🚗',
    },
    [Category.PET_CARE]: {
        description: 'Pet Care',
        emoji: '🐶',
    },
    [Category.EVENTS_CONSULTING]: {
        description: 'Events & Consulting',
        emoji: '🎉',
    },
    [Category.TECHNOLOGY]: {
        description: 'Technology Services',
        emoji: '💻',
    },
}

export { Category, CategoryDetails }
export type { CategoryInfo }
