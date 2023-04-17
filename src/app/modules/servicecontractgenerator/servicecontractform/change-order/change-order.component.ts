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
  selector: 'app-change-order',
  templateUrl: './change-order.component.html',
  styleUrls: ['./change-order.component.scss']
})
export class ChangeOrderComponent implements OnInit {
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
  onChange(value: any) { }

  getData() {
    this.serviceContract.getAllProperty().then((res) => {
      this.dataProperty = res['d'].results as any[];
      for (var count = 0; count < this.dataProperty.length; count++) {
        var order = this.dataProperty[count];
        // console.log(order);
            var lines = (order.FREDDPropertyName.results[0].Label).split(':'); //{rod/Staging
        //  var lines = order.Fredd_x0020_Property_x0020_Name_.split(':'); //Local
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
        //  this.menuData.push({
        //    Property: lines[3],
        //    ID: order.ID,
        //    Region: lines[1],
        //    Market: lines[2],
        //    Owner: order.EntityName,
        //    StateOfFormation: order.StateofFormation,
        //    AdditionalInsureds: order.AdditionalInsureds,
        //    EntityID: order.EntityID,
        //  });
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
    });
  }
  resetCOgmp() {
    this.formData.selectedCAGMP = 'Contact Amount/GMP';
    this.formData.selectedOriginalGMP = '';
    this.formData.selectedNetIncDec = 'increase/decrease';
    this.formData.selectedNetChange = '';
    this.formData.selectedPreviousGMP = 0;
    this.formData.selectedCOincdec = 'increased/decreased';
    this.formData.selectedCOamount = '';
    this.formData.selectedNewGMP = 0;
  }
  resetCOtime() {
    this.formData.selectedTimeChange = '';
    this.formData.selectedSOWrevised = null;
    this.formData.selectedSubComp = null;
    this.formData.selectedSubstantialCompletionDate = '';
  }
  calc() {
    debugger
    console.log('Calculation');
    if (this.formData.selectedNetIncDec == 'Increase') {
      this.formData.selectedPreviousGMP =
        parseFloat(this.formData.selectedOriginalGMP) +
        parseFloat(this.formData.selectedNetChange);
    } else if (this.formData.selectedNetIncDec == 'Decrease') {
      this.formData.selectedPreviousGMP =
        parseFloat(this.formData.selectedOriginalGMP) -
        parseFloat(this.formData.selectedNetChange);
    } else if (this.formData.selectedNetChange == undefined) {
      this.formData.selectedPreviousGMP = '';
    }

    if (this.formData.selectedCOincdec == 'Increase') {
      this.formData.selectedNewGMP =
        parseFloat(this.formData.selectedPreviousGMP) +
        parseFloat(this.formData.selectedCOamount);
    } else if (this.formData.selectedCOincdec == 'Decrease') {
      this.formData.selectedNewGMP =
        parseFloat(this.formData.selectedPreviousGMP) -
        parseFloat(this.formData.selectedCOamount);
    } else {
      this.formData.selectedNewGMP = '';
    }
  }
  resetSubComp() {
    this.formData.selectedSubstantialCompletionDate = '';
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

      this.formData.selectedCOnum = '';
      this.formData.selectedProjectNum = '';
      this.formData.selectedDate = '';
      this.formData.selectedContractDate = '';
      this.formData.selectedChangeCAGMP = null;
      this.formData.selectedCAGMP = null;
      this.formData.selectedOriginalGMP = '';
      this.formData.selectedNetIncDec = null;
      this.formData.selectedNetChange = '';
      this.formData.selectedPreviousGMP = '';
      this.formData.selectedCOincdec = null;
      this.formData.selectedCOamount = '';
      this.formData.selectedNewGMP = '';
      this.formData.selectedChangeTime = null;
      this.formData.selectedTimeChange = '';
      this.formData.selectedSOWrevised = null;
      this.formData.selectedSubComp = null;
      this.formData.selectedSubstantialCompletionDate = '';


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
    // var steUrl = '/sites/fredd/SourceCode1/ChangeOrder/assets/template/ChangeOrderTemplate.docx'; //prod
    var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/ChangeOrderTemplate.docx'; //Staging Tset
    // var steUrl = "/sites/fredd/SourceCode/assets/template/TRSContractTemplate.docx"; //staging
    // var steUrl = '/assets/template/ChangeOrderTemplate.docx'; //local
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
      //CHANGE ORDER FORM

      //CO
      docName = 'CO';

      if (docx.Search('Owner') == true) {
        docxvar['Owner'] = this.formData.selectedOwner.Owner;
      }
      if (docx.Search('CO_Num') == true) {
        docxvar['CO_Num'] = this.formData.selectedCOnum;
      }
      if (docx.Search('Date') == true) {
        docxvar['Date'] = moment(this.formData.selectedDate).format('MM/DD/YY');
      }
      if (docx.Search('ContractDate') == true) {
        docxvar['ContractDate'] = moment(this.formData.selectedContractDate).format(
          'MM/DD/YY'
        );
      }
      if (docx.Search('ProjectNumber') == true) {
        docxvar['ProjectNumber'] = this.formData.selectedProjectNum;
      }
      if (this.formData.selectedChangeCAGMP == (false || undefined)) {
        this.formData.selectedCAGMP = 'Contract Amount/GMP';
        this.formData.selectedNetIncDec = 'increase/decrease';
        this.formData.selectedCOincdec = 'increased/decreased';
        this.formData.selectedOriginalGMP = 0;
        this.formData.selectedNetChange = 0;
        this.formData.selectedPreviousGMP = 0;
        this.formData.selectedCOamount = 0;
        this.formData.selectedNewGMP = 0;
      }

      if (docx.Search('CA_GMP') == true) {
        docxvar['CA_GMP'] = this.formData.selectedCAGMP;
      }
      if (docx.Search('OriginalGMP') == true) {
        docxvar['OriginalGMP'] = Number(this.formData.selectedOriginalGMP).toFixed(2);
      }
      if (docx.Search('NetIncDec') == true) {
        docxvar['NetIncDec'] = this.formData.selectedNetIncDec.toLowerCase();
      }
      if (docx.Search('NetChange') == true) {
        docxvar['NetChange'] = Number(this.formData.selectedNetChange).toFixed(2);
      }
      if (docx.Search('PreviousGMP') == true) {
        if (this.formData.selectedNetIncDec == 'Increase') {
          this.formData.selectedPreviousGMP =
            parseFloat(this.formData.selectedOriginalGMP) +
            parseFloat(this.formData.selectedNetChange);
          docxvar['PreviousGMP'] = Number(this.formData.selectedPreviousGMP).toFixed(
            2
          );
        }
        if (this.formData.selectedNetIncDec == 'Decrease') {
          this.formData.selectedPreviousGMP =
            parseFloat(this.formData.selectedOriginalGMP) -
            parseFloat(this.formData.selectedNetChange);
          docxvar['PreviousGMP'] = Number(this.formData.selectedPreviousGMP).toFixed(
            2
          );
        }
        if (this.formData.selectedNetIncDec == 'increase/decrease') {
          this.formData.selectedPreviousGMP = 0;
          docxvar['PreviousGMP'] = Number(this.formData.selectedPreviousGMP).toFixed(
            2
          );
        }
      }
      if (docx.Search('CO_IncDec') == true) {
        if (this.formData.selectedCOincdec == 'increased/decreased') {
          docxvar['CO_IncDec'] = this.formData.selectedCOincdec;
        } else {
          docxvar['CO_IncDec'] = this.formData.selectedCOincdec.toLowerCase() + 'd';
        }
      }
      if (docx.Search('CO_Amount') == true) {
        docxvar['CO_Amount'] = Number(this.formData.selectedCOamount).toFixed(2);
      }
      if (docx.Search('NewGMP') == true) {
        if (this.formData.selectedCOincdec == 'Increase') {
          this.formData.selectedNewGMP =
            parseFloat(this.formData.selectedPreviousGMP) +
            parseFloat(this.formData.selectedCOamount);
          docxvar['NewGMP'] = Number(this.formData.selectedNewGMP).toFixed(2);
        }
        if (this.formData.selectedCOincdec == 'Decrease') {
          this.formData.selectedNewGMP =
            parseFloat(this.formData.selectedPreviousGMP) -
            parseFloat(this.formData.selectedCOamount);
          docxvar['NewGMP'] = Number(this.formData.selectedNewGMP).toFixed(2);
        }
        if (this.formData.selectedCOincdec == 'increased/decreased') {
          this.formData.selectedNewGMP = 0;
          docxvar['NewGMP'] = Number(this.formData.selectedNewGMP).toFixed(2);
        }
      }

      if (this.formData.selectedChangeTime == true) {
        if (docx.Search('ContractTime') == true) {
          docxvar['ContractTime'] =
            'The Contract Time will be ' +
            this.formData.selectedTimeIncDec.toLowerCase() +
            'd by ' +
            this.formData.selectedTimeChange +
            ' days.';
        }
      }
      if (this.formData.selectedChangeTime == false) {
        if (docx.Search('ContractTime') == true) {
          docxvar['ContractTime'] = '';
        }
      }
      if (this.formData.selectedChangeTime == undefined) {
        if (docx.Search('ContractTime') == true) {
          docxvar['ContractTime'] = '';
        }
      }

      if (docx.Search('SOW_Revised') == true) {
        if (this.formData.selectedSOWrevised == true) {
          docxvar['SOW_Revised'] =
            'The Scope of Work is revised to include the Work described in Exhibit B hereto.';
        }
        if (this.formData.selectedSOWrevised == false) {
          docxvar['SOW_Revised'] = '';
        }
        if (this.formData.selectedSOWrevised == undefined) {
          docxvar['SOW_Revised'] = '';
        }
      }
      if (docx.Search('SubstantialCompletion') == true) {
        if (this.formData.selectedSubComp == true) {
          docxvar['SubstantialCompletion'] =
            'The Scheduled Date of Substantial Completion as of the date of this Change Order, therefore, is ';
          if (docx.Search('SubstantialCompletionDate') == true) {
            docxvar['SubstantialCompletionDate'] =
              moment(this.formData.selectedSubstantialCompletionDate).format(
                'MM/DD/YY'
              ) + '.';
          }
        }
        if (this.formData.selectedSubComp == false) {
          docxvar['SubstantialCompletion'] = '';
          if (docx.Search('SubstantialCompletionDate') == true) {
            docxvar['SubstantialCompletionDate'] = '';
          }
        }
        if (this.formData.selectedSubComp == undefined) {
          docxvar['SubstantialCompletion'] = '';
          if (docx.Search('SubstantialCompletionDate') == true) {
            docxvar['SubstantialCompletionDate'] = '';
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
