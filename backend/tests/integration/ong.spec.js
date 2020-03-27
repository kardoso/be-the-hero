const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.migrate.rollback()
    await connection.destroy()
  })

  it('should be able to show all ONGS', async () => {
    const response = await request(app).get('/ongs')

    const [count] = await connection('ongs').count()
    expect(response.body.length).toBe(count['count(*)'])
  })

  it('should be able to create a new ONG', async () => {
    //Set headers with .set('Authorization', 'id')
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "TESTE",
        email: "contato@teste.com",
        whatsapp: "47000000000",
        city: "Rio do Sul",
        uf: "SC"
      })
    
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})