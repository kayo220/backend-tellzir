import { PriceINMemoryRepository } from "../../repositories/implementations/PriceInMemoryRepository";
import { PriceSqliteRepository } from "../../repositories/implementations/PriceSqliteRepository";
import { SearchPriceController } from "./SearchPriceController";
import { SearchPriceUseCase } from "./SearchPriceUseCase";

const priceRepository = new PriceSqliteRepository();

const searchPriceUseCase = new SearchPriceUseCase(priceRepository);

const searchPriceController = new SearchPriceController(searchPriceUseCase);

export { searchPriceController }