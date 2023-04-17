import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContract } from 'src/app/models/servicecontract.model';
import { ServicecontractService } from 'src/app/services/servicecontract.service';
import moment, { invalid } from 'moment';
import { formatCurrency } from '@angular/common';
import { contract } from '../../servicecontractform/modal';
declare let DocxReader: any;


@Component({
  selector: 'app-general-csa',
  templateUrl: './general-csa.component.html',
  styleUrls: ['./general-csa.component.scss']
})
export class GeneralCsaComponent implements OnInit {
  pollutionLiabilityHeading: string = 'Contractor’s Pollution Liability:';
  pollutionLiability: string = 'If Consultant or subconsultant’s Services involve environmental hazards including but not limited to assessing, handling, remediating, treating, storage or disposal of waste or hazardous materials on or about the project site as determined by Owner, Consultant shall maintain a minimum limit of $2,000,000 per incident with a $4,000,000 policy aggregate.  Such coverage shall include defense costs applicable to claims for bodily injury, property damage or clean-up costs.  Claims-made coverage is permitted, provided the policy retroactive date is continuously maintained prior to the commencement date of this Agreement and coverage is continuously maintained during all periods Consultant performs Services for Owner plus an additional period through the statute of repose as applicable.'
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
  checkVal(val){
    debugger
    if(val == 'On'){
      this.formData.selectedCommencementDate = null;
    }else if (val == 'No later than'){
      this.formData.selectedExecutionDate = null;
    }

  }
  ngOnInit(): void {

  }
  clearPM() {
    this.formData.selectedPropertyManager = null;
  }
  marketHead = [];
  StateOfFormation: any = [] = [];
  getData() {
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
      this.Region = [
        ...new Map(
          this.menuData.map((item) => [item['Region'], item])
        ).values(),
      ];
      this.Region = this.Region.sort((a, b) => (a.Region > b.Region ? 1 : -1));  
      this.StateOfFormation = [
        ...new Map(
          this.menuData.map((item) => [item['StateOfFormation'], item])
        ).values(),
      ];
      debugger
      this.StateOfFormation = this.Region.sort((a, b) => (a.StateOfFormation > b.StateOfFormation ? 1 : -1));  
      this.marketHeadArr = [
        ...new Map(
          this.menuData.map((item) => [item['Market'], item])
        ).values(),
      ]
      this.marketHeadArr = this.marketHeadArr.sort((a, b) => (a.Market > b.Market ? 1 : -1));
      this.Market = this.marketHeadArr.filter(function (e) {
        return e.Market != 'Colorado';
      })
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
  getFormation(property){
    debugger
  }
  DynamiceState: any = null;;
  OwnerSelect(selection) {
    debugger
    this.DynamiceState = selection.StateOfFormation
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
  yearlyval(){
    this.formData.selectedYearlyCompensation = this.formData.selectedMonthlyCompensation * 12
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
      this.formData.dateSelection = null;
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
      this.pollutionLiabilityHeading = '';
      this.pollutionLiability = '';


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
  
  numberToEnglish(n) {
    var string = n.toString(),
      units,
      tens,
      scales,
      start,
      end,
      chunks,
      chunksLen,
      chunk,
      ints,
      i,
      word,
      words,
      and = 'and';

    /* Remove spaces and commas */
    string = string.replace(/[, ]/g, '');

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return 'zero';
    }

    /* Array of units as words */
    units = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];

    /* Array of tens as words */
    tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    /* Array of scales as words */
    scales = [
      '',
      'Thousand',
      'Million',
      'Billion',
      'Trillion',
      'Quadrillion',
      'Quintillion',
      'Sextillion',
      'Septillion',
      'Octillion',
      'Nonillion',
      'Decillion',
      'Undecillion',
      'Duodecillion',
      'Tredecillion',
      'Quatttuor-decillion',
      'quindecillion',
      'sexdecillion',
      'septen-decillion',
      'octodecillion',
      'novemdecillion',
      'vigintillion',
      'centillion',
    ];

    /* Split user argument into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {
          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' Hundred');
        }
      }
    }

    return words.reverse().join(' ');
  }

  // - - - - - Tests - - - - - -
  inWords(v) {
    return this.numberToEnglish(v) + ' ';
  }

  onSave() {
    //  var steUrl = "/sites/fredd/SourceCode1/ChangeOrder/assets/template/ConsultingServicesAgreement.docx"; //prod
    // var steUrl = '/assets/template/ConsultingServicesAgreement.docx'; //local
    var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/ConsultingServicesAgreement.docx'; //Staging Tset

    var docx = new DocxReader();
    var flg = this.DynamiceState.indexOf(' ');
    let contractorfirstName = this.DynamiceState.substr(0 , flg);    
    docx.Load(steUrl, () => {
      var docxvar = {};
      var docName = 'CC';
      if (docx.Search('dynamicState') == true) {
        docxvar['dynamicState'] = contractorfirstName;
      }
      if (docx.Search('Owner') == true) {
        docxvar['Owner'] = this.formData.selectedOwner.Owner;
      }
    
      if(this.formData.selectedOwner?.Market == 'Massachusetts'){
        if (docx.Search('state') == true) {
          docxvar['state'] = 'Commonwealth';
        }
      }else{
        if (docx.Search('state') == true) {
          docxvar['state'] = 'State';
        }
      }
      if (docx.Search('section5.1') == true) {
        docxvar['section5.1'] = this.formData.section51;
      }
      if (docx.Search('section5.2') == true) {
        docxvar['section5.2'] = this.formData.section52;
      }
      if(this.formData.selectedContractAmount > 50000){
        if (docx.Search('ContractAmnt') == true) {
          docxvar['ContractAmnt'] = this.formData.contractAmnt;
        }
      }else{
        if (docx.Search('ContractAmnt') == true) {
          docxvar['ContractAmnt'] = 'Consultant.'
        }
      }
      if (docx.Search('dateSelection') == true) {
        docxvar['dateSelection'] = this.formData.dateSelection;
      }
      if(this.formData.includeAmount == 'Yes'){
        if (docx.Search('includeAmount') == true) {
          docxvar['includeAmount'] = this.formData.includeAmnt;
        }
      }else{
        if (docx.Search('includeAmount') == true) {
          docxvar['includeAmount'] = '';
        }
      }
      if(this.formData.contractBreakdown == 'Yes'){
        if (docx.Search('breakAmount') == true) {
          docxvar['breakAmount'] = this.formData.contractBreakdownText;
        }
        if (docx.Search('sectionA1') == true) {
          docxvar['sectionA1'] = this.formData.paymentSectionA1;
        }
        if (docx.Search('compensationTM') == true) {
          docxvar['compensationTM'] = this.formData.compensationTM;
        }
        if (docx.Search('sectionABullet') == true) {
          docxvar['sectionABullet'] = 'b.	'
        }
        

        
      }else{
        if (docx.Search('breakAmount') == true) {
          docxvar['breakAmount'] = '';
        }
        if (docx.Search('sectionA1') == true) {
          docxvar['sectionA1'] = '';
        }
    
        if (docx.Search('compensationTM') == true) {
          docxvar['compensationTM'] = '';
        }
        if (docx.Search('sectionABullet') == true) {
          docxvar['sectionABullet'] = 'a.	'
        }
      }
      if(this.formData.contractBreakdown == 'Yes' && this.formData.includedEmergencyservice == 'Yes'){
        if (docx.Search('sectionA2') == true) {
          docxvar['sectionA2'] = this.formData.paymentSectionA2;
        }
        if (docx.Search('sectionA3') == true) {
          docxvar['sectionA3'] = this.formData.paymentSectionA3;
        }
      
      }else{
        if (docx.Search('sectionA2') == true) {
          docxvar['sectionA2'] = '';
        }
        if (docx.Search('sectionA3') == true) {
          docxvar['sectionA3'] = '';
        }
      }
      if (docx.Search('OwnerStateOfFormation') == true) {
        if (this.formData.selectedOwner.StateOfFormation == undefined) {
          docxvar['OwnerStateOfFormation'] = '';
        } else {
          docxvar['OwnerStateOfFormation'] =
            this.formData.selectedOwner.StateOfFormation;
        }
      }
      
      if (this.formData.selectedIncludeTM == true) {
        if (docx.Search('scopeService') == true) {
          docxvar['scopeService'] = this.formData.scopeService;
        }
      
      } else {
        if (docx.Search('scopeService') == true) {
          docxvar['scopeService'] = '';
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
      if (docx.Search('City') == true) {
        docxvar['City'] = this.formData.selectedContractorCity;
      }
      debugger
      if (docx.Search('language') == true) {
        docxvar['language'] = this.formData.chooseLanguage;
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
      debugger
      if (docx.Search('ExecutionDate') == true) {
        if(this.formData.selectedExecutionDate != null){
          docxvar['ExecutionDate'] = moment(
            this.formData.selectedExecutionDate
          ).format('MMMM DD, YYYY');
        }else{
          docxvar['ExecutionDate'] = '';
        }
       
      }
      if (docx.Search('CommencementDate') == true) {
        if(this.formData.selectedCommencementDate != null){
          docxvar['CommencementDate'] = moment(
            this.formData.selectedCommencementDate
          ).format('MMMM DD, YYYY');
        }else{
          docxvar['CommencementDate'] = '';
        }
      
      }
      if (docx.Search('ExpirationDate') == true) {
        docxvar['ExpirationDate'] = moment(
          this.formData.selectedExpirationDate
        ).format('MMMM DD, YYYY');
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

      if (this.formData.selectedContractAmount > 0) {
        if (docx.Search('ContractAmount') == true) {
          docxvar['ContractAmount'] = '($' + formatCurrency(
            Number(this.formData.selectedContractAmount),
            'en-US',
            '',
            '',
            '1.2'
          ) + ') ';
        }
        if (docx.Search('ContractAmountSpell') == true) {
         var finalVal =  this.inWords(
          this.formData.selectedContractAmount 
        );
          docxvar['ContractAmountSpell'] = finalVal + ' Dollars '
        }

      } else {
        if (docx.Search('ContractAmount') == true) {
          docxvar['ContractAmount'] = ''
        }
        if (docx.Search('ContractAmountSpell') == true) {
          docxvar['ContractAmountSpell'] = '';
        }
      }
      if(this.formData.selectedYearlyCompensation > 0 && this.formData.selectedMonthlyCompensation > 0 ){
        if (docx.Search('Or') == true) {
          docxvar['Or'] = 'or ';
        
        }
      }else{
        if (docx.Search('Or') == true) {
          docxvar['Or'] = '';
      }}
      if (this.formData.selectedYearlyCompensation > 0) {
        if (docx.Search('YearlyCompensation') == true) {
          docxvar['YearlyCompensation'] =
            '($' + formatCurrency(
              Number(this.formData.selectedYearlyCompensation),
              'en-US',
              '',
              '',
              '1.2'
            ) + ') ' + 'per year ';
        }
        if (docx.Search('YearlyCompensationSpell') == true) {
          var finalVal  = this.inWords(
            this.formData.selectedYearlyCompensation
          );
          docxvar['YearlyCompensationSpell'] = finalVal + ' Dollars '
        }
      } else {
        if (docx.Search('YearlyCompensation') == true) {
          docxvar['YearlyCompensation'] = '';
        }
        if (docx.Search('YearlyCompensationSpell') == true) {
          docxvar['YearlyCompensationSpell'] = '';
        }

      }
      if (this.formData.selectedMonthlyCompensation > 0) {
        if (docx.Search('MonthlyCompensation') == true) {
          docxvar['MonthlyCompensation'] =
            '($' + formatCurrency(
              Number(this.formData.selectedMonthlyCompensation),
              'en-US',
              '',
              '',
              '1.2'
            ) + ') ' + 'per month ';
        }
        if (docx.Search('MonthlyCompensationSpell') == true) {
          var finalVal = this.inWords(
            this.formData.selectedMonthlyCompensation
          );
          docxvar['MonthlyCompensationSpell'] = finalVal + ' Dollars ' 
        }
      } else {
        if (docx.Search('MonthlyCompensation') == true) {
          docxvar['MonthlyCompensation'] = '';
        }
        if (docx.Search('MonthlyCompensationSpell') == true) {
          docxvar['MonthlyCompensationSpell'] = '';
        }

      }
        if (this.formData.selectedEmergencyCompensation > 0) {
          if (docx.Search('EmergencyCompensation') == true) {
            docxvar['EmergencyCompensation'] =
              '($' + formatCurrency(
                Number(this.formData.selectedEmergencyCompensation),
                'en-US',
                '',
                '',
                '1.2'
              ) + ') ';
          }
          if (docx.Search('EmergencyCompensationSpell') == true) {
            var finalVal = this.inWords(
              this.formData.selectedEmergencyCompensation
            );
            docxvar['EmergencyCompensationSpell'] = finalVal + ' Dollars '
          }
        } else {
          if (docx.Search('EmergencyCompensation') == true) {
            docxvar['EmergencyCompensation'] = '';
          }
          if (docx.Search('EmergencyCompensationSpell') == true) {
            docxvar['EmergencyCompensationSpell'] = '';
          }
  
        }
        if (this.formData.selectedReimbursableExpenses  > 0) {
          if (docx.Search('ReimbursableExpenses') == true) {
            docxvar['ReimbursableExpenses'] =
              '($' + formatCurrency(
                Number(this.formData.selectedReimbursableExpenses),
                'en-US',
                '',
                '',
                '1.2'
              ) + ')';
          }
          if (docx.Search('ReimbursableExpensesSpell') == true) {
            var finalVal = this.inWords(
              this.formData.selectedReimbursableExpenses
            );
            docxvar['ReimbursableExpensesSpell'] = finalVal + ' Dollars '
          }
        } else {
          if (docx.Search('ReimbursableExpenses') == true) {
            docxvar['ReimbursableExpenses'] = '';
          }
          if (docx.Search('ReimbursableExpensesSpell') == true) {
            docxvar['ReimbursableExpensesSpell'] = '';
          }
        }
    
     
        if (this.formData.selectedPayment == true) {
          if (docx.Search('applicationPaymentHeading') == true) {
            docxvar['applicationPaymentHeading'] =
              this.formData.applicationPaymentHeading;
          }
          if (docx.Search('applicationPaymentBullet') == true) {
            docxvar['applicationPaymentBullet'] = this.formData.applicationPaymentbullet;
          }
          if (docx.Search('Payment') == true) {
            docxvar['Payment'] = this.formData.payment;
          }
          if (docx.Search('PaymentHeading') == true) {
            docxvar['PaymentHeading'] = this.formData.paymentHeading;
          }
          if (docx.Search('PaymentBullet') == true) {
            docxvar['PaymentBullet'] = this.formData.paymentBullet;
          }
          if (
            this.formData.selectedOwner.Market == 'San Diego' ||
            this.formData.selectedOwner.Market == 'San Francisco Bay Area'
          ) {
            if (docx.Search('California') == true) {
              docxvar['California'] = this.formData.California;
            }
          } else {
            if (docx.Search('California') == true) {
              docxvar['California'] = '';
            }
          }
          if (this.formData.selectedOwner.Market == 'Colorado') {
            if (docx.Search('Colorado') == true) {
              docxvar['Colorado'] = this.formData.Colorado;
            }
          } else {
            if (docx.Search('Colorado') == true) {
              docxvar['Colorado'] = '';
            }
          }
          if (this.formData.selectedOwner.Market == 'Pennsylvania') {
            if (docx.Search('Delware') == true) {
              docxvar['Delware'] = this.formData.Delware;
            }
          } else if (this.formData.selectedOwner.Market == 'New York') {
            if (docx.Search('Delware') == true) {
              docxvar['Delware'] = this.formData.Delware;
            }
          } else if (this.formData.selectedOwner.Market == 'New Jersey') {
            if (docx.Search('Delware') == true) {
              docxvar['Delware'] = this.formData.Delware;
            }
          } else {
            if (docx.Search('Delware') == true) {
              docxvar['Delware'] = '';
            }
          }
          if (this.formData.selectedOwner.Market == 'Washington') {
            if (docx.Search('Florida') == true) {
              docxvar['Florida'] = this.formData.Florida;
            }
          } else {
            if (docx.Search('Florida') == true) {
              docxvar['Florida'] = '';
            }
          }
          if (this.formData.selectedOwner.Market == 'Massachusetts') {
            if (docx.Search('MASSACHUSETTS') == true) {
              docxvar['MASSACHUSETTS'] = this.formData.MASSACHUSETTS;
            }
          } else {
            if (docx.Search('MASSACHUSETTS') == true) {
              docxvar['MASSACHUSETTS'] = '';
            }
          }
        } else {
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
          if (docx.Search('California') == true) {
            docxvar['California'] = '';
          }
          if (docx.Search('Colorado') == true) {
            docxvar['Colorado'] = '';
          }
          if (docx.Search('MASSACHUSETTS') == true) {
            docxvar['MASSACHUSETTS'] = '';
          }
          if (docx.Search('Delware') == true) {
            docxvar['Delware'] = '';
          }
          if (docx.Search('Florida') == true) {
            docxvar['Florida'] = '';
          }
        }

        if (this.formData.selectedCovid == true) {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = this.formData.covid19;
          }
        } else {
          if (docx.Search('Covid') == true) {
            docxvar['Covid'] = '';
          }
        }
        // if (this.formData.selectedPollutionLiability == true) {
          if (docx.Search('Pollution') == true) {
            docxvar['Pollution'] = this.pollutionLiability;
          }
          if (docx.Search('PollutionHeading') == true) {
            docxvar['PollutionHeading'] = this.pollutionLiabilityHeading;
          }
        // }
        //  else {
        //   if (docx.Search('Pollution') == true) {
        //     docxvar['Pollution'] = '';
        //   }
        //   if (docx.Search('PollutionHeading') == true) {
        //     docxvar['PollutionHeading'] = '';
        //   }
        // }
      



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
