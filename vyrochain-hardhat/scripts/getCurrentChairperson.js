const { ethers, network } = require("hardhat")

async function getChairperson() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const newChairpersonAddress = await patientMedicalRecordSystem.getChairperson()
    console.log(`Current Chairperson Address: ${JSON.stringify(newChairpersonAddress)}`)
}

getChairperson()
    .then(() => {
        process.exitCode = 0
    })
    .catch((e) => {
        console.log(e)
    })

module.exports = { getChairperson }
