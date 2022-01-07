import request from "supertest";
import { app } from "../../app"
import connection from "../../database/connection";

describe("Create Plan Controller", () => {
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
    it("Should be able to create a new Plan", async () => {
        const plan = {
            name: 'PlanoTelzir60',
            free_time_limit: 60
        };
        const response = await request(app)
            .post("/create/plan")
            .send(plan)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toEqual(plan.name);
        expect(response.body.free_time_limit).toEqual(plan.free_time_limit);

    })

    it("Should not be able to create a new Plan, Plan name already exists", async () => {
        const plan = {
            name: 'PlanoTelzir80',
            free_time_limit: 80
        };
        await request(app).post("/create/plan").send(plan); //should be ok
        const response = await request(app)
            .post("/create/plan")
            .send(plan);
        expect(response.status).toBe(400);

        //password is removed on USERVIEW.render
    })
})