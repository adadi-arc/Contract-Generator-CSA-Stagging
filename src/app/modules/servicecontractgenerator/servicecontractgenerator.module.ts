import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicecontractgeneratorRoutingModule } from './servicecontractgenerator-routing.module';
import { ServicecontractgeneratorComponent } from './servicecontractgenerator.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicecontractformComponent } from './servicecontractform/servicecontractform.component';
import { ApplicationPipesModule } from '../../services/AppPipesModule';
import { ServiceContractComponent } from './servicecontractform/service-contract/service-contract.component';
import { TRSServiceContractComponent } from './servicecontractform/trsservice-contract/trsservice-contract.component';
import { ChangeOrderComponent } from './servicecontractform/change-order/change-order.component';
import { FlatironContractComponent } from './servicecontractform/flatiron-contract/flatiron-contract.component';
import { ServiceContratBmrlpComponent } from './servicecontractform/service-contrat-bmrlp/service-contrat-bmrlp.component';
import { GeneralCsaComponent } from './CSA/general-csa/general-csa.component';
import { FlatironCsaComponent } from './CSA/flatiron-csa/flatiron-csa.component';
import { TrsCsaComponent } from './CSA/trs-csa/trs-csa.component';
import { GetwaymanagerTrsServiceComponent } from './servicecontractform/getwaymanager-trs-service/getwaymanager-trs-service.component';
import { InternalTRSServiceComponent } from './servicecontractform/internal-trsservice/internal-trsservice.component';
import { ServiceContractUniversityComponent } from './servicecontractform/service-contract-university/service-contract-university.component';
import { TrsUniversityParkComponent } from './servicecontractform/trs-university-park/trs-university-park.component';


@NgModule({
  declarations: [ServicecontractgeneratorComponent, ServicecontractformComponent, ServiceContractComponent, TRSServiceContractComponent, ChangeOrderComponent, FlatironContractComponent, ServiceContratBmrlpComponent, GeneralCsaComponent, FlatironCsaComponent, TrsCsaComponent, GetwaymanagerTrsServiceComponent, InternalTRSServiceComponent, ServiceContractUniversityComponent, TrsUniversityParkComponent],
  imports: [
    CommonModule,
    ServicecontractgeneratorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,    
    NgxSpinnerModule,
    ApplicationPipesModule,

  ]
})
export class ServicecontractgeneratorModule { }
