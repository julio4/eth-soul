import { retrieveOffer } from '@service/web3storage'
import { PopulatedOffer, RawOffer } from '@types/app'
import { generateAuthor } from '@utils/randomAuthor'
import Web3 from 'web3'
import { Category } from '../types/category'

export const offerDTOToOfferObject = async (offer: RawOffer) => {
	const { id, offerId, offerer, isActive, hash, tokens } = offer
	const cid1 = Web3.utils.hexToAscii(hash[0])
	const cid2 = Web3.utils.hexToAscii(hash[1]).slice(5)
	const cid = cid1 + cid2

	try {
		const data = await retrieveOffer(cid)
		const offer: PopulatedOffer = {
			id: offerId,
			offerer,
			isActive,
			location: data.coordinates,
			price: tokens,
			title: data.title,
			description: data.description,
			// @ts-ignore
			category: data.category ? Category[data.category] : Category.REPAIR_MAINTENANCE,
			images: [data.imageLink],
			author: generateAuthor(),
		}
		return offer
	} catch (err) {
		console.log('IPFS error, cid: ', cid)
	}
}
