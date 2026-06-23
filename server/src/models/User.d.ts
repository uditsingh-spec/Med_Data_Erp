import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    employeeId: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    lastLogin?: Date;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=User.d.ts.map