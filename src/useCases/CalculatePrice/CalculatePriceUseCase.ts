import { DDD } from "../../entities/DDD";
import { IDDDRepository } from "../../repositories/IDDDRepository";
import { IPlanRepository } from "../../repositories/IPlanRepository";
import { IPriceRepository } from "../../repositories/IPriceRepository";
import { CalculatePriceDTO } from "./CalculatePriceDto";

export class CalculatePriceUseCase {
    constructor(private dddRepository: IDDDRepository,
        private planRepository: IPlanRepository,
        private priceRepository: IPriceRepository) {
    }
    async execute(data: CalculatePriceDTO) {
        const dddFrom = await this.dddRepository.searchByCode(data.from);
        const dddTo = await this.dddRepository.searchByCode(data.to);
        if (!dddFrom || !dddTo) {
            throw new Error('Problema ao encontrar o DDD, verifique novamente.');
        }

        const priceByMinute = await this.priceRepository
            .searchPrice(dddFrom.code, dddTo.code)
        if (!priceByMinute) {
            throw new Error('Infelizmente ainda não realizamos chamadas entre os DDDs.');
        }
        const plan = await this.planRepository.searchByID(data.plan)
        if (!plan) {
            throw new Error('O plano selecionado não está disponível.');
        }

        let payedTimeWithPlan = (data.duration - plan.free_time_limit);//overtime 
        if (payedTimeWithPlan > 0) {//charging with 10% additional
            payedTimeWithPlan = (payedTimeWithPlan * priceByMinute.charge);
            payedTimeWithPlan += payedTimeWithPlan * 0.10
        } else {//plan fully cover 
            payedTimeWithPlan = 0;
        }

        const payedTimeWithoutPlan = (data.duration) * priceByMinute.charge;

        return {
            plan: plan.name,
            from: dddFrom.code,
            to: dddTo.code,
            duration: data.duration,
            chargeWithPlan: payedTimeWithPlan,
            chargeWithoutPlan: payedTimeWithoutPlan
        };
    }
}