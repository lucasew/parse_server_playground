import { APP_ID, APP_NAME, DATABASE_URI, MASTER_KEY} from './env';
const {default: ParseServer, ParseGraphQLServer} = require('parse-server')

export const parseServer = new ParseServer({
    databaseURI: DATABASE_URI,
    appId: APP_ID,
    appName: APP_NAME,
    masterKey: MASTER_KEY
}) 

export const parseGraphqlServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: '/graphql',
        playgroundPath: '/playground'
    }
)
