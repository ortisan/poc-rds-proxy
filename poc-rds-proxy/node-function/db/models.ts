import { DataTypes, Model, Optional } from 'sequelize';
import { UserDomain } from '../domain/user';
import sequelizeConnection from './config';

export interface UserInput extends Optional<UserDomain, 'id'> {}
export interface UserOutput extends Required<UserDomain> {}

export class UserModel extends Model<UserDomain, UserInput> implements UserDomain {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: false,
        tableName: "users"
    },
);