"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/webp') {
        cb(null, true);
    }
    else {
        cb(new Error('Only jpg, jpeg, png, and webp images are allowed'));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
    },
    fileFilter,
});
//# sourceMappingURL=uploadMiddleware.js.map