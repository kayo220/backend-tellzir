import { Response, Request } from 'express'
import ViewDDD from '../../views/ViewDDD'
import { ListDDDUseCase } from './ListDDDUseCase';


export class ListDDDController {
    constructor(private listDDDUseCase: ListDDDUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const ddds = await this.listDDDUseCase.execute()
            console.log(ddds);
            return response.status(200).json(ViewDDD.renderMany(ddds));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}