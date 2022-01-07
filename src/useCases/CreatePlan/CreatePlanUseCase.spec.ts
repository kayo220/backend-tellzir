import { IPlanRepository } from "../../repositories/IPlanRepository"
import { PlanINMemoryRepository } from "../../repositories/implementations/PlanInMemoryRepository";
import { CreatePlanDTO } from "./CreatePlanDTO";
import { CreatePlanUseCase } from "./CreatePlanUseCase"

describe("Create Plan use case", () => {
    let planRepository: IPlanRepository;
    let createPlanUseCase: CreatePlanUseCase;
    beforeAll(() => {
        planRepository = new PlanINMemoryRepository();
        createPlanUseCase = new CreatePlanUseCase(planRepository);
    })
    it("Should be able to create a new Plan", async () => {
        const dataPlan: CreatePlanDTO = {
            name: "PlanoMegaMais100",
            free_time_limit: 100
        }
        const plan = await createPlanUseCase.execute(dataPlan);
        expect(plan).toHaveProperty('id');//id is created
        expect(plan.name).toBe(dataPlan.name);
    })
    it("Should NOT be able to create a new Plan, Plan name already exists", async () => {
        const dataPlan = {
            name: "PlanoMegaMais200",
            free_time_limit: 200
        }
        await createPlanUseCase.execute(dataPlan);//should save
        await expect(createPlanUseCase.execute(dataPlan))
            .rejects
            .toEqual(new Error("Plan already created with this name!"));
    })
})