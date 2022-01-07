import { Plan } from "../../entities/Plan";
import { IPlanRepository } from "../IPlanRepository";

export class PlanINMemoryRepository implements IPlanRepository {
    plans: Plan[] = [];
    static planInMemoryRepository: PlanINMemoryRepository
    static get Instance() {//singleton
        return this.planInMemoryRepository || (this.planInMemoryRepository = new this());
    }
    async save(plan: Plan): Promise<void> {
        this.plans.push(plan);
    }

    async update(plan: Plan): Promise<void> {
        const index = this.plans.findIndex(element => element.id == plan.id)
        this.plans[index] = plan;
    }
    async searchByName(name: string): Promise<Plan | undefined> {
        const plan = this.plans.find(element => element.name == name);
        return plan;
    }
    async searchByID(id: string): Promise<Plan> {
        const plan = this.plans.find(element => element.id == id);
        return plan;
    }
    async list(): Promise<Plan[]> {
        return this.plans;
    }

}