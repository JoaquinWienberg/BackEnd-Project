
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

