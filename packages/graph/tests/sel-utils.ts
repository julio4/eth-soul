import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  OfferCanceled,
  OfferCreated,
  PropositionAccepted,
  PropositionCanceled,
  PropositionMade,
  Transfer
} from "../schema/Sel/Sel"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createCreateOfferEvent(
  offerId: BigInt,
  tokens: BigInt,
  offerer: Address,
): OfferCreated {
  let event = changetype<OfferCreated>(newMockEvent())

  event.parameters = new Array()

  event.parameters.push(
    new ethereum.EventParam("offerId", ethereum.Value.fromUnsignedBigInt(offerId))
  )
  event.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  event.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  event.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromBytesArray([new Bytes(0), new Bytes(1)]))
  )

  return event
}

export function createOfferCanceledEvent(
  offerId: BigInt,
  offerer: Address
): OfferCanceled {
  let offerCanceledEvent = changetype<OfferCanceled>(newMockEvent())

  offerCanceledEvent.parameters = new Array()

  offerCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerCanceledEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )

  return offerCanceledEvent
}

export function createOfferCreatedEvent(
  offerId: BigInt,
  offerer: Address,
  tokens: BigInt,
  hash: Array<Bytes>
): OfferCreated {
  let offerCreatedEvent = changetype<OfferCreated>(newMockEvent())

  offerCreatedEvent.parameters = new Array()

  offerCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )
  offerCreatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytesArray(hash))
  )

  return offerCreatedEvent
}

export function createPropositionAcceptedEvent(
  offerId: BigInt,
  offerer: Address,
  requester: Address,
  tokens: BigInt,
  hash: Array<Bytes>
): PropositionAccepted {
  let propositionAcceptedEvent = changetype<PropositionAccepted>(newMockEvent())

  propositionAcceptedEvent.parameters = new Array()

  propositionAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  propositionAcceptedEvent.parameters.push(
    new ethereum.EventParam("offerer", ethereum.Value.fromAddress(offerer))
  )
  propositionAcceptedEvent.parameters.push(
    new ethereum.EventParam("requester", ethereum.Value.fromAddress(requester))
  )
  propositionAcceptedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )
  propositionAcceptedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytesArray(hash))
  )

  return propositionAcceptedEvent
}

export function createPropositionCanceledEvent(
  offerId: BigInt,
  proposer: Address
): PropositionCanceled {
  let propositionCanceledEvent = changetype<PropositionCanceled>(newMockEvent())

  propositionCanceledEvent.parameters = new Array()

  propositionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  propositionCanceledEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )

  return propositionCanceledEvent
}

export function createPropositionMadeEvent(
  offerId: BigInt,
  proposer: Address,
  tokens: BigInt,
  hash: Array<Bytes>
): PropositionMade {
  let propositionMadeEvent = changetype<PropositionMade>(newMockEvent())

  propositionMadeEvent.parameters = new Array()

  propositionMadeEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  propositionMadeEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  propositionMadeEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )
  propositionMadeEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytesArray(hash))
  )

  return propositionMadeEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
