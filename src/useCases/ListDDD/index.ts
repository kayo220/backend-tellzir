import { DDDINMemoryRepository } from "../../repositories/implementations/DDDInMemoryRepository";
import { DDDSqliteRepository } from "../../repositories/implementations/DDDSqliteRepository";
import { ListDDDController } from "./ListDDDController";
import { ListDDDUseCase } from "./ListDDDUseCase";


const DDDRepository = new DDDSqliteRepository();

const listDDDUseCase = new ListDDDUseCase(DDDRepository);

const listDDDController = new ListDDDController(listDDDUseCase);

export { listDDDController }