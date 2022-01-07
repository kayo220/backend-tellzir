import { v4 } from 'uuid'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('ddds')
export class DDD {
    @PrimaryColumn()
    public readonly id?: string;

    @Column()
    public code: string;

    constructor(props: Omit<DDD, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!this.id) {
            this.id = v4();
        }
    }

}