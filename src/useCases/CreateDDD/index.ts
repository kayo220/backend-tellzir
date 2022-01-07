import { DDDINMemoryRepository } from "../../repositories/implementations/DDDInMemoryRepository";
import { DDDSqliteRepository } from "../../repositories/implementations/DDDSqliteRepository";
import { CreateDDDController } from "./CreateDDDController";
import { CreateDDDUseCase } from "./CreateDDDUseCase";

const DDDRepository = new DDDSqliteRepository();

const createDDDUseCase = new CreateDDDUseCase(DDDRepository);

const createDDDController = new CreateDDDController(createDDDUseCase);

export { createDDDController }