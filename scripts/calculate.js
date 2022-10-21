/*function randomNumbers (tries) {
    let inventory = {}
    
    for (let i = 1; i <= parseInt(tries); i++ ) {
        const randomNum = Math.floor(Math.random() * 1001);
        if (inventory.hasOwnProperty(randomNum)) {
            inventory[randomNum]++;
        } else {
            inventory[randomNum] = 1;
        }
    }

    return inventory
}*/


const getRandomNum = () => Math.ceil(Math.random() * 1000);

const randomNumbers = (tries) => {
    let inventory = {};
    for (let i = 0; i < tries; i++ ) {
        const randomNum = getRandomNum();
        Object.keys(inventory).includes(randomNum.toString()) ? inventory[randomNum]++ : (inventory[randomNum] = 1);
    }

    return inventory;
};

process.on("message", (tries) => {
    
        const objnum = randomNumbers(tries)
        console.log("obj", objnum)
        process.send(objnum);
        process.exit()
})

console.log("Child process alive!", process.pid, randomNumbers(2))