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
    icon: IconType
    iconPin: StaticImageData
}

const CategoryDetails: Record<Category, CategoryInfo> = {
    [Category.REPAIR_MAINTENANCE]: {
        description: 'Repair & Maintenance Services',
        icon: AiOutlineTool,
        iconPin: bluePin,
    },
    [Category.LENDING_HOME_SERVICES]: {
        description: 'Lending & Home Services',
        icon: RiHandHeartLine,
        iconPin: greenPin,
    },
    [Category.EDUCATION_TUTORING]: {
        description: 'Education & Tutoring',
        icon: IoSchoolOutline,
        iconPin: yellowPin,
    },
    [Category.TRANSPORT_SERVICES]: {
        description: 'Transport Services',
        icon: AiOutlineCar,
        iconPin: purplePin
    },
    [Category.PET_CARE]: {
        description: 'Pet Care',
        icon: IoPawOutline,
        iconPin: purplePin
    },
    [Category.EVENTS_CONSULTING]: {
        description: 'Events & Consulting',
        icon: BiParty,
        iconPin: cyanPin
    },
    [Category.TECHNOLOGY]: {
        description: 'Technology Services',
        icon: RiComputerLine,
        iconPin: cyanPin
    },
}

export { Category, CategoryDetails }
export type { CategoryInfo }
