import { Author } from '../types/app';
import { Category } from '../types/category';
import { ProBadgeDetails, CasualBadgeDetails, BadgeInfo } from '../types/badge';
import { StaticImageData } from 'next/image';
import person1 from '../../public/images/people/person-1.jpeg';
import person2 from '../../public/images/people/person-2.jpeg';
import person3 from '../../public/images/people/person-3.jpeg';
import person4 from '../../public/images/people/person-4.jpeg';
import person5 from '../../public/images/people/person-5.jpeg';

const randomBoolean = (): boolean => {
  return Math.random() < 0.5;
};

const generateBadges = (): BadgeInfo[] => {
  const categories = Object.values(Category);
  const numBadges = Math.floor(Math.random() * 3) + 1;
  const badges: BadgeInfo[] = [];

  for (let i = 0; i < numBadges; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const isProBadge = Math.random() < 0.33;
    const badgeInfo = isProBadge ? ProBadgeDetails[category] : CasualBadgeDetails[category];
    badges.push(badgeInfo);
  }

  return badges;
};

const generateAuthor = (): Author => {
  const hasAvatar = Math.random() < 0.7;
  const avatarNumber = Math.floor(Math.random() * 5) + 1;
  const average = (Math.random() * (5 - 3.5)) + 3.5;
  const badges = generateBadges();

  return {
    id: Math.floor(Math.random() * 1000),
    name: 'Jean V.',
    description: "I'm a software engineer and I love to travel. I've been to 30+ countries and I'm always looking for new adventures. Let's help each other to make the best out of our neighborhood!",
    isVerified: randomBoolean(),
    numberOfReviews: Math.floor(Math.random() * 100),
    rating: {
      numberOfReviews: Math.floor(Math.random() * 100),
      average: Math.round(average * 10) / 10,
    },
    avatar: hasAvatar ? getAvatar(avatarNumber) : undefined,
    badges

  };
};

const getAvatar = (avatarNumber: number): StaticImageData => {
  switch (avatarNumber) {
    case 1:
      return person1;
    case 2:
      return person2;
    case 3:
      return person3;
    case 4:
      return person4;
    case 5:
      return person5;
    default:
      return person1;
  }
};

export { generateAuthor };
