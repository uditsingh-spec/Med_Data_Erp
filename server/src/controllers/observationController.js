"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllObservations = void 0;
const DailyObservation_1 = __importDefault(require("../models/DailyObservation"));
const getAllObservations = async (req, res, next) => {
    try {
        const observations = await DailyObservation_1.default.find()
            .populate('babyId', 'displayId motherName registeredAt')
            .populate('sampleId', 'weight')
            .populate('recordedBy', 'name employeeId')
            .sort({ createdAt: -1 })
            .lean();
        // Map to flatten baby data for the table
        const formatted = observations.map(obs => ({
            ...obs,
            babyId: undefined, // omit original ref
            actualBabyId: obs.babyId?._id,
            displayId: obs.babyId?.displayId || 'Unknown',
            motherName: obs.babyId?.motherName || 'Unknown',
            weight: obs.sampleId?.weight,
        }));
        res.json(formatted);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllObservations = getAllObservations;
//# sourceMappingURL=observationController.js.map