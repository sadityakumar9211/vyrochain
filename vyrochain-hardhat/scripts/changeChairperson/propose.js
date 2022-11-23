// @ts-ignore
const { readFileSync, writeFileSync } = require("fs")
// @ts-ignore
const { ethers, network } = require("hardhat")
const {
    NEW_Chairperson_INFO,
    FUNC,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    VOTING_DELAY,
    PROPOSALS_FILE,
} = require("../helper-hardhat-config")
import { moveBlocks } from "../utils/move-blocks"

module.exports = async function propose(args, functionToCall, proposalDescription) {
    const governor = await ethers.getContract("GovernorContract")
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const encodedFunctionCall = patientMedicalRecordSystem.interface.encodeFunctionData(
        functionToCall,
        args
    )
    console.log(
        `Proposing ${functionToCall} on ${
            patientMedicalRecordSystem.address
        } with \n${JSON.stringify(args)}`
    )
    console.log(`Proposal Description: \n ${proposalDescription}`)

    const proposeTx = await governor.propose(
        [patientMedicalRecordSystem.address],
        [0],
        [encodedFunctionCall],
        proposalDescription
    )
    const proposeReceipt = await proposeTx.wait(1)

    if (developmentChains.includes(network.name)) {
        moveBlocks(VOTING_DELAY + 1)
    }

    console.log("Proposal Proposed...")
    const proposalId = proposeReceipt.events[0].args.proposalId
    let proposals = JSON.parse(readFileSync(PROPOSALS_FILE, { encoding: "utf-8" }))
    if (!proposals[network.config.chainId.toString()]) {
        proposals[network.config.chainId.toString()] = [proposalId.toString()]
    } else {
        proposals[network.config.chainId.toString()].push(proposalId.toString())
    }
    writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals))
}

propose([NEW_Chairperson_INFO.address], FUNC, PROPOSAL_DESCRIPTION)
    .then(() => (process.exitCode = 0))
    .catch((e) => {
        console.log(e)
        process.exitCode = 1
    })
