import {
  Approval as ApprovalEvent,
  OfferCanceled as OfferCanceledEvent,
  OfferCreated as OfferCreatedEvent,
  PropositionAccepted as PropositionAcceptedEvent,
  PropositionCanceled as PropositionCanceledEvent,
  PropositionMade as PropositionMadeEvent,
  Transfer as TransferEvent
} from "../schema/Sel/Sel"
import {
  Offer,
  Approval,
  OfferCanceled,
  OfferCreated,
  PropositionAccepted,
  PropositionCanceled,
  PropositionMade,
  Transfer
} from "../schema/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOfferCanceled(event: OfferCanceledEvent): void {
  const id = event.transaction.hash.concatI32(event.params.offerId.toI32())
  let entity = new OfferCanceled(id)
  let offerEntity = Offer.load(id)

  entity.offerId = event.params.offerId
  entity.offerer = event.params.offerer
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  if (offerEntity != null) {
    offerEntity.isActive = false;
    offerEntity.save()
  }
}

export function handleOfferCreated(event: OfferCreatedEvent): void {
  const id = event.transaction.hash.concatI32(event.params.offerId.toI32())
  let entity = new OfferCreated(id)
  let offerEntity = new Offer(id)

  entity.offerId = event.params.offerId
  offerEntity.offerId = event.params.offerId
  entity.offerer = event.params.offerer
  offerEntity.offerer = event.params.offerer
  entity.tokens = event.params.tokens
  offerEntity.tokens = event.params.tokens
  entity.hash = event.params.hash
  offerEntity.hash = event.params.hash

  entity.blockNumber = event.block.number
  offerEntity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  offerEntity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  offerEntity.transactionHash = event.transaction.hash

  offerEntity.isActive = true;

  entity.save()
  offerEntity.save()
}

export function handlePropositionAccepted(
  event: PropositionAcceptedEvent
): void {
  const id = event.transaction.hash.concatI32(event.params.offerId.toI32())
  let entity = new PropositionAccepted(id)
  let offerEntity = Offer.load(id)

  entity.offerId = event.params.offerId
  entity.offerer = event.params.offerer
  entity.requester = event.params.requester
  entity.tokens = event.params.tokens
  entity.hash = event.params.hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  if (offerEntity != null) {
    offerEntity.isActive = false;
    offerEntity.save()
  }
}

export function handlePropositionCanceled(
  event: PropositionCanceledEvent
): void {
  let entity = new PropositionCanceled(
    event.transaction.hash.concatI32(event.params.offerId.toI32())
  )
  entity.proposer = event.params.proposer

  entity.offerId = event.params.offerId
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropositionMade(event: PropositionMadeEvent): void {
  let entity = new PropositionMade(
    event.transaction.hash.concatI32(event.params.offerId.toI32())
  )
  entity.proposer = event.params.proposer
  entity.tokens = event.params.tokens
  entity.hash = event.params.hash

  entity.offerId = event.params.offerId
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
