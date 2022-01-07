import { DDD } from "../entities/DDD";

export interface IDDDRepository {
    save(ddd: DDD): Promise<void>;
    update(ddd: DDD): Promise<void>;
    searchByCode(code: string): Promise<any>;
    list(): Promise<any>;
}