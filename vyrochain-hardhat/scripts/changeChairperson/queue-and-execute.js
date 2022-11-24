// @ts-ignore
const { ethers, network } = require("hardhat")
const {
    FUNC,
    // @ts-ignore
    NEW_CHAIRPERSON_INFO,
    PROPOSAL_DESCRIPTION,
    MIN_DELAY,
    developmentChains,
} = require("../../helper-hardhat-config")
const { moveBlocks } = require("../../utils/move-blocks")
const { moveTime } = require("../../utils/move-time")

async function queueAndExecute() {
    const args = [NEW_CHAIRPERSON_INFO.address]
    const functionToCall = FUNC
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const encodedFunctionCall = patientMedicalRecordSystem.interface.encodeFunctionData(
        functionToCall,
        args
    )
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
    // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

    const governor = await ethers.getContract("GovernorContract")
    console.log("Queueing...")
    const queueTx = await governor.queue(
        [patientMedicalRecordSystem.address],
        [0],
        [encodedFunctionCall],
        descriptionHash
    )
    await queueTx.wait(1)

    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
    }
    console.log("Successfully queued!")

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
    console.log(newChairpersonAddress.toString())
}

queueAndExecute()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

module.exports = { queueAndExecute }
