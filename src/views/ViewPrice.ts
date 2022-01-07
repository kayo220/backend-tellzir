import { Price } from "../entities/Price";

export default {
    render(price: Price) {
        return {
            id: price.id,
            from: price.from.code,
            to: price.to.code,
            charge: price.charge
        };
    },

    renderMany(price: Price[]) {
        return price.map(element => this.render(element))
    }
};