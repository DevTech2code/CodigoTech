"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function bootstrap() {
    let httpsOptions = undefined;
    const keyPath = process.env.SSL_KEY_PATH;
    const certPath = process.env.SSL_CERT_PATH;
    if (keyPath && certPath) {
        try {
            httpsOptions = {
                key: fs_1.default.readFileSync(path_1.default.resolve(keyPath)),
                cert: fs_1.default.readFileSync(path_1.default.resolve(certPath)),
            };
        }
        catch (e) {
            console.warn('[main] Could not read SSL files, starting HTTP. Error:', e && e.message ? e.message : e);
        }
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.enableShutdownHooks();
    app.set('etag', false);
    app.enableCors({
        origin: [
            'http://192.168.50.95:8080',
            'http://localhost:8080',
            'http://localhost:5173',
            'https://asset-app-front.vercel.app',
            'https://asset-app-front-ew98.vercel.app'
        ],
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Asset Management API')
        .setDescription('API para gestionar activos, tarjetas SIM, credenciales, etc.')
        .setVersion('1.1')
        .addCookieAuth('jwt')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map