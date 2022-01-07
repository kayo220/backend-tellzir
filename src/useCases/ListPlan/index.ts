import { PlanSqliteRepository } from "../../repositories/implementations/PlanSqliteRepository";
import { ListPlanController } from "./ListPlanController";
import { ListPlanUseCase } from "./ListPlanUseCase";

const planRepository = new PlanSqliteRepository();

const listPlanUseCase = new ListPlanUseCase(planRepository);

const listPlanController = new ListPlanController(listPlanUseCase);

export { listPlanController }