import express from "express"
import {apiRouter} from "./routers/api.router.ts";
import {configs} from "./config/configs.ts";

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use('/', apiRouter)

app.listen(configs.APP_PORT, () => {
    console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`)
})