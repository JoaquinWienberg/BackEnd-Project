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


const getOneRandom = () => Math.ceil(Math.random() * 1000);

const generateRandoms = (cant) => {
    const numbers = {};
    for (let i = 0; i < cant; i++ ) {
        const randomNumber = getOneRandom();
        Object.keys(numbers).includes(randomNumber.toString()) ? numbers[randomNumber]++ : (numbers[randomNumber] = 1);
    }

    return numbers;
};


process.on("message", tries => {
    
        const objnum = generateRandoms(tries)
        console.log("obj", objnum)
        process.send(objnum);
        process.exit()
})

