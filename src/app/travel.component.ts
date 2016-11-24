import { Component, OnInit} from '@angular/core';
import {ClaimServices} from  './Services/claims.field.service';
import { ClaimType, AddClaim} from './Models/claim.type.model';

@Component({
  //moduleId: module.id,
  selector: 'travel-template',
  template: require('./travel.component.html')
})

export class TravelComponent implements OnInit{

  private claimFields:ClaimType;
  private fdistrict:string[];
  private tdistrict:string[];
  private modeOfTravel: string[];
  private clasOfTravel: string[];
  private isCot = false;
  private isRate = false;
  private isKms = false;
  private claimToAdd:AddClaim;

  //Fields which can be added to Add claim for extensive information about Claim
  fromCity:string = 'Gurgaon';
  toDistSelected:string = 'KANPUR';
  fDistSelected:string = 'DELHI';
  toCity:string = 'Kanpur';
  moTSelected:string = 'Company Vehicle';
  coTSelected:string = '';
  expense:number = 2000.75;
  remark:string = 'Good';
  kilometers:number = 100;
  rate:number = 2000;

  constructor(private claimService:ClaimServices){
  }
   ngOnInit() {
     this.claimService.fillClaims().then((claimArr)=>{
            this.claimFields = this.claimService.getExpenseHeadByID(3, claimArr);
            this.fdistrict = this.claimService.getDDArrayByLabel('From District');
            console.log(this.fdistrict);
            this.tdistrict = this.claimService.getDDArrayByLabel('To District');
            this.modeOfTravel = this.claimService.getDDArrayByLabel('Mode of Travel');
          });
  }
  getClassOfTravel(){
    if(this.moTSelected === 'Bus' || this.moTSelected === 'Car' || this.moTSelected === 'Taxi'){
      this.isRate = true;
      this.isKms = true;
    }
    else{
      this.isRate = false;
      this.isKms = false;
    }
    this.clasOfTravel = this.claimService.getDependentDDArrayByLabel('Class of Travel',this.moTSelected);
    if(this.clasOfTravel.length != 0)
        this.isCot = true;
    else
      this.isCot = false;
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
    this.fromCity = 'Gurgaon';
    this.toDistSelected = 'KANPUR';
    this.fDistSelected = 'DELHI';
    this.toCity = 'Kanpur';
    this.moTSelected = 'Company Vehicle';
    this.coTSelected = '';
    this.expense = 2000;
    this.remark = 'Good';
    this.kilometers = 100;
    this.rate = 2000;
  }
  
}