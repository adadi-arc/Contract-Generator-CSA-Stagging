import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { SpService } from './base/sp.service';
@Injectable({
  providedIn: 'root'
})
export class ServicecontractService {

  readonly listNameGeneral: string = "General Information";
  readonly listNameProperty: string = "Property Related Information";
  readonly listNameMaster: string = "Master List";
  constructor(private sp: SpService) { 
  }

  async getAllGeneral(){
    var queryGen = {
      select: "ID, Title, LandlordOwnershipEntity, Market",
      orderby: "Title asc",
      top: "5000"
    }

    return await this.sp.readItems(this.listNameGeneral, queryGen);
  }

  async getAllProperty(){
    var queryProperty = {
      // select: "ID, Title, EntityID, FREDDPropertyName, EntityName, AdditionalInsureds,StateofFormation, Fredd_x0020_Property_x0020_Name_, TaxCatchAll/Term,TaxCatchAll/IdForTerm,TaxCatchAll/Title,TaxCatchAll/IdForTermStore,TaxCatchAll/IdForTermSet", //prod
      select: "ID, Title, EntityID, FREDDPropertyName, EntityName, AdditionalInsureds, StateofFormation, Fredd_x0020_Property_x0020_Name_", //local/staging
      // expand: "TaxCatchAll", //prod
      orderby: "EntityID asc",
      top: "5000"
    }
    return await this.sp.readItems(this.listNameProperty, queryProperty);
  }
  async getAllMaster(){
    var queryMaster = {
      // select: "ID, Title, Building_x0020_ID, Building_x0020_Property_x0020_Ma/Title, Building_x0020_Property_x0020_Ma/ID", //prod
      select: "ID, Title, Building_x0020_ID", //local
      // expand: "Building_x0020_Property_x0020_Ma", //prod
      orderby: "Building_x0020_ID asc",
      top: "5000"
    }
    return await this.sp.readItems(this.listNameMaster, queryMaster);
  }
  
}

