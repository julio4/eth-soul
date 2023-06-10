import { IconType } from 'react-icons'
import { AiOutlineTool, AiOutlineCar } from 'react-icons/ai'
import { RiHandHeartLine, RiComputerLine } from 'react-icons/ri'
import { IoSchoolOutline, IoPawOutline } from 'react-icons/io5'
import { BiParty } from 'react-icons/bi'

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
    color: string
    description: string
    icon: IconType
}

const CategoryDetails: Record<Category, CategoryInfo> = {
    [Category.REPAIR_MAINTENANCE]: {
        color: '#00008B', // DarkBlue
        description: 'Repair & Maintenance Services',
        icon: AiOutlineTool,
    },
    [Category.LENDING_HOME_SERVICES]: {
        color: '#008000', // Green
        description: 'Lending & Home Services',
        icon: RiHandHeartLine,
    },
    [Category.EDUCATION_TUTORING]: {
        color: '#FFFF00', // Yellow
        description: 'Education & Tutoring',
        icon: IoSchoolOutline,
    },
    [Category.TRANSPORT_SERVICES]: {
        color: '#FF0000', // Red
        description: 'Transport Services',
        icon: AiOutlineCar,
    },
    [Category.PET_CARE]: {
        color: '#800080', // Purple
        description: 'Pet Care',
        icon: IoPawOutline,
    },
    [Category.EVENTS_CONSULTING]: {
        color: '#FFA500', // Orange
        description: 'Events & Consulting',
        icon: BiParty,
    },
    [Category.TECHNOLOGY]: {
        color: '#00BFFF', // DeepSkyBlue
        description: 'Technology Services',
        icon: RiComputerLine,
    },
}

export { Category, CategoryDetails }
export type { CategoryInfo }
