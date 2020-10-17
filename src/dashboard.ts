import express from 'express'
import { APP_ID, APP_NAME, MASTER_KEY, PARSE_HOST, PARSE_PORT } from "./env"

const ParseDashboard = require('parse-dashboard')

const dashboard = new ParseDashboard({
    apps: [
        {
            serverURL: `http://${PARSE_HOST}:${PARSE_PORT}/parse`,
            appId: APP_ID,
            masterKey: MASTER_KEY,
            appName: APP_NAME
        }
    ]
})

export default dashboard