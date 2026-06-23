"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDisplayId = void 0;
const Baby_1 = __importDefault(require("../models/Baby"));
const generateDisplayId = async (motherName, weight, gender, gestationalAge) => {
    // Take first name only, Uppercase, Remove spaces
    const firstName = motherName.trim().split(' ')[0].toUpperCase();
    const genderInitial = gender === 'Male' ? 'M' : 'F';
    // Remove the dash from gestational age for the ID (e.g., 36W-4D -> 36W4D)
    const cleanGestationalAge = gestationalAge.replace('-', '');
    let baseId = `${firstName}-${weight}-${genderInitial}${cleanGestationalAge}`;
    let displayId = baseId;
    let isUnique = false;
    while (!isUnique) {
        const existing = await Baby_1.default.findOne({ displayId });
        if (existing) {
            const random4Digits = Math.floor(1000 + Math.random() * 9000);
            displayId = `${baseId}-${random4Digits}`;
        }
        else {
            isUnique = true;
        }
    }
    return displayId;
};
exports.generateDisplayId = generateDisplayId;
//# sourceMappingURL=babyUtils.js.map