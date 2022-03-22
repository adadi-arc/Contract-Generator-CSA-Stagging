import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContract } from 'src/app/models/servicecontract.model';
import { ServicecontractService } from 'src/app/services/servicecontract.service';
import { BaseComponent } from '../../base/base.component';
import { Document, Packer, Paragraph, TextRun } from "docx";
// import * as fs from "file-saver";
import { saveAs } from "file-saver";
import { DocumentCreator } from './servicecontracttemplate';
import moment, { invalid } from 'moment';
import { NgForm } from '@angular/forms';

declare let DocxReader: any;


@Component({
  selector: 'app-servicecontractform',
  templateUrl: './servicecontractform.component.html',
  styleUrls: ['./servicecontractform.component.scss']
})
export class ServicecontractformComponent extends BaseComponent implements OnInit {

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  obj: ServiceContract;

  dataOwner: any[] = [];
  dataProperty: any[] = [];
  States: any[] = [
    { ID: 1, Title: "AL" },
    { ID: 2, Title: "AK" },
    { ID: 3, Title: "AZ" },
    { ID: 4, Title: "AR" },
    { ID: 5, Title: "CA" },
    { ID: 6, Title: "CO" },
    { ID: 7, Title: "CT" },
    { ID: 8, Title: "DE" },
    { ID: 9, Title: "FL" },
    { ID: 10, Title: "GA" },
    { ID: 11, Title: "HI" },
    { ID: 12, Title: "ID" },
    { ID: 13, Title: "IL" },
    { ID: 14, Title: "IN" },
    { ID: 15, Title: "IA" },
    { ID: 16, Title: "KS" },
    { ID: 17, Title: "KY" },
    { ID: 18, Title: "LA" },
    { ID: 19, Title: "ME" },
    { ID: 20, Title: "MD" },
    { ID: 21, Title: "MA" },
    { ID: 22, Title: "MI" },
    { ID: 23, Title: "MN" },
    { ID: 24, Title: "MS" },
    { ID: 25, Title: "MO" },
    { ID: 26, Title: "MT" },
    { ID: 27, Title: "NE" },
    { ID: 28, Title: "NV" },
    { ID: 29, Title: "NH" },
    { ID: 30, Title: "NJ" },
    { ID: 31, Title: "NM" },
    { ID: 32, Title: "NY" },
    { ID: 33, Title: "NC" },
    { ID: 34, Title: "ND" },
    { ID: 35, Title: "OH" },
    { ID: 36, Title: "OK" },
    { ID: 36, Title: "OR" },
    { ID: 37, Title: "PA" },
    { ID: 38, Title: "RI" },
    { ID: 40, Title: "SC" },
    { ID: 41, Title: "SD" },
    { ID: 42, Title: "TN" },
    { ID: 43, Title: "TX" },
    { ID: 44, Title: "UT" },
    { ID: 45, Title: "VT" },
    { ID: 46, Title: "VA" },
    { ID: 47, Title: "WA" },
    { ID: 48, Title: "WV" },
    { ID: 49, Title: "WI" },
    { ID: 50, Title: "WY" }
  ];
  Forms: any[] = [
    { ID: 1, Title: "Service Contract" },
    { ID: 2, Title: "TRS Service Contract" },
    { ID: 3, Title: "Change Order Form" },
    { ID: 4, Title: "Flatiron Service Contract"}
  ];
  selectedForm: any = null;
  FormName: any = null;
  selectedOwner: any = null;
  selectedPropertyManager: any = "BioMed Realty LLC";
  selectedContractor: any = null;
  selectedContractorAddress: any = null;
  selectedContractorCity: any = null;
  selectedContractorState: any = null;
  selectedContractorZip: any = null;
  selectedContractorAttn: any = null;
  selectedContractorEmail: any = null;
  selectedContractorStateOfFormation: any = null;
  selectedExecutionDate: any = null;
  selectedCommencementDate: any = null;
  selectedExpirationDate: any = null;
  selectedPropertyAddress: any = null;
  selectedCOnum: any = null;
  selectedDate: any = null;
  selectedCAGMP: any = null;
  selectedOriginalGMP: any = null;
  selectedNetIncDec: any = null;
  selectedNetChange: any = null;
  selectedPreviousGMP: any = null
  selectedCOincdec: any = null;
  selectedCOamount: any = null;
  selecctedCOdate: any = null;
  selectedNewGMP: any = null;
  selectedContractTime: any = null;
  selectedTimeIncDec: any = null;
  selectedTimeChange: any = null;
  selectedSOWrevised: boolean = false;
  selectedSubstantialCompletion: any = null;
  selectedSubstantialCompletionDate: any = null;
  selectedContractDate: any = null;
  selectedProjectNum: any = null;
  selectedIncludeTM: boolean = false;
  selectedChangeCAGMP: boolean = false;
  selectedChangeTime: boolean = false;
  selectedReviseSOW: boolean = false;
  selectedSubComp: boolean = false;

