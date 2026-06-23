import mongoose, { Document } from 'mongoose';
export interface IBaby extends Document {
    displayId: string;
    motherName: string;
    motherImage?: string;
    motherAge: number;
    gender: 'Male' | 'Female';
    weight: number;
    gestationalAge: string;
    termStatus: 'Term' | 'Preterm';
    dob?: Date;
    isTwin: boolean;
    twinLabel?: 'A' | 'B' | '1' | '2' | null;
    registeredAt: Date;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Baby: mongoose.Model<IBaby, {}, {}, {}, mongoose.Document<unknown, {}, IBaby, {}, mongoose.DefaultSchemaOptions> & IBaby & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBaby>;
export default Baby;
//# sourceMappingURL=Baby.d.ts.map