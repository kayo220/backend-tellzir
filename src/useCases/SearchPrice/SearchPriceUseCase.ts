import { IPriceRepository } from "../../repositories/IPriceRepository";
import { SearchPriceDTO } from "./SearchPriceDTO";

export class SearchPriceUseCase {
    constructor(private priceRepository: IPriceRepository) {

    }
    async execute(data: SearchPriceDTO) {
        return this.priceRepository.searchPrice(data.from, data.to);
    }
}