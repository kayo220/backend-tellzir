import { DDD } from "../entities/DDD";

export default {
    render(ddd: DDD) {
        return {
            id: ddd.id,
            code: ddd.code,
        };
    },

    renderMany(ddd: DDD[]) {
        return ddd.map(element => this.render(element))
    }
};