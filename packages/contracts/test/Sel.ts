import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { Contract, Signer } from 'ethers';
import { ethers } from 'hardhat'

describe('Sel', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const INITIAL_OWNER_BALANCE = 1000;
  const HASH = ["0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002"];

  async function deployment() {
    // Contracts are deployed using the first signer/account by default
    const [owner, firstAccount, secondAccount] = await ethers.getSigners()

    const Sel = await ethers.getContractFactory('Sel')
    const sel = await Sel.deploy(INITIAL_OWNER_BALANCE)
    return {
      sel, owner, otherAccounts:
        [
          firstAccount,
          secondAccount
        ]
    }
  }

  describe('Deployment', function () {
    it('Should mint 1000 token for the owner', async function () {
      const { sel, owner } = await loadFixture(deployment)

      expect(await sel.balanceOf(owner.address)).to.equal(INITIAL_OWNER_BALANCE)
    })
  })

  describe('Create an offer', function () {
    it('Should create an offer', async function () {
      const { sel, owner } = await loadFixture(deployment)
      const value = 100;

      await sel.createOffer(value, HASH)
      expect(await sel.balanceOf(owner.address)).to.equal(INITIAL_OWNER_BALANCE - value)
      expect(await sel.getStackedBalance(owner.address)).to.equal(value)
      expect(await sel.balanceOf(sel.address)).to.equal(value)

      const offer = await sel.getOffer(1)

      expect(offer[0][0]).to.equal(HASH[0])
      expect(offer[0][1]).to.equal(HASH[1])
      expect(offer[1]).to.equal(value)
      expect(offer[2]).to.equal(owner.address)
      expect(offer[3]).to.equal(true)
    })
  })

  describe('Cancel an offer', function () {
    let _sel: Contract;
    let _owner: any;
    let _otherAccounts: Signer[];

    const VALUE = 100;

    this.beforeEach(async () => {
      const { sel, owner, otherAccounts } = await loadFixture(deployment);

      await sel.createOffer(VALUE, HASH);
      _sel = sel;
      _owner = owner;
      _otherAccounts = otherAccounts;
    })

    it('Should cancel an offer', async function () {

      await _sel.cancelOffer(1);

      let offer = await _sel.getOffer(1);

      expect(parseInt(offer[0][0], 16)).to.equal(0);
      expect(parseInt(offer[0][1], 16)).to.equal(0);
      expect(offer[1]).to.equal(0);
      expect(parseInt(offer[2], 16)).to.equal(0);
      expect(offer[3]).to.equal(false);

      expect(await _sel.getStackedBalance(_owner.address)).to.equal(0);
      expect(await _sel.balanceOf(_owner.address)).to.equal(INITIAL_OWNER_BALANCE);
      expect(await _sel.balanceOf(_sel.address)).to.equal(0);
    });
  })

  describe('Make proposition', function () {
    let _sel: Contract;
    let _owner: Signer;
    let _otherAccounts: Signer[];
    const VALUE = 100;
    const validOfferId = 1;

    this.beforeEach(async () => {
      const { sel, owner, otherAccounts } = await loadFixture(deployment)

      await sel.createOffer(VALUE, HASH)
      _sel = sel;
      _owner = owner;
      _otherAccounts = otherAccounts;
    })

    it('Should make a proposition', async function () {
      await _sel
        .connect(_otherAccounts[0])
        .makeProposition(validOfferId)

      const propositionId = await _sel.getProposition((_otherAccounts[0] as any).address)
      expect(propositionId).to.equal(validOfferId)
    })
  })

  describe('Cancel proposition', function () {
    let _sel: Contract;
    let _owner: any;
    let _otherAccounts: Signer[];

    const VALUE = 100;
    const validOfferId = 1;

    this.beforeEach(async () => {
      const { sel, owner, otherAccounts } = await loadFixture(deployment);

      await sel.createOffer(VALUE, HASH);

      _sel = sel;
      _owner = owner;
      _otherAccounts = otherAccounts;

      await _sel
        .connect(_otherAccounts[0])
        .makeProposition(validOfferId)
    })

    it('Should cancel proposition', async function () {
      await _sel.connect(_otherAccounts[0]).cancelProposition();

      const propositionId = await _sel.getProposition((_otherAccounts[0] as any).address)
      expect(propositionId).to.equal(0);
    });
  })

  describe('Accept an offer', function () {
    let _sel: Contract;
    let _owner: any;
    let _otherAccounts: any[];
    const validOfferId = 1;

    const VALUE = 100;

    this.beforeEach(async () => {
      const { sel, owner, otherAccounts } = await loadFixture(deployment);

      await sel.createOffer(VALUE, HASH);
      await sel
        .connect(otherAccounts[0])
        .makeProposition(validOfferId)
      _sel = sel;
      _owner = owner;
      _otherAccounts = otherAccounts;
    })

    it('Should accept an offer', async function () {
      await _sel.acceptOffer(1, _otherAccounts[0].address);

      expect(await _sel.getStackedBalance(_owner.address)).to.equal(0);
      expect(await _sel.balanceOf(_owner.address)).to.equal(INITIAL_OWNER_BALANCE - VALUE);
      expect(await _sel.balanceOf(_otherAccounts[0].address)).to.equal(VALUE);

      const offer = await _sel.getOffer(validOfferId);
      const proposer = await _sel.getProposition(_otherAccounts[0].address);
      expect(offer[3]).to.equal(false);
      expect(proposer).to.equal(0);
    });
  })
})
