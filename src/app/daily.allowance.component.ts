import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'daily-allowance-template',
  template: require('./daily.allowance.component.html')
})

export class DailyAllowanceComponent implements OnInit{

  private claimFields:ClaimType;
  private wStatus:string[];
  private district:string[];
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  wstatuSelected:string = 'HEADQUARTERS';
  distSelected:string = 'DELHI';
  city:string = 'Kanpur';
  noOfDays:number = 5;
  expense:number = 2000;
  remark:string = 'Food';

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(4, claimArr);
            this.district = this.claimService.getDDArrayByLabel('District');
            console.log(this.district);
            this.wStatus = this.claimService.getDDArrayByLabel('Working Status');
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
      this.wstatuSelected = 'HEADQUARTERS';
      this.distSelected= 'DELHI';
      this.city= 'Kanpur';
      this.noOfDays = 5;
      this.expense = 2000;
      this.remark= 'Food';
  }
  
}