import { Plan } from "../entities/Plan";

export default {
    render(plan: Plan) {
        return {
            id: plan.id,
            name: plan.name,
            free_time_limit: plan.free_time_limit
        };
    },

    renderMany(plan: Plan[]) {
        return plan.map(element => this.render(element))
    }
};