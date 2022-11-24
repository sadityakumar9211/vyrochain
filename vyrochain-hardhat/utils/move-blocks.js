const { network } = require("hardhat")
const {moveTime} = require("./move-time")


async function moveBlocks(amount, sleepAmount=0){
     console.log("Moving Blocks...")
     for(let index=0;index<amount; index++){
        await network.provider.request({
            method: "evm_mine",
            params: []
        })
        if(sleepAmount > 0){
            console.log(`Sleeping for ${sleepAmount}ms`)
            await moveTime(sleepAmount)
        }
     }
}

module.exports = { moveBlocks} 