import { DDD } from "../../entities/DDD";
import { IDDDRepository } from "../../repositories/IDDDRepository";
import { CreateDDDDTO } from "./CreateDDDDTO";

export class CreateDDDUseCase {
    constructor(private dddRepository: IDDDRepository) {

    }
    async execute(data: CreateDDDDTO) {
        const dddAlreadyExists = await this.dddRepository.searchByCode(data.code)
        if (dddAlreadyExists) {
            throw new Error('Already exists DDD with the provided code');
        }
        const ddd = new DDD(data);
        await this.dddRepository.save(ddd);
        return ddd;
    }
}