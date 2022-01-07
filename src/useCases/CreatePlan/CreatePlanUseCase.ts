import { Plan } from "../../entities/Plan";
import { IPlanRepository } from "../../repositories/IPlanRepository";
import { CreatePlanDTO } from "./CreatePlanDTO";

export class CreatePlanUseCase {
    constructor(private planRepository: IPlanRepository) {

    }
    async execute(data: CreatePlanDTO) {

        const planAlreadyExists = await this.planRepository.searchByName(data.name);
        
        if (planAlreadyExists) {
            throw new Error("Plan already created with this name!")
        }


        const plan = new Plan(data);
        console.log("Plan created: ", plan)
        await this.planRepository.save(plan)
        return plan;
    }
}