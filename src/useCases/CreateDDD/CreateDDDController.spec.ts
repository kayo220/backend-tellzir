import request from "supertest";
import { app } from "../../app"
import connection from "../../database/connection";

describe("Create DDD Controller", () => {
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
    it("Should be able to create a new DDD TEEST", async () => {
        const dddUser = {
            code: '090'
        };
        const response = await request(app)
            .post("/create/ddd")
            .send(dddUser)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.code).toEqual(dddUser.code);
    })

    it("Should not be able to create a new DDD, DDD code already exists", async () => {
        const dddUser = {
            code: '070'
        };
        await request(app).post("/create/ddd").send(dddUser); //should be ok
        const response = await request(app)
            .post("/create/ddd")
            .send(dddUser);

        expect(response.status).toBe(400);

    })
})