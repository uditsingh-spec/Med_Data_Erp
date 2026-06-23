import mongoose, { Document } from 'mongoose';
export interface IDailyObservation extends Document {
    babyId: mongoose.Types.ObjectId;
    sampleId: mongoose.Types.ObjectId;
    day: number;
    shift: 'M' | 'E';
    mbj20_f?: number;
    mbj20_s?: number;
    jm103_s?: number;
    tsb?: number;
    f1_d4_f?: number;
    f2_d4_f?: number;
    f3_d4_f?: number;
    f4_d4_f?: number;
    f5_d4_f?: number;
    f6_d4_f?: number;
    f7_d4_f?: number;
    f8_d4_f?: number;
    f9_d4_f?: number;
    f10_d4_f?: number;
    f1_d4_s?: number;
    f2_d4_s?: number;
    f3_d4_s?: number;
    f4_d4_s?: number;
    f5_d4_s?: number;
    f6_d4_s?: number;
    f7_d4_s?: number;
    f8_d4_s?: number;
    f9_d4_s?: number;
    f10_d4_s?: number;
    f1_d6_f?: number;
    f2_d6_f?: number;
    f3_d6_f?: number;
    f4_d6_f?: number;
    f5_d6_f?: number;
    f6_d6_f?: number;
    f7_d6_f?: number;
    f8_d6_f?: number;
    f9_d6_f?: number;
    f10_d6_f?: number;
    f1_d6_s?: number;
    f2_d6_s?: number;
    f3_d6_s?: number;
    f4_d6_s?: number;
    f5_d6_s?: number;
    f6_d6_s?: number;
    f7_d6_s?: number;
    f8_d6_s?: number;
    f9_d6_s?: number;
    f10_d6_s?: number;
    recordedBy: mongoose.Types.ObjectId;
    recordedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IDailyObservation, {}, {}, {}, mongoose.Document<unknown, {}, IDailyObservation, {}, mongoose.DefaultSchemaOptions> & IDailyObservation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IDailyObservation>;
export default _default;
//# sourceMappingURL=DailyObservation.d.ts.map