const { promises: fs } = require("fs")

class SystemChat {
    constructor(data) {
      this.data = data
    }

    // Add message to log

    async save(message) {
        try {
            const oldMsg = await fs.readFile(this.data, "utf-8");
            const msgLog = JSON.parse(oldMsg)
            msgLog.push(message)
            await fs.writeFile(this.data, JSON.stringify(msgLog))
            console.log("New message saved") 
          } catch (error){
            console.log("Error when saving message")
            return [];
          }
        }

    async getMsg(){
        try {
            const msgs = await fs.readFile(this.data, "utf-8");
            console.log("Messages were successfuly obtained")
            return JSON.parse(msgs)
          } catch (error){
            console.log("Error when reading messages")
            return [];
          }
    }

}

module.exports = SystemChat;