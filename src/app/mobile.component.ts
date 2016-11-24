import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'mobile-template',
  template: require('./mobile.component.html')
})

export class MobileComponent implements OnInit{

  private claimFields:ClaimType;
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  expense:number = 2000;
  remark:string = 'Recharge';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(8, claimArr);
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
      this.expense = 2000;
      this.remark= 'Recharge';
  }
  
}