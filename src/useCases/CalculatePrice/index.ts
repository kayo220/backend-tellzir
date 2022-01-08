import { DDDSqliteRepository } from "../../repositories/implementations/DDDSqliteRepository";
import { PlanSqliteRepository } from "../../repositories/implementations/PlanSqliteRepository";
import { PriceSqliteRepository } from "../../repositories/implementations/PriceSqliteRepository";
import { CalculatePriceController } from "./CalculatePriceController";
import { CalculatePriceUseCase } from "./CalculatePriceUseCase";

const DDDRepository = new DDDSqliteRepository();
const priceRepository = new PriceSqliteRepository();
const planRepository = new PlanSqliteRepository();

const calculatePriceUseCase = new CalculatePriceUseCase(DDDRepository, planRepository, priceRepository);

const calculatePriceController = new CalculatePriceController(calculatePriceUseCase);

export { calculatePriceController }