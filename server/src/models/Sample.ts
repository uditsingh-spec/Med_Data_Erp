import mongoose, { Document, Schema } from 'mongoose';

export interface ISample extends Document {
  babyId: mongoose.Types.ObjectId;
  weight?: number;
  jm103_s?: number;
  tsb?: number;
  mbj20_f?: number;
  mbj20_s?: number;
  f1_d4_f?: number; f2_d4_f?: number; f3_d4_f?: number; f4_d4_f?: number; f5_d4_f?: number; f6_d4_f?: number; f7_d4_f?: number; f8_d4_f?: number; f9_d4_f?: number; f10_d4_f?: number;
  f1_d4_s?: number; f2_d4_s?: number; f3_d4_s?: number; f4_d4_s?: number; f5_d4_s?: number; f6_d4_s?: number; f7_d4_s?: number; f8_d4_s?: number; f9_d4_s?: number; f10_d4_s?: number;
  f1_d6_f?: number; f2_d6_f?: number; f3_d6_f?: number; f4_d6_f?: number; f5_d6_f?: number; f6_d6_f?: number; f7_d6_f?: number; f8_d6_f?: number; f9_d6_f?: number; f10_d6_f?: number;
  f1_d6_s?: number; f2_d6_s?: number; f3_d6_s?: number; f4_d6_s?: number; f5_d6_s?: number; f6_d6_s?: number; f7_d6_s?: number; f8_d6_s?: number; f9_d6_s?: number; f10_d6_s?: number;
  remarks?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const sampleSchema = new Schema<ISample>(
  {
    babyId: { type: Schema.Types.ObjectId, ref: 'Baby', required: true },
    weight: { type: Number },
    tsb: { type: Number },
    jm103_s: { type: Number },
    mbj20_f: { type: Number },
    mbj20_s: { type: Number },
    f1_d4_f: { type: Number }, f2_d4_f: { type: Number }, f3_d4_f: { type: Number }, f4_d4_f: { type: Number }, f5_d4_f: { type: Number }, f6_d4_f: { type: Number }, f7_d4_f: { type: Number }, f8_d4_f: { type: Number }, f9_d4_f: { type: Number }, f10_d4_f: { type: Number },
    f1_d4_s: { type: Number }, f2_d4_s: { type: Number }, f3_d4_s: { type: Number }, f4_d4_s: { type: Number }, f5_d4_s: { type: Number }, f6_d4_s: { type: Number }, f7_d4_s: { type: Number }, f8_d4_s: { type: Number }, f9_d4_s: { type: Number }, f10_d4_s: { type: Number },
    f1_d6_f: { type: Number }, f2_d6_f: { type: Number }, f3_d6_f: { type: Number }, f4_d6_f: { type: Number }, f5_d6_f: { type: Number }, f6_d6_f: { type: Number }, f7_d6_f: { type: Number }, f8_d6_f: { type: Number }, f9_d6_f: { type: Number }, f10_d6_f: { type: Number },
    f1_d6_s: { type: Number }, f2_d6_s: { type: Number }, f3_d6_s: { type: Number }, f4_d6_s: { type: Number }, f5_d6_s: { type: Number }, f6_d6_s: { type: Number }, f7_d6_s: { type: Number }, f8_d6_s: { type: Number }, f9_d6_s: { type: Number }, f10_d6_s: { type: Number },
    remarks: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },

  { timestamps: true }
);

sampleSchema.index({ babyId: 1, createdAt: -1 });

const Sample = mongoose.model<ISample>('Sample', sampleSchema);
export default Sample;
