import {promises as fs} from "fs"
import logger from "../../logs/logger.js"

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
            logger.info("New message saved") 
          } catch (error){
            logger.error("Error when saving message")
            return [];
          }
        }

    async getAll(){
        try {
            const msgs = await fs.readFile(this.data, "utf-8");
            logger.info("Messages were successfuly obtained")
            return JSON.parse(msgs)
          } catch (error){
            logger.error("Error when reading messages")
            return [];
          }
    }

}

export default SystemChat