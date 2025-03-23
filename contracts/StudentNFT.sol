
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract StudentNFT is ERC721URIStorage {
    address public admin; // Backend address that mints NFTs
    uint256 private tokenIdCounter; // Tracks the next NFT ID
    mapping(uint256 => uint256) public engagementScores; // Links each NFT to its GitHub score

    event NFTMinted(address indexed student, uint256 tokenId, uint256 score);

    constructor() ERC721("StuKey", "STKY") {
        admin = msg.sender; // Set the deployer as admin
        tokenIdCounter = 0;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can mint");
        _;
    }

    function mintNFT(address student, uint256 score) external onlyAdmin {
        tokenIdCounter++; // Increment ID
        _mint(student, tokenIdCounter); // Mint NFT to student’s wallet
        engagementScores[tokenIdCounter] = score; // Store the score
        emit NFTMinted(student, tokenIdCounter, score);
    }

    function getEngagementScore(uint256 tokenId) external view returns (uint256) {
        return engagementScores[tokenId]; // Fetch score for an NFT
    }
}