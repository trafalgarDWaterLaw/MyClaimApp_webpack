import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'local-conveyance-template',
  template: require('./local.conveyance.component.html')
})

export class LocalConveyanceComponent implements OnInit{

  private claimFields:ClaimType;
  private modeOfConvey:string[];
  private district:string[];
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  mocSelected:string = 'Taxi';
  distSelected:string = 'DELHI';
  city:string = 'Delhi';
  totalKms:number = 7;
  expense:number = 800;
  remark:string = 'Uber';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(6, claimArr);
            this.district = this.claimService.getDDArrayByLabel('District');
            console.log(this.district);
            this.modeOfConvey = this.claimService.getDDArrayByLabel('Mode of Local Conveyance');
          });
  }
  addClaim(){
    this.claimToAdd = new AddClaim();
    this.claimToAdd.claimType = this.claimFields.name;
    this.claimToAdd.expense = this.expense;
    this.claimToAdd.date = this.claimService.getTodaysDate();
    this.claimService.storeClaim(this.claimToAdd);
    this.setDef();
  }
  setDef(){
      this.mocSelected = 'Taxi';
      this.distSelected= 'DELHI';
      this.city= 'Delhi';
      this.totalKms = 7;
      this.expense = 800;
      this.remark= 'Uber';
  }
  
}