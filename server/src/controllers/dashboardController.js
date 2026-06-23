"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Baby_1 = __importDefault(require("../models/Baby"));
const Sample_1 = __importDefault(require("../models/Sample"));
const getDashboardStats = async (req, res, next) => {
    try {
        const [stats] = await Baby_1.default.aggregate([
            {
                $facet: {
                    totalBabies: [{ $count: 'count' }],
                    totalTwins: [
                        { $match: { isTwin: true } },
                        { $count: 'count' }
                    ],
                    maleBabies: [
                        { $match: { gender: 'Male' } },
                        { $count: 'count' }
                    ],
                    femaleBabies: [
                        { $match: { gender: 'Female' } },
                        { $count: 'count' }
                    ],
                }
            }
        ]);
        const totalBabies = stats.totalBabies[0]?.count || 0;
        const totalTwins = stats.totalTwins[0]?.count || 0;
        const maleBabies = stats.maleBabies[0]?.count || 0;
        const femaleBabies = stats.femaleBabies[0]?.count || 0;
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const totalSamplesToday = await Sample_1.default.countDocuments({
            createdAt: { $gte: startOfToday }
        });
        res.json({
            totalBabies,
            totalSamplesToday,
            totalTwins,
            maleBabies,
            femaleBabies,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboardController.js.map