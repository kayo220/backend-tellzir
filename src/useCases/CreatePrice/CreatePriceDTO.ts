interface DDD {
    id?: string,
    code: string
}
export interface CreatePriceDTO {
    from: DDD,
    to: DDD,
    charge: number,
}