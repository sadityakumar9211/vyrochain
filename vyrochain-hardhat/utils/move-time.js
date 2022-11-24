//This is how we sleep in JS
function moveTime(timeInMs=0){
    //in order to wait for some time we have to use promises
    console.log(`Moving Time forward by ${timeInMs}`)
    return new Promise((resolve)=>{
        setTimeout(resolve, timeInMs)
    })
}

module.exports = {moveTime}