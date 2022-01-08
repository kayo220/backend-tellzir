import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { DDD } from "../../entities/DDD";
import { Plan } from "../../entities/Plan";
import { Price } from "../../entities/Price";

export default class SeedCreateAll implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {

    const dddRepository = getRepository('ddds');
    await dddRepository.query('Delete from ddds')
    const ddd011 = await dddRepository.save(new DDD({ code: "011" }));
    const ddd016 = await dddRepository.save(new DDD({ code: "016" }));
    const ddd017 = await dddRepository.save(new DDD({ code: "017" }));
    const ddd018 = await dddRepository.save(new DDD({ code: "018" }));


    const planRepository = getRepository('plans')
    await planRepository.query('Delete from plans')
    const plan1 = planRepository.save(new Plan({ name: "FaleMais 30", free_time_limit: 30 }))
    const plan2 = planRepository.save(new Plan({ name: "FaleMais 60", free_time_limit: 60 }))
    const plan3 = planRepository.save(new Plan({ name: "FaleMais 120", free_time_limit: 120 }))


    const priceRepository = getRepository('prices');
    await priceRepository.query('Delete from prices')


    const price1 = await priceRepository.save(new Price({ from: ddd011, to: ddd016, charge: 1.90 }));
    const price2 = await priceRepository.save(new Price({ from: ddd016, to: ddd011, charge: 2.90 }));
    const price3 = await priceRepository.save(new Price({ from: ddd011, to: ddd017, charge: 1.70 }));
    const price4 = await priceRepository.save(new Price({ from: ddd017, to: ddd011, charge: 2.70 }));
    const price5 = await priceRepository.save(new Price({ from: ddd011, to: ddd018, charge: 0.90 }));
    const price6 = await priceRepository.save(new Price({ from: ddd018, to: ddd011, charge: 1.90 }));




  }
}