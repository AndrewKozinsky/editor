import * as express from 'express'
import { Application } from 'express'
import {port} from './configuration'
import {connectDb} from './helpers/db';
import UserModel from './models/user';

const app: Application = express()

app.get("/test", function (req, res) {
    res.send("Our api server is working correctly.")
})

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)

function startServer() {
    app.listen(port, (): void => {
        console.log(`⚡️ Server is running at http:localhost/:${port}`)

        const newUser = new UserModel({name: 'Andrew'})
        newUser.save(function (err, savedUser) {
            if (err) console.log(err)
            console.log('savedUser', savedUser)
        })
    })
}