import { IconType } from 'react-icons'
import { Category, CategoryDetails } from '../../types/category'
interface PinIconProps {
	category: Category
	onClick: () => void
}

import 'twin.macro'

const PinIcon = ({ category, onClick }: PinIconProps) => {
	const IconComponent: IconType = CategoryDetails[category].icon
	const PinImage = CategoryDetails[category].iconPin

	const Pin = () => (
		// <div
		//   onClick={onClick}
		//   tw='cursor-pointer relative w-12'
		// >
		//   <Image src={PinImage} alt="pin" width={48} height={48} />
		//   <IconComponent
		//     size={24}
		//     style={{
		//       position: 'relative',
		//       top: -40,
		//       left: 12,
		//       zIndex: 1,
		//       color: 'black',
		//     }}
		//   />
		// </div>
		<button tw="rounded-full bg-white px-2 py-1 shadow-lg ring-1 ring-green-400">A</button>
	)

	return <Pin />
}

export default PinIcon
