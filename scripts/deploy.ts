import hre from "hardhat";

async function main() {
    const StudentNFT = await hre.ethers.getContractFactory("StudentNFT");
    const studentNFT = await StudentNFT.deploy();
    await studentNFT.deployed();
    console.log("StudentNFT deployed to:", studentNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});