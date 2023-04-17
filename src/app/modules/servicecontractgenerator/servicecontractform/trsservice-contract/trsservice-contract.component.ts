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
  selector: 'app-trsservice-contract',
  templateUrl: './trsservice-contract.component.html',
  styleUrls: ['./trsservice-contract.component.scss']
})
export class TRSServiceContractComponent implements OnInit {
  formData = new contract()
  dataProperty: any[] = [];
  menuData: any[] = [];
  Region: any[] = [];
  Market: any[] = [];
  Property: any[] = [];
  marketHeadArr: any[] = [];
  step = 0
  obj: ServiceContract;
  constructor(
    public serviceContract: ServicecontractService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    // super(route);
    // this.obj = new ServiceContract();
  }
  ngAfterViewInit(): void {
    this.getData();
  }
  ngOnInit(): void {

  }
  clearPM() {
    this.formData.selectedPropertyManager = null;
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
        if (order.EntityName == 'RE-BMR Campus at Towne Centre LP' || order.EntityName == 'BMR-Dexter LLC' || order.EntityName == 'BMR-201 Elliott Avenue LLC'
          || order.EntityName == 'BMR-Gateway Manager LP' || order.EntityName == 'BMR-Gateway of Pacific II LLC' || order.EntityName == 'BMR-Pacific Research Center LP'
          || order.EntityName == 'BMR-Athena LP' || order.EntityName == 'BRE-BMR 35 Landsdowne LLC' || order.EntityName == 'BRE-BMR 40 Landsdowne LLC'
          || order.EntityName == 'BRE-BMR 300 Massachusetts LLC' || order.EntityName == 'BRE-BMR 350 Massachusetts LLC' || order.EntityName == 'BRE-BMR Oberlin LP'
          || order.EntityName == 'BRE-BMR Pilgrim & Sidney LLC' || order.EntityName == 'BRE-BMR 31st LLC' || order.EntityName == 'BMR-Axiom LP'
          || order.EntityName == 'BioMed Realty LLC' || order.EntityName == 'BMR-500 Fairview Avenue LLC') {
          // Prod/Staging
          this.menuData.push({
            "Property": lines[3],
            "ID": order.ID,
            "Region": lines[1],
            "Market": lines[2],
            "Owner": order.EntityName,
            "StateOfFormation": order.StateofFormation,
            "AdditionalInsureds": order.AdditionalInsureds,
            "EntityID": order.EntityID
          });
          //Local
          // this.menuData.push({
          // Property: lines[3],
          // ID: order.ID,
          // Region: lines[1],
          // Market: lines[2],
          // Owner: order.EntityName,
          // StateOfFormation: order.StateofFormation,
          // AdditionalInsureds: order.AdditionalInsureds,
          // EntityID: order.EntityID,
          // });
        }

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
      // this.Property = this.Property.filter(o => o.Owner == 'BRE-BMR Campus at Towne Centre LP' || o.Owner == 'BMR-Dexter LLC' || o.Owner == 'BMR-201 Elliott Avenue LLC' || o.Owner == 'BMR-Gateway Manager LP'
      //   || o.Owner == 'BMR-Gateway of Pacific II LLC' || o.Owner == 'BMR-Pacific Research Center LP' || o.Owner == 'BMR-Athena LP' || o.Owner == 'BRE-BMR 35 Landsdowne LLC' || o.Owner == 'BRE-BMR 40 Landsdowne LLC'
      //   || o.Owner == 'BRE-BMR 300 Massachusetts LLC' || o.Owner == 'BRE-BMR 350 Massachusetts LLC' || o.Owner == 'BRE-BMR Oberlin LP' || o.Owner == 'BRE-BMR Pilgrim & Sidney LLC' || o.Owner == 'BRE-BMR 31st LLC'
      //   || o.Owner == 'BMR-Axiom LP' || o.Owner == ' BioMed Realty LLC' || o.Owner == 'BMR-500 Fairview Avenue LLC');
      // console.log(this.Property);
    });
  }

  OwnerSelect(selection) {
    this.formData.selectedOwner = selection;
    var eID = this.formData.selectedOwner.EntityID;

    this.serviceContract.getAllMaster().then((res) => {
      let dataMaster = res['d'].results as any[];
      var masterItem = dataMaster.filter(function (n) {
        return n.Building_x0020_ID == parseInt(eID, 10);
      });
      // if (masterItem == undefined){
      //   this.selectedPropertyManager = "BioMed Realty LLC";
      // }
      // else{
      //   this.selectedPropertyManager = masterItem[0].Building_x0020_Property_x0020_Ma.Title;
      //   //this.selectedPropertyManager = masterItem[0].PropertyManager;
      //   console.log(masterItem);
      // }
    });
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
    if (this.formData.selectedOwner.Owner != 'BMR-Gateway Manager LP') {
      //  var steUrl ='/sites/fredd/SourceCode1/ChangeOrder/assets/template/TRSContractTemplate.docx'; //prod
      var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/TRSContractTemplate.docx'; //Staging Tset
      //  var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
      // var steUrl = '/assets/template/TRSContractTemplate.docx'; //local
    } else if (this.formData.selectedOwner.Owner == 'BMR-Gateway Manager LP') {
      //  var steUrl = '/assets/template/TRSServicesGatewayManager.docx';
      //  var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/TRSServicesGatewayManager.docx"; //prod
      var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/TRSServicesGatewayManager.docx'; //Staging Tset

    }
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
      //TRS SERVICE CONTRACT
      if (this.formData.selectedOwner.Owner == 'BMR-Gateway Manager LP') {
        if (docx.Search('ContractorName') == true) {
          docxvar['ContractorName'] = this.formData.selectedContractor;
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
        if (docx.Search('AdditionalInsureds') == true) {
          if (
            this.formData.selectedOwner.Owner == 'B9 LS Harrison & Washington LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Middlesex LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Acquisition Holdings LLC' ||
            this.formData.selectedOwner.Owner == 'B9 Island Parkway LLC' ||
            this.formData.selectedOwner.Owner == 'B9 Island Parkway Development LLC'
          ) {
            docxvar['AdditionalInsureds'] = ', BRE Edison III LP,';
          } else if (
            this.formData.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC'
          ) {
            docxvar['AdditionalInsureds'] =
              ', 20 Sidney Street Condominium Trust';
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
        if (docx.Search('AdditionalInsureds') == true) {
          if (this.formData.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] =
              ', ' + this.formData.selectedOwner.AdditionalInsureds;
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
      }

      if (this.formData.selectedOwner.Owner != 'BMR-Gateway Manager LP') {
        // if (docx.Search('Owner') == true) {
        //   docxvar['Owner'] = this.selectedOwner.Owner;
        // }
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

        if (docx.Search('Owner') == true) {
          docxvar['Owner'] = this.formData.selectedOwner.Owner;
        }
        if (docx.Search('Owner') == true) {
          docxvar['CopyTo'] = this.formData.selectedOwner.Owner;
        }
        if (docx.Search('OwnerStateOfFormation') == true) {
          if (this.formData.selectedOwner.StateOfFormation == undefined) {
            docxvar['OwnerStateOfFormation'] = '';
          } else {
            docxvar['OwnerStateOfFormation'] =
              this.formData.selectedOwner.StateOfFormation;
          }
        }
        if (docx.Search('Section8_2') == true) {
          if (this.formData.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable present and future laws, ordinances, codes, rules, regulations, and requirements of federal, state, and municipal governments, departments, commissions, boards, and officers, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          } else {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable federal, state and local laws, ordinances, codes, rules and regulations, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          }
        }
        if (docx.Search('Section19') == true) {
          if (this.formData.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section19'] =
              'During the performance of this Contract, Contractor shall comply with all applicable federal and state laws, rules, regulations, and orders, and any rules and orders provided by Owner on behalf of itself or any ground lessor of the Property, pertaining to civil rights and equal opportunity unless otherwise exempt therein. Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.  Contractor shall not discriminate against any person, employee, or applicant for employment because of race, color, religion, national origin, age, sex, sexual orientation, disability, or Vietnam era veteran status in the provision of services, the hiring and discharging of employees, and the selection of suppliers and Subcontractors.  Contractor shall conspicuously post notices to employees and prospective employees setting forth the Fair Employment Practices Law of the Commonwealth of Massachusetts.';
          } else if (
            this.formData.selectedOwner.Owner == '20 Sidney Street Condominium Trust' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 26 Landsdowne LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 300 Massachusetts LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 31st LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 35 Landsdowne LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 350 Massachusetts LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 38 Sidney LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 40 Landsdowne LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 64 Sidney LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 65 & 80 Landsdowne LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 88 Sidney LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Pilgrim & Sidney LLC'
          ) {
            docxvar['Section19'] =
              'During the performance of this Contract, Contractor shall comply with all applicable federal, state, and local laws in effect from time to time, including without limitation, all applicable provisions of the Civil Rights Act, and with requirements of Massachusetts Institute of Technology pertaining to Equal Employment, Anti-Discrimination, and Affirmative Action, including executive orders and rules and regulations of appropriate federal, state, and local agencies unless otherwise exempt therefrom.  The provisions set forth in the preceding sentence shall be included in any subcontract or purchase order entered into by Contractor pursuant to this Agreement, so that such provisions will be binding upon such subcontractor or vendor.  Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.';
          } else {
            docxvar['Section19'] =
              'During the performance of this Contract, Contractor shall comply with applicable provisions of the Civil Rights Act, as amended, and shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.';
          }
        }
        if (docx.Search('AdditionalInsureds') == true) {
          if (
            this.formData.selectedOwner.Owner == 'B9 LS Harrison & Washington LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Middlesex LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR Acquisition Holdings LLC' ||
            this.formData.selectedOwner.Owner == 'B9 Island Parkway LLC' ||
            this.formData.selectedOwner.Owner == 'B9 Island Parkway Development LLC'
          ) {
            docxvar['AdditionalInsureds'] = ', BRE Edison III LP,';
          } else if (
            this.formData.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.formData.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC'
          ) {
            docxvar['AdditionalInsureds'] =
              ', 20 Sidney Street Condominium Trust';
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
        if (docx.Search('AdditionalInsureds') == true) {
          if (this.formData.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] =
              ', ' + this.formData.selectedOwner.AdditionalInsureds;
          } else {
            docxvar['AdditionalInsureds'] = '';
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
