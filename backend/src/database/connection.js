const knex = require('knex')
const confifguration = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? confifguration.test : confifguration.development

const connection = knex(config)

module.exports = connection