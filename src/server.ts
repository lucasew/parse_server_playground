import ParseBundleApp from "./index"
import * as Env from "./env"

console.log(`Starting parse bundle using following options:`)
console.log(Env)

ParseBundleApp.listen(Env.PARSE_PORT, () => {
    console.log(`Running server on port ${Env.PARSE_PORT}`)
})