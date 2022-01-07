import { Response, Request } from 'express'
import ViewDDD from '../../views/ViewDDD'
import { CreateDDDUseCase } from './CreateDDDUseCase'


export class CreateDDDController {
    constructor(private createDDDUseCase: CreateDDDUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { code } = request.body
        try {
            const ddd = await this.createDDDUseCase.execute({ code })
            console.log(ddd);
            return response.status(201).json(ViewDDD.render(ddd));
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}