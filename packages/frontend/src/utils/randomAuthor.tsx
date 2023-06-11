import { Author } from '../types/app'
import { Category } from '../types/category'
import { ProBadgeDetails, CasualBadgeDetails, BadgeInfo } from '../types/badge'

import person1 from '../../public/images/people/person-1.jpeg'
import person2 from '../../public/images/people/person-2.jpeg'
import person3 from '../../public/images/people/person-3.jpeg'
import person4 from '../../public/images/people/person-4.jpeg'
import person5 from '../../public/images/people/person-5.jpeg'
import person6 from '../../public/images/people/person-6.jpeg'
import person7 from '../../public/images/people/person-7.jpeg'
import person8 from '../../public/images/people/person-8.jpeg'
import defaultAvatar from '../../public/images/people/avatar_default.jpeg'


const randomBoolean = (): boolean => {
	return Math.random() < 0.5
}

const arrayNames = [
	"Random Names",
	"Soraya Hobbs",
	"Santiago Booker",
	"Mohsin Murray",
	"Julian Gomez",
	"Diane Richmond",
	"Elijah Ingram",
	"Tamsin Velazquez",
	"Ryan Cook",
	"Anjali Daugherty",
	"Cassius Duncan",
	"Myla Holloway",
	"Hussein Gross",
	"Tasnim Wilkinson",
	"Beau Mckenzie",
	"Lacie Mills",
	"Tina Hudson",
	"Lila Berry",
	"Bronwyn Nunez",
	"Milly Pollard",
	"Janet Salinas",
]

const arrayDescriptions = [
	"Experienced handyman available for various home repair and maintenance tasks. No job is too small or too big. Contact me for reliable and affordable services.",
	"Passionate pet lover offering pet sitting and dog walking services. Your furry friends will receive the utmost care and attention while you're away. Book now!",
	"Exquisite handmade jewelry crafted with love and attention to detail. Each piece is unique and perfect for adding a touch of elegance to your outfits. Browse my collection today.",
	"Certified personal trainer with expertise in strength training and weight loss. Let's work together to achieve your fitness goals and transform your lifestyle. Get in touch to get started.",
	"Professional photographer specializing in portraits, events, and landscapes. Capturing moments that tell a story and create lasting memories. Book a session and let's create art together.",
	"Experienced math tutor offering personalized lessons for students of all ages. Making math simple and enjoyable through interactive teaching methods. Enhance your math skills today.",
	"Passionate home chef providing customized meal plans and cooking classes. Explore a world of flavors and learn to create delicious dishes in the comfort of your own kitchen.",
	"Creative graphic designer with an eye for aesthetics and attention to detail. Transforming ideas into visually stunning designs that leave a lasting impression. Let's bring your vision to life.",
	"Experienced language tutor offering lessons in English, Spanish, and French. Whether you're a beginner or looking to improve your skills, I'm here to help you become fluent in no time.",
	"Professional house cleaner providing thorough and reliable cleaning services. Sit back, relax, and let me handle the dirty work. Book a cleaning session and enjoy a sparkling clean home.",
	"Experienced babysitter available for part-time and full-time positions. Your little ones will be in good hands while you're away. Contact me to discuss your childcare needs.",
	"Certified makeup artist specializing in bridal and special occasion makeup. Enhancing your natural beauty and creating a look that makes you feel confident and beautiful. Book a session today.",
]

const generateName = (): string => {
	const randomIndex = Math.floor(Math.random() * arrayNames.length)
	return arrayNames[randomIndex]
}


const generateBadges = (): BadgeInfo[] => {
	const categories = Object.values(Category)
	const numBadges = Math.floor(Math.random() * 3) + 1
	const badges: BadgeInfo[] = []

	for (let i = 0; i < numBadges; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)]
		const isProBadge = Math.random() < 0.33
		const badgeInfo = isProBadge ? ProBadgeDetails[category] : CasualBadgeDetails[category]
		badges.push(badgeInfo)
	}

	return badges
}

function chooseAvatar() {
	if (Math.random() < 0.3) {
		return defaultAvatar;
	}
	const avatars = [person1, person2, person3, person4, person5, person6, person7, person8];
	return avatars[Math.floor(Math.random() * avatars.length)];
}

function generateVerify() {
	if (Math.random() < 0.3) {
		return true;
	}
	return false;
}


const generateAuthor = (): Author => {
	const average = Math.random() * (5 - 3.5) + 3.5
	const badges = generateBadges()

	return {
		id: Math.floor(Math.random() * 1000),
		name: generateName(),
		description: arrayDescriptions[Math.floor(Math.random() * arrayDescriptions.length)],
		isVerified: generateVerify(),
		numberOfReviews: Math.floor(Math.random() * 25),
		rating: {
			numberOfReviews: Math.floor(Math.random() * 100),
			average: Math.round(average * 10) / 10,
		},
		avatar: chooseAvatar(),
		badges,
	}
}

export { generateAuthor }
