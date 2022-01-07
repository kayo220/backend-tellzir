import { v4 } from 'uuid'
import { DDD } from './DDD';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'

@Entity('prices')
export class Price {

    @PrimaryColumn()
    public readonly id: string;

    @OneToOne(() => DDD, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'from_ddd_id' })
    public from: DDD;

    @OneToOne(() => DDD, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'to_ddd_id' })
    public to: DDD;

    @Column()
    public charge: number;

    constructor(props: Omit<Price, 'id'>, id?: string) {
        Object.assign(this, props)
        if (!this.id) {
            console.log("Atribuição de ID")
            this.id = v4();
        }
    }

}