"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupPluginUseClient = void 0;
const path_1 = __importDefault(require("path"));
const isOutputChunk = (moduleChunk) => "code" in moduleChunk;
const filesToTransform = new Map();
const rollupPluginUseClient = ({ directive = "use client", } = {}) => ({
    name: "rollup-plugin-use-client",
    transform(code, id) {
        if (code.includes("use client")) {
            const file = path_1.default.parse(path_1.default.relative(`${process.cwd()}${path_1.default.sep}src`, id));
            filesToTransform.set(`${file.dir}${file.dir ? path_1.default.sep : ""}${file.name}`, code);
        }
    },
    generateBundle(_outputOptions, bundle) {
        const keys = Object.keys(bundle);
        for (const moduleId of keys) {
            const outputModule = bundle[moduleId];
            const file = path_1.default.parse(moduleId);
            if (isOutputChunk(outputModule) &&
                filesToTransform.has(`${file.dir}${file.dir ? path_1.default.sep : ""}${file.name}`)) {
                outputModule.code = `'${directive}';\n${outputModule.code}`;
            }
        }
    },
});
exports.rollupPluginUseClient = rollupPluginUseClient;
