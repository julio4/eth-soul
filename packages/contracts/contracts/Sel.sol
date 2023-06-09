// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

struct Offer {
  bytes32 hash1;
  bytes32 hash2;
	uint256 value;
	address offerer;
	bool active;
}

contract Sel is ERC20 {
  constructor(uint256 _mintValue) ERC20("Sel", "SEL") {
    _mint(msg.sender, _mintValue);
  }

  uint256 public offerId;
  mapping(uint256 => Offer) private offers;
  mapping(address => uint256) private proposers;

  mapping(address => uint256) private _stack;

  event OfferCreated(uint256 offerId, address offerer, uint256 tokens, bytes32[2] hash);
  event OfferCanceled(uint256 offerId, address offerer);
  event PropositionMade(uint256 offerId, address proposer, uint256 tokens, bytes32[2] hash);
  event PropositionCanceled(uint256 offerId, address proposer);
  event PropositionAccepted(uint256 offerId, address offerer, address requester, uint256 tokens, bytes32[2] hash);

  modifier offerExistance(uint256 _offerId) {
    Offer memory offer = offers[_offerId];

    require(offer.offerer != address(0), "Offer does not exist");
    require(offer.active, "Offer is not active");
    _;
  }

  function getOffer(uint256 _offer) public view returns (bytes32[2] memory, uint256, address, bool) {
    Offer storage offer = offers[_offer];
    return ([offer.hash1, offer.hash2], offer.value, offer.offerer, offer.active);
  }

  function getStackedBalance(address _address) public view returns (uint256) {
    return _stack[_address];
  }

  function getProposition(address _address) public view returns (uint256) {
    return proposers[_address];
  }

  function createOffer(uint256 _tokens, bytes32[2] memory _hash) public payable returns (uint256){
    require(_tokens > 0, "You must offer at least 1 token"); // TODO : Delete this part
    require(_hash[0] != 0, "You must provide a hash");
    require(_hash[1] != 0, "You must provide a hash");

    _transfer(msg.sender, address(this), _tokens);

    offerId++;
    offers[offerId] = Offer(_hash[0], _hash[1], _tokens, msg.sender, true);
    _stack[msg.sender] += _tokens;

    emit OfferCreated(offerId, msg.sender, _tokens, _hash);
    return offerId;
  }

  function cancelOffer(uint256 _offerId) offerExistance(_offerId) public payable {
    Offer storage offer = offers[_offerId];
    require(offer.offerer == msg.sender, "You are not the offerer");
    uint256 _value = offer.value;

    delete offers[_offerId];
    _stack[msg.sender] -= _value;
    emit OfferCanceled(_offerId, msg.sender);
    _transfer(address(this), msg.sender, _value);
  }

  function makeProposition(uint256 _offerId) offerExistance(_offerId) public payable {
    Offer memory offer = offers[_offerId];

    require(offer.offerer != msg.sender, "You can't request your own offer");

    proposers[msg.sender] = _offerId;

    emit PropositionMade(_offerId, msg.sender, offer.value, [offer.hash1, offer.hash2]);
  }

  function cancelProposition() public payable {
    uint256 _offerId = proposers[msg.sender];
    require(_offerId != 0, "You are not a proposer");

    delete proposers[msg.sender];
    emit PropositionCanceled(_offerId, msg.sender);
  }

  function acceptOffer(uint256 _offerId, address proposer) offerExistance(_offerId) public payable {
    Offer storage offer = offers[_offerId];

    require(offer.offerer == msg.sender, "You are not the offerer");
    require(proposers[proposer] == _offerId, "The provided address is not a proposer");

    offer.active = false;
    emit PropositionAccepted(_offerId, offer.offerer, proposer, offer.value, [offer.hash1, offer.hash2]);

    _stack[offer.offerer] -= offer.value;
    _transfer(address(this), proposer, offer.value);
    delete proposers[proposer];
  }
}
