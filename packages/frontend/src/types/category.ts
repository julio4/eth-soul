import { IconType } from 'react-icons'
import { AiOutlineTool, AiOutlineCar } from 'react-icons/ai'
import { RiHandHeartLine, RiComputerLine } from 'react-icons/ri'
import { IoSchoolOutline, IoPawOutline } from 'react-icons/io5'
import { BiParty } from 'react-icons/bi'

import bluePin from '../../public/icons/location-pin-blue.png';
import greenPin from '../../public/icons/location-pin-greene.png';
import cyanPin from '../../public/icons/location-pin-cyan.png';
import purplePin from '../../public/icons/location-pin-purple.png';
import yellowPin from '../../public/icons/location-pin-yellow.png';
import { StaticImageData } from 'next/image'

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
