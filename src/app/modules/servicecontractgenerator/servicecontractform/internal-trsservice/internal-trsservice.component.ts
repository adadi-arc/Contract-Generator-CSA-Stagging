import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContract } from 'src/app/models/servicecontract.model';
import { ServicecontractService } from 'src/app/services/servicecontract.service';
import { contract } from '../modal';
import moment, { invalid } from 'moment';
import { formatCurrency } from '@angular/common'
declare let DocxReader: any;


@Component({
  selector: 'app-internal-trsservice',
  templateUrl: './internal-trsservice.component.html',
  styleUrls: ['./internal-trsservice.component.scss']
})
export class InternalTRSServiceComponent implements OnInit {
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
    // var steUrl ='/sites/fredd/SourceCode1/ChangeOrder/assets/template/InternalTRSServiceContract.docx'; //prod
    var steUrl = '/sites/fredd/SourceCode1/Staging/DocumentFiles/InternalTRSServiceContract.docx'; //Staging Tset
    // var steUrl = '/assets/template/InternalTRSServiceContract.docx'; //local 
    var docx = new DocxReader();
    docx.Load(steUrl, () => {
      var docxvar = {};
      var docName = 'SC';
      if (docx.Search('PropertyAddress') == true) {
        docxvar['PropertyAddress'] = this.formData.selectedPropertyAddress;
      }
      if (docx.Search('ExecutionDate') == true) {
        docxvar['ExecutionDate'] = moment(this.formData.selectedExecutionDate).format(
          'MM/DD/YYYY'
        );
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
      docx.SetName(docName + '' + ' - ' + 'Internal');
      docx.Download();
    });


  }


}
