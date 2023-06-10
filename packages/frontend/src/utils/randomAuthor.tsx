import { Author } from '../types/app';
import { StaticImageData } from 'next/image';
import person1 from '../../public/images/people/person-1.jpeg';
import person2 from '../../public/images/people/person-2.jpeg';
import person3 from '../../public/images/people/person-3.jpeg';
import person4 from '../../public/images/people/person-4.jpeg';
import person5 from '../../public/images/people/person-5.jpeg';

const randomBoolean = (): boolean => {
  return Math.random() < 0.5;
};

const generateAuthor = (): Author => {
  const hasAvatar = Math.random() < 0.7;
  const avatarNumber = Math.floor(Math.random() * 5) + 1;

  return {
    id: Math.floor(Math.random() * 1000),
    name: 'Jean V.',
    isVerified: randomBoolean(),
    numberOfReviews: Math.floor(Math.random() * 100),
    rating: {
      numberOfReviews: Math.floor(Math.random() * 100),
      average: Math.random() * 5,
    },
    avatar: hasAvatar ? getAvatar(avatarNumber) : undefined,
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