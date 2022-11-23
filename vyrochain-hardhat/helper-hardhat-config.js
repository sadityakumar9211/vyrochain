//Configurations for deployment on various networks --> values of vrfCoordinatorV2 changes on
//various networks
const path = require('path');
const { ethers } = require("ethers")

//all the parameters that are different chain-to-chain.
const networkConfig = {
    // 4: {
    //     name: "rinkeby",
    //     waitConfirmations: 6,
    // },
    localhost: {
        name: "localhost",
        waitConfirmations: 1,
    },
    hardhat: {
        name: "hardhat",
        waitConfirmations: 1,
    },
    goerli: {
        name: "goerli",
        waitConfirmations: 6,
    }
}


const developmentChains = ["hardhat", "localhost"]
const CATEGORY = 0
// const IPFS_HASH = ""       //The IPFS hash generated after uploading the file of the patient to the pinata IPFS node. 
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

const proposalsFile = "proposals.json";
// Governor Values
const QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
const MIN_DELAY = 3600; // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
const VOTING_PERIOD = 5; // blocks
const VOTING_DELAY = 1; // 1 Block - How many blocks till a proposal vote becomes active
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

const NEW_Chairperson_INFO = {
    address: ADDRESS_ZERO,
}
const FUNC = "changeChairperson";
const PROPOSAL_DESCRIPTION = `Proposal @1: Make the new Chairperson to Aditya with address ${ADDRESS_ZERO}`
const PROPOSALS_FILE = path.join(__dirname, "proposals.json")
module.exports = {
    networkConfig,
    developmentChains,
    CATEGORY,
    // IPFS_HASH,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    QUORUM_PERCENTAGE,
    MIN_DELAY,
    VOTING_DELAY, 
    VOTING_PERIOD,
    ADDRESS_ZERO,
    NEW_Chairperson_INFO,
    FUNC, 
    PROPOSAL_DESCRIPTION,
    PROPOSALS_FILE,
}
