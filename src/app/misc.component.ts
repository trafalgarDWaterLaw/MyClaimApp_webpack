import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'misc-template',
  template: require('./misc.component.html')
})

export class MiscComponent implements OnInit{

  private claimFields:ClaimType;
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  expense:number = 2000;
  remark:string = 'Client Meeting';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(9, claimArr);
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
      this.remark= 'Client Meeting';
  }
  
}