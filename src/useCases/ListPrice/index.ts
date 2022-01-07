import { PriceINMemoryRepository } from "../../repositories/implementations/PriceInMemoryRepository";
import { PriceSqliteRepository } from "../../repositories/implementations/PriceSqliteRepository";
import { ListPriceController } from "./ListPriceController";
import { ListPriceUseCase } from "./ListPriceUseCase";

const priceRepository = new PriceSqliteRepository();

const listPriceUseCase = new ListPriceUseCase(priceRepository);

const listPriceController = new ListPriceController(listPriceUseCase);

export { listPriceController }