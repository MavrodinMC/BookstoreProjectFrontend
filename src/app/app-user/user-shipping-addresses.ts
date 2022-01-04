export interface ShippingAddress {

    id?: number;
    fullName: string;
    address: string;
    phoneNumber: string;
    city: string;
    state: string;
    zipCode: string;
    default: boolean;
}