import {promises as fs} from "fs"

class SystemChat {
    constructor(data) {
      this.data = data
    }

    // Add message to log

    async saveMsg(message) {
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

    async getAll(){
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

export default SystemChat