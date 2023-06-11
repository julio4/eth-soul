/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useCallback, useEffect } from 'react'
import { TopBar } from '@components/top/TopBar'
import MarkedMap from '@components/map'
import type { NextPage } from 'next'
import { Offer, RawOffer, PopulatedOffer } from '../types/app'
import { Category } from '../types/category'
import { RecentActivityModal } from '../components/activity/RecentActivityModal'
import toast from 'react-hot-toast'
import contractABI from '@assets/abi/sel.json'

import 'twin.macro'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Web3 from 'web3'
import { retrieveOffer, storeOffer } from '@service/web3storage'
import { CONTRACT_ADDRESS, THE_GRAPH_URL } from '@utils/const'
import { useAccount, useContractEvent, useContractRead, useContractWrite } from 'wagmi'
import CreateModeModal from '../components/create-mode-modal/createModeModal'
import { offerDTOToOfferObject } from '@mapping/OfferMapping'

const OffersQuery = `query ($first: Int)
{
  offers(where: { isActive: true }, first: $first) {
    id
    offerId
    offerer
    isActive
    hash
    tokens
  }
}`

const AppPage: NextPage = () => {
	const client = new ApolloClient({
		uri: THE_GRAPH_URL,
		cache: new InMemoryCache(),
	})
	const { address, isConnected } = useAccount()
	const [rawOffers, setRawOffers] = useState<RawOffer[]>([])
	const [markers, setMarkers] = useState<Offer[]>([])

	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [category, setCategory] = useState<Category>(Category.EDUCATION_TUTORING)
	const [price, setPrice] = useState<number>(100)
	const [file, setFile] = useState<File | null>(null)
	const [ipfsLoading, setIpfsLoading] = useState<number>(0)

	const [createLoading, setCreateLoading] = useState<boolean>(false)

	const {
		data,
		isLoading,
		isSuccess,
		write: createNewOffer,
		status: creationStatus,
	} = useContractWrite({
		address: CONTRACT_ADDRESS,
		abi: contractABI,
		functionName: 'createOffer',
	})

	// useContractEvent({
	//   address: CONTRACT_ADDRESS,
	//   abi: contractABI,
	//   eventName: 'OfferCreated',
	//   listener(data) {
	//     console.log(data[0])
	//     // setRawOffers((prev) => [...prev, data[0]);
	//   },
	// })

	useEffect(() => {
		if (creationStatus === 'success') {
			toast.success('Service request created!')
			resetFields()
		} else if (creationStatus === 'error') toast.error('Error while creating service request')
	}, [creationStatus])

	// useEffect(() => {
	//   if (isSuccess && !createLoading)
	//     toast.loading('Transaction in progress...');
	// }, [isSuccess]);

	const resetFields = useCallback(() => {
		setTitle('')
		setDescription('')
		setCategory(Category.EDUCATION_TUTORING)
		setPrice(100)
		setFile(null)
		setCreateMode(false)
	}, [])

	const confirm = async () => {
		if (!title.length || file === null)
			toast.error('You have to set a title and an image in order to create a proposition')
		setCreateLoading(true)
		const cid = await storeOffer(
			{
				coordinates: {
					latitude: targetPos?.lat() as number,
					longitude: targetPos?.lng() as number,
				},
				title,
				description,
				category: JSON.stringify(category),
				pseudo: 'pseudo',
				imageLink: '',
			},
			file!,
			setIpfsLoading
		)

		const hash1 = Web3.utils.asciiToHex(cid.slice(0, 32))
		const hash2_pre = Web3.utils.asciiToHex(cid.slice(32, 64))
		const hash2 = '0x' + hash2_pre.slice(2, 64).padStart(122 - hash2_pre.length - 2, '0')

		setCreateLoading(false)
		// Await to create an offer
		createNewOffer({
			args: [price, [hash1, hash2]],
		})
	}

	const queryOffers = async () => {
		await client
			.query({
				query: gql(OffersQuery),
				variables: {
					first: 200,
				},
			})
			.then((data) => {
				setRawOffers(data.data.offers)
			})
			.catch((err) => {
				console.log('Error fetching data: ', err)
			})
	}

	useEffect(() => {
		queryOffers()
	}, [])

	useEffect(() => {
		async function setOffers(offers: RawOffer[]) {
			const populatedOffers = await Promise.all(offers.map(offerDTOToOfferObject))
			const filteredOffers = populatedOffers.filter((offer) => offer) as Offer[]
			setMarkers(filteredOffers)
		}
		if (rawOffers && rawOffers.length > 0) {
			setOffers(rawOffers)
		}
	}, [rawOffers])

	const [center, setCenter] = useState<google.maps.LatLngLiteral>({
		lat: 50.10340217817493,
		lng: 14.450536191137255,
	})
	const [zoom, setZoom] = useState<number>(15)
	const [highlightedMarker, setHighlightedMarker] = useState<Offer | null>(null)
	const [createMode, setCreateMode] = useState<boolean>(false)
	const [targetPos, setTargetPos] = useState<google.maps.LatLng | null>(null)

	const onMarkerClick = useCallback(
		(payload: Offer) => {
			if (highlightedMarker?.id === payload.id) {
				setHighlightedMarker(null)
			} else {
				setHighlightedMarker(payload)
			}
		},
		[highlightedMarker]
	)

	const onMapClick = useCallback(
		(event: google.maps.MapMouseEvent) => {
			if (event.latLng === null) return
			setTargetPos(event.latLng)
		},
		[setTargetPos]
	)

	return (
		<>
			<TopBar />
			<MarkedMap
				zoom={zoom}
				center={center}
				markers={markers}
				onMarkerClick={onMarkerClick}
				onClick={onMapClick}
				highlightedMarker={highlightedMarker}
				clickable={createMode}
				targetPos={targetPos}
				setTargetPos={setTargetPos}
			/>
			<CreateModeModal
				createMode={createMode}
				setCreateMode={setCreateMode}
				targetPos={targetPos}
				setTargetPos={setTargetPos}
				title={title}
				setTitle={setTitle}
				description={description}
				setDescription={setDescription}
				category={category}
				setCategory={setCategory}
				price={price}
				setPrice={setPrice}
				confirm={confirm}
				file={file}
				setFile={setFile}
				isButtonLoading={isLoading || createLoading}
				resetFields={resetFields}
				ipfsPercentage={ipfsLoading}
				txLoading={isLoading}
				isConnected={isConnected}
			/>
			<RecentActivityModal />
		</>
	)
}

export default AppPage
