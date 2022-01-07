import { IPriceRepository } from "../../repositories/IPriceRepository";

export class ListPriceUseCase {
    constructor(private priceRepository: IPriceRepository) {

    }
    async execute() {
        const prices = await this.priceRepository.list();
        return prices;
    }
}