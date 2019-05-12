import '@babel/polyfill'
import express from 'express'
import { applyMiddleware } from './middleware'
import applyDatabase from './services/database'
import { applyApollo } from './services/graphql'

require('dotenv').config()

const app = express()

applyMiddleware(app)
applyDatabase(process.env.MONGO_URI)
applyApollo(app)

const PORT = process.env.PORT || 4000
app.listen({ port: PORT })
