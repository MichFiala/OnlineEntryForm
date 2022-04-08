import { Gender } from "./gender";
import { Nationality } from "./nationality";

export class FormValues {
     firstName: string = '';
     lastName: string = '';
     personalIdentificationNumber: string = '';
     birthDate: Date = new Date();
     gender: Gender = 0;
     email: string = '';
     nationality: Nationality = 0;
     agreementGDPR: boolean = false;
}