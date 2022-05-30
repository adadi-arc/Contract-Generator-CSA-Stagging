import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContract } from 'src/app/models/servicecontract.model';
import { ServicecontractService } from 'src/app/services/servicecontract.service';
import { BaseComponent } from '../../base/base.component';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// import * as fs from "file-saver";
import { saveAs } from 'file-saver';
import { DocumentCreator } from './servicecontracttemplate';
import moment, { invalid } from 'moment';
import { NgForm } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

declare let DocxReader: any;

@Component({
  selector: 'app-servicecontractform',
  templateUrl: './servicecontractform.component.html',
  styleUrls: ['./servicecontractform.component.scss'],
})
export class ServicecontractformComponent
  extends BaseComponent
  implements OnInit
{
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
    { ID: 1, Title: 'AL' },
    { ID: 2, Title: 'AK' },
    { ID: 3, Title: 'AZ' },
    { ID: 4, Title: 'AR' },
    { ID: 5, Title: 'CA' },
    { ID: 6, Title: 'CO' },
    { ID: 7, Title: 'CT' },
    { ID: 8, Title: 'DE' },
    { ID: 9, Title: 'FL' },
    { ID: 10, Title: 'GA' },
    { ID: 11, Title: 'HI' },
    { ID: 12, Title: 'ID' },
    { ID: 13, Title: 'IL' },
    { ID: 14, Title: 'IN' },
    { ID: 15, Title: 'IA' },
    { ID: 16, Title: 'KS' },
    { ID: 17, Title: 'KY' },
    { ID: 18, Title: 'LA' },
    { ID: 19, Title: 'ME' },
    { ID: 20, Title: 'MD' },
    { ID: 21, Title: 'MA' },
    { ID: 22, Title: 'MI' },
    { ID: 23, Title: 'MN' },
    { ID: 24, Title: 'MS' },
    { ID: 25, Title: 'MO' },
    { ID: 26, Title: 'MT' },
    { ID: 27, Title: 'NE' },
    { ID: 28, Title: 'NV' },
    { ID: 29, Title: 'NH' },
    { ID: 30, Title: 'NJ' },
    { ID: 31, Title: 'NM' },
    { ID: 32, Title: 'NY' },
    { ID: 33, Title: 'NC' },
    { ID: 34, Title: 'ND' },
    { ID: 35, Title: 'OH' },
    { ID: 36, Title: 'OK' },
    { ID: 36, Title: 'OR' },
    { ID: 37, Title: 'PA' },
    { ID: 38, Title: 'RI' },
    { ID: 40, Title: 'SC' },
    { ID: 41, Title: 'SD' },
    { ID: 42, Title: 'TN' },
    { ID: 43, Title: 'TX' },
    { ID: 44, Title: 'UT' },
    { ID: 45, Title: 'VT' },
    { ID: 46, Title: 'VA' },
    { ID: 47, Title: 'WA' },
    { ID: 48, Title: 'WV' },
    { ID: 49, Title: 'WI' },
    { ID: 50, Title: 'WY' },
  ];
  Forms: any[] = [
    { ID: 1, Title: 'Service Contract' },
    { ID: 2, Title: 'TRS Service Contract' },
    { ID: 3, Title: 'Change Order Form' },
    { ID: 4, Title: 'Flatiron Service Contract' },
    { ID: 5, Title: 'Service Contract BMR LP' },
    { ID: 6, Title: 'Consulting Services (Draft)' },
  ];
  selectedForm: any = null;
  // Consulting Service
  // ConsultingService: any = null;
  selectedStreetAddress: any = null;
  selectedEmergencyCompensation: any = null;
  ConsultingServiceTemp: any = null;
  selectedContractAmount: any = null;
  selectedMonthlyCompensation: any = null;
  selectedYearlyCompensation: any = null;
  selectedReimbursableExpenses: any = null;
  selectedPayment: any = null;
  selectedCovid: any = null;
  selectedPollutionLiability: any = null;
  // X----
  // Hide Show Variables General Template
  scopeService: string =
    'In addition, the Services shall include any additional services to be performed by Consultant on a time and materials basis (“T&M Services”) upon written request by Owner (for which purpose an email from an authorized employee or agent of Owner shall be deemed sufficient).';
  compensationTM: string =
    ', which limits shall not be increased except by an agreement in writing signed by Owner and Consultant, for T&M Services performed in accordance with the terms of this Agreement.';
  applicationPayment: string =
    '  NOTE:  SPECIFIC LIEN WAIVER SUBSECTIONS SHOULD ONLY BE INCLUDED IF THE SERVICES ARE OF A TYPE FOR WHICH CONSULTANT HAS A RIGHT TO LIEN THE PROPERTY IN THE STATE.  IF NOT, STATE “[INTENTIONALLY OMITTED]” IN PLACE OF THE LIEN WAIVER LANGUAGE.][CALIFORNIA:  [Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [a conditional waiver and release of lien upon progress or final payment (as applicable) from Consultant and each subcontractor complying with the requirements of California Civil Code Section 8132 or 8136 (as applicable) or any successor statute and in the applicable form attached as Exhibit C hereto with respect to the Services to which the Application for Payment applies][OR][Intentionally omitted], (d) [an unconditional waiver and release of lien upon progress payment from Consultant and each subcontractor complying with the requirements of California Civil Code Section 8134 or any successor statute and in the applicable form attached as Exhibit C hereto with respect to all Services previously paid through the date of the immediately preceding Application for Payment][OR][Intentionally omitted], (e) a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment and (f) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.[  Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of California Civil Code Section 8138 and in the applicable form attached as Exhibit C hereto with respect to all Services.]]][COLORADO & ILLINOIS:  [ Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [a conditional waiver and release of lien upon progress payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to the Services to which the Application for Payment applies][OR][Intentionally omitted], (d) [an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services previously paid through the date of the immediately preceding Application for Payment][OR][Intentionally omitted], (e) a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment and (f) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.[  Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services.]][NOTE:  FOR ILLINOIS ONLY:  [  All lien waivers provided to Owner under this Agreement shall be notarized by the appropriate party.]]][DELAWARE, NEW JERSEY, NEW YORK & PENNSYLVANIA:  [  Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services previously paid through the date of the immediately preceding Application for Payment][OR][Intentionally omitted], (d) [a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment][OR][Intentionally omitted] and (e) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.[  Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services.]]][FLORIDA, MISSOURI, NORTH CAROLINA, VIRGINIA & WASHINGTON:  [  Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [a conditional waiver and release of lien upon progress or final payment (as applicable) from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to the Services to which the Application for Payment applies][OR][Intentionally omitted], (d) [an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services previously paid through the date of the immediately preceding Application for Payment][OR][Intentionally omitted], (e) a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment and (f) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.  [Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services.]]][MASSACHUSETTS:  [  Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [a conditional waiver and release of lien upon progress payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to the Services to which the Application for Payment applies][OR][Intentionally omitted], (d) a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment and (e) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.[  Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services. ';
  applicationPaymentHeading: string = 'Applications for Payment. ';
  applicationPaymentbullet: string = '3.2.      ';
  payment: string =
    ', subject to satisfactory receipt of the documentation set forth in Section 3.2, Owner shall pay to Consultant an amount equal to the value, based on the Contract Amount, of all Services performed pursuant to this Agreement during the preceding calendar month as reasonably determined by Owner[ and supported by the documentation provided pursuant to Section 3.2';
  covid19: string =
    'COVID-19.  Consultant acknowledges and agrees that COVID-19 may be present in or around the Property and individuals working at or near the Property.  Consultant, on behalf of itself, its affiliates and its subcontractors, and their respective parents, shareholders, partners, directors, officers, employees, material suppliers and other vendors, and each of their respective successors and assigns (collectively with Consultant, the “Consultant Parties”) hereby waives any recourse against, releases Owner and all other Indemnitees from, and expressly assumes the risk of any and all injury, sickness, loss or damage, including death, arising from the presence of COVID-19 in or around the Property or individuals working at or near the Property.  Consultant shall indemnify, reimburse, save, defend (at Owner’s option and with counsel reasonably acceptable to Owner) and hold harmless the Indemnitees for, from and against any and all Claims of any kind or nature arising from Consultant Parties’ contact with COVID-19 at or near the Property or in relation to the Services.  The foregoing obligations of Consultant are in addition to Consultant’s obligations under Article 5.  In addition, Consultant shall (and ensure that all Consultant Parties) adhere to any federal, state and local requirements and recommendations (including from the Centers for Disease Control and Prevention) related to COVID-19.';
  pollutionLiability: string =
    'If Consultant’s Services include handling, remediation, treatment, storage or disposal of waste or hazardous materials on or about the project site as determined by Owner, Consultant shall maintain a minimum limit of $2,000,000 per incident with a $2,000,000 policy aggregate.  Such coverage shall include defense costs applicable to claims for bodily injury, property damage or clean-up costs.  Claims-made coverage is permitted, provided the policy retroactive date is continuously maintained prior to the commencement date of this Agreement and coverage is continuously maintained during all periods Consultant performs Services for Owner plus an additional period of three (3) years after termination of this Agreement or the last date Services are performed, whichever is later. ';
  paymentHeading: string = 'Payment.';
  paymentBullet: string = '3.3.      ';
  pollutionLiabilityHeading: string = 'Pollution Liability:';
  //  x----
  // Hide show Variable Flatiron
  applicationPaymentFlatiron: string =
    '[NOTE:  SPECIFIC LIEN WAIVER SUBSECTIONS SHOULD ONLY BE INCLUDED IF THE SERVICES ARE OF A TYPE FOR WHICH CONSULTANT HAS A RIGHT TO LIEN THE PROPERTY IN THE STATE.  IF NOT, STATE “[INTENTIONALLY OMITTED]” IN PLACE OF THE LIEN WAIVER LANGUAGE.] Consultant shall deliver to Owner a written invoice (the “Application for Payment”) on or before the fifth (5th) day of each month during the Term describing in reasonable detail all Services performed by Consultant during the previous month.  Provided the Application for Payment is timely delivered to Owner, Owner shall make payment to Consultant not later than the final day of the month.  With each Application for Payment Consultant shall submit (a) such evidence as may be customary, and such evidence as may be reasonably required by Owner, to demonstrate costs incurred or estimated to be incurred on account of the Services and the Contract Amount during such month and the percentage of completion of each category of Services reasonably estimated to the end of the month of the submission of such Application for Payment, (b) certification by Consultant that the Services for which payment is being sought has been completed in accordance with this Agreement and all applicable permits, (c) [a conditional waiver and release of lien upon progress payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to the Services to which the Application for Payment applies][OR][Intentionally omitted], (d) [an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services previously paid through the date of the immediately preceding Application for Payment][OR][Intentionally omitted], (e) a detailed written description and copies of all change orders and other modifications to the Services or this Agreement issued through the date of the Application for Payment and (f) such other information or documentation as may be reasonably requested by Owner or Owner’s lenders.[  Within ten (10) days after Consultant’s receipt of the final payment under this Agreement, Consultant shall deliver to Owner an unconditional waiver and release of lien upon payment from Consultant and each subcontractor complying with the requirements of applicable laws and in the applicable form attached as Exhibit C hereto with respect to all Services.';
  covid: string =
    'COVID-19.  Consultant acknowledges and agrees that COVID-19 may be present in or around the Property and individuals working at or near the Property.  Consultant, on behalf of itself, its affiliates and its subcontractors, and their respective parents, shareholders, partners, directors, officers, employees, material suppliers and other vendors, and each of their respective successors and assigns (collectively with Consultant, the “Consultant Parties”) hereby waives any recourse against, releases Owner, Property Manager and all other Indemnitees from, and expressly assumes the risk of any and all injury, sickness, loss or damage, including death, arising from the presence of COVID-19 in or around the Property or individuals working at or near the Property.  Consultant shall indemnify, reimburse, save, defend (at Owner’s option and with counsel reasonably acceptable to Owner) and hold harmless Owner, Property Manager and the Indemnitees for, from and against any and all Claims of any kind or nature arising from Consultant Parties’ contact with COVID-19 at or near the Property or in relation to the Services.  The foregoing obligations of Consultant are in addition to Consultant’s obligations under Article 5.  In addition, Consultant shall (and ensure that all Consultant Parties) adhere to any federal, state and local requirements and recommendations (including from the Centers for Disease Control and Prevention) related to COVID-19.';

  FormName: any = null;
  flatironOwners: any[] = [];
  selectedOwner: any = null;
  selectedPropertyManager: any = 'BioMed Realty LLC';
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
  selectedPreviousGMP: any = null;
  selectedCOincdec: any = null;
  selectedCompanyChoice: any = null;
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
  addressRepeating: any[] = [];
  fiOwners: any = null;
  fiOwnerSelect: any = null;
  fiOwnersConsulting: any = null;
  fiOwnerConsultingSelect: any = null;
  menuData: any[] = [];
  Region: any[] = [];
  Market: any[] = [];
  Property: any[] = [];
  constructor(
    public serviceContract: ServicecontractService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(route);
    this.obj = new ServiceContract();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.getData();
    this.inWords(1000000);
  }

  getData() {
    this.serviceContract.getAllProperty().then((res) => {
      this.dataProperty = res['d'].results as any[];
      for (var count = 0; count < this.dataProperty.length; count++) {
        var order = this.dataProperty[count];
        // console.log(order);
        var lines = (order.FREDDPropertyName.results[0].Label).split(':'); //{rod/Staging
        // var lines = order.Fredd_x0020_Property_x0020_Name_.split(':'); //Local
        //Prod/Staging
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
        //   Property: lines[3],
        //   ID: order.ID,
        //   Region: lines[1],
        //   Market: lines[2],
        //   Owner: order.EntityName,
        //   StateOfFormation: order.StateofFormation,
        //   AdditionalInsureds: order.AdditionalInsureds,
        //   EntityID: order.EntityID,
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
      this.Property = [
        ...new Map(
          this.menuData.map((item) => [item['Property'], item])
        ).values(),
      ];
      this.Property = this.Property.sort((a, b) =>
        a.Property > b.Property ? 1 : -1
      );
      console.log(this.Region);
    });
  }

  FormBind() {
    this.FormName = this.selectedForm.Title;
    // if (this.selectedForm.Title == 'Consulting Services'){
    //   this.ConsultingService = this.ConsultingServiceTemp.Title
    // }
    this.selectedOwner = undefined;
    if (this.FormName == 'Flatiron Service Contract') {
      this.flatironOwners = this.Property.filter((a) => {
        return a.Market === 'Colorado';
      });
    }
  }
  flatironOwnerSelection(value) {
    console.log(this.fiOwnersConsulting);
    this.addressRepeating = [];
    for (var i = 0; i < value.value.length; i++) {
      this.addressRepeating.push({
        Address: '',
        Name: value.value[i].Owner,
        ID: value.value[i].EntityID,
        ownerSOF: value.value[i].StateOfFormation,
      });
    }
  }

  OwnerSelect(selection) {
    this.selectedOwner = selection;
    var eID = this.selectedOwner.EntityID;

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
  onChange(value: any) {}
  resetStates(servicecontract: NgForm) {
    if (servicecontract != undefined) {
      // Consulting Services
      this.selectedStreetAddress = '';
      this.selectedEmergencyCompensation = '';
      this.selectedContractAmount = '';
      this.selectedMonthlyCompensation = '';
      this.selectedYearlyCompensation = '';
      this.selectedReimbursableExpenses = '';
      this.selectedPayment = '';
      this.selectedCovid = '';
      this.selectedPollutionLiability = null;
      // xxxx----xxx
      this.selectedPropertyAddress = '';
      this.selectedPropertyManager = 'BioMed Realty LLC';
      this.selectedContractor = '';
      this.selectedContractorStateOfFormation = '';
      this.selectedContractorAddress = '';
      this.selectedContractorCity = '';
      this.selectedContractorZip = '';
      this.selectedContractorState = '';
      this.selectedContractorAttn = '';
      this.selectedContractorEmail = '';
      this.selectedExecutionDate = '';
      this.selectedExpirationDate = '';
      this.selectedCommencementDate = '';
      this.selectedIncludeTM = null;
      this.addressRepeating = [];

      if (this.selectedForm.Title == 'Change Order Form') {
        this.selectedCOnum = '';
        this.selectedProjectNum = '';
        this.selectedDate = '';
        this.selectedContractDate = '';
        this.selectedChangeCAGMP = null;
        this.selectedCAGMP = null;
        this.selectedOriginalGMP = '';
        this.selectedNetIncDec = null;
        this.selectedNetChange = '';
        this.selectedPreviousGMP = '';
        this.selectedCOincdec = null;
        this.selectedCOamount = '';
        this.selectedNewGMP = '';
        this.selectedChangeTime = null;
        this.selectedTimeChange = '';
        this.selectedSOWrevised = null;
        this.selectedSubComp = null;
        this.selectedSubstantialCompletionDate = '';
      }
      if (this.selectedForm.Title != 'Consulting Services (Draft)') {
        this.ConsultingServiceTemp = '';
      }
    }
  }
  resetCOgmp() {
    this.selectedCAGMP = 'Contact Amount/GMP';
    this.selectedOriginalGMP = '';
    this.selectedNetIncDec = 'increase/decrease';
    this.selectedNetChange = '';
    this.selectedPreviousGMP = 0;
    this.selectedCOincdec = 'increased/decreased';
    this.selectedCOamount = '';
    this.selectedNewGMP = 0;
  }
  resetCOtime() {
    this.selectedTimeChange = '';
    this.selectedSOWrevised = null;
    this.selectedSubComp = null;
    this.selectedSubstantialCompletionDate = '';
  }
  resetSubComp() {
    this.selectedSubstantialCompletionDate = '';
  }
  invalidateFields() {
    if (this.selectedOwner === null) return true;
    if (this.selectedPropertyAddress === null) return true;
    if (this.selectedPropertyManager === null) return true;
    if (this.selectedContractor === null) return true;
    if (this.selectedContractorStateOfFormation === null) return true;
    if (this.selectedContractorAddress === null) return true;
    if (this.selectedContractorCity === null) return true;
    if (this.selectedContractorState === null) return true;
    if (this.selectedContractorZip === null) return true;
    if (this.selectedExecutionDate === null) return true;
    if (this.selectedCommencementDate === null) return true;
    if (this.selectedExpirationDate === null) return true;
    if (this.addressRepeating === [] || this.addressRepeating === null)
      return true;
    for (var k = 0; k < this.addressRepeating.length; k++) {
      if (
        this.addressRepeating[k].Address === '' ||
        this.addressRepeating[k].Address === null
      ) {
        {
          return true;
        }
      }
    }

    return false;
  }
  calc() {
    console.log('Calculation');
    if (this.selectedNetIncDec == 'Increase') {
      this.selectedPreviousGMP =
        parseFloat(this.selectedOriginalGMP) +
        parseFloat(this.selectedNetChange);
    } else if (this.selectedNetIncDec == 'Decrease') {
      this.selectedPreviousGMP =
        parseFloat(this.selectedOriginalGMP) -
        parseFloat(this.selectedNetChange);
    } else if (this.selectedNetChange == undefined) {
      this.selectedPreviousGMP = '';
    }

    if (this.selectedCOincdec == 'Increase') {
      this.selectedNewGMP =
        parseFloat(this.selectedPreviousGMP) +
        parseFloat(this.selectedCOamount);
    } else if (this.selectedCOincdec == 'Decrease') {
      this.selectedNewGMP =
        parseFloat(this.selectedPreviousGMP) -
        parseFloat(this.selectedCOamount);
    } else {
      this.selectedNewGMP = '';
    }
  }

  clearPM() {
    this.selectedPropertyManager = null;
  }
  ConsultinServiceTem: any[] = [
    { ID: 1, Title: 'General Contract' },
    { ID: 2, Title: 'Flatiron Service Contract' },
  ];

  ConsultingTem(value: any) {
    if (value == 'Flatiron Service Contract') {
      this.flatironOwners = this.Property.filter((a) => {
        return a.Market === 'Colorado';
      });
    }
  }

numberToEnglish( n ) {
        
  var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';

  string = string.replace(/[, ]/g,"");

  if( parseInt( string ) === 0 ) {
      return 'zero';
  }
  units = [ '','One ','Two ','Three ','Four ','Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen ', ];
  
  tens = ['','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety', ];
  
  scales = [ '', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion','Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion' ];
  
  start = string.length;
  chunks = [];
  while( start > 0 ) {
      end = start;
      chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
  }
  chunksLen = chunks.length;
  if( chunksLen > scales.length ) {
      return '';
  }
  
  /* Stringify each integer in each chunk */
  words = [];
  for( i = 0; i < chunksLen; i++ ) {
      
      chunk = parseInt( chunks[i] );
      
      if( chunk ) {
          
          /* Split chunk into array of individual integers */
          ints = chunks[i].split( '' ).reverse().map( parseFloat );
      
          /* If tens integer is 1, i.e. 10, then add 10 to units integer */
          if( ints[1] === 1 ) {
              ints[0] += 10;
          }
          
          /* Add scale word if chunk is not zero and array item exists */
          if( ( word = scales[i] ) ) {
              words.push( word );
          }
          
          /* Add unit word if array item exists */
          if( ( word = units[ ints[0] ] ) ) {
              words.push( word );
          }
          
          /* Add tens word if array item exists */
          if( ( word = tens[ ints[1] ] ) ) {
              words.push( word );
          }
          
          /* Add 'and' string after units or tens integer if: */
          if( ints[0] || ints[1] ) {
              
              /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
              if( ints[2] || ! i && chunksLen ) {
                  words.push( and );
              }
          
          }
          
          /* Add hundreds word if array item exists */
          if( ( word = units[ ints[2] ] ) ) {
              words.push( word + ' Hundred' );
          }
          
      }
      
  }
  
  return words.reverse().join( ' ' );
  
}


// - - - - - Tests - - - - - -
inWords(v) {
return this.numberToEnglish(v)+" ";
}
  onSave() {
    //SERVICE CONTRACT
    if (this.selectedForm.Title == 'Service Contract') {
      var steUrl ='/sites/fredd/SourceCode1/ChangeOrder/assets/template/ServiceContractTemplate.docx'; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/ServiceContractTemplate.docx"; //Staging
      var steUrl = "/assets/template/ServiceContractTemplate.docx" //local
    } else if (this.selectedForm.Title == 'TRS Service Contract') {
      var steUrl = '/sites/fredd/SourceCode1/ChangeOrder/assets/template/TRSContractTemplate.docx'; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
       //var steUrl = "/assets/template/TRSContractTemplate.docx" //local
    } else if (this.selectedForm.Title == 'Change Order Form') {
      var steUrl = '/sites/fredd/SourceCode1/ChangeOrder/assets/template/ChangeOrderTemplate.docx'; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
      //var steUrl = "/assets/template/ChangeOrderTemplate.docx" //local
    } else if (this.selectedForm.Title == 'Flatiron Service Contract') {
      var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/FlatironServiceContractTemplate.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/FlatironServiceContractTemplate.docx"; //Staging
      //var steUrl = '/assets/template/FlatironServiceContractTemplate.docx'; //local
    } else if (this.selectedForm.Title == 'Service Contract BMR LP') {
      var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/ServiceTemplateBMR LPclean.docx"; //prod
      //var steUrl = "/sites/fredd/SourceCode/assets/template/ServiceContractTemplate.docx"; //Staging
      //var steUrl = '/assets/template/ServiceTemplateBMR LPclean.docx'; //local
    } else if (this.ConsultingServiceTemp == 'General Contract') {
       var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/ConsultingServicesAgreement.docx"; //prod
      // var steUrl = '/assets/template/ConsultingServicesAgreement.docx'; //local
    } else if (this.ConsultingServiceTemp == 'Flatiron Service Contract') {
       var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/ConsultingServicesFlatironTem.docx"; //prod
      // var steUrl = '/assets/template/ConsultingServicesFlatironTem.docx'; //local
    }

    var docx = new DocxReader();
    docx.Load(steUrl, () => {
      var docxvar = {};
      if (docx.Search('City') == true) {
        docxvar['City'] = this.selectedContractorCity;
      }
      if (docx.Search('State') == true) {
        docxvar['State'] = this.selectedContractorState.Title;
      }
      if (docx.Search('ZipCode') == true) {
        docxvar['ZipCode'] = this.selectedContractorZip;
      }
      if (docx.Search('ContractorName') == true) {
        docxvar['ContractorName'] = this.selectedContractor;
      }
      if (docx.Search('ContractorStreetAddress') == true) {
        docxvar['ContractorStreetAddress'] = this.selectedContractorAddress;
      }
      if (docx.Search('ContractorAttn') == true) {
        if (
          this.selectedContractorAttn == '' ||
          this.selectedContractorAttn == undefined
        ) {
          docxvar['ContractorAttn'] = '\n';
        } else {
          docxvar['ContractorAttn'] = 'Attn: ' + this.selectedContractorAttn;
        }
      }
      if (docx.Search('ContractorEmail') == true) {
        if (
          this.selectedContractorEmail == '' ||
          this.selectedContractorEmail == undefined
        ) {
          docxvar['ContractorEmail'] = '\n';
        } else {
          docxvar['ContractorEmail'] = 'Email: ' + this.selectedContractorEmail;
        }
      }
      if (docx.Search('ExecutionDate') == true) {
        docxvar['ExecutionDate'] = moment(this.selectedExecutionDate).format(
          'MM/DD/YY'
        );
      }
      if (docx.Search('CommencementDate') == true) {
        docxvar['CommencementDate'] = moment(
          this.selectedCommencementDate
        ).format('MM/DD/YY');
      }
      if (docx.Search('ExpirationDate') == true) {
        docxvar['ExpirationDate'] = moment(this.selectedExpirationDate).format(
          'MM/DD/YY'
        );
      }
      if (docx.Search('PropertyManager') == true) {
        if (
          this.selectedPropertyManager == '' ||
          this.selectedPropertyManager == undefined
        ) {
          docxvar['PropertyManager'] = 'BioMed Realty LLC';
        } else {
          docxvar['PropertyManager'] = this.selectedPropertyManager;
        }
      }
      if (docx.Search('ContractorStateOfFormation') == true) {
        docxvar['ContractorStateOfFormation'] =
          this.selectedContractorStateOfFormation;
      }
      if (this.selectedIncludeTM == true) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☑';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☐';
        }
      }
      if (this.selectedIncludeTM == false) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☐';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☑';
        }
      }
      if (this.selectedIncludeTM == undefined) {
        if (docx.Search('TM_Y') == true) {
          docxvar['TM_Y'] = '☐';
        }
        if (docx.Search('TM_N') == true) {
          docxvar['TM_N'] = '☑';
        }
      }
      if (docx.Search('PropertyAddress') == true) {
        docxvar['PropertyAddress'] = this.selectedPropertyAddress;
      }
      if (docx.Search('ContractAmount') == true) {
        docxvar['ContractAmount'] = this.selectedContractAmount;
      }
      if (docx.Search('ContractAmountSpell') == true) {
        docxvar['ContractAmountSpell'] = this.inWords(
          this.selectedContractAmount
        );
      }
      if (docx.Search('MonthlyCompensation') == true) {
        docxvar['MonthlyCompensation'] = this.selectedMonthlyCompensation;
      }
      if (docx.Search('MonthlyCompensationSpell') == true) {
        docxvar['MonthlyCompensationSpell'] = this.inWords(
          this.selectedMonthlyCompensation
        );
      }
      if (docx.Search('YearlyCompensation') == true) {
        docxvar['YearlyCompensation'] = this.selectedYearlyCompensation;
      }
      if (docx.Search('YearlyCompensationSpell') == true) {
        docxvar['YearlyCompensationSpell'] = this.inWords(
          this.selectedYearlyCompensation
        );
      }
      if (docx.Search('EmergencyCompensation') == true) {
        docxvar['EmergencyCompensation'] = this.selectedEmergencyCompensation;
      }
      if (docx.Search('EmergencyCompensationSpell') == true) {
        docxvar['EmergencyCompensationSpell'] = this.inWords(
          this.selectedEmergencyCompensation
        );
      }
      if (docx.Search('ReimbursableExpenses') == true) {
        docxvar['ReimbursableExpenses'] = this.selectedReimbursableExpenses;
      }
      if (docx.Search('ReimbursableExpensesSpell') == true) {
        docxvar['ReimbursableExpensesSpell'] = this.inWords(
          this.selectedReimbursableExpenses
        );
      }

      if (this.selectedIncludeTM == true) {
        if (docx.Search('scopeService') == true) {
          docxvar['scopeService'] = this.scopeService;
        }
        if (docx.Search('compensationTM') == true) {
          docxvar['compensationTM'] = this.compensationTM;
        }
      } else {
        if (docx.Search('scopeService') == true) {
          docxvar['scopeService'] = '';
        }
        if (docx.Search('compensationTM') == true) {
          docxvar['compensationTM'] = '.';
        }
      }
      if (docx.Search('Owner') == true) {
        docxvar['Owner'] = this.selectedOwner.Owner;
      }
      if (docx.Search('OwnerStateOfFormation') == true) {
        if (this.selectedOwner.StateOfFormation == undefined) {
          docxvar['OwnerStateOfFormation'] = '';
        } else {
          docxvar['OwnerStateOfFormation'] =
            this.selectedOwner.StateOfFormation;
        }
      }
      if (docx.Search('AdditionalInsureds') == true) {
        if (
          this.selectedOwner.Owner == 'B9 LS Harrison & Washington LLC' ||
          this.selectedOwner.Owner == 'BRE-BMR Middlesex LLC' ||
          this.selectedOwner.Owner == 'BRE-BMR Acquisition Holdings LLC' ||
          this.selectedOwner.Owner == 'B9 Island Parkway LLC' ||
          this.selectedOwner.Owner == 'B9 Island Parkway Development LLC'
        ) {
          docxvar['AdditionalInsureds'] = ', BRE Edison III LP,';
        } else if (
          this.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
          this.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC'
        ) {
          docxvar['AdditionalInsureds'] =
            ', 20 Sidney Street Condominium Trust';
        } else {
          docxvar['AdditionalInsureds'] = '';
        }
      }
      if (docx.Search('AdditionalInsureds') == true) {
        if (this.selectedOwner.AdditionalInsureds != undefined) {
          docxvar['AdditionalInsureds'] =
            ', ' + this.selectedOwner.AdditionalInsureds;
        } else {
          docxvar['AdditionalInsureds'] = '';
        }
      }
      if (this.selectedForm.Title == 'Service Contract') {
        if (docx.Search('Owner') == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        if (docx.Search('Owner') == true) {
          docxvar['CopyTo'] = this.selectedOwner.Owner;
        }
        if (docx.Search('OwnerStateOfFormation') == true) {
          if (this.selectedOwner.StateOfFormation == undefined) {
            docxvar['OwnerStateOfFormation'] = '';
          } else {
            docxvar['OwnerStateOfFormation'] =
              this.selectedOwner.StateOfFormation;
          }
        }
        if (docx.Search('Contractor') == true) {
          docxvar['Contractor'] = this.selectedContractor;
        }
        if (docx.Search('Section8_2') == true) {
          if (this.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable present and future laws, ordinances, codes, rules, regulations, and requirements of federal, state, and municipal governments, departments, commissions, boards, and officers, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          } else {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable federal, state and local laws, ordinances, codes, rules and regulations, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          }
        }
        if (docx.Search('Section19') == true) {
          if (this.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section19'] =
              'During the performance of this Contract, Contractor shall comply with all applicable federal and state laws, rules, regulations, and orders, and any rules and orders provided by Owner on behalf of itself or any ground lessor of the Property, pertaining to civil rights and equal opportunity unless otherwise exempt therein. Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.  Contractor shall not discriminate against any person, employee, or applicant for employment because of race, color, religion, national origin, age, sex, sexual orientation, disability, or Vietnam era veteran status in the provision of services, the hiring and discharging of employees, and the selection of suppliers and Subcontractors.  Contractor shall conspicuously post notices to employees and prospective employees setting forth the Fair Employment Practices Law of the Commonwealth of Massachusetts.';
          } else if (
            this.selectedOwner.Owner == '20 Sidney Street Condiminium Trust' ||
            this.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 26 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 300 Massachusetts LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 31st LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 35 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 350 Massachusetts LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 38 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 40 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 64 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 65 & 80 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 88 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Pilgrim & Sidney LLC'
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
            this.selectedOwner.Owner == 'B9 LS Harrison & Washington LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Middlesex LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Acquisition Holdings LLC' ||
            this.selectedOwner.Owner == 'B9 Island Parkway LLC' ||
            this.selectedOwner.Owner == 'B9 Island Parkway Development LLC'
          ) {
            docxvar['AdditionalInsureds'] = ', BRE Edison III LP,';
          } else if (
            this.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC'
          ) {
            docxvar['AdditionalInsureds'] =
              ', 20 Sidney Street Condominium Trust';
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
        if (docx.Search('AdditionalInsureds') == true) {
          if (this.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] =
              ', ' + this.selectedOwner.AdditionalInsureds;
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
      }
      //TRS SERVICE CONTRACT
      if (this.selectedForm.Title == 'TRS Service Contract') {
        // if (docx.Search('Owner') == true) {
        //   docxvar['Owner'] = this.selectedOwner.Owner;
        // }
        if (docx.Search('Section8_2') == true) {
          if (this.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable present and future laws, ordinances, codes, rules, regulations, and requirements of federal, state, and municipal governments, departments, commissions, boards, and officers, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          } else {
            docxvar['Section8_2'] =
              'Contractor shall comply and shall cause all subcontractors, material suppliers and laborers (collectively, “Subcontractors”) to comply with all applicable federal, state and local laws, ordinances, codes, rules and regulations, including but not limited to those relating to labor, health, fire, safety and construction (“Applicable Laws”), as well as Owner’s safety standards and protocols, and shall obtain and pay for, or shall arrange for the payment of, all licenses, permits and fees required by any governmental authority having jurisdiction over the Services, all of which payments are included in the Contract Amount payable to Contractor hereunder.  Without limiting the generality of the foregoing, Contractor shall, at its own cost, and included within the Contract Amount, secure and maintain, and shall provide Owner with copies of, permits and licenses necessary to carry out the Services.  Contractor shall (and shall cause all Subcontractors to) comply with and be responsible for all requirements under the rules and regulations of the Occupational Safety and Health Act of 1970 (as amended) and any other State-specific occupational safety and health plan or program in effect in the State in which (and at the time that) the Services are performed. Contractor acknowledges and agrees that the Contract Amount includes all applicable local, state, and federal taxes required to be paid by Contractor in connection with this Contract or the Services, including gross receipts and sales taxes, and any benefits related to employee programs or benefits, and that Contractor is solely responsible for the payment of such taxes, and Owner has no obligation to contribute any amounts toward the payment of such taxes. Contractor shall pay, and shall indemnify, defend and hold harmless Owner from and against its failure to pay, all such obligations.';
          }
        }
        if (docx.Search('Section19') == true) {
          if (this.selectedOwner.Owner == 'BRE-BMR Congress LLC') {
            docxvar['Section19'] =
              'During the performance of this Contract, Contractor shall comply with all applicable federal and state laws, rules, regulations, and orders, and any rules and orders provided by Owner on behalf of itself or any ground lessor of the Property, pertaining to civil rights and equal opportunity unless otherwise exempt therein. Contractor shall offer employment opportunity to all qualified persons without regard to race, color, religion, national origin, sex or age.  Contractor shall establish and enforce procedures and practices to ensure equal employment opportunities in recruiting, hiring, training, upgrading, promotions, transfer, layoffs, recalls, terminations, compensations, working conditions, benefits and privileges.  Contractor shall not discriminate against any person, employee, or applicant for employment because of race, color, religion, national origin, age, sex, sexual orientation, disability, or Vietnam era veteran status in the provision of services, the hiring and discharging of employees, and the selection of suppliers and Subcontractors.  Contractor shall conspicuously post notices to employees and prospective employees setting forth the Fair Employment Practices Law of the Commonwealth of Massachusetts.';
          } else if (
            this.selectedOwner.Owner == '20 Sidney Street Condiminium Trust' ||
            this.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 26 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 300 Massachusetts LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 31st LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 35 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 350 Massachusetts LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 38 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 40 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 64 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 65 & 80 Landsdowne LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 88 Sidney LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Pilgrim & Sidney LLC'
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
            this.selectedOwner.Owner == 'B9 LS Harrison & Washington LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Middlesex LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR Acquisition Holdings LLC' ||
            this.selectedOwner.Owner == 'B9 Island Parkway LLC' ||
            this.selectedOwner.Owner == 'B9 Island Parkway Development LLC'
          ) {
            docxvar['AdditionalInsureds'] = ', BRE Edison III LP,';
          } else if (
            this.selectedOwner.Owner == 'BRE-BMR Franklin LLC' ||
            this.selectedOwner.Owner == 'BRE-BMR 20 Sidney LLC'
          ) {
            docxvar['AdditionalInsureds'] =
              ', 20 Sidney Street Condominium Trust';
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
        if (docx.Search('AdditionalInsureds') == true) {
          if (this.selectedOwner.AdditionalInsureds != undefined) {
            docxvar['AdditionalInsureds'] =
              ', ' + this.selectedOwner.AdditionalInsureds;
          } else {
            docxvar['AdditionalInsureds'] = '';
          }
        }
      }
      //CHANGE ORDER FORM
      if (this.selectedForm.Title == 'Change Order Form') {
        //CO
        var docxvar = {};

        if (docx.Search('Owner') == true) {
          docxvar['Owner'] = this.selectedOwner.Owner;
        }
        if (docx.Search('CO_Num') == true) {
          docxvar['CO_Num'] = this.selectedCOnum;
        }
        if (docx.Search('Date') == true) {
          docxvar['Date'] = moment(this.selectedDate).format('MM/DD/YY');
        }
        if (docx.Search('ContractDate') == true) {
          docxvar['ContractDate'] = moment(this.selectedContractDate).format(
            'MM/DD/YY'
          );
        }
        if (docx.Search('ProjectNumber') == true) {
          docxvar['ProjectNumber'] = this.selectedProjectNum;
        }
        if (this.selectedChangeCAGMP == (false || undefined)) {
          this.selectedCAGMP = 'Contract Amount/GMP';
          this.selectedNetIncDec = 'increase/decrease';
          this.selectedCOincdec = 'increased/decreased';
          this.selectedOriginalGMP = 0;
          this.selectedNetChange = 0;
          this.selectedPreviousGMP = 0;
          this.selectedCOamount = 0;
          this.selectedNewGMP = 0;
        }

        if (docx.Search('CA_GMP') == true) {
          docxvar['CA_GMP'] = this.selectedCAGMP;
        }
        if (docx.Search('OriginalGMP') == true) {
          docxvar['OriginalGMP'] = Number(this.selectedOriginalGMP).toFixed(2);
        }
        if (docx.Search('NetIncDec') == true) {
          docxvar['NetIncDec'] = this.selectedNetIncDec.toLowerCase();
        }
        if (docx.Search('NetChange') == true) {
          docxvar['NetChange'] = Number(this.selectedNetChange).toFixed(2);
        }
        if (docx.Search('PreviousGMP') == true) {
          if (this.selectedNetIncDec == 'Increase') {
            this.selectedPreviousGMP =
              parseFloat(this.selectedOriginalGMP) +
              parseFloat(this.selectedNetChange);
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(
              2
            );
          }
          if (this.selectedNetIncDec == 'Decrease') {
            this.selectedPreviousGMP =
              parseFloat(this.selectedOriginalGMP) -
              parseFloat(this.selectedNetChange);
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(
              2
            );
          }
          if (this.selectedNetIncDec == 'increase/decrease') {
            this.selectedPreviousGMP = 0;
            docxvar['PreviousGMP'] = Number(this.selectedPreviousGMP).toFixed(
              2
            );
          }
        }
        if (docx.Search('CO_IncDec') == true) {
          if (this.selectedCOincdec == 'increased/decreased') {
            docxvar['CO_IncDec'] = this.selectedCOincdec;
          } else {
            docxvar['CO_IncDec'] = this.selectedCOincdec.toLowerCase() + 'd';
          }
        }
        if (docx.Search('CO_Amount') == true) {
          docxvar['CO_Amount'] = Number(this.selectedCOamount).toFixed(2);
        }
        if (docx.Search('NewGMP') == true) {
          if (this.selectedCOincdec == 'Increase') {
            this.selectedNewGMP =
              parseFloat(this.selectedPreviousGMP) +
              parseFloat(this.selectedCOamount);
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
          if (this.selectedCOincdec == 'Decrease') {
            this.selectedNewGMP =
              parseFloat(this.selectedPreviousGMP) -
              parseFloat(this.selectedCOamount);
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
          if (this.selectedCOincdec == 'increased/decreased') {
            this.selectedNewGMP = 0;
            docxvar['NewGMP'] = Number(this.selectedNewGMP).toFixed(2);
          }
        }

        if (this.selectedChangeTime == true) {
          if (docx.Search('ContractTime') == true) {
            docxvar['ContractTime'] =
              'The Contract Time will be ' +
              this.selectedTimeIncDec.toLowerCase() +
              'd by ' +
              this.selectedTimeChange +
              ' days.';
          }
        }
        if (this.selectedChangeTime == false) {
          if (docx.Search('ContractTime') == true) {
            docxvar['ContractTime'] = '';
          }
        }
        if (this.selectedChangeTime == undefined) {
          if (docx.Search('ContractTime') == true) {
            docxvar['ContractTime'] = '';
          }
        }

        if (docx.Search('SOW_Revised') == true) {
          if (this.selectedSOWrevised == true) {
            docxvar['SOW_Revised'] =
              'The Scope of Work is revised to include the Work described in Exhibit B hereto.';
          }
          if (this.selectedSOWrevised == false) {
            docxvar['SOW_Revised'] = '';
          }
          if (this.selectedSOWrevised == undefined) {
            docxvar['SOW_Revised'] = '';
          }
        }
        if (docx.Search('SubstantialCompletion') == true) {
          if (this.selectedSubComp == true) {
            docxvar['SubstantialCompletion'] =
              'The Scheduled Date of Substantial Completion as of the date of this Change Order, therefore, is ';
            if (docx.Search('SubstantialCompletionDate') == true) {
              docxvar['SubstantialCompletionDate'] =
                moment(this.selectedSubstantialCompletionDate).format(
                  'MM/DD/YY'
                ) + '.';
            }
          }
          if (this.selectedSubComp == false) {
            docxvar['SubstantialCompletion'] = '';
            if (docx.Search('SubstantialCompletionDate') == true) {
              docxvar['SubstantialCompletionDate'] = '';
            }
          }
          if (this.selectedSubComp == undefined) {
            docxvar['SubstantialCompletion'] = '';
            if (docx.Search('SubstantialCompletionDate') == true) {
              docxvar['SubstantialCompletionDate'] = '';
            }
          }
        }
      }
      //FLATIRON SERVICE CONTRACT
      if (this.selectedForm.Title == 'Flatiron Service Contract') {
        for (var j = 0; j < 8; j++) {
          docxvar['OwnersSelected' + j] = '';
          docxvar['OwnersSelected' + this.addressRepeating.length] = '';
          docxvar['OwnersSelected8'] = ''; //for state of formation when all owners selected
          docxvar['OwnersSelectedT' + j] = '';
          docxvar['PropertyAddress' + j] = '';
        }
        for (var i = 0; i < this.addressRepeating.length; i++) {
          if (docx.Search('OwnersSelected' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['OwnersSelected' + i] = '';
            } else {
              if (i != this.addressRepeating.length - 1) {
                docxvar['OwnersSelected' + i] =
                  this.addressRepeating[i].Name + ', ';
              } else {
                docxvar['OwnersSelected' + i] = this.addressRepeating[i].Name;
                if (this.addressRepeating.length > 1) {
                  //Owner State of Formation
                  docxvar['OwnersSelected' + this.addressRepeating.length] =
                    'each, a ' + this.addressRepeating[0].ownerSOF;
                } else {
                  docxvar['OwnersSelected' + this.addressRepeating.length] =
                    'a ' + this.addressRepeating[0].ownerSOF;
                }
              }
            }
          }
          if (docx.Search('OwnersSelectedT' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['OwnersSelectedT' + i] = '';
            } else {
              docxvar['OwnersSelectedT' + i] = this.addressRepeating[i].Name;
            }
          }
          if (docx.Search('PropertyAddress' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['PropertyAddress' + i] = '';
            } else {
              docxvar['PropertyAddress' + i] = this.addressRepeating[i].Address;
            }
          }
        }
      }
      // Consuting Service
      if (this.ConsultingServiceTemp == 'General Contract') {
        // if (this.selectedIncludeTM == true) {
        //   if (docx.Search("scopeService") == true) {
        //     docxvar['scopeService'] = this.scopeService;
        //   }
        //   if (docx.Search("compensationTM") == true) {
        //     docxvar['compensationTM'] = this.compensationTM;
        //   }
        // }else{
        //   if (docx.Search("scopeService") == true) {
        //     docxvar['scopeService'] = "";
        //   }
        //   if (docx.Search("compensationTM") == true) {
        //     docxvar['compensationTM'] = "";
        //   }
        // }
        if (this.selectedPayment == true) {
          if (docx.Search('selectedPayment') == true) {
            docxvar['selectedPayment'] = this.applicationPayment;
          }
          if (docx.Search('applicationPaymentHeading') == true) {
            docxvar['applicationPaymentHeading'] =
              this.applicationPaymentHeading;
          }
          if (docx.Search('applicationPaymentBullet') == true) {
            docxvar['applicationPaymentBullet'] = this.applicationPaymentbullet;
          }
          if (docx.Search('Payment') == true) {
            docxvar['Payment'] = this.payment;
          }
          if (docx.Search('PaymentHeading') == true) {
            docxvar['PaymentHeading'] = this.paymentHeading;
          }
          if (docx.Search('PaymentBullet') == true) {
            docxvar['PaymentBullet'] = this.paymentBullet;
          }
        } else {
          if (docx.Search('selectedPayment') == true) {
            docxvar['selectedPayment'] = '';
          }
          if (docx.Search('applicationPaymentHeading') == true) {
            docxvar['applicationPaymentHeading'] = '';
          }
          if (docx.Search('applicationPaymentBullet') == true) {
            docxvar['applicationPaymentBullet'] = '';
          }
          if (docx.Search('Payment') == true) {
            docxvar['Payment'] = '';
          }
          if (docx.Search('PaymentHeading') == true) {
            docxvar['PaymentHeading'] = 'Payment';
          }
          if (docx.Search('PaymentBullet') == true) {
            docxvar['PaymentBullet'] = '3.2.      ';
          }
        }

        if (docx.Search('CompanyChoice') == true) {
          docxvar['CompanyChoice'] = this.selectedCompanyChoice;
        }

        if (this.selectedCovid == true) {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = this.covid19;
          }
        } else {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = '';
          }
        }
        if (this.selectedPollutionLiability == true) {
          if (docx.Search('Pollution') == true) {
            docxvar['Pollution'] = this.pollutionLiability;
          }
          if (docx.Search('PollutionHeading') == true) {
            docxvar['PollutionHeading'] = this.pollutionLiabilityHeading;
          }
        } else {
          if (docx.Search('Pollution') == true) {
            docxvar['Pollution'] = '';
          }
          if (docx.Search('PollutionHeading') == true) {
            docxvar['PollutionHeading'] = '';
          }
        }
      }
      //Faltiron
      if (this.ConsultingServiceTemp == 'Flatiron Service Contract') {
        for (var j = 0; j < 8; j++) {
          docxvar['OwnersSelected' + j] = '';
          docxvar['OwnersSelected' + this.addressRepeating.length] = '';
          docxvar['OwnersSelected8'] = ''; //for state of formation when all owners selected
          docxvar['OwnersSelectedT' + j] = '';
          docxvar['PropertyAddress' + j] = '';
        }
        for (var i = 0; i < this.addressRepeating.length; i++) {
          if (docx.Search('OwnersSelected' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['OwnersSelected' + i] = '';
            } else {
              if (i != this.addressRepeating.length - 1) {
                docxvar['OwnersSelected' + i] =
                  this.addressRepeating[i].Name + ', ';
              } else {
                docxvar['OwnersSelected' + i] = this.addressRepeating[i].Name;
                if (this.addressRepeating.length > 1) {
                  //Owner State of Formation
                  docxvar['OwnersSelected' + this.addressRepeating.length] =
                    'each, a ' + this.addressRepeating[0].ownerSOF;
                } else {
                  docxvar['OwnersSelected' + this.addressRepeating.length] =
                    'a ' + this.addressRepeating[0].ownerSOF;
                }
              }
            }
          }
          if (docx.Search('OwnersSelectedT' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['OwnersSelectedT' + i] = '';
            } else {
              docxvar['OwnersSelectedT' + i] = this.addressRepeating[i].Name;
            }
          }
          if (docx.Search('PropertyAddress' + i) == true) {
            if (this.addressRepeating[i].Name == undefined) {
              docxvar['PropertyAddress' + i] = '';
            } else {
              docxvar['PropertyAddress' + i] = this.addressRepeating[i].Address;
            }
          }
        }
        if (this.selectedPayment == true) {
          if (docx.Search('Payment') == true) {
            docxvar['Payment'] = this.applicationPaymentFlatiron;
          }
          if (docx.Search('applicationPaymentHeading') == true) {
            docxvar['applicationPaymentHeading'] =
              this.applicationPaymentHeading;
          }
          if (docx.Search('applicationPaymentBullet') == true) {
            docxvar['applicationPaymentBullet'] = this.applicationPaymentbullet;
          }
          if (docx.Search('PaymentBullet') == true) {
            docxvar['PaymentBullet'] = this.paymentBullet;
          }
        } else {
          if (docx.Search('Payment') == true) {
            docxvar['Payment'] = '';
          }
          if (docx.Search('applicationPaymentHeading') == true) {
            docxvar['applicationPaymentHeading'] = '';
          }
          if (docx.Search('applicationPaymentBullet') == true) {
            docxvar['applicationPaymentBullet'] = '';
          }
          if (docx.Search('PaymentBullet') == true) {
            docxvar['PaymentBullet'] = '3.2.      ';
          }
        }
        if (this.selectedCovid == true) {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = this.covid;
          }
        } else {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = '';
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
      docx.SetName('SC' + ' - ' + this.selectedContractor);
      docx.Download();
    });
  }
}
