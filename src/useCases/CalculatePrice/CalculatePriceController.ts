import { Response, Request } from 'express'
import { CalculatePriceUseCase } from './CalculatePriceUseCase'


export class CalculatePriceController {
    constructor(private calculatePriceUseCase: CalculatePriceUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { from, to, plan, duration } = request.body
        try {
            const calculatedPrice = await this.calculatePriceUseCase.execute({ from, to, plan, duration })
            return response.status(200).json(calculatedPrice);
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Undefined error'
            })
        }
    }
}