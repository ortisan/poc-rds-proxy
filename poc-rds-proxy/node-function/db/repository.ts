import { UserInput, UserModel, UserOutput } from './models';

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const model = await UserModel.create(payload);
    return model;
};
