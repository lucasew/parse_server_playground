import express from 'express';
import path from 'path';

const {default: ParseServer, ParseGraphQLServer} = require('parse-server')
const ParseDashboard = require('parse-dashboard')

import * as Env from './env'

export interface ParseOptions {
    enableGraphql?: boolean,
    enablePlayground?: boolean
    enableRouteListOnRoot?: boolean
    enableDashboard?: boolean,
    baseFolder?: string,
    databaseURI?: string,
    appId?: string,
    appName?: string,
    masterKey?: string,
    serverURL?: string
}

function createParseServer({
    enableGraphql = Env.ENABLE_GRAPHQL,
    enablePlayground = Env.ENABLE_GRAPHQL,
    enableRouteListOnRoot = Env.ENABLE_ROUTE_LIST_ON_ROOT,
    enableDashboard = Env.ENABLE_DASHBOARD,
    baseFolder = path.join(__dirname, '..'),
    databaseURI = Env.DATABASE_URI,
    appId = Env.APP_ID,
    appName = Env.APP_NAME,
    masterKey = Env.MASTER_KEY,
    serverURL = `http://${Env.PARSE_HOST}:${Env.PARSE_PORT}/parse`
}: ParseOptions) {
    const router = express.Router()
    let endpoints: Array<{name: string, path: string}> =  []
    const addEndpointName = (name: string, path: string) => endpoints.push({name, path})

    // Base server
    const parseServer = new ParseServer({
        databaseURI,
        appId,
        appName,
        masterKey
    }) 

    addEndpointName('parse server', '/parse')
    router.use('/parse', parseServer.app)

    // Public folder (static files like favicon)
    router.use('/public', express.static(path.join(baseFolder, 'public')))

    // Dashboard
    if (enableDashboard) {
        const dashboard = new ParseDashboard({
            apps: [
                {
                    serverURL,
                    appId,
                    masterKey,
                    appName
                }
            ]
        })

        addEndpointName('parse dashboard', '/dashboard')
        router.use('/dashboard', dashboard)
    }

    if (enableGraphql) {
        const parseGraphqlServer = new ParseGraphQLServer(
            parseServer,
            {
                graphQLPath: '/graphql',
                playgroundPath: '/playground'
            }
        )
        addEndpointName('parse graphql', '/graphql')
        parseGraphqlServer.applyGraphQL(router)
        if (enablePlayground) {
            addEndpointName('parse playground', '/playground')
            parseGraphqlServer.applyPlayground(router)
        }
    }
    if (enableRouteListOnRoot) {
        router.use((req, res) => {
            res.type('html').send(`
            <html>
                <head>
                    <title>Ajuda</title>
                    <style>
                    html {
                        height: 100%;
                    }
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .container {
                        height: 100%;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .container a {
                        display: block;
                        padding: 10px;
                    }
                    a {
                        color: inherit;
                        text-decoration: none;
                    }
                    h1 {
                        margin-bottom: 20px;
                    }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <h1>available modules</h1>
                    ${
                        endpoints.map(endpoint => {
                            return `<a href="${endpoint.path}">${endpoint.name}</a><br>`
                        }).join('\n')
                    }
                    </div>
                </body>
            </html>
            `)
        })
    }
    return router
}

export default createParseServer
