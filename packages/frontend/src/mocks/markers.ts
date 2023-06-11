import { Category } from '../types/category'
import { Offer } from '../types/app'
import { generateAuthor } from '@utils/randomAuthor'

export const markers: Offer[] = [
	{
		id: 1,
		price: 1000,
		location: {
			latitude: 50.102425406026136,
			longitude: 14.449577761673018,
		},
		images: [
			'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nJTIwbG92ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
			'https://images.unsplash.com/photo-1530700131180-d43d9b8cc41f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=834&q=80',
			'https://images.unsplash.com/photo-1511657304136-7d9f56e0d574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80',
		],
		category: Category.PET_CARE,
		author: generateAuthor(),
		title: 'Dog walking',
		description:
			"Calling all dog lovers! <br/> Need someone to give your furry friend some exercise? Look no further! I'm a fitness enthusiast who adores dogs and is ready to take your pup on exciting walks. With me, your canine companion will get the exercise and attention they need. Let's keep those tails wagging!",
	},
	{
		id: 2,
		price: 100,
		location: {
			latitude: 50.106576158326526,
			longitude: 14.4458621243181541,
		},
		category: Category.LENDING_HOME_SERVICES,
		author: generateAuthor(),
		title: 'Handy Tools for Borrow!',
		description:
			"DIY enthusiasts, I've got you covered! <br/> I'm a handy neighbor with a collection of tools ready to lend a helping hand. From hammers to drills, you can borrow the tools you need for your home projects. No need to invest in expensive equipment—simply borrow and get the job done. Let's tackle those DIY dreams together!",
	},
	{
		id: 3,
		price: 500,
		location: {
			latitude: 50.107593822962535,
			longitude: 14.453795834816791,
		},
		category: Category.EDUCATION_TUTORING,
		author: generateAuthor(),
		title: 'Tutoring Services for Academic Success!',
		description:
			"Struggling with your studies? Don't worry, I'm here to help! <br/> As an experienced and dedicated tutor, I offer personalized tutoring services to help you excel in your academic pursuits. From math and science to language arts, I'll provide the guidance and support you need to achieve your goals. Let's unlock your full potential and achieve academic success together!",
	},
	{
		id: 4,
		price: 100,
		location: {
			latitude: 50.101831,
			longitude: 14.45139,
		},
		category: Category.REPAIR_MAINTENANCE,
		author: generateAuthor(),
		title: 'Bike Repair Services',
		description:
			"Need a tune-up? <br/> I'm a bike enthusiast with a passion for cycling and a knack for repairs. Whether you need a quick fix or a full tune-up, I'll get your bike back on the road in no time. Let's get you back in the saddle!",
	},
	{
		id: 5,
		price: 100,
		location: {
			latitude: 50.102831,
			longitude: 14.45139,
		},
		category: Category.TRANSPORT_SERVICES,
		author: generateAuthor(),
		title: 'Transport Services',
		description:
			"Need a ride? <br/> I'm a driver with a passion for helping others. Whether you need a ride to the airport or a lift to the grocery store, I'll get you where you need to go. Let's get you moving!",
	},
	{
		id: 6,
		price: 100,
		location: {
			latitude: 50.103831,
			longitude: 14.44439,
		},
		category: Category.TRANSPORT_SERVICES,
		author: generateAuthor(),
		title: 'Carpool Services',
		description:
			"Carpooling made easy! <br/> Let's save money and reduce our carbon footprint by sharing rides. I'm a good driver with a reliable car and a passion for helping others!",
	},
	{
		id: 7,
		price: 100,
		location: {
			latitude: 50.109831,
			longitude: 14.44239,
		},
		category: Category.REPAIR_MAINTENANCE,
		author: generateAuthor(),
		title: 'DIY Plumbing Services',
		description:
			"Need a hand? <br/> I'm a handy neighbor with a knack for plumbing. Whether you need a quick fix or a full repair, I'll get your pipes flowing in no time. Let's get you back to business!",
	},
	{
		id: 8,
		price: 100,
		location: {
			latitude: 50.106831,
			longitude: 14.44939,
		},
		category: Category.TECHNOLOGY,
		author: generateAuthor(),
		title: 'Computer Repair Services',
		description:
			"Computer problems? <br/> I'm a tech enthusiast with a passion for helping others. Whether you need a quick fix or a full repair, I'll get your computer back up and running in no time. Let's get you back to business!",
	},
	{
		id: 9,
		price: 100,
		location: {
			latitude: 50.107831,
			longitude: 14.43939,
		},
		category: Category.EVENTS_CONSULTING,
		author: generateAuthor(),
		title: 'Event Planning Services',
		description:
			"Planning an event? <br/> I'm an experienced event planner with a passion for helping others. Whether you need a hand with the details or a full-service planner, I'll make sure your event is a success. Let's get planning!",
	},
]
