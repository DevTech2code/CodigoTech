"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaConfig = void 0;
exports.prismaConfig = {
    datasource: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL,
    },
};
exports.default = exports.prismaConfig;
//# sourceMappingURL=prisma.config.js.map