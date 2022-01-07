import { Plan } from "../../entities/Plan";
import { IPlanRepository } from "../IPlanRepository";
import { getRepository } from 'typeorm'

export class PlanSqliteRepository implements IPlanRepository {

    async save(plan: Plan): Promise<void> {
        const planRepository = getRepository('plans');
        planRepository.save(plan)
    }
    async update(plan: Plan): Promise<void> {
        const planRepository = getRepository('plans');
        planRepository.save(plan)
    }
    async searchByName(name: string): Promise<any> {
        const planRepository = getRepository('plans');

        const plan = await planRepository.findOne({
            where: {
                name: name
            }
        });
        return plan;
    }
    async searchByID(id: string): Promise<any> {
        const planRepository = getRepository('plans');
        const plan = await planRepository.findOne(id);
        return plan;
    }
    async list(): Promise<any> {
        const planRepository = getRepository('plans');
        return await planRepository.find();
    }


}