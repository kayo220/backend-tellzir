import { DDDINMemoryRepository } from "../../repositories/implementations/DDDInMemoryRepository";
import { DDDSqliteRepository } from "../../repositories/implementations/DDDSqliteRepository";
import { PriceINMemoryRepository } from "../../repositories/implementations/PriceInMemoryRepository";
import { PriceSqliteRepository } from "../../repositories/implementations/PriceSqliteRepository";
import { CreatePriceController } from "./CreatePriceController";
import { CreatePriceUseCase } from "./CreatePriceUseCase";

const priceRepository = new PriceSqliteRepository();
const DDDRepository = new DDDSqliteRepository();

const createPriceUseCase = new CreatePriceUseCase(priceRepository, DDDRepository);

const createPriceController = new CreatePriceController(createPriceUseCase);

export { createPriceController }