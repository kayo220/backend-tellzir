import { Response, Request } from 'express'
import ViewPrice from '../../views/ViewPrice'
import { CreatePriceUseCase } from './CreatePriceUseCase'


export class CreatePriceController {
    constructor(private createPriceUseCase: CreatePriceUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { from, to, charge } = request.body
        try {
            const plan = await this.createPriceUseCase.execute({
                from,
                to,
                charge
            })
            console.log(plan);
            return response.status(201).json(ViewPrice.render(plan));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}