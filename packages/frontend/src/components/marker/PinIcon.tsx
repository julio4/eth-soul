import { IconType } from 'react-icons';
import { Category, CategoryDetails } from '../../types/category';
import Image from 'next/image';
interface PinIconProps {
  category: Category;
  onClick: () => void;
}

const PinIcon = ({ category, onClick }: PinIconProps) => {
  const IconComponent: IconType = CategoryDetails[category].icon;
  const PinImage = CategoryDetails[category].iconPin;

  const Pin = () => (
    <div onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
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