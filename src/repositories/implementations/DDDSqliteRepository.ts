import { DDD } from "../../entities/DDD";
import { IDDDRepository } from "../IDDDRepository";
import { getRepository } from 'typeorm'

export class DDDSqliteRepository implements IDDDRepository {

    async save(ddd: DDD): Promise<void> {
        const dddRepository = getRepository('ddds');
        dddRepository.save(ddd)
    }
    async update(ddd: DDD): Promise<void> {
        const dddRepository = getRepository('ddds');
        dddRepository.save(ddd)
    }
    async searchByCode(code: string): Promise<any> {
        const dddRepository = getRepository('ddds');
        const ddd = await dddRepository.findOne({
            where: {
                code: code
            }
        });
        return ddd;
    }
    async list(): Promise<any> {
        const dddRepository = getRepository('ddds');
        return await dddRepository.find();
    }
    async searchById(id: string): Promise<any> {
        const dddRepository = getRepository('ddds');
        return await dddRepository.findOne(id);
    }
}