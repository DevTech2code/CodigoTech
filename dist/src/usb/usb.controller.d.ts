import { UsbService } from './usb.service';
import { CreateUsbDto } from './dto/create-usb.dto';
import { UpdateUsbDto } from './dto/update-usb.dto';
export declare class UsbController {
    private readonly usbService;
    constructor(usbService: UsbService);
    create(createUsbDto: CreateUsbDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        capacityGb: number | null;
        color: string | null;
        usageDate: Date | null;
        speed: string | null;
        usbType: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        capacityGb: number | null;
        color: string | null;
        usageDate: Date | null;
        speed: string | null;
        usbType: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        capacityGb: number | null;
        color: string | null;
        usageDate: Date | null;
        speed: string | null;
        usbType: string | null;
    }>;
    update(id: number, updateUsbDto: UpdateUsbDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        capacityGb: number | null;
        color: string | null;
        usageDate: Date | null;
        speed: string | null;
        usbType: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        model: string;
        purchaseDate: Date | null;
        notes: string | null;
        capacityGb: number | null;
        color: string | null;
        usageDate: Date | null;
        speed: string | null;
        usbType: string | null;
    }>;
}
