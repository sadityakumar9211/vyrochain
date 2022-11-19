// @ts-ignore
const { ethers, network } = require("hardhat")
const {
    FUNC,
    NEW_Chairperson_INFO,
    PROPOSAL_DESCRIPTION,
    MIN_DELAY,
    developmentChains,
} = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")
const { moveTime } = require("../utils/move-time")

module.exports = async function queueAndExecute() {
    const args = [NEW_Chairperson_INFO.address]
    const functionToCall = FUNC
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const encodedFunctionCall = changeChairperson.interface.encodeFunctionData(functionToCall, args)
    const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION) //hash of the description

    const governor = await ethers.getContract("GovernorContract")
    console.log("Queueing...")
    const queueTx = await governor.queue(
        [patientMedicalRecordSystem.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await queueTx.wait(1)

    //waiting for users to leave after queueing the proposal
    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
    }

    console.log("Executing...")
    // this will fail on a testnet because you need to wait for the MIN_DELAY!
    const executeTx = await governor.execute(
        [patientMedicalRecordSystem.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await executeTx.wait(1)
    const newChairpersonAddress = await patientMedicalRecordSystem.getChairperson()
    console.log(`New Chairperson Address: ${JSON.stringify(newChairpersonAddress)}`)
}

queueAndExecute()
    .then(() => (process.exitCode = 0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
