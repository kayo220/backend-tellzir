import { Plan } from "../entities/Plan";

export interface IPlanRepository {
    save(plan: Plan): Promise<void>;
    update(plan: Plan): Promise<void>;
    searchByName(name: string): Promise<any>;
    searchByID(id: string): Promise<any>;
    list(): Promise<any>;
}