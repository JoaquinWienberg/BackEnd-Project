import supertest from 'supertest';
import { expect } from 'chai';
import app from './server.js';
import { newProduct , updatedProduct } from "./test/products.js"

let request
let server

describe('test api rest full', () => {
    before(async function () {
        server = await startServer();
        request = supertest(`http://localhost:${server.address().port}/api/productos`);
    });

    after(function () {
        server.close();
    });

    describe('GET', () => {
        it('Waiting on status 200 response', async () => {
            const response = await request.get('/')
            expect(response.status).to.eq(200);
        })
    });

    describe('POST', () => {
        it('Creates a new product', async () => {
            const response = await request.post('/').send(newProduct);
            expect(response.status).to.eq(200);

            const user = response.body;
            expect(user).to.include.keys('title', 'price');
            expect(user.title).to.eq(newProduct.title);
            expect(user.price).to.eq(newProduct.price);
        })
    })

    describe('PUT', () => {
        it('Updates an existing product', async () => {
            const response = await request.put('/12').send(updatedProduct);
            expect(response.status).to.eq(200);

            const user = response.body;
            expect(user).to.eq("Update complete");;
        })
    })

    describe('DELETE', () => {
        it('Deletes an existing product', async () => {
            const response = await request.delete('/9');
            expect(response.status).to.eq(200);
        })
    })
});

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0
        const server = app.listen(PORT, () => {
            console.log(`Server listening via port ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Server error: ${error}`)
            reject(error)
        });
    })
}