import { IPlanRepository } from "../../repositories/IPlanRepository";

export class ListPlanUseCase {
    constructor(private planRepository: IPlanRepository) {

    }
    async execute() {
        return this.planRepository.list();
    }
}