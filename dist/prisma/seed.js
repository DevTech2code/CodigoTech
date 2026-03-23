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
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed de base de datos...');
    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: { name: 'Admin', description: 'Administrador del sistema' },
    });
    const usuarioRole = await prisma.role.upsert({
        where: { name: 'Usuario' },
        update: {},
        create: { name: 'Usuario', description: 'Usuario estándar' },
    });
    const rrhhRole = await prisma.role.upsert({
        where: { name: 'Recursos Humanos' },
        update: {},
        create: { name: 'Recursos Humanos', description: 'Recursos Humanos' },
    });
    console.log('✅ Roles creados');
    const itDept = await prisma.department.upsert({
        where: { id: 1 },
        update: {},
        create: { name: 'T.I.', description: 'Departamento de Tecnología' },
    });
    const rrhhDept = await prisma.department.upsert({
        where: { id: 2 },
        update: {},
        create: { name: 'Recursos Humanos', description: 'Departamento de Recursos Humanos' },
    });
    const importDept = await prisma.department.upsert({
        where: { id: 3 },
        update: {},
        create: { name: 'Importaciones', description: 'Departamento de Importaciones' },
    });
    console.log('✅ Departamentos creados');
    const branches = [
        { name: 'Matriz Quito', address: 'Isla Fernandina N42-129 y Tomás de Berlanga, Quito', region: 'Sierra' },
        { name: 'Quito Sur (Express)', address: 'Sector Solanda, Av. Ajaví OE-3179 y Pedro Vásquez, Quito', region: 'Sierra' },
        { name: 'Carapungo (Express)', address: 'Edificio Gualoto, Panamericana Norte, Quito', region: 'Sierra' },
        { name: 'Sangolquí (Express)', address: 'Av. Panamericana y Atuntaqui, Sangolquí', region: 'Sierra' },
        { name: 'Ambato', address: 'Av. Los Shyris y Quinga Lumba 1788, a 50m de CNT, Ambato', region: 'Sierra' },
        { name: 'Ibarra', address: 'Luis Jaramillo Pérez 206 y Alfonso Almeida, Ibarra', region: 'Sierra' },
        { name: 'Cuenca', address: 'Av. 12 de Abril entre San Salvador y Floreana, Cuenca', region: 'Sierra' },
        { name: 'Loja', address: 'Av. Manuel Benjamín Carrión y Antonio Neumane, Loja', region: 'Sierra' },
        { name: 'Guayaquil', address: 'Av. Víctor Emilio Estrada 814, entre Higuera – Guayacanes, Guayaquil', region: 'Costa' },
        { name: 'Manta', address: 'Av. Ascario Paz y Av. Flavio Reyes, diagonal al Restaurante Palmeiras, Manta', region: 'Costa' },
        { name: 'Portoviejo (Express)', address: 'Plaza Alameda, Av. Manabí frente al C.C. La Quadra, Portoviejo', region: 'Costa' },
        { name: 'Machala', address: 'Av. 11ª Norte entre Buenavista y Napoleón Mera, Machala', region: 'Costa' },
        { name: 'Santo Domingo', address: 'Calle Guayaquil, entre Calle Cocaniguas y Santo Domingo', region: 'Costa' },
    ];
    for (const branch of branches) {
        await prisma.branch.upsert({
            where: { id: branches.indexOf(branch) + 1 },
            update: branch,
            create: branch,
        });
    }
    console.log('✅ Sucursales creadas');
    const adminPerson = await prisma.person.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            nationalId: '1234567890',
            firstName: 'Admin',
            lastName: 'Sistema',
            username: 'admin',
            password: await bcrypt.hash('admin123', 10),
            status: 'active',
            roleId: adminRole.id,
            departmentId: itDept.id,
            branchId: 1,
        },
    });
    const rrhhPerson = await prisma.person.upsert({
        where: { username: 'rrhh' },
        update: {},
        create: {
            nationalId: '0987654321',
            firstName: 'Recursos',
            lastName: 'Humanos',
            username: 'rrhh',
            password: await bcrypt.hash('rrhh123', 10),
            status: 'active',
            roleId: rrhhRole.id,
            departmentId: rrhhDept.id,
            branchId: 1,
        },
    });
    const userPerson = await prisma.person.upsert({
        where: { username: 'usuario' },
        update: {},
        create: {
            nationalId: '1122334455',
            firstName: 'Juan',
            lastName: 'Pérez',
            username: 'usuario',
            password: await bcrypt.hash('usuario123', 10),
            status: 'active',
            roleId: usuarioRole.id,
            departmentId: itDept.id,
            branchId: 1,
        },
    });
    console.log('✅ Personas creadas');
    const assetsData = [
        { assetCode: 'LAPTOP-001', assetType: 'Laptop', brand: 'Dell', model: 'XPS 15', serialNumber: 'SN001', status: 'assigned', assignedPersonId: userPerson.id, branchId: 1, purchaseDate: new Date('2023-01-15') },
        { assetCode: 'LAPTOP-002', assetType: 'Laptop', brand: 'HP', model: 'ProBook 450', serialNumber: 'SN002', status: 'available', branchId: 1, purchaseDate: new Date('2023-02-20') },
        { assetCode: 'MONITOR-001', assetType: 'Monitor', brand: 'LG', model: '27UK850', serialNumber: 'SN003', status: 'available', branchId: 1, purchaseDate: new Date('2023-03-10') },
        { assetCode: 'PHONE-001', assetType: 'Teléfono', brand: 'Samsung', model: 'Galaxy S20', serialNumber: 'SN004', status: 'assigned', assignedPersonId: rrhhPerson.id, branchId: 1, purchaseDate: new Date('2023-04-05') },
        { assetCode: 'KEYBOARD-001', assetType: 'Teclado', brand: 'Logitech', model: 'MX Keys', serialNumber: 'SN005', status: 'available', branchId: 1, purchaseDate: new Date('2023-05-12') },
    ];
    for (const asset of assetsData) {
        await prisma.asset.upsert({
            where: { assetCode: asset.assetCode },
            update: { status: asset.status },
            create: asset,
        });
    }
    console.log('✅ Activos creados');
    const asset1 = await prisma.asset.findUnique({ where: { assetCode: 'LAPTOP-001' } });
    if (asset1) {
        await prisma.assignmentHistory.upsert({
            where: { id: 1 },
            update: {},
            create: {
                assetId: asset1.id,
                personId: userPerson.id,
                branchId: 1,
                assignmentDate: new Date('2023-01-15'),
                deliveryCondition: 'good',
                deliveryNotes: 'Equipo entregado en perfecto estado',
            },
        });
    }
    console.log('✅ Historial de asignaciones creado');
    await prisma.credential.upsert({
        where: { id: 1 },
        update: {},
        create: {
            personId: adminPerson.id,
            username: 'admin',
            password: 'admin123',
            system: 'erp',
            notes: 'Credenciales de administrador para ERP',
        },
    });
    console.log('✅ Credenciales creadas');
    console.log('🎉 Seed completado exitosamente!');
}
main()
    .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map