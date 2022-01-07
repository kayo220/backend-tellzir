import { IDDDRepository } from "../../repositories/IDDDRepository"
import { DDDINMemoryRepository } from "../../repositories/implementations/DDDInMemoryRepository";
import { CreateDDDDTO } from "./CreateDDDDTO";
import { CreateDDDUseCase } from "./CreateDDDUseCase"

describe("Create DDD use case", () => {
    let dddRepository: IDDDRepository;
    let createDDDUseCase: CreateDDDUseCase;
    beforeAll(() => {
        dddRepository = new DDDINMemoryRepository();
        createDDDUseCase = new CreateDDDUseCase(dddRepository);
    })
    it("Should be able to create a new DDD", async () => {
        const dataDDD: CreateDDDDTO = {
            code: "098"
        }
        const ddd = await createDDDUseCase.execute(dataDDD);
        expect(ddd).toHaveProperty('id');//id is created
        expect(ddd.code).toBe(dataDDD.code);
    })
    it("Should NOT be able to create a new DDD, DDD Code already exists", async () => {
        const dataDDD = {
            code: "097"
        }
        await createDDDUseCase.execute(dataDDD);//should save
        await expect(createDDDUseCase.execute(dataDDD))
            .rejects
            .toEqual(new Error('Already exists DDD with the provided code'));
    })
})