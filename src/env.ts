import getenv from 'getenv';
import dotenv from 'dotenv'
dotenv.config()

export const APP_ID = getenv.string('APP_ID', 'testparse')
export const DATABASE_URI = getenv.string('DATABASE_URI', 'mongodb://127.0.0.1:27017/parse')
export const APP_NAME = getenv.string('APP_NAME', 'teste')
export const MASTER_KEY = getenv.string('MASTER_KEY', 'changeme')
export const PARSE_PORT = getenv.int('PORT', 1337)
export const PARSE_HOST = getenv.string('PARSE_HOST', '127.0.0.1')
export const ENABLE_GRAPHQL = getenv.bool('ENABLE_GRAPHQL', true)
export const ENABLE_DASHBOARD = getenv.bool('ENABLE_DASHBOARD', true)
export const ENABLE_ROUTE_LIST_ON_ROOT = getenv.bool('ENABLE_ROUTE_LIST_ON_ROOT', true)
export const ENABLE_PLAYGROUND = getenv.bool('ENABLE_PLAYGROUND', false)

