import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContract } from 'src/app/models/servicecontract.model';
import { ServicecontractService } from 'src/app/services/servicecontract.service';
import { contract } from '../modal';
import moment, { invalid } from 'moment';
import { formatCurrency } from '@angular/common';
declare let DocxReader: any;

@Component({
  selector: 'app-flatiron-contract',
  templateUrl: './flatiron-contract.component.html',
  styleUrls: ['./flatiron-contract.component.scss']
})
export class FlatironContractComponent implements OnInit {
  selectedAggrementStatus: any = null;
  formData = new contract()
  dataProperty: any[] = [];
  menuData: any[] = [];
  Region: any[] = [];
  Market: any[] = [];
  Property: any[] = [];
  marketHeadArr: any[] = [];
  step = 0

  constructor(
    public serviceContract: ServicecontractService,

  ) { }

  ngOnInit(): void {

  }
  AgreementStatusArr: any[] = [];
  onSelection(value){
    if(value == "Encumbered"){
      this.formData.fiOwners = null;
      this.formData.addressRepeating = [];
      this.AgreementStatusArr = this.formData.flatironOwners.filter(item => item.AgreementStatus == "Encumbered")
    }else if(value == "Unencumbered"){
      this.formData.fiOwners = null;
      this.formData.addressRepeating = [];
      this.AgreementStatusArr = this.formData.flatironOwners.filter(item => item.AgreementStatus == "Unencumbered")
    }
  }
  flatironOwnerSelection(value) {
    debugger
    console.log(this.formData.fiOwnersConsulting);
    this.formData.addressRepeating = [];
    for (var i = 0; i < value.value.length; i++) {
      this.formData.addressRepeating.push({
        Address: '',
        Name: value.value[i].Owner,
        ID: value.value[i].EntityID,
        ownerSOF: value.value[i].StateOfFormation,
      });
    }
  }
  getData() {
    debugger
    this.serviceContract.getAllProperty().then((res) => {
      this.dataProperty = res['d'].results as any[];
      for (var count = 0; count < this.dataProperty.length; count++) {
        var order = this.dataProperty[count];
        // console.log(order);
          var lines = (order.FREDDPropertyName.results[0].Label).split(':'); //{rod/Staging
        // var lines = order.Fredd_x0020_Property_x0020_Name_.split(':'); //Local
        // Prod/Staging
              this.menuData.push({
             "Property": lines[3],
             "ID": order.ID,
             "Region": lines[1],
             "Market": lines[2],
             "Owner": order.EntityName,
             "StateOfFormation": order.StateofFormation,
             "AdditionalInsureds": order.AdditionalInsureds,
             "EntityID": order.EntityID,
             "AgreementStatus": order.Status
             });
        // local
          // this.menuData.push({
            // Property: lines[3],
            // ID: order.ID,
            // Region: lines[1],
            // Market: lines[2],
            // Owner: order.EntityName,
            // StateOfFormation: order.StateofFormation,
            // AdditionalInsureds: order.AdditionalInsureds,
            // EntityID: order.EntityID,
            // AgreementStatus: order.AgreementStatus
          // });
      }
      this.Region = [
        ...new Map(
          this.menuData.map((item) => [item['Region'], item])
        ).values(),
      ];
      this.Region = this.Region.sort((a, b) => (a.Region > b.Region ? 1 : -1));
      this.Market = [
        ...new Map(
          this.menuData.map((item) => [item['Market'], item])
        ).values(),
      ];
      this.Market = this.Market.sort((a, b) => (a.Market > b.Market ? 1 : -1));
      this.marketHeadArr = [
        ...new Map(
          this.menuData.map((item) => [item['Market'], item])
        ).values(),
      ]
      this.marketHeadArr = this.marketHeadArr.sort((a, b) => (a.Market > b.Market ? 1 : -1));

      this.Property = [
        ...new Map(
          this.menuData.map((item) => [item['Property'], item])
        ).values(),
      ];
      this.Property = this.Property.sort((a, b) =>
        a.Property > b.Property ? 1 : -1
      );
      console.log(this.Region);
      this.formData.flatironOwners = this.Property.filter((a) => {
        return a.Market === 'Colorado';
      });
     
     
    });
  }
  ngAfterViewInit(): void {
    this.getData();
  }
  resetStates(servicecontract: NgForm) {
    if (servicecontract != undefined) {
      // Consulting Services
      this.formData.selectedStreetAddress = '';
      this.formData.selectedEmergencyCompensation = '';
      this.formData.selectedContractAmount = '';
      this.formData.selectedMonthlyCompensation = '';
      this.formData.selectedYearlyCompensation = '';
      this.formData.selectedReimbursableExpenses = '';
      this.formData.selectedPayment = '';
      this.formData.selectedCovid = '';
      this.formData.selectedPollutionLiability = null;
      // xxxx----xxx
      this.formData.selectedPropertyAddress = '';
      this.formData.selectedPropertyManager = 'BioMed Realty LLC';
      this.formData.selectedContractor = '';
      this.formData.selectedContractorStateOfFormation = '';
      this.formData.selectedContractorAddress = '';
      this.formData.selectedContractorCity = '';
      this.formData.selectedContractorZip = '';
      this.formData.selectedContractorState = '';
      this.formData.selectedContractorAttn = '';
      this.formData.selectedContractorEmail = '';
      this.formData.selectedExecutionDate = '';
      this.formData.selectedExpirationDate = '';
      this.formData.selectedCommencementDate = '';
      this.formData.selectedIncludeTM = null;
      this.formData.addressRepeating = [];




      // if (this.selectedForm.Title != 'Consulting Services Agreement') {
      //   this.ConsultingServiceTemp = '';
      // }
    }
  }
  invalidateFields() {
    if (this.formData.selectedOwner === null) return true;
    if (this.formData.selectedPropertyAddress === null) return true;
    if (this.formData.selectedPropertyManager === null) return true;
    if (this.formData.selectedContractor === null) return true;
    if (this.formData.selectedContractorStateOfFormation === null) return true;
    if (this.formData.selectedContractorAddress === null) return true;
    if (this.formData.selectedContractorCity === null) return true;
    if (this.formData.selectedContractorState === null) return true;
    if (this.formData.selectedContractorZip === null) return true;
    if (this.formData.selectedExecutionDate === null) return true;
    if (this.formData.selectedCommencementDate === null) return true;
    if (this.formData.selectedExpirationDate === null) return true;
    if (this.formData.addressRepeating === [] || this.formData.addressRepeating === null)
      return true;
    for (var k = 0; k < this.formData.addressRepeating.length; k++) {
      if (
        this.formData.addressRepeating[k].Address === '' ||
        this.formData.addressRepeating[k].Address === null
      ) {
        {
          return true;
        }
      }
    }

    return false;
  }
  onSave() {
        // var steUrl = '/sites/fredd/SourceCode1/ChangeOrder/assets/template/FlatironServiceContractTemplate.docx'; //prod
         var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/FlatironServiceContractTemplate.docx'; //Staging Tset

    //  steUrl = "/sites/fredd/SourceCode/assets/template/FlatironServiceContractTemplate.docx"; //Staging
    //  var steUrl = '/assets/template/FlatironServiceContractTemplate.docx'; //local
    var docx = new DocxReader();
    docx.Load(steUrl, () => {
      var docxvar = {};
      var docName = 'SC';
      if (docx.Search('City') == true) {
        docxvar['City'] = this.formData.selectedContractorCity;
      }
      if (docx.Search('State') == true) {
        docxvar['State'] = this.formData.selectedContractorState.Title;
      }
      if (docx.Search('ZipCode') == true) {
        docxvar['ZipCode'] = this.formData.selectedContractorZip;
      }
      if (docx.Search('ContractorName') == true) {
        docxvar['ContractorName'] = this.formData.selectedContractor;
      }
      if (docx.Search('PropertyManager') == true) {
        if (
          this.formData.selectedPropertyManager == '' ||
          this.formData.selectedPropertyManager == undefined
        ) {
          docxvar['PropertyManager'] = 'BioMed Realty LLC';
        } else {
          docxvar['PropertyManager'] = this.formData.selectedPropertyManager;
        }
      }
      if (docx.Search('ContractorStreetAddress') == true) {
        docxvar['ContractorStreetAddress'] = this.formData.selectedContractorAddress;
      }
      if (docx.Search('ContractorAttn') == true) {
        if (
          this.formData.selectedContractorAttn == '' ||
          this.formData.selectedContractorAttn == undefined
        ) {
          docxvar['ContractorAttn'] = '\n';
        } else {
          docxvar['ContractorAttn'] = 'Attn: ' + this.formData.selectedContractorAttn;
        }
      }
      if (docx.Search('ContractorEmail') == true) {
        if (
          this.formData.selectedContractorEmail == '' ||
          this.formData.selectedContractorEmail == undefined
        ) {
          docxvar['ContractorEmail'] = '\n';
        } else {
          docxvar['ContractorEmail'] = 'Email: ' + this.formData.selectedContractorEmail;
        }
      }
      if (docx.Search('ExecutionDate') == true) {
        docxvar['ExecutionDate'] = moment(this.formData.selectedExecutionDate).format(
          'MM/DD/YYYY'
        );
      }
      if (docx.Search('CommencementDate') == true) {
        docxvar['CommencementDate'] = moment(
          this.formData.selectedCommencementDate
        ).format('MM/DD/YYYY');
      }
      if (docx.Search('ExpirationDate') == true) {
        var date = new Date(this.formData.selectedCommencementDate);
        docxvar['ExpirationDate'] = moment(this.formData.selectedExpirationDate).format(
          'MM/DD/YYYY'
        );
      }
      if (docx.Search('PropertyAddress') == true) {
        docxvar['PropertyAddress'] = this.formData.selectedPropertyAddress;
      }
      if (docx.Search('PropertyManager') == true) {
        if (
          this.formData.selectedPropertyManager == '' ||
          this.formData.selectedPropertyManager == undefined
        ) {
          docxvar['PropertyManager'] = 'BioMed Realty LLC';
        } else {
          docxvar['PropertyManager'] = this.formData.selectedPropertyManager;
        }
      }

      if (docx.Search('ContractorStateOfFormation') == true) {
        docxvar['ContractorStateOfFormation'] =
          this.formData.selectedContractorStateOfFormation;
      }
      if (this.formData.selectedIncludeTM == true) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☑';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☐';
        }
      }
      if (this.formData.selectedIncludeTM == false) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☐';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☑';
        }
      }
      if (this.formData.selectedIncludeTM == undefined) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☐';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☑';
        }
      }
      //FLATIRON SERVICE CONTRACT
      for (var j = 0; j < 8; j++) {
        docxvar['OwnersSelected' + j] = '';
        docxvar['OwnersSelected' + this.formData.addressRepeating.length] = '';
        docxvar['OwnersSelected8'] = ''; //for state of formation when all owners selected
        docxvar['OwnersSelectedT' + j] = '';
        docxvar['PropertyAddress' + j] = '';
      }
      for (var i = 0; i < this.formData.addressRepeating.length; i++) {
        if (docx.Search('OwnersSelected' + i) == true) {
          if (this.formData.addressRepeating[i].Name == undefined) {
            docxvar['OwnersSelected' + i] = '';
          } else {
            if (i != this.formData.addressRepeating.length - 1) {
              docxvar['OwnersSelected' + i] =
                this.formData.addressRepeating[i].Name + ', ';
            } else {
              docxvar['OwnersSelected' + i] = this.formData.addressRepeating[i].Name;
              if (this.formData.addressRepeating.length > 1) {
                //Owner State of Formation
                docxvar['OwnersSelected' + this.formData.addressRepeating.length] =
                  'each, a ' + this.formData.addressRepeating[0].ownerSOF;
              } else {
                docxvar['OwnersSelected' + this.formData.addressRepeating.length] =
                  'a ' + this.formData.addressRepeating[0].ownerSOF;
              }
            }
          }
        }
        if (docx.Search('OwnersSelectedT' + i) == true) {
          if (this.formData.addressRepeating[i].Name == undefined) {
            docxvar['OwnersSelectedT' + i] = '';
          } else {
            docxvar['OwnersSelectedT' + i] = this.formData.addressRepeating[i].Name;
          }
        }
        if (docx.Search('PropertyAddress' + i) == true) {
          if (this.formData.addressRepeating[i].Name == undefined) {
            docxvar['PropertyAddress' + i] = '';
          } else {
            docxvar['PropertyAddress' + i] = this.formData.addressRepeating[i].Address;
          }
        }

      }

      docx.docxtemplater.setData(docxvar);
      try {
        docx.docxtemplater.render();
      } catch (error) {
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({ error: e }));
        throw error;
      }
      docx.SetName(docName + '' + ' - ' + this.formData.selectedContractor);
      docx.Download();
    });
  }



}
