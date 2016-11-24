import { Component, OnInit} from '@angular/core';
import { ClaimType, ExpenseHead, AddClaim } from './Models/claim.type.model';
import {ClaimServices} from  './Services/claims.field.service';

@Component({
  //moduleId: module.id,
  selector: 'claim-template',
  template: require('./claim.component.html')
})

export class ClaimComponent implements OnInit{

  componentBooleanArr:boolean[] = new Array<boolean>(7);
  expenseHeads : ExpenseHead[] = [];
  claimTypeArr:ClaimType[] = [];
  displayClaim:AddClaim[];
  isDisplayClaim:boolean = false;
  private cDate:string;
  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.setDefaultBool();
     this.componentBooleanArr[0] = true;
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimTypeArr = claimArr;
            console.log(this.claimTypeArr);
            this.expenseHeads = this.claimService.getExpenseHeads(claimArr);
            this.cDate = this.claimService.getTodaysDate();
            console.log(this.expenseHeads);
          });
  }
  
  selectForm(id:any){
   console.log('***************************************************');
   console.log('selected drop down ID is' + id);
   console.log('***************************************************');
   if(id === 'Travel'){
     this.setDefaultBool();
     this.componentBooleanArr[0] = true;
   }
   else if(id === 'Daily Allowance'){
     this.setDefaultBool();
     this.componentBooleanArr[1] = true;
   }
   else if(id === 'Lodging and Boarding'){
     this.setDefaultBool();
     this.componentBooleanArr[2] = true;
   }
   else if(id === 'Local Conveyance'){
     this.setDefaultBool();
     this.componentBooleanArr[3] = true;
   }
   else if(id === 'HRA'){
     this.setDefaultBool();
     this.componentBooleanArr[4] = true;
   }
   else if(id === 'Mobile'){
     this.setDefaultBool();
     this.componentBooleanArr[5] = true;
   }
   else if(id === 'Misc'){
     this.setDefaultBool();
     this.componentBooleanArr[6] = true;
   }
 }

 setDefaultBool(){
   for(let sze = 0; sze< 7; sze++){
     this.componentBooleanArr[sze] = false;
   }
   console.log('Component Boolean***************************************************');
   console.log(this.componentBooleanArr);
 }

 showClaim(){
   this.claimService.getClaims().then((claimArr)=>{
            this.displayClaim = claimArr;
            console.log(this.displayClaim);
            if(this.displayClaim.length != 0)
                this.isDisplayClaim = true;
            else
              this.isDisplayClaim = false;
          });
   
 }
}