import { PlanINMemoryRepository } from "../../repositories/implementations/PlanInMemoryRepository";
import { PlanSqliteRepository } from "../../repositories/implementations/PlanSqliteRepository";
import { CreatePlanController } from "./CreatePlanController";
import { CreatePlanUseCase } from "./CreatePlanUseCase";

const planRepository = new PlanSqliteRepository();

const createPlanUseCase = new CreatePlanUseCase(planRepository);

const createPlanController = new CreatePlanController(createPlanUseCase);

export { createPlanController }