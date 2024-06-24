import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Proudct extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Proudct;