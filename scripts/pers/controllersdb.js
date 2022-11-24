import mongoose from "mongoose";

let connectedDatabase = false;

function dbConnect (url, cb) {
    mongoose.connect(url, {useNewUrlParser: true,
                            useUnifiedTopology: true}, err => {
                                if(!err){
                                    connectedDatabase = true;
                                }
                                if (cb != null) {
                                    cb(err);
                                }
                            })
}

export default dbConnect