"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const configSetup_1 = __importDefault(require("./config/configSetup"));
//const app = express();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({ origin: true }));
app.listen(configSetup_1.default.PORT, () => {
    console.log(`Server started on port ${configSetup_1.default.PORT}`);
});
