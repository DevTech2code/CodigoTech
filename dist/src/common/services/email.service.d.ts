interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}
export declare class EmailService {
    private transporter;
    constructor();
    sendEmail(options: EmailOptions): Promise<void>;
    sendNewRequestNotificationToHR(requestData: any, requesterName: string, requestCode: string): Promise<void>;
    sendApprovedRequestNotificationToAdmin(requestData: any, requesterName: string, requestCode: string, hrReviewerName?: string): Promise<void>;
    private generateNewRequestEmailTemplate;
    private generateNewEmployeeDetails;
    private generateEquipmentRequestDetails;
    private generateConsumablesDetails;
    private generateEquipmentReplacementDetails;
    private generateApprovedRequestEmailTemplate;
}
export {};
