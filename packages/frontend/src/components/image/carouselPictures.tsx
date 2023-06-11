import React, { useState } from 'react'
import { Image } from '@chakra-ui/react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

type CarouselPicturesProps = {
	images: string[]
}

const CarouselPictures: React.FC<CarouselPicturesProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const prevImage = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
		} else {
			setCurrentIndex(images.length - 1)
		}
	}

	const nextImage = () => {
		if (currentIndex < images.length - 1) {
			setCurrentIndex(currentIndex + 1)
		} else {
			setCurrentIndex(0)
		}
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

			{
				images.length > 1 && (<AiOutlineArrowLeft
					onClick={prevImage}
					style={{ fontSize: '2rem', cursor: 'pointer', marginRight: '1rem' }}
					size={30}
				/>
				)}
			{typeof images[currentIndex] === 'string' && (
				<Image
					alt="Offer Image"
					width={500}
					height={500}
					src={images[currentIndex]}
					style={{ width: '80%', borderRadius: '8px' }}
				/>
			)}
			{
				images.length > 1 && (
					<AiOutlineArrowRight
						onClick={nextImage}
						style={{ fontSize: '2rem', cursor: 'pointer', marginLeft: '1rem' }}
						size={30}
					/>
				)}
		</div>
	)
}

export default CarouselPictures
