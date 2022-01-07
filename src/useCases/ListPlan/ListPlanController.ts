import { Response, Request } from 'express'
import ViewPlan from '../../views/ViewPlan'
import { ListPlanUseCase } from './ListPlanUseCase';


export class ListPlanController {
    constructor(private listPlanUseCase: ListPlanUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const plans = await this.listPlanUseCase.execute()
            console.log(plans);
            return response.status(200).json(ViewPlan.renderMany(plans));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}