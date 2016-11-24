import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'lodging-template',
  template: require('./lodging.component.html')
})

export class LodgingComponent implements OnInit{
  private claimFields:ClaimType;
  private claimToAdd:AddClaim;
  private district:string[];

  //Fields which can be added to Add claim for extensive information about Claim
  distSelected:string = 'DELHI';
  city:string = 'Delhi';
  noOfDays:number = 3;
  baseAmnt:number = 4500;
  tax:number = 1500;
  expense:number = 6000;
  remark:string = 'Hotel and Food';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(5, claimArr);
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
      this.city= 'Delhi';
      this.baseAmnt = 4500;
      this.tax = 1500;
      this.expense = 6000;
      this.remark= 'Hotel and Food';
  }
}