import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'hra-template',
  template: require('./hra.component.html')
})

export class HRAComponent implements OnInit{

  private claimFields:ClaimType;
  private district:string[];
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  distSelected:string = 'DELHI';
  city:string = 'Kanpur';
  expense:number = 8000;
  remark:string = 'House Rent';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(7, claimArr);
            this.district = this.claimService.getDDArrayByLabel('District');
            console.log(this.district);
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
      this.distSelected= 'DELHI';
      this.city= 'Kanpur';
      this.expense = 8000;
      this.remark= 'House Rent';
  }
  
}