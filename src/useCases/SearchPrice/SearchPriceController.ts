import { Response, Request } from 'express'
import ViewPrice from '../../views/ViewPrice'
import { SearchPriceUseCase } from './SearchPriceUseCase';


export class SearchPriceController {
    constructor(private searchPriceUseCase: SearchPriceUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { from, to } = request.params;
            const price = await this.searchPriceUseCase.execute({ from, to })
            if (!price) {
                throw new Error("Price not found for given DDDs")
            }
            return response.status(200).json(ViewPrice.render(price));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}