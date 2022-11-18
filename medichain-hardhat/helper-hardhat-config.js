//Configurations for deployment on various networks --> values of vrfCoordinatorV2 changes on
//various networks

const { ethers } = require("ethers")

//all the parameters that are different chain-to-chain.
const networkConfig = {
    // 4: {
    //     name: "rinkeby",
    //     waitConfirmations: 6,
    // },
    31337: {
        name: "hardhat",
        waitConfirmations: 1,
    },
    5: {
        name: "goerli",
        waitConfirmations: 6,
    }
}


const developmentChains = ["hardhat", "localhost"]
const CATEGORY = 0
const IPFS_HASH = ""       //The IPFS hash generated after uploading the file of the patient to the pinata IPFS node. 
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

// Governor Values
export const QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
export const MIN_DELAY = 3600; // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5; // blocks
export const VOTING_DELAY = 1; // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

module.exports = {
    networkConfig,
    developmentChains,
    CATEGORY,
    IPFS_HASH,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    QUORUM_PERCENTAGE,
    MIN_DELAY,
    VOTING_DELAY, 
    VOTING_PERIOD,
    ADDRESS_ZERO,
}
