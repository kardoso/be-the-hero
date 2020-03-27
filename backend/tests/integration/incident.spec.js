const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Incident', () => {
  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.migrate.rollback()
    await connection.destroy()
  })

  it('should be able to get all incidents', async () => {
    //Set headers with .set('Authorization', 'id')
    const response = await request(app)
      .get('/incidents')
    
    const [count] = await connection('incidents').count()
    const totalCount = parseInt(response.headers['x-total-count'], 10)

    expect(totalCount).toBe(count['count(*)'])
  })

  it('should be able to create a new incident', async () => {

    const newOng = await request(app)
      .post('/ongs')
      .send({
        name: "TESTE",
        email: "contato@teste.com",
        whatsapp: "47000000000",
        city: "Rio do Sul",
        uf: "SC"
      })
    
    const ongId = newOng.body.id

    const response = await request(app)
      .post('/incidents')
      .set('Authorization', ongId)
      .send({
          title: "Caso teste",
          description: "Detalhes do caso",
          value: 120
      })
    
      expect(response.status).toBe(200)

      const [count] = await connection('incidents')
        .where('id', response.body.id)
        .where('ong_id', ongId)
        .count()

      expect(count['count(*)']).toBeGreaterThan(0)
  })
})