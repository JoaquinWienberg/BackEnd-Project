function randomNumbers (tries) {
    let inventory = {}
    
    for (let i = 1; i <= tries; i++ ) {
        const randomNum = Math.floor(Math.random() * 1001);
        if (inventory.hasOwnProperty(randomNum)) {
            inventory[randomNum]++;
        } else {
            inventory[randomNum] = 1;
        }
    }

    return inventory
}

process.on("message", tries => {
    if (tries) {
        const objnum = randomNumbers(tries)
        process.send(objnum);
    }        
})