// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract StickersContract {
    
    address payable public owner;

    struct Sticker {
        uint stickerNumber;
        bool rarity;
        uint8 pilotNumber;
        string team;
    }

    mapping (address => Sticker) private _stickersMapping;

    event Withdrawal(uint amount, uint when);

    event StickerAdded(address collector, uint stickerNumber, bool rarity, uint8 pilotNumber, string team);
    event StickerDeleted(address collector, uint stickerNumber, bool rarity, uint8 pilotNumber, string team);

    constructor() payable {
        owner = payable(msg.sender);
    }


    function addSticker(uint stickerNumber, bool rarity, uint8 pilotNumber, string memory team) public payable {
        require(stickerNumber != 0, "You can't add a sticker with a number less than 0");
        require(pilotNumber >= 1 && pilotNumber <= 99, "You cannot add a sticker with the pilot's number with this number (the pilot's number is in the range from 1 to 99)");
        
        _stickersMapping[msg.sender] = Sticker(stickerNumber, rarity, pilotNumber, team);
        
        emit StickerAdded(msg.sender, stickerNumber, rarity, pilotNumber, team);
    }

    function deleteSticker() public payable {
        uint _stickerNumber = _stickersMapping[msg.sender].stickerNumber;
        bool _rarity = _stickersMapping[msg.sender].rarity;
        uint8 _pilotNumber = _stickersMapping[msg.sender].pilotNumber;
        string memory _team = _stickersMapping[msg.sender].team;

        delete(_stickersMapping[msg.sender]);
        
        emit StickerDeleted(msg.sender, _stickerNumber, _rarity, _pilotNumber, _team);
    }
}
