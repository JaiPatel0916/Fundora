const hre = require('hardhat');



async function main() {

    const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");



    console.log("Deploying CampaignFactory...");



    // Deploy the contract

    const campaignFactory = await CampaignFactory.deploy();

    

    // Log the transaction hash

    console.log("Transaction Hash:", campaignFactory.deployTransaction.hash);



    // Wait for deployment confirmation

    await campaignFactory.deployed();



    console.log("Factory deployed to:", campaignFactory.address);

}   



main()

    .then(() => process.exit(0))

    .catch((error) => {

        console.error(error);

        process.exit(1);

    });