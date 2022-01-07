import { Response, Request } from 'express'
import ViewPlan from '../../views/ViewPlan'
import { CreatePlanUseCase } from './CreatePlanUseCase'


export class CreatePlanController {
    constructor(private createPlanUseCase: CreatePlanUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, free_time_limit } = request.body

        try {
            const plan = await this.createPlanUseCase.execute({
                name,
                free_time_limit
            })
            console.log(plan);
            return response.status(201).json(ViewPlan.render(plan));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}