import { Price } from "../../entities/Price";
import { IPriceRepository } from "../../repositories/IPriceRepository";
import { CreatePriceDTO } from "./CreatePriceDTO";
import { IDDDRepository } from "../../repositories/IDDDRepository";
import { DDD } from "../../entities/DDD";
export class CreatePriceUseCase {
    constructor(private priceRepository: IPriceRepository,
        private dddRepository: IDDDRepository) {

    }
    async execute(data: CreatePriceDTO) {
        const DDDFrom: DDD = await this.dddRepository.searchByCode(data.from.code);
        const DDDTo: DDD = await this.dddRepository.searchByCode(data.to.code);

        if (!DDDFrom && !DDDTo) {
            throw new Error("Given DDD Codes were not found")
        } else if (!DDDFrom) {
            throw new Error("Given DDD[From] Code were not found")
        } else if (!DDDTo) {
            throw new Error("Given DDD[To] Code were not found")
        }
        const priceAlready = await this.priceRepository.alreadyExists(data.from.code, data.to.code);
        if (priceAlready) {
            throw new Error("Price already created with these DDD codes!")
        }

        data.from = DDDFrom;//assign data IDs
        data.to = DDDTo;

        const price = new Price(data);
        await this.priceRepository.save(price)
        return price;
    }
}