  menuData: any[] = [];
  Region: any[] = [];
  Market: any[] = [];
  Property: any[] = [];
  constructor(public serviceContract: ServicecontractService, public route: ActivatedRoute,
    public router: Router) {
    super(route);
    this.obj = new ServiceContract();
  }


  ngOnInit(): void {
    super.ngOnInit();

  }


  ngAfterViewInit(): void {
    this.getData();


  }

  getData() {
    this.serviceContract.getAllProperty().then(res => {
      this.dataProperty = res['d'].results as any[];
      for (var count = 0; count < this.dataProperty.length; count++) {
        var order = this.dataProperty[count];
        console.log(order);
        //var lines = (order.FREDDPropertyName.results[0].Label).split(':'); //Local
        var lines = (order.Fredd_x0020_Property_x0020_Name_).split(':'); //Prod/Staging
        //Prod/Staging
        // this.menuData.push({
        //    "Property": lines[3], 
        //    "ID": order.ID, 
        //    "Region": lines[1], 
        //    "Market": lines[2],
        //    "Owner": order.EntityName,
        //    "StateOfFormation": order.StateofFormation,
        //   "AdditionalInsureds": order.AdditionalInsureds,
        //    "EntityID": order.EntityID
        //   });
        //Local
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
      }
      this.Region = [...new Map(this.menuData.map(item => [item['Region'], item])).values()];
      this.Region = this.Region.sort((a, b) => (a.Region > b.Region) ? 1 : -1)
      this.Market = [...new Map(this.menuData.map(item => [item['Market'], item])).values()];
      this.Market = this.Market.sort((a, b) => (a.Market > b.Market) ? 1 : -1)
      this.Property = [...new Map(this.menuData.map(item => [item['Property'], item])).values()];
      this.Property = this.Property.sort((a, b) => (a.Property > b.Property) ? 1 : -1)
      console.log(this.Region);

    })


  }

  FormBind() {
    this.FormName = this.selectedForm.Title;
    this.selectedOwner = undefined;
  }

