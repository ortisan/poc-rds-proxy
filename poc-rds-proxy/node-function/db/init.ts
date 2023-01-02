import { UserModel } from './models';

const dbInit = () => {
    UserModel.sync({ force: true });
};
export default dbInit;
