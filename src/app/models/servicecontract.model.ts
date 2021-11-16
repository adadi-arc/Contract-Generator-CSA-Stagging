import { NgIf } from "@angular/common";

export class ServiceContract{
    ID: number = 0;
    Title: string = null;
    Owner: string = null;
    OwnerCopyTo: string=null;
    OwnerStateOfFormation: string=null;
    AdditionalInsureds: string=null;
    Contractor: string=null;
    ContractorAddress: string=null;
    ContractorCity: string=null;
    ContractorState: string=null;
    ContractorZip: string=null;
    ContractorAttn: string=null;
    ContractorEmail: string=null;
    ContractorStateOfFormation: string=null;
    ExecutionDate: Date=null;
    CommencementDate: Date=null;
    ExpirationDate: Date=null;
    PropertyAddress: string=null;
    PropertyManager: string=null;
    IncludeTM: boolean=false;
    Section8_2: string=null;
    Section19: string=null;
}