// Express setup
import express from "express"
import compression from "compression"
import random from "../controllers/randoms.js"
import info from "../controllers/info.js"

const app = express();

// Router

app.get("/info", compression(), info)

app.get("/api/randoms", random)

export default app