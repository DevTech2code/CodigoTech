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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER || 'genericosistem2@gmail.com',
                pass: process.env.EMAIL_PASSWORD || '',
            },
        });
    }
    async sendEmail(options) {
        try {
            const mailOptions = {
                from: options.from || process.env.EMAIL_FROM || 'genericosistem2@gmail.com',
                to: options.to,
                subject: options.subject,
                html: options.html,
            };
            await this.transporter.sendMail(mailOptions);
            console.log(`✅ Email enviado a ${options.to}`);
        }
        catch (error) {
            console.error('❌ Error al enviar email:', error.message);
            throw error;
        }
    }
    async sendNewRequestNotificationToHR(requestData, requesterName, requestCode) {
        const hrEmail = process.env.HR_NOTIFICATION_EMAIL || 'genericosistem@gmail.com';
        const htmlContent = this.generateNewRequestEmailTemplate(requestCode, requesterName, requestData);
        await this.sendEmail({
            to: hrEmail,
            subject: `Nueva solicitud para Recursos Humanos - ${requestCode}`,
            html: htmlContent,
        });
    }
    async sendApprovedRequestNotificationToAdmin(requestData, requesterName, requestCode, hrReviewerName) {
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'software@recursos-tecnologicos.com';
        const htmlContent = this.generateApprovedRequestEmailTemplate(requestCode, requesterName, requestData, hrReviewerName);
        await this.sendEmail({
            to: adminEmail,
            subject: `Solicitud aprobada por Recursos Humanos - ${requestCode}`,
            html: htmlContent,
        });
    }
    generateNewRequestEmailTemplate(requestCode, requesterName, requestData) {
        const requestTypeMap = {
            equipment_replacement: 'Reemplazo de Equipo',
            consumables: 'Consumibles',
            equipment_request: 'Solicitud de Equipo',
            new_employee: 'Nuevo Empleado',
        };
        const requestType = requestTypeMap[requestData?.type] || requestData?.type || 'No especificado';
        const createdDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        let additionalInfo = '';
        if (requestData?.payload) {
            const payload = requestData.payload;
            additionalInfo = `
        <h3 style="color: #2c3e50; margin-top: 20px;">Detalles de la Solicitud:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      `;
            if (requestData.type === 'new_employee') {
                additionalInfo += this.generateNewEmployeeDetails(payload);
            }
            else if (requestData.type === 'equipment_request') {
                additionalInfo += this.generateEquipmentRequestDetails(payload);
            }
            else if (requestData.type === 'consumables') {
                additionalInfo += this.generateConsumablesDetails(payload);
            }
            else if (requestData.type === 'equipment_replacement') {
                additionalInfo += this.generateEquipmentReplacementDetails(payload);
            }
            additionalInfo += `</table>`;
        }
        return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .field {
            margin: 10px 0;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          .field:last-child {
            border-bottom: none;
          }
          .field-label {
            font-weight: 600;
            color: #2c3e50;
            display: inline-block;
            min-width: 150px;
          }
          .field-value {
            color: #555;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          table td:first-child {
            font-weight: 600;
            color: #2c3e50;
            width: 40%;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e0e0e0;
          }
          .action-required {
            background-color: #fff3cd;
            border-left-color: #ffc107;
            margin: 20px 0;
          }
          .priority-high {
            color: #d32f2f;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nueva solicitud para Recursos Humanos</h1>
          </div>
          
          <div class="content">
            <div class="action-required info-box">
              <strong style="color: #d32f2f;">⚠️ Acción Requerida</strong><br>
              Una nueva solicitud requiere su revisión y aprobación.
            </div>

            <h2 style="color: #2c3e50; margin-top: 0;">Información General</h2>
            <div class="info-box">
              <div class="field">
                <span class="field-label">Código de Solicitud:</span>
                <span class="field-value priority-high">${requestCode}</span>
              </div>
              <div class="field">
                <span class="field-label">Solicitante:</span>
                <span class="field-value">${requesterName}</span>
              </div>
              <div class="field">
                <span class="field-label">Tipo de Solicitud:</span>
                <span class="field-value">${requestType}</span>
              </div>
              <div class="field">
                <span class="field-label">Fecha de Solicitud:</span>
                <span class="field-value">${createdDate}</span>
              </div>
            </div>

            ${additionalInfo}

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Por favor, revise esta solicitud en el sistema de gestión de recursos humanos e indique si la aprueba, la rechaza o solicita más información.
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">
              Este es un correo automatizado generado por el Sistema de Gestión de Activos.
              <br>Por favor, no responda directamente a este correo.
            </p>
            <p style="margin: 10px 0 0 0; color: #999;">
              © 2025 Sistema de Gestión de Activos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    }
    generateNewEmployeeDetails(payload) {
        return `
      <tr><td>Nombre Completo:</td><td>${payload.firstName || ''} ${payload.lastName || ''}</td></tr>
      <tr><td>Cédula/ID:</td><td>${payload.nationalId || 'No especificado'}</td></tr>
      <tr><td>Teléfono:</td><td>${payload.phone || 'No especificado'}</td></tr>
      <tr><td>Posición:</td><td>${payload.position || 'No especificado'}</td></tr>
      <tr><td>Sucursal:</td><td>${payload.branchId || 'No especificado'}</td></tr>
      <tr><td>Departamento:</td><td>${payload.departmentId || 'No especificado'}</td></tr>
      ${payload.notes ? `<tr><td>Notas:</td><td>${payload.notes}</td></tr>` : ''}
    `;
    }
    generateEquipmentRequestDetails(payload) {
        return `
      <tr><td>Descripción:</td><td>${payload.description || 'No especificado'}</td></tr>
      <tr><td>Cantidad:</td><td>${payload.quantity || '1'}</td></tr>
      <tr><td>Prioridad:</td><td>${payload.priority || 'Normal'}</td></tr>
      ${payload.justification ? `<tr><td>Justificación:</td><td>${payload.justification}</td></tr>` : ''}
    `;
    }
    generateConsumablesDetails(payload) {
        return `
      <tr><td>Tipo de Consumible:</td><td>${payload.consumableType || 'No especificado'}</td></tr>
      <tr><td>Cantidad:</td><td>${payload.quantity || '1'}</td></tr>
      <tr><td>Descripción:</td><td>${payload.description || 'No especificado'}</td></tr>
      ${payload.notes ? `<tr><td>Notas:</td><td>${payload.notes}</td></tr>` : ''}
    `;
    }
    generateEquipmentReplacementDetails(payload) {
        return `
      <tr><td>Razón del Reemplazo:</td><td>${payload.reason || 'No especificado'}</td></tr>
      ${payload.notes ? `<tr><td>Notas:</td><td>${payload.notes}</td></tr>` : ''}
    `;
    }
    generateApprovedRequestEmailTemplate(requestCode, requesterName, requestData, hrReviewerName) {
        const requestTypeMap = {
            equipment_replacement: 'Reemplazo de Equipo',
            consumables: 'Consumibles',
            equipment_request: 'Solicitud de Equipo',
            new_employee: 'Nuevo Empleado',
        };
        const requestType = requestTypeMap[requestData?.type] || requestData?.type || 'No especificado';
        const approvedDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        let additionalInfo = '';
        if (requestData?.payload) {
            const payload = requestData.payload;
            additionalInfo = `
        <h3 style="color: #2c3e50; margin-top: 20px;">Detalles de la Solicitud:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      `;
            if (requestData.type === 'new_employee') {
                additionalInfo += this.generateNewEmployeeDetails(payload);
            }
            else if (requestData.type === 'equipment_request') {
                additionalInfo += this.generateEquipmentRequestDetails(payload);
            }
            else if (requestData.type === 'consumables') {
                additionalInfo += this.generateConsumablesDetails(payload);
            }
            else if (requestData.type === 'equipment_replacement') {
                additionalInfo += this.generateEquipmentReplacementDetails(payload);
            }
            additionalInfo += `</table>`;
        }
        return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .info-box {
            background-color: #f8f9fa;
            border-left: 4px solid #28a745;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
          }
          .field {
            margin: 10px 0;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          .field:last-child {
            border-bottom: none;
          }
          .field-label {
            font-weight: 600;
            color: #2c3e50;
            display: inline-block;
            min-width: 150px;
          }
          .field-value {
            color: #555;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          table td:first-child {
            font-weight: 600;
            color: #2c3e50;
            width: 40%;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e0e0e0;
          }
          .approved-badge {
            background-color: #d4edda;
            border-left-color: #28a745;
            margin: 20px 0;
          }
          .hr-approval {
            background-color: #e7f3ff;
            border-left: 4px solid #0066cc;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Solicitud Aprobada por Recursos Humanos</h1>
          </div>
          
          <div class="content">
            <div class="approved-badge info-box">
              <strong style="color: #28a745;">✓ SOLICITUD APROBADA</strong><br>
              Esta solicitud ha sido aprobada por Recursos Humanos y requiere su revisión.
            </div>

            <h2 style="color: #2c3e50; margin-top: 0;">Información General</h2>
            <div class="info-box">
              <div class="field">
                <span class="field-label">Código de Solicitud:</span>
                <span class="field-value" style="font-weight: 600; color: #28a745;">${requestCode}</span>
              </div>
              <div class="field">
                <span class="field-label">Solicitante:</span>
                <span class="field-value">${requesterName}</span>
              </div>
              <div class="field">
                <span class="field-label">Tipo de Solicitud:</span>
                <span class="field-value">${requestType}</span>
              </div>
              <div class="field">
                <span class="field-label">Fecha de Aprobación:</span>
                <span class="field-value">${approvedDate}</span>
              </div>
            </div>

            <div class="hr-approval">
              <strong style="color: #0066cc;">Aprobado previamente por Recursos Humanos</strong>
              ${hrReviewerName ? `<br><span style="color: #555;">Revisor: ${hrReviewerName}</span>` : ''}
            </div>

            ${additionalInfo}

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Por favor, revise esta solicitud y confirme la aprobación desde el equipo de Sistemas.
            </p>
          </div>

          <div class="footer">
            <p style="margin: 0;">
              Este es un correo automatizado generado por el Sistema de Gestión de Activos.
              <br>Por favor, no responda directamente a este correo.
            </p>
            <p style="margin: 10px 0 0 0; color: #999;">
              © 2025 Sistema de Gestión de Activos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map