  OwnerSelect(selection) {
    this.selectedOwner = selection;
    var eID = this.selectedOwner.EntityID;

    this.serviceContract.getAllMaster().then(res => {
      let dataMaster = res['d'].results as any[];
      var masterItem = dataMaster.filter(function (n) {
        return n.Building_x0020_ID == parseInt(eID, 10);
      })
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
  onChange(value: any) {

  }

  resetStates(servicecontract: NgForm) {
    if (servicecontract != undefined) {
      this.selectedPropertyAddress = "";
      this.selectedPropertyManager = "BioMed Realty LLC"
      this.selectedContractor = "";
      this.selectedContractorStateOfFormation = "";
      this.selectedContractorAddress = "";
      this.selectedContractorCity = "";
      this.selectedContractorZip = "";
      this.selectedContractorState = "";
      this.selectedContractorAttn = "";
      this.selectedContractorEmail = "";
      this.selectedExecutionDate = "";
      this.selectedExpirationDate = "";
      this.selectedCommencementDate = "";
      this.selectedIncludeTM = null;
      // Object.keys(servicecontract.controls).forEach(key =>{
      //    servicecontract.controls[key].setErrors(null);
      // });

      if (this.selectedForm.Title == "Change Order Form") {
        this.selectedCOnum = "";
        this.selectedProjectNum = "";
        this.selectedDate = "";
        this.selectedContractDate = "";
        this.selectedChangeCAGMP = null;
        this.selectedCAGMP = null;
        this.selectedOriginalGMP = "";
        this.selectedNetIncDec = null;
        this.selectedNetChange = "";
        this.selectedPreviousGMP = "";
        this.selectedCOincdec = null;
        this.selectedCOamount = "";
        this.selectedNewGMP = "";
        this.selectedChangeTime = null;
        this.selectedTimeChange = "";
        this.selectedSOWrevised = null;
        this.selectedSubComp = null;
        this.selectedSubstantialCompletionDate = "";
      }
    }
  }
  resetCOgmp() {
    this.selectedCAGMP = "Contact Amount/GMP";
    this.selectedOriginalGMP = "";
    this.selectedNetIncDec = "increase/decrease";
    this.selectedNetChange = "";
    this.selectedPreviousGMP = 0;
    this.selectedCOincdec = "increased/decreased";
    this.selectedCOamount = "";
    this.selectedNewGMP = 0;
  }
  resetCOtime() {
    this.selectedTimeChange = "";
    this.selectedSOWrevised = null;
    this.selectedSubComp = null;
    this.selectedSubstantialCompletionDate = "";
  }
  resetSubComp(){
    this.selectedSubstantialCompletionDate = "";
  }
  invalidateFields() {
    if (this.selectedOwner === null)
      return true;
    if (this.selectedPropertyAddress === null)
      return true;
    if (this.selectedPropertyManager === null)
      return true;
    if (this.selectedContractor === null)
      return true;
    if (this.selectedContractorStateOfFormation === null)
      return true;
    if (this.selectedContractorAddress === null)
      return true;
    if (this.selectedContractorCity === null)
      return true;
    if (this.selectedContractorState === null)
      return true;
    if (this.selectedContractorZip === null)
      return true;
    if (this.selectedExecutionDate === null)
      return true;
    if (this.selectedCommencementDate === null)
      return true;
    if (this.selectedExpirationDate === null)
      return true;


    return false;
  }
  calc() {
    console.log("Calculation")
    if (this.selectedNetIncDec == "Increase") {
      this.selectedPreviousGMP = parseFloat(this.selectedOriginalGMP) + parseFloat(this.selectedNetChange);
    }
    else if (this.selectedNetIncDec == "Decrease") {
      this.selectedPreviousGMP = parseFloat(this.selectedOriginalGMP) - parseFloat(this.selectedNetChange);
    }
    else if (this.selectedNetChange == undefined) {
      this.selectedPreviousGMP = "";
    }

    if (this.selectedCOincdec == "Increase") {
      this.selectedNewGMP = parseFloat(this.selectedPreviousGMP) + parseFloat(this.selectedCOamount);
    }
    else if (this.selectedCOincdec == "Decrease") {
      this.selectedNewGMP = parseFloat(this.selectedPreviousGMP) - parseFloat(this.selectedCOamount);
    }
    else {
      this.selectedNewGMP = "";
    }
  }

  clearPM() {
    this.selectedPropertyManager = null;
  }

  onSave() {
    //SERVICE CONTRACT
    if (this.selectedForm.Title == "Service Contract") {
      var docx = new DocxReader();
      //var steUrl = "/sites/fredd/SourceCode1/ServiceContract/assets/template/ServiceContractTemplate.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/ServiceContractTemplate.docx"; //Staging
      var steUrl = "/assets/template/ServiceContractTemplate.docx" //local
      docx.Load(steUrl, () => {

        var docxvar = {};

        if (docx.Search("Owner") == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        if (docx.Search("Owner") == true) {
          docxvar['CopyTo'] = this.selectedOwner.Owner;
        }
        if (docx.Search("OwnerStateOfFormation") == true) {
          if (this.selectedOwner.StateOfFormation == undefined) {
            docxvar['OwnerStateOfFormation'] = "";
          }
          else {
            docxvar['OwnerStateOfFormation'] = this.selectedOwner.StateOfFormation;
          }
        }
        if (docx.Search("PropertyManager") == true) {
          if (this.selectedPropertyManager == "" || this.selectedPropertyManager == undefined) {
            docxvar['PropertyManager'] = "BioMed Realty LLC"
          }
          else {
            docxvar['PropertyManager'] = this.selectedPropertyManager;
          }
        }
        if (docx.Search("Contractor") == true) {
          docxvar['Contractor'] = this.selectedContractor;
        }

        if (docx.Search("ContractorName") == true) {
          docxvar['ContractorName'] = this.selectedContractor;
        }

        if (docx.Search("ContractorStreetAddress") == true) {
          docxvar['ContractorStreetAddress'] = this.selectedContractorAddress;
        }
        if (docx.Search("City") == true) {
          docxvar['City'] = this.selectedContractorCity;
        }
        if (docx.Search("State") == true) {
          docxvar['State'] = this.selectedContractorState.Title;
        }
        if (docx.Search("ZipCode") == true) {
          docxvar['ZipCode'] = this.selectedContractorZip;
        }
        if (docx.Search("ContractorAttn") == true) {
          if (this.selectedContractorAttn == "" || this.selectedContractorAttn == undefined) {
            docxvar['ContractorAttn'] = "\n";
          }
          else {
            docxvar['ContractorAttn'] = "Attn: " + this.selectedContractorAttn;
          }
        }
        if (docx.Search("ContractorEmail") == true) {
          if (this.selectedContractorEmail == "" || this.selectedContractorEmail == undefined) {
            docxvar['ContractorEmail'] = "\n";
          }
          else {
            docxvar['ContractorEmail'] = "Email: " + this.selectedContractorEmail;
          }
        }
        if (docx.Search("ContractorStateOfFormation") == true) {
          docxvar['ContractorStateOfFormation'] = this.selectedContractorStateOfFormation;
        }
        if (docx.Search("ExecutionDate") == true) {
          docxvar['ExecutionDate'] = moment(this.selectedExecutionDate).format("MM/DD/YY");
        }
        if (docx.Search("CommencementDate") == true) {
          docxvar['CommencementDate'] = moment(this.selectedCommencementDate).format("MM/DD/YY");
        }
        if (docx.Search("ExpirationDate") == true) {
          docxvar['ExpirationDate'] = moment(this.selectedExpirationDate).format("MM/DD/YY");
        }
        if (docx.Search("PropertyAddress") == true) {
          docxvar['PropertyAddress'] = this.selectedPropertyAddress;
        }
        if (this.selectedIncludeTM == true) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☑";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☐";
          }
        }
        if (this.selectedIncludeTM == false) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        if (this.selectedIncludeTM == undefined) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        if (docx.Search("Section8_2") == true) {
          if (this.selectedOwner.Owner == "BRE-BMR Congress LLC") {
            docxvar['Section8_2'] = "Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable present and future laws, ordinances, codes, rules, regulations, and requirements of federal, state, and municipal governments, departments, commissions, boards, and officers, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.";
          }
          else {
            docxvar['Section8_2'] = "Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable federal, state and local laws, ordinances, codes, rules and regulations, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.";
          }
        }
        if (docx.Search("Section19") == true) {
          if (this.selectedOwner.Owner == "BRE-BMR Congress LLC") {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with all applicable federal and state laws, rules, regulations, and orders, and any rules and orders provided by Owner on behalf of itself or any ground lessor of the Property, pertaining to civil rights and equal opportunity unless otherwise exempt therein. Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.  Contractor shall not discriminate against any person, employee, or applicant for employment because of race, color, religion, national origin, age, sex, sexual orientation, disability, or Vietnam era veteran status in the provision of services, the hiring and discharging of employees, and the selection of suppliers and Subcontractors.  Contractor shall conspicuously post notices to employees and prospective employees setting forth the Fair Employment Practices Law of the Commonwealth of Massachusetts.";
          }

          else if (this.selectedOwner.Owner == "20 Sidney Street Condiminium Trust" || this.selectedOwner.Owner == "BRE-BMR 20 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 26 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 300 Massachusetts LLC" || this.selectedOwner.Owner == "BRE-BMR 31st LLC" || this.selectedOwner.Owner == "BRE-BMR 35 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 350 Massachusetts LLC" || this.selectedOwner.Owner == "BRE-BMR 38 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 40 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 64 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 65 & 80 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 88 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR Franklin LLC" || this.selectedOwner.Owner == "BRE-BMR Pilgrim & Sidney LLC") {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with all applicable federal, state, and local laws in effect from time to time, including without limitation, all applicable provisions of the Civil Rights Act, and with requirements of Massachusetts Institute of Technology pertaining to Equal Employment, Anti-Discrimination, and Affirmative Action, including executive orders and rules and regulations of appropriate federal, state, and local agencies unless otherwise exempt therefrom.  The provisions set forth in the preceding sentence shall be included in any subcontract or purchase order entered into by Contractor pursuant to this Agreement, so that such provisions will be binding upon such subcontractor or vendor.  Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.";
          }
          else {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with applicable provisions of the Civil Rights Act, as amended, and shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.";
          }
        }
        if (docx.Search("AdditionalInsureds") == true) {
          if (this.selectedOwner.Owner == "B9 LS Harrison & Washington LLC" || this.selectedOwner.Owner == "BRE-BMR Middlesex LLC" || this.selectedOwner.Owner == "BRE-BMR Acquisition Holdings LLC" || this.selectedOwner.Owner == "B9 Island Parkway LLC" || this.selectedOwner.Owner == "B9 Island Parkway Development LLC") {
            docxvar['AdditionalInsureds'] = ", BRE Edison III LP,";
          }
          else if (this.selectedOwner.Owner == "BRE-BMR Franklin LLC" || this.selectedOwner.Owner == "BRE-BMR 20 Sidney LLC") {
            docxvar['AdditionalInsureds'] = ", 20 Sidney Street Condominium Trust";
          }
          else {
            docxvar['AdditionalInsureds'] = "";
          }
        }
        if (docx.Search("AdditionalInsureds") == true) {
          if (this.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] = ", " + this.selectedOwner.AdditionalInsureds;
          }
          else {
            docxvar['AdditionalInsureds'] = "";
          }
        }
        docx.docxtemplater.setData(docxvar);

        try {
          docx.docxtemplater.render();
        }
        catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        docx.SetName("SC" + " - " + this.selectedContractor);

        docx.Download();
      });
    }
    //TRS SERVICE CONTRACT
    if (this.selectedForm.Title == "TRS Service Contract") {
      var docx = new DocxReader();
      //var steUrl = "/sites/fredd/SourceCode1/ServiceContract/assets/template/TRSContractTemplate.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
      var steUrl = "/assets/template/TRSContractTemplate.docx" //local
      docx.Load(steUrl, () => {

        var docxvar = {};

        if (docx.Search("Owner") == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        // if (docx.Search("Owner") == true) {
        //   docxvar['CopyTo'] = this.selectedOwner.Owner;
        // }
        // if (docx.Search("OwnerStateOfFormation") == true) {
        //   if (this.selectedOwner.StateOfFormation == undefined) {
        //     docxvar['OwnerStateOfFormation'] = "";
        //   }
        //   else {
        //     docxvar['OwnerStateOfFormation'] = this.selectedOwner.StateOfFormation;
        //   }
        // }
        if (docx.Search("PropertyManager") == true) {
          if (this.selectedPropertyManager == "" || this.selectedPropertyManager == undefined) {
            docxvar['PropertyManager'] = "BioMed Realty LLC"
          }
          else {
            docxvar['PropertyManager'] = this.selectedPropertyManager;
          }
        }
        if (docx.Search("Contractor") == true) {
          docxvar['Contractor'] = this.selectedContractor;
        }

        if (docx.Search("ContractorName") == true) {
          docxvar['ContractorName'] = this.selectedContractor;
        }

        if (docx.Search("ContractorStreetAddress") == true) {
          docxvar['ContractorStreetAddress'] = this.selectedContractorAddress;
        }
        if (docx.Search("City") == true) {
          docxvar['City'] = this.selectedContractorCity;
        }
        if (docx.Search("State") == true) {
          docxvar['State'] = this.selectedContractorState.Title;
        }
        if (docx.Search("ZipCode") == true) {
          docxvar['ZipCode'] = this.selectedContractorZip;
        }
        if (docx.Search("ContractorAttn") == true) {
          if (this.selectedContractorAttn == "" || this.selectedContractorAttn == undefined) {
            docxvar['ContractorAttn'] = "\n";
          }
          else {
            docxvar['ContractorAttn'] = "Attn: " + this.selectedContractorAttn;
          }
        }
        if (docx.Search("ContractorEmail") == true) {
          if (this.selectedContractorEmail == "" || this.selectedContractorEmail == undefined) {
            docxvar['ContractorEmail'] = "\n";
          }
          else {
            docxvar['ContractorEmail'] = "Email: " + this.selectedContractorEmail;
          }
        }
        if (docx.Search("ContractorStateOfFormation") == true) {
          docxvar['ContractorStateOfFormation'] = this.selectedContractorStateOfFormation;
        }
        if (docx.Search("ExecutionDate") == true) {
          docxvar['ExecutionDate'] = moment(this.selectedExecutionDate).format("MM/DD/YY");
        }
        if (docx.Search("CommencementDate") == true) {
          docxvar['CommencementDate'] = moment(this.selectedCommencementDate).format("MM/DD/YY");
        }
        if (docx.Search("ExpirationDate") == true) {
          docxvar['ExpirationDate'] = moment(this.selectedExpirationDate).format("MM/DD/YY");
        }
        if (docx.Search("PropertyAddress") == true) {
          docxvar['PropertyAddress'] = this.selectedPropertyAddress;
        }
        if (this.selectedIncludeTM == true) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☑";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☐";
          }
        }
        if (this.selectedIncludeTM == false) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        if (this.selectedIncludeTM == undefined) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        if (docx.Search("Section8_2") == true) {
          if (this.selectedOwner.Owner == "BRE-BMR Congress LLC") {
            docxvar['Section8_2'] = "Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable present and future laws, ordinances, codes, rules, regulations, and requirements of federal, state, and municipal governments, departments, commissions, boards, and officers, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.";
          }
          else {
            docxvar['Section8_2'] = "Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable federal, state and local laws, ordinances, codes, rules and regulations, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.";
          }
        }
        if (docx.Search("Section19") == true) {
          if (this.selectedOwner.Owner == "BRE-BMR Congress LLC") {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with all applicable federal and state laws, rules, regulations, and orders, and any rules and orders provided by Owner on behalf of itself or any ground lessor of the Property, pertaining to civil rights and equal opportunity unless otherwise exempt therein. Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.  Contractor shall not discriminate against any person, employee, or applicant for employment because of race, color, religion, national origin, age, sex, sexual orientation, disability, or Vietnam era veteran status in the provision of services, the hiring and discharging of employees, and the selection of suppliers and Subcontractors.  Contractor shall conspicuously post notices to employees and prospective employees setting forth the Fair Employment Practices Law of the Commonwealth of Massachusetts.";
          }

          else if (this.selectedOwner.Owner == "20 Sidney Street Condiminium Trust" || this.selectedOwner.Owner == "BRE-BMR 20 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 26 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 300 Massachusetts LLC" || this.selectedOwner.Owner == "BRE-BMR 31st LLC" || this.selectedOwner.Owner == "BRE-BMR 35 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 350 Massachusetts LLC" || this.selectedOwner.Owner == "BRE-BMR 38 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 40 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 64 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR 65 & 80 Landsdowne LLC" || this.selectedOwner.Owner == "BRE-BMR 88 Sidney LLC" || this.selectedOwner.Owner == "BRE-BMR Franklin LLC" || this.selectedOwner.Owner == "BRE-BMR Pilgrim & Sidney LLC") {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with all applicable federal, state, and local laws in effect from time to time, including without limitation, all applicable provisions of the Civil Rights Act, and with requirements of Massachusetts Institute of Technology pertaining to Equal Employment, Anti-Discrimination, and Affirmative Action, including executive orders and rules and regulations of appropriate federal, state, and local agencies unless otherwise exempt therefrom.  The provisions set forth in the preceding sentence shall be included in any subcontract or purchase order entered into by Contractor pursuant to this Agreement, so that such provisions will be binding upon such subcontractor or vendor.  Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.";
          }
          else {
            docxvar['Section19'] = "During the performance of this Contract, Contractor shall comply with applicable provisions of the Civil Rights Act, as amended, and shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.";
          }
        }
        if (docx.Search("AdditionalInsureds") == true) {
          if (this.selectedOwner.Owner == "B9 LS Harrison & Washington LLC" || this.selectedOwner.Owner == "BRE-BMR Middlesex LLC" || this.selectedOwner.Owner == "BRE-BMR Acquisition Holdings LLC" || this.selectedOwner.Owner == "B9 Island Parkway LLC" || this.selectedOwner.Owner == "B9 Island Parkway Development LLC") {
            docxvar['AdditionalInsureds'] = ", BRE Edison III LP,";
          }
          else if (this.selectedOwner.Owner == "BRE-BMR Franklin LLC" || this.selectedOwner.Owner == "BRE-BMR 20 Sidney LLC") {
            docxvar['AdditionalInsureds'] = ", 20 Sidney Street Condominium Trust";
          }
          else {
            docxvar['AdditionalInsureds'] = "";
          }
        }
        if (docx.Search("AdditionalInsureds") == true) {
          if (this.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] = ", " + this.selectedOwner.AdditionalInsureds;
          }
          else {
            docxvar['AdditionalInsureds'] = "";
          }
        }
        docx.docxtemplater.setData(docxvar);

        try {
          docx.docxtemplater.render();
        }
        catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        docx.SetName("SC" + " - " + this.selectedContractor);

        docx.Download();
      });
    }
    //CHANGE ORDER FORM
    if (this.selectedForm.Title == "Change Order Form") {
      var docx = new DocxReader();
      //var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/ChangeOrderTemplate.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
      var steUrl = "/assets/template/ChangeOrderTemplate.docx" //local
      docx.Load(steUrl, () => {

        var docxvar = {};

        if (docx.Search("Owner") == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        if (docx.Search("PropertyAddress") == true) {
          docxvar['PropertyAddress'] = this.selectedPropertyAddress;
        }
        if (docx.Search("CO_Num") == true) {
          docxvar['CO_Num'] = this.selectedCOnum;
        }
        if (docx.Search("Date") == true) {
          docxvar['Date'] = moment(this.selectedDate).format("MM/DD/YY");
        }
        if (docx.Search("ContractorName") == true) {
          docxvar['ContractorName'] = this.selectedContractor;
        }
        if (docx.Search("ContractorStreetAddress") == true) {
          docxvar['ContractorStreetAddress'] = this.selectedContractorAddress;
        }
        if (docx.Search("City") == true) {
          docxvar['City'] = this.selectedContractorCity;
        }
        if (docx.Search("State") == true) {
          docxvar['State'] = this.selectedContractorState.Title;
        }
        if (docx.Search("Zipcode") == true) {
          docxvar['Zipcode'] = this.selectedContractorZip;
        }
        if (docx.Search("ContractDate") == true) {
          docxvar['ContractDate'] = moment(this.selectedContractDate).format("MM/DD/YY");
        }
        if (docx.Search("ProjectNumber") == true) {
          docxvar['ProjectNumber'] = this.selectedProjectNum;
        }
        if (this.selectedChangeCAGMP == (false || undefined)) {
          this.selectedCAGMP = "Contract Amount/GMP"
          this.selectedNetIncDec = "increase/decrease"
          this.selectedCOincdec = "increased/decreased"
          this.selectedOriginalGMP = 0;
          this.selectedNetChange = 0;
          this.selectedPreviousGMP = 0;
          this.selectedCOamount = 0;
          this.selectedNewGMP = 0;
        }

        if (docx.Search("CA_GMP") == true) {
          docxvar['CA_GMP'] = this.selectedCAGMP;
        }
        if (docx.Search("OriginalGMP") == true) {
          docxvar['OriginalGMP'] = Number(this.selectedOriginalGMP).toFixed(2);
        }
        if (docx.Search("NetIncDec") == true) {
          docxvar['NetIncDec'] = this.selectedNetIncDec.toLowerCase();
        }
        if (docx.Search("NetChange") == true) {
          docxvar['NetChange'] = Number(this.selectedNetChange).toFixed(2);
        }
        if (docx.Search("PreviousGMP") == true) {
          if (this.selectedNetIncDec == "Increase") {
            this.selectedPreviousGMP = parseFloat(this.selectedOriginalGMP) + parseFloat(this.selectedNetChange);
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(2);
          }
          if (this.selectedNetIncDec == "Decrease") {
            this.selectedPreviousGMP = parseFloat(this.selectedOriginalGMP) - parseFloat(this.selectedNetChange);
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(2);
          }
          if (this.selectedNetIncDec == "increase/decrease") {
            this.selectedPreviousGMP = 0
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(2);
          }
        }
        if (docx.Search("CO_IncDec") == true) {
          if (this.selectedCOincdec == "increased/decreased") {
            docxvar['CO_IncDec'] = this.selectedCOincdec;
          }
          else {
            docxvar['CO_IncDec'] = this.selectedCOincdec.toLowerCase() + "d";
          }

        }
        if (docx.Search("CO_Amount") == true) {
          docxvar['CO_Amount'] = Number(this.selectedCOamount).toFixed(2);
        }
        if (docx.Search("NewGMP") == true) {
          if (this.selectedCOincdec == "Increase") {
            this.selectedNewGMP = parseFloat(this.selectedPreviousGMP) + parseFloat(this.selectedCOamount);
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
          if (this.selectedCOincdec == "Decrease") {
            this.selectedNewGMP = parseFloat(this.selectedPreviousGMP) - parseFloat(this.selectedCOamount);
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
          if (this.selectedCOincdec == "increased/decreased") {
            this.selectedNewGMP = 0
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
        }

        if (this.selectedChangeTime == true) {
          if (docx.Search("ContractTime") == true) {
            docxvar['ContractTime'] = "The Contract Time will be " + this.selectedTimeIncDec.toLowerCase() + "d by " + this.selectedTimeChange + " days.";
          }
        }
        if (this.selectedChangeTime == false) {
          if (docx.Search("ContractTime") == true) {
            docxvar['ContractTime'] = "";
          }
        }
        if (this.selectedChangeTime == undefined) {
          if (docx.Search("ContractTime") == true) {
            docxvar['ContractTime'] = "";
          }
        }

        if (docx.Search("SOW_Revised") == true) {
          if (this.selectedSOWrevised == true) {
            docxvar['SOW_Revised'] = "The Scope of Work is revised to include the Work described in Exhibit B hereto.";
          }
          if (this.selectedSOWrevised == false) {
            docxvar['SOW_Revised'] = "";
          }
          if (this.selectedSOWrevised == undefined) {
            docxvar['SOW_Revised'] = "";
          }
        }
        if (docx.Search("SubstantialCompletion") == true) {
          if (this.selectedSubComp == true) {
            docxvar['SubstantialCompletion'] = "The Scheduled Date of Substantial Completion as of the date of this Change Order, therefore, is ";
            if (docx.Search("SubstantialCompletionDate") == true) {
              docxvar['SubstantialCompletionDate'] = moment(this.selectedSubstantialCompletionDate).format("MM/DD/YY") + ".";
            }
          }
          if (this.selectedSubComp == false) {
            docxvar['SubstantialCompletion'] = "";
            if (docx.Search("SubstantialCompletionDate") == true) {
              docxvar['SubstantialCompletionDate'] = "";
            }
          }
          if (this.selectedSubComp == undefined) {
            docxvar['SubstantialCompletion'] = "";
            if (docx.Search("SubstantialCompletionDate") == true) {
              docxvar['SubstantialCompletionDate'] = "";
            }
          }
        }
        docx.docxtemplater.setData(docxvar);
        try {
          docx.docxtemplater.render();
        }
        catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        docx.SetName("CO" + " - " + this.selectedContractor);

        docx.Download();
      });
    }
    //FLATIRON SERVICE CONTRACT
    if (this.selectedForm.Title == "Flatiron Service Contract") {
      var docx = new DocxReader();
      //var steUrl = "/sites/fredd/SourceCode1/ServiceContract/assets/template/FlatironServiceContractTemplate.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/FlatironServiceContractTemplate.docx"; //Staging
      var steUrl = "/assets/template/FlatironServiceContractTemplate.docx" //local
      docx.Load(steUrl, () => {

        var docxvar = {};

        if (docx.Search("Owner") == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        if (docx.Search("Contractor") == true) {
          docxvar['Contractor'] = this.selectedContractor;
        }

        if (docx.Search("ContractorName") == true) {
          docxvar['ContractorName'] = this.selectedContractor;
        }

        if (docx.Search("ContractorStreetAddress") == true) {
          docxvar['ContractorStreetAddress'] = this.selectedContractorAddress;
        }
        if (docx.Search("City") == true) {
          docxvar['City'] = this.selectedContractorCity;
        }
        if (docx.Search("State") == true) {
          docxvar['State'] = this.selectedContractorState.Title;
        }
        if (docx.Search("ZipCode") == true) {
          docxvar['ZipCode'] = this.selectedContractorZip;
        }
        if (docx.Search("ContractorAttn") == true) {
          if (this.selectedContractorAttn == "" || this.selectedContractorAttn == undefined) {
            docxvar['ContractorAttn'] = "\n";
          }
          else {
            docxvar['ContractorAttn'] = "Attn: " + this.selectedContractorAttn;
          }
        }
        if (docx.Search("ContractorEmail") == true) {
          if (this.selectedContractorEmail == "" || this.selectedContractorEmail == undefined) {
            docxvar['ContractorEmail'] = "\n";
          }
          else {
            docxvar['ContractorEmail'] = "Email: " + this.selectedContractorEmail;
          }
        }
        if (docx.Search("ContractorStateOfFormation") == true) {
          docxvar['ContractorStateOfFormation'] = this.selectedContractorStateOfFormation;
        }
        if (docx.Search("ExecutionDate") == true) {
          docxvar['ExecutionDate'] = moment(this.selectedExecutionDate).format("MM/DD/YY");
        }
        if (docx.Search("CommencementDate") == true) {
          docxvar['CommencementDate'] = moment(this.selectedCommencementDate).format("MM/DD/YY");
        }
        if (docx.Search("ExpirationDate") == true) {
          docxvar['ExpirationDate'] = moment(this.selectedExpirationDate).format("MM/DD/YY");
        }
        if (docx.Search("PropertyAddress") == true) {
          docxvar['PropertyAddress'] = this.selectedPropertyAddress;
        }
        if (this.selectedIncludeTM == true) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☑";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☐";
          }
        }
        if (this.selectedIncludeTM == false) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        if (this.selectedIncludeTM == undefined) {
          if (docx.Search("TM_Y") == true) {
            docxvar['TM_Y'] = "☐";
          }
          if (docx.Search("TM_N") == true) {
            docxvar['TM_N'] = "☑";
          }
        }
        docx.docxtemplater.setData(docxvar);

        try {
          docx.docxtemplater.render();
        }
        catch (error) {
          var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          }
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        docx.SetName("SC" + " - " + this.selectedContractor);

        docx.Download();
      });
    } 
  }

}
