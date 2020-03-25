const knex = require('knex')
const confifguration = require('../../knexfile')

const connection = knex(confifguration.development)

module.exports = connection