import express from 'express';
import path from 'path';
import { parseGraphqlServer, parseServer } from './parseServer';
import { ENABLE_GRAPHQL, ENABLE_PLAYGROUND } from './env';
import dashboard from './dashboard';

const app = express()

let endpoints: Array<{name: string, path: string}> =  []
const addEndpointName = (name: string, path: string) => endpoints.push({name, path})

addEndpointName('parse server', '/parse')
app.use('/parse', parseServer.app)

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

addEndpointName('parse dashboard', '/dashboard')
app.use('/dashboard', dashboard)

if (ENABLE_GRAPHQL) {
    addEndpointName('parse graphql', '/graphql')
    parseGraphqlServer.applyGraphQL(app)
    if (ENABLE_PLAYGROUND) {
        addEndpointName('parse playground', '/playground')
        parseGraphqlServer.applyPlayground(app)
    }
}
app.use((req, res) => {
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

const ParseBundleApp = app
export default ParseBundleApp
