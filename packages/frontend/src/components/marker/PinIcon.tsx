import { IconType } from 'react-icons';
import { Category, CategoryDetails } from '../../types/category';
import Image from 'next/image';

const PinIcon = ({ category }: { category: Category }) => {
  const IconComponent: IconType = CategoryDetails[category].icon;
  const PinImage = CategoryDetails[category].iconPin;

  const Pin = () => (
    <div style={{ position: 'relative' }}>
      <Image src={PinImage} alt="pin" width={48} height={48} />
      <IconComponent
        size={24}
        style={{
          position: 'relative',
          top: -40,
          left: 12,
          zIndex: 1,
          color: 'black',
        }}
      />
    </div>
  );

  return <Pin />;
};

export default PinIcon;