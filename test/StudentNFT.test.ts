import { expect } from "chai";
import { ethers } from "hardhat";

describe("StudentNFT", function () {
    let studentNFT: any;
    let admin: any, student: any;
    beforeEach("StudentNFT", async function () {
        [admin, student] = await ethers.getSigners();
        const StudentNFTFactory = await ethers.getContractFactory("StudentNFT");
        studentNFT = await StudentNFTFactory.deploy();
        await studentNFT.deployed();
    });
    it("should mint an NFT with a score", async function () {
        await studentNFT.mintNFT(student.address, 20);
        expect(await studentNFT.ownerOf(1)).to.equal(student.address);
        expect(await studentNFT.getEngagementScore(1)).to.equal(20);
    });
    it("should restrict minting to admin", async function () {
        // Try to mint as a non-admin (student)
        await expect(
            studentNFT.connect(student).mintNFT(student.address, 20)
        ).to.be.revertedWith("Only admin can mint");
    });
    it("should emit NFTMinted event", async function () {
        // Mint an NFT and check for the event
        await expect(studentNFT.mintNFT(student.address, 100))
            .to.emit(studentNFT, "NFTMinted")
            .withArgs(student.address, 1, 100);
    });
});