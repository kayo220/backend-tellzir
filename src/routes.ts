import { Router } from "express";
import { calculatePriceController } from "./useCases/CalculatePrice";
import { createDDDController } from "./useCases/CreateDDD";
import { createPlanController } from "./useCases/CreatePlan";
import { createPriceController } from "./useCases/CreatePrice";
import { listDDDController } from "./useCases/ListDDD";
import { listPlanController } from "./useCases/ListPlan";
import { listPriceController } from "./useCases/ListPrice";
import { searchPriceController } from "./useCases/SearchPrice";


const router = Router()

router.post('/create/ddd', (request, response) => {
    return createDDDController.handle(request, response);
})
router.get('/ddd', (request, response) => {
    return listDDDController.handle(request, response);
})
router.post('/create/plan', (request, response) => {
    return createPlanController.handle(request, response);
})
router.get('/plan', (request, response) => {
    return listPlanController.handle(request, response);
})
router.post('/create/price', (request, response) => {
    return createPriceController.handle(request, response);
})
router.get('/price', (request, response) => {
    return listPriceController.handle(request, response);
})
router.get('/price/:from/:to', (request, response) => {
    return searchPriceController.handle(request, response);
})
router.post('/calculate/charge', (request, response) => {
    return calculatePriceController.handle(request, response);
})
export { router }