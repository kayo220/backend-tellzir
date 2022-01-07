import { IDDDRepository } from "../../repositories/IDDDRepository";

export class ListDDDUseCase {
    constructor(private dddRepository: IDDDRepository) {

    }
    async execute() {
        const ddds = await this.dddRepository.list();
        return ddds;
    }
}