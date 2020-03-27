const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //reinicializa o banco e faz um nova migração
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    //destroi a conexão do banco pra não emitir warning
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Teste ONG",
                email: "contae@s.com",
                whatsapp: "51123456789",
                city: "Porto Alegre",
                uf: "RS"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});