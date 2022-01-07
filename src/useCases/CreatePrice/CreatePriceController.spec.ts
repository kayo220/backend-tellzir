import request from "supertest";
import { app } from "../../app"
import connection from "../../database/connection";

describe("Create Price Controller", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.clear();
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
    });
    it("Should be able to create a new Price", async () => {
        const dddFrom = {
            code: '090'
        }
        const dddTo = {
            code: '075'
        }
        await request(app)
            .post("/create/ddd")
            .send(dddFrom)
        await request(app)
            .post("/create/ddd")
            .send(dddTo)
        const price = {
            from: dddFrom,
            to: dddTo,
            charge: 70
        };
        const response = await request(app)
            .post("/create/price")
            .send(price)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.from).toEqual(price.from.code);
        expect(response.body.to).toEqual(price.to.code);

    })

    it("Should not be able to create a new Price, DDD[From] does not exists", async () => {
        const dddFrom = {
            code: 'xxx'
        }
        const dddTo = {
            code: '075'
        }

        await request(app)
            .post("/create/ddd")
            .send(dddTo)

        const price = {
            from: dddFrom,
            to: dddTo,
            charge: 70
        };
        const response = await request(app)
            .post("/create/price")
            .send(price)
        expect(response.status).toBe(400);
    })
    it("Should not be able to create a new Price, DDD[To] does not exists", async () => {
        const dddFrom = {
            code: '071'
        }
        const dddTo = {
            code: 'xxx'
        }

        await request(app)
            .post("/create/ddd")
            .send(dddFrom)
        const price = {
            from: dddFrom,
            to: dddTo,
            charge: 70
        };
        const response = await request(app)
            .post("/create/price")
            .send(price)
        expect(response.status).toBe(400);

    })
    it("Should not be able to create a new Price, DDD[From] and DDD[To] do not exists", async () => {
        const dddFrom = {
            code: 'xxx'
        }
        const dddTo = {
            code: '075'
        }

        const price = {
            from: dddFrom,
            to: dddTo,
            charge: 70
        };
        const response = await request(app)
            .post("/create/price")
            .send(price)
        expect(response.status).toBe(400);

    })
    it("Should not be able to create a new Price, Price already exists for given DDDs", async () => {
        const dddFrom = {
            code: '071'
        }
        const dddTo = {
            code: '075'
        }
        await request(app)
            .post("/create/ddd")
            .send(dddFrom)
        await request(app)
            .post("/create/ddd")
            .send(dddTo)
        const price = {
            from: dddFrom,
            to: dddTo,
            charge: 70
        };
        await request(app)
            .post("/create/price")
            .send(price);//should be ok

        const response = await request(app)
            .post("/create/price")
            .send(price);

        expect(response.status).toBe(400);

    })
})