import { IPriceRepository } from "../../repositories/IPriceRepository"
import { PriceINMemoryRepository } from "../../repositories/implementations/PriceInMemoryRepository";
import { CreatePriceDTO } from "./CreatePriceDTO";
import { CreatePriceUseCase } from "./CreatePriceUseCase"
import { IDDDRepository } from "../../repositories/IDDDRepository";
import { DDD } from "../../entities/DDD";
import { DDDINMemoryRepository } from "../../repositories/implementations/DDDInMemoryRepository";

describe("Create Price use case", () => {
    let priceRepository: IPriceRepository;
    let dddRepository: IDDDRepository;
    let createPriceUseCase: CreatePriceUseCase;
    beforeAll(() => {
        priceRepository = new PriceINMemoryRepository();
        dddRepository = new DDDINMemoryRepository();
        createPriceUseCase = new CreatePriceUseCase(priceRepository, dddRepository);
    })
    it("Should be able to create a new Price", async () => {
        const dddFrom: DDD = {
            code: '071'
        }
        const dddTo: DDD = {
            code: '072'
        }
        dddRepository.save(dddFrom);
        dddRepository.save(dddTo);

        const dataPrice: CreatePriceDTO = {
            from: { code: dddFrom.code },
            to: { code: dddTo.code },
            charge: 100
        }

        const price = await createPriceUseCase.execute(dataPrice);
        expect(price).toHaveProperty('id');//id is created
        expect(price.from.code).toBe(dataPrice.from.code);
        expect(price.to.code).toBe(dataPrice.to.code);
        expect(price.charge).toBe(dataPrice.charge);


    })
    it("Should NOT be able to create a new Price, DDD[from] does not exist", async () => {
        const dddFrom: DDD = {
            code: '073'
        }
        const dddTo: DDD = {
            code: '074'
        }
        dddRepository.save(dddTo);

        const dataPrice: CreatePriceDTO = {
            from: dddFrom,
            to: dddTo,
            charge: 100
        }
        //const price = await createPriceUseCase.execute(dataPrice);
        await expect(createPriceUseCase.execute(dataPrice))
            .rejects
            .toEqual(new Error("Given DDD[From] Code were not found"));
    })
    it("Should NOT be able to create a new Price, DDD[To] does not exist", async () => {
        const dddFrom: DDD = {
            code: '075'
        }
        const dddTo: DDD = {
            code: '076'
        }
        dddRepository.save(dddFrom);

        const dataPrice: CreatePriceDTO = {
            from: dddFrom,
            to: dddTo,
            charge: 100
        }
        //const price = await createPriceUseCase.execute(dataPrice);
        await expect(createPriceUseCase.execute(dataPrice))
            .rejects
            .toEqual(new Error("Given DDD[To] Code were not found"));
    })
    it("Should NOT be able to create a new Price, DDD[From] and DDD[To] does not exist", async () => {
        const dddFrom: DDD = {
            code: '077'
        }
        const dddTo: DDD = {
            code: '078'
        }

        const dataPrice: CreatePriceDTO = {
            from: dddFrom,
            to: dddTo,
            charge: 100
        }
        //const price = await createPriceUseCase.execute(dataPrice);
        await expect(createPriceUseCase.execute(dataPrice))
            .rejects
            .toEqual(new Error("Given DDD Codes were not found"));
    })
    it("Should NOT be able to create a new Price, DDD[From] and DDD[To] does not exist", async () => {
        const dddFrom: DDD = {
            code: '077'
        }
        const dddTo: DDD = {
            code: '078'
        }
        dddRepository.save(dddFrom);
        dddRepository.save(dddTo);
        const dataPrice: CreatePriceDTO = {
            from: dddFrom,
            to: dddTo,
            charge: 100
        }
        await createPriceUseCase.execute(dataPrice);//should be ok

        await expect(createPriceUseCase.execute(dataPrice))
            .rejects
            .toEqual(new Error("Price already created with these DDD codes!"));
    })
})