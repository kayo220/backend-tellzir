import { Price } from "../../entities/Price";
import { IPriceRepository } from "../IPriceRepository";

export class PriceINMemoryRepository implements IPriceRepository {
    prices: Price[] = [];
    static priceInMemoryRepository: PriceINMemoryRepository
    static get Instance() {//singleton
        return this.priceInMemoryRepository || (this.priceInMemoryRepository = new this());
    }
    async save(price: Price): Promise<void> {
        this.prices.push(price);
    }
    async update(price: Price): Promise<void> {
        const index = this.prices.findIndex(element => element.id == price.id)
        this.prices[index] = price;
    }
    async searchByFrom(fromCode: string): Promise<Price> {
        const price = this.prices.find(element => element.from.code == fromCode)
        return price;
    }
    async searchByID(id: string): Promise<Price> {
        const price = this.prices.find(element => element.id == id)
        return price;
    }
    async alreadyExists(fromCode: string, toCode: string): Promise<boolean> {
        const exists = this.prices.find(element =>
            (element.from.code == fromCode && element.to.code == toCode))
        return !(exists === undefined);
    }
    async searchPrice(fromCode: string, toCode: string): Promise<Price> {
        const price = this.prices.find(element =>
            (element.from.code == fromCode && element.to.code == toCode))
        return price;
    }
    async list(): Promise<Price[]> {
        return this.prices;
    }

}