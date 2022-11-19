const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------")
    log("Deploying Governance Token........")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(governanceToken.address, [])
    }

    log(`Deployed Governance token at address ${governanceToken.address}`)

    await delegate(governanceToken.address, deployer)
    log("Delegated!")
}

//delegates the token to others for voting
const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const tx = await governanceToken.delegate(delegatedAccount)
    await tx.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

