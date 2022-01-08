import request from "supertest";
import { app } from "../../app"
import connection from "../../database/connection";
import { Plan } from "../../entities/Plan";
import { DDDSqliteRepository } from "../../repositories/implementations/DDDSqliteRepository";

describe("Calculate Price Controller", () => {
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
    it("Should be able to return a Price", async () => {

        const dddFrom = {
            code: '011'
        };
        const dddFromResponse = await request(app).post("/create/ddd").send(dddFrom); //create DDD FROM
        const dddTo = {
            code: '016'
        };
        const dddToResponse = await request(app).post("/create/ddd").send(dddTo); //create DDD TO

        const planResponse = await request(app).post("/create/plan").send({
            name: "FaleMais 30",
            free_time_limit: 30
        }); //create PLAN
        const price = {
            from: dddFromResponse.body,
            to: dddToResponse.body,
            charge: 1.90
        }
        const priceResponse = await request(app).post("/create/price").send(price); //create PLAN
        const searchTotal = {
            from: dddFromResponse.body.code,
            to: dddToResponse.body.code,
            duration: 20,
            plan: planResponse.body.id,
        }

        const responsePrice = await request(app)
            .post("/calculate/charge")
            .send(searchTotal)
        expect(responsePrice.status).toBe(200);
        expect(responsePrice.body).toHaveProperty("chargeWithPlan");
        expect(responsePrice.body).toHaveProperty("chargeWithoutPlan");
        expect(responsePrice.body.chargeWithPlan).toEqual(0);
        expect(responsePrice.body.chargeWithoutPlan).toEqual(38.0);
    })

    it("Should be able to return a Price, There is no cover for the call from one ddd to other", async () => {
        const dddFrom = {
            code: '018'
        };
        const dddFromResponse = await request(app).post("/create/ddd").send(dddFrom); //create DDD FROM
        const dddTo = {
            code: '020'
        };
        const dddToResponse = await request(app).post("/create/ddd").send(dddTo); //create DDD TO

        const planResponse = await request(app).post("/create/plan").send({
            name: "FaleMais 30",
            free_time_limit: 30
        }); //create PLAN

        const searchTotal = {
            from: dddFromResponse.body.code,
            to: dddToResponse.body.code,
            duration: 20,
            plan: planResponse.body.id,
        }

        const responsePrice = await request(app)
            .post("/calculate/charge")
            .send(searchTotal)
        expect(responsePrice.status).toBe(400);

    })

})