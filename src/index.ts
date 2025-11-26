import express from "express"
import {apiRouter} from "./routers/api.router.ts";
import {configs} from "./configs/configs.ts";
import {errorController} from "./controllers/error.controller.ts";
import fileUpload from "express-fileupload";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())

app.use('/', apiRouter)
app.use('/{*any}', errorController.showNonExistentApiError)
app.use(errorController.showError)

app.listen(configs.APP_PORT, () => {
    console.log(`Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`)
})