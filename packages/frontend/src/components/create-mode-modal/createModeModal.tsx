import { useState, useCallback, useLayoutEffect, useRef, useEffect } from 'react'
import { Category, CategoryDetails } from '../../types/category'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import 'twin.macro'

import {
	FormControl,
	FormLabel,
	Input,
	Flex,
	Button,
	Icon,
	Textarea,
	Select,
	Grid,
	Box,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Spacer,
	FormHelperText,
} from '@chakra-ui/react'

const CreateModeModal = ({
	createMode,
	setCreateMode,
	targetPos,
	setTargetPos,
	title,
	setTitle,
	description,
	setDescription,
	category,
	setCategory,
	price,
	setPrice,
	confirm,
	file,
	setFile,
	isButtonLoading,
	resetFields,
}: {
	createMode: boolean
	setCreateMode: (createMode: boolean) => void
	targetPos: google.maps.LatLng | null
	setTargetPos: (targetPos: google.maps.LatLng | null) => void
	title: string
	setTitle: (title: string) => void
	description: string
	setDescription: (description: string) => void
	category: Category
	setCategory: (category: Category) => void
	price: number
	setPrice: (price: number) => void
	confirm: () => void
	file: File | null
	setFile: (file: File | null) => void
	isButtonLoading: boolean
	resetFields: () => void
}) => {
	const onToggleCreateMode = useCallback(() => {
		if (createMode) resetFields()
		if (!createMode) {
			setTargetPos(null)
			toast.success('Click on the map to create a new offer')
		}
		setCreateMode(!createMode)
	}, [setTargetPos, setCreateMode, createMode])

	const containerRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState<string | number>('auto')
	const [width, setWidth] = useState<string | number>('auto')

	const isFormOpen = createMode && targetPos

	useLayoutEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setHeight(containerRef.current.offsetHeight)
				setWidth(containerRef.current.offsetWidth)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [isFormOpen])

	useEffect(() => {
		if (isFormOpen) {
			setHeight('auto')
			setWidth('auto')
		}
	}, [isFormOpen])

	const setChosenFile = (event: any) => {
		if (event.target.files[0]) setFile(event.target.files[0])
		else console.log('must upload a file')
	}

	const isConfirmButtonDisabled = () => {
		return !title.length || !file
	}

	const confirmOfferCreation = () => {
		if (!isConfirmButtonDisabled()) confirm()
	}

	return (
		<Box>
			<motion.div
				ref={containerRef}
				tw="absolute right-0 m-8 rounded-2xl bg-white/70 p-5 text-3xl shadow-xl backdrop-blur-md"
				transition={{ duration: 0.2 }}
				animate={{ height, width }}
				{...(!isFormOpen && {
					whileHover: { scale: 1.1 },
					whileTap: { scale: 0.9 },
				})}
			>
				{!isFormOpen ? (
					<button onClick={onToggleCreateMode}>{createMode ? '✖️' : '🆕'}</button>
				) : (
					<div>
						<FormControl>
							<Flex>
								<p>Create a proposition</p>
								<Spacer />
								<Button onClick={onToggleCreateMode} variant="ghost" size="sm" aria-label="Close form">
									<Icon as={IoClose} />
								</Button>
							</Flex>

							<Grid templateColumns="repeat(2, 1fr)" gap={6}>
								<Box>
									<FormLabel>Title</FormLabel>
									<Input
										type="text"
										value={title}
										onChange={(event) => {
											setTitle(event.target.value)
										}}
									/>

									<FormLabel>Price</FormLabel>
									<NumberInput
										step={10}
										defaultValue={100}
										min={1}
										value={price ? price : 1}
										onChange={(event) => {
											setPrice(parseInt(event))
										}}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>

									<FormLabel>Description</FormLabel>
									<Textarea
										value={description}
										onChange={(event) => {
											setDescription(event.target.value)
										}}
										maxBlockSize={200}
									/>
								</Box>

								<Box>
									<FormLabel>Category</FormLabel>
									<Select
										onChange={(event) => {
											setCategory(event.target.value as Category)
										}}
										value={category}
									>
										{Object.values(Category).map((category) => {
											const details = CategoryDetails[category]
											return (
												<option key={category} value={category}>
													{details.emoji} {details.description}
												</option>
											)
										})}
									</Select>
									<FormLabel htmlFor="images">Images</FormLabel>
									<Input type="file" accept=".jpg,.png" onChange={setChosenFile} />

									{isConfirmButtonDisabled() && (
										<FormHelperText position="fixed" bottom="16">
											The title and image must be provided
										</FormHelperText>
									)}
									<Button
										colorScheme="green"
										position="fixed"
										bottom="4"
										right="4"
										width={'46%'}
										onClick={confirmOfferCreation}
										disabled={isConfirmButtonDisabled()}
										opacity={isConfirmButtonDisabled() ? 0.2 : 1}
										isLoading={isButtonLoading}
									>
										Confirm
									</Button>
								</Box>
							</Grid>
						</FormControl>
					</div>
				)}
			</motion.div>
		</Box>
	)
}

export default CreateModeModal
