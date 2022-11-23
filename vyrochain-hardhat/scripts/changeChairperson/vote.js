const { readFileSync } = require('fs')
const { developmentChains, PROPOSALS_FILE, VOTING_PERIOD } = require('../helper-hardhat-config')
// @ts-ignore
const { network, ethers } = require('hardhat')
const { moveBlocks } = require('../utils/move-blocks')

const index = 0
module.exports = async function main(proposalIndex) {
  const proposals = JSON.parse(
    readFileSync(PROPOSALS_FILE, { encoding: 'utf-8' })
  )
  const proposalId = proposals[network.config.chainId][proposalIndex] //first proposal in the list of proposal
  // 0 against 1 = for 2 = abstain
  const voteWay = 1 //voting for for support --> hardcoded value here
  const governor = await ethers.getContract('GovernorContract')
  const reason = 'I think this candidate will be the best fit for this position.'
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  )
  await voteTxResponse.wait(1)
  if(developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD+1)
  }
  console.log(`Voted! Ready to go!`)
}

main(index)
  .then(() => {
    process.exitCode = 0
  })
  .catch((e) => {
    process.exitCode = 1
  })
