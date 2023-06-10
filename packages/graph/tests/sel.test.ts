import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  beforeEach
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { offerIdToBytes, handleApproval, handleOfferCanceled, handleOfferCreated } from "../src/sel"
import { createApprovalEvent, createCreateOfferEvent, createOfferCanceledEvent } from "./sel-utils"
import { Offer } from "../schema/schema"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let value = BigInt.fromI32(234)
    let newApprovalEvent = createApprovalEvent(owner, spender, value)
    handleApproval(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  // test("Approval created and stored", () => {
  //   assert.entityCount("Approval", 1)

  //   // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
  //   assert.fieldEquals(
  //     "Approval",
  //     "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
  //     "owner",
  //     "0x0000000000000000000000000000000000000001"
  //   )
  //   assert.fieldEquals(
  //     "Approval",
  //     "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
  //     "spender",
  //     "0x0000000000000000000000000000000000000001"
  //   )
  //   assert.fieldEquals(
  //     "Approval",
  //     "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
  //     "value",
  //     "234"
  //   )

  //   // More assert options:
  //   // https://thegraph.com/docs/en/developer/matchstick/#asserts
  // })

  // beforeEach(() => {
  //   mock

  test("createCreateOfferEvent", () => {
    let offerId = BigInt.fromI32(234)
    let offerId2 = BigInt.fromI32(235)
    let tokens = BigInt.fromI32(234)
    let offerer = Address.fromString("0x0000000000000000000000000000000000000002")

    let event = createCreateOfferEvent(offerId, tokens, offerer)
    handleOfferCreated(event)
    let event2 = createCreateOfferEvent(offerId2, tokens, offerer)
    handleOfferCreated(event2)
    assert.entityCount("OfferCreated", 2)
    assert.entityCount("Offer", 2)
  })

  test("createOfferCanceledEvent", () => {
    let offerId = BigInt.fromI32(1)
    let offerer = Address.fromString("0x0000000000000000000000000000000000000003")
    let tokens = BigInt.fromI32(234)

    let eventCreate = createCreateOfferEvent(offerId, tokens, offerer)
    handleOfferCreated(eventCreate)

    const id = eventCreate.transaction.hash.concatI32(eventCreate.params.offerId.toI32())
    const offer = Offer.load(offerIdToBytes(offerId))

    let event = createOfferCanceledEvent(offerId, offerer)
    handleOfferCanceled(event)
    assert.entityCount("OfferCanceled", 1)
    assert.entityCount("Offer", 3)

    assert.fieldEquals("Offer", offerIdToBytes(offerId).toHexString(), 'isActive', 'false')
  })
})
