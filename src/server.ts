const banner = `
ICAgICAgICAgICAgIGAuLTovLy8vLy86LS4uYCAgICAgICAgICAgIAogICAgICAgICBgOi9vb29v
b29vb29vb29vb29vKzouYCAgICAgICAgCiAgICAgIGA6K29vb29vb29vb29vb29vb29vb29vb28r
L2AgICAgICAKICAgICA6K29vb29vb29vb29vb29vb29vb29vb29vb29vby8uICAgIAogICAuK29v
b29vb29vb29vb29vLzouLi4uLi06K29vb29vb28tICAgCiAgLitvb29vb29vb29vb29vL2AgLjov
Ly86LWAgLStvb29vb286ICAKIGArb29vb29vb29vb29vbzogYC9vb29vb29vKy0gYG9vb29vb28t
IAogOm9vb29vb29vb29vb29vICA6b29vb29vb29vK2AgL29vb29vbysgCiArb29vb29vb29vb29v
by8gICtvb29vb29vb28rICAvb29vb29vby4KIG9vb29vb29vb29vb29vKyAgb29vb29vb29vYCAg
Lm9vb29vb29vLgogK29vb29vb29vb29vKy86IGBvb29vb29vYCAgLjpvb29vb29vb28uCiA6b29v
b29vbysuYGBgYGBgYGBgYGBgYCAgLytvb29vb29vb29vKyAKIGArb29vb29vLSBgb29vKyAvb29v
b29vb29vb29vb29vb29vb28tIAogIC4rb29vb28vICA6LzpgIC1vb29vb29vb29vb29vb29vb29v
OiAgCiAgIC4rb29vb28rOi0uLi0vb29vb29vb29vb29vb29vb29vby0gICAKICAgICA6K29vb29v
b29vb29vb29vb29vb29vb29vb29vby8uICAgIAogICAgICBgOitvb29vb29vb29vb29vb29vb29v
b29vKy9gICAgICAgCiAgICAgICAgIGA6L29vb29vb29vb29vb29vb28rOi5gICAgICAgICAKICAg
ICAgICAgICAgIGAuLTovLy8vLy86LS4uYCAgICAgICAgICAgIAoKICAgICAgICAgICAgICBwYXJz
ZS1zZXJ2ZXIK
`
    .replace('\n', '')
    .replace('\r', '')

console.log(Buffer.from(banner, 'base64').toString())

import express from 'express'
import morgan from 'morgan'
import createParseServer from '.'

import * as Env from "./env"

console.log(`Starting parse bundle using following options:`)
console.log(Env)

const app = express()
app.use(morgan('tiny'))
app.use(createParseServer({}))

app.listen(Env.PARSE_PORT, () => {
    console.log(`Running server on port ${Env.PARSE_PORT}`)
})