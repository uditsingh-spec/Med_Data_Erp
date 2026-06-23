"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const DailyObservationSchema = new mongoose_1.Schema({
    babyId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Baby', required: true },
    sampleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Sample', required: true },
    day: { type: Number, required: true },
    shift: { type: String, enum: ['M', 'E'], required: true },
    mbj20_f: { type: Number },
    mbj20_s: { type: Number },
    jm103_s: { type: Number },
    tsb: { type: Number },
    f1_d4_f: { type: Number }, f2_d4_f: { type: Number }, f3_d4_f: { type: Number }, f4_d4_f: { type: Number }, f5_d4_f: { type: Number }, f6_d4_f: { type: Number }, f7_d4_f: { type: Number }, f8_d4_f: { type: Number }, f9_d4_f: { type: Number }, f10_d4_f: { type: Number },
    f1_d4_s: { type: Number }, f2_d4_s: { type: Number }, f3_d4_s: { type: Number }, f4_d4_s: { type: Number }, f5_d4_s: { type: Number }, f6_d4_s: { type: Number }, f7_d4_s: { type: Number }, f8_d4_s: { type: Number }, f9_d4_s: { type: Number }, f10_d4_s: { type: Number },
    f1_d6_f: { type: Number }, f2_d6_f: { type: Number }, f3_d6_f: { type: Number }, f4_d6_f: { type: Number }, f5_d6_f: { type: Number }, f6_d6_f: { type: Number }, f7_d6_f: { type: Number }, f8_d6_f: { type: Number }, f9_d6_f: { type: Number }, f10_d6_f: { type: Number },
    f1_d6_s: { type: Number }, f2_d6_s: { type: Number }, f3_d6_s: { type: Number }, f4_d6_s: { type: Number }, f5_d6_s: { type: Number }, f6_d6_s: { type: Number }, f7_d6_s: { type: Number }, f8_d6_s: { type: Number }, f9_d6_s: { type: Number }, f10_d6_s: { type: Number },
    recordedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    recordedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('DailyObservation', DailyObservationSchema, 'dailyObservations_v4');
//# sourceMappingURL=DailyObservation.js.map