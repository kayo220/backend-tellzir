import { DDD } from "../../entities/DDD";
import { IDDDRepository } from "../IDDDRepository";

export class DDDINMemoryRepository implements IDDDRepository {

    private DDDs: DDD[] = [];
    private static dddInMemoryRepository: DDDINMemoryRepository;
    static get Instance() {//singleton
        return this.dddInMemoryRepository || (this.dddInMemoryRepository = new this());
    }

    async save(ddd: DDD): Promise<void> {
        this.DDDs.push(ddd);
    }
    async update(ddd: DDD): Promise<void> {
        const index = this.DDDs.findIndex(element => element.code = ddd.code)
        this.DDDs[index] = ddd;
    }
    async searchByCode(code: string): Promise<DDD | undefined> {
        const ddd = this.DDDs.find(element => element.code == code);
        return ddd;
    }
    async list(): Promise<DDD[]> {
        return this.DDDs;
    }
    async searchById(id: string): Promise<any> {
        const ddd = this.DDDs.find(element => element.id == id);
        return ddd;
    }
}