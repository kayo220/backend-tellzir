import { Response, Request } from 'express'
import ViewPrice from '../../views/ViewPrice'
import { ListPriceUseCase } from './ListPriceUseCase';


export class ListPriceController {
    constructor(private listPriceUseCase: ListPriceUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const prices = await this.listPriceUseCase.execute()
            return response.status(200).json(ViewPrice.renderMany(prices));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}