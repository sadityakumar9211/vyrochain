const {network} = require('hardhat')
const {
  networkConfig,
  developmentChains,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
  VERIFICATION_BLOCK_CONFIRMATIONS
} = require('../helper-hardhat-config')
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts()
  const { deploy, log, get } = deployments

  const governanceToken = await get('GovernanceToken')
  const timeLock = await get('TimelockControl')
  const args = [
    governanceToken.address,
    timeLock.address,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
  ]
  log('--------------------------------------')
  log('Deploying Governor Contract...')
  const governorContract = await deploy('GovernorContract', {
    from: deployer,
    args,
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Governor Contract is deployed at address ${governorContract.address}`)

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(governorContract.address, args)
  }
}

