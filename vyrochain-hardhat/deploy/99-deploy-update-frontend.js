const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractsFile =
    "../vyrochain-nextjs/constants/networkMapping.json"
const frontEndAbiLocation = "../vyrochain-nextjs/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END == "true") {
        console.log("Updating frontend...")
        await updateContractAddresses()
        await updateAbi()
    }
}

async function updateAbi() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const governanceToken = await ethers.getContract("GovernanceToken")
    const governorContract = await ethers.getContract("GovernorContract")
    const timeLockControl = await ethers.getContract("TimelockControl")
    fs.writeFileSync(
        `${frontEndAbiLocation}PatientMedicalRecordSystem.json`,
        patientMedicalRecordSystem.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}GovernanceToken.json`,
        governanceToken.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}GovernorContract.json`,
        governorContract.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndAbiLocation}TimelockControl.json`,
        timeLockControl.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const patientMedicalRecordSystem = await ethers.getContract("PatientMedicalRecordSystem")
    const governanceToken = await ethers.getContract("GovernanceToken")
    const governorContract = await ethers.getContract("GovernorContract")
    const timeLockControl = await ethers.getContract("TimelockControl")

    const chainId = network.config.chainId
    const contractAddress = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (chainId in contractAddress) {
        if (
            !contractAddress[chainId]["PatientMedicalRecordSystem"].includes(
                patientMedicalRecordSystem.address
            )
        ) {
            contractAddress[chainId]["PatientMedicalRecordSystem"].push(
                patientMedicalRecordSystem.address
            )
            
        }
        if (
            !contractAddress[chainId]["GovernanceToken"].includes(
                governanceToken.address
            )
        ) {
            contractAddress[chainId]["GovernanceToken"].push(
                governanceToken.address
            )

        }
        if (
            !contractAddress[chainId]["GovernorContract"].includes(
                governorContract.address
            )
        ) {
            contractAddress[chainId]["GovernorContract"].push(
                governorContract.address
            )

        }
        if (
            !contractAddress[chainId]["TimelockControl"].includes(
                timeLockControl.address
            )
        ) {
            contractAddress[chainId]["TimelockControl"].push(
                timeLockControl.address
            )

        }
    } else {
        contractAddress[chainId] = { PatientMedicalRecordSystem: [patientMedicalRecordSystem.address] }
        contractAddress[chainId]["GovernanceToken"] = [governanceToken.address] 
        contractAddress[chainId]["GovernorContract"] = [governorContract.address] 
        contractAddress[chainId]["TimelockControl"] = [timeLockControl.address] 
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddress))
}

module.exports.tags = ["all", "frontend"]
