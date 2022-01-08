import { v4 } from 'uuid'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('plans')
export class Plan {
    @PrimaryColumn()
    public readonly id?: string;

    @Column()
    public name: string;

    @Column()
    public free_time_limit: number;


    constructor(props: Omit<Plan, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!this.id) {
            this.id = v4();
        }
    }

}