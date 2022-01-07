import { Price } from "../../entities/Price";
import { IPriceRepository } from "../IPriceRepository";
import { getRepository } from 'typeorm'

export class PriceSqliteRepository implements IPriceRepository {
    async save(price: Price): Promise<void> {
        const priceRepository = getRepository('prices');
        await priceRepository.save(price)
    }
    async update(price: Price): Promise<void> {
        const priceRepository = getRepository('prices');
        priceRepository.save(price)
    }
    async searchByFrom(from: string): Promise<any> {
        const priceRepository = getRepository('prices');

        const price = await priceRepository.findOne({
            where: {
                from: { code: from }
            },
            relations: ['from', 'to']
        });
    }
    async searchByID(id: string): Promise<any> {
        const priceRepository = getRepository('prices');

        const price = await priceRepository.findOne(id, {
            relations: ['from', 'to']
        });
    }
    async alreadyExists(from: string, to: string): Promise<boolean> {
        const priceRepository = getRepository('prices');
        const exists = await priceRepository.findOne({
            where: {
                from: { code: from },
                to: { code: to }
            },
            relations: ['from', 'to']

        });
        return !(exists === undefined)
    }
    async searchPrice(from: string, to: string): Promise<any> {
        const priceRepository = getRepository('prices');
        console.log(`From ${from} to ${to}`)
        const price = await priceRepository.findOne({
            relations: ['from', 'to'],
            where: {
                from: {
                    code: from
                },
                to: {
                    code: to
                }
            }
        });

        return price;
    }
    async list(): Promise<any> {
        const priceRepository = getRepository('prices');
        const prices = await priceRepository.find({
            relations: ['from', 'to']
        });
        return prices;
    }
}