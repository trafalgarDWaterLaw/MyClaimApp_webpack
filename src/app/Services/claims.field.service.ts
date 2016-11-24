import {Injectable} from '@angular/core';
import {ClaimType, DropDown, ExpenseHead, LabelClass, ClassOption, AddClaim} from '../Models/claim.type.model';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ClaimsMock} from '../Mock/claims.mock.json';

@Injectable() export class ClaimServices{

    private claimTypeDataArr:ClaimType[];
    private specificClaimFields:ClaimType;
    private addedClaimArr:AddClaim[];
    private jsonData:any;
    private claimTypeDetailJsonData:any;
    private claimFieldOptionDetailJsonData:any;
    constructor(private http: Http){
        this.jsonData = ClaimsMock.Claims;
    }
    //getClaimDynamicData
    getExpenseHeads(claimTypeArr:ClaimType[]):ExpenseHead[]{
        let expenseHeads = new Array<ExpenseHead>();
        this.claimTypeDataArr = claimTypeArr;
        console.log("*****Static copy of Array is*********");
        console.log(this.claimTypeDataArr);
        console.log(claimTypeArr.length);
        for(let i=0;i<claimTypeArr.length;i++){
            let expHead = new ExpenseHead();
            expHead.id = claimTypeArr[i].id;
            expHead.name = claimTypeArr[i].name;
            expenseHeads.push(expHead);
        }
        return expenseHeads;
    }
    getExpenseHeadByID(id:number, claimTypeArr:ClaimType[]):ClaimType{
        let idx = claimTypeArr.find(function(el){
            return el.id === id;
        });
         if (idx != undefined) {
             this.specificClaimFields = idx;
             console.log('************get El by ID************');
             console.log(this.specificClaimFields);
            return idx;
         }
    }
    getDDArrayByLabel(strLabel:string):string[]{
        let strArr = new Array<string>();
        for(let k = 0; k<this.specificClaimFields.dropdowns.length;k++){
            if(this.specificClaimFields.dropdowns[k].label.name === strLabel){
                let classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                console.log(classOptionArr);
                for(let i = 0; i<classOptionArr.length;i++){
                    strArr.push(classOptionArr[i].name);
                }
            }
        }
        console.log(strArr);
        return strArr;
    }
    getDependentDDArrayByLabel(strLabel:string, selectedName:string):string[]{
        let strArr = new Array<string>();
        let str = 'Mode of Travel';
        let selectedID:any;
        for(let k = 0; k<this.specificClaimFields.dropdowns.length;k++){
            if(this.specificClaimFields.dropdowns[k].label.name === str){
                let classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                for(let i = 0; i<classOptionArr.length;i++){
                    if(classOptionArr[i].name == selectedName){
                        selectedID = classOptionArr[i].id;
                        break;
                    }
                }
            }
        }
        for(let k = 0; k<this.specificClaimFields.dropdowns.length;k++){
            if(this.specificClaimFields.dropdowns[k].label.name === strLabel){
                let classOptionArr = this.specificClaimFields.dropdowns[k].classOption;
                for(let i = 0; i<classOptionArr.length;i++){
                    if(classOptionArr[i].belongsTo === selectedID){
                        strArr.push(classOptionArr[i].name);
                    }
                }
            }
        }
        console.log('************class of travel************');
        console.log(strArr);
        return strArr;
    }
    fillClaims(){
        let claimTypeArr = new Array<ClaimType>();
        for(let pos = 0; pos< this.jsonData.length ; pos++){
            let claim = new ClaimType();
            claim.id = parseInt(this.jsonData[pos].Claimtype.id);
            claim.name = this.jsonData[pos].Claimtype.name;
            this.claimTypeDetailJsonData = this.jsonData[pos].Claimtypedetail;
            claim.dropdowns = new Array<DropDown>();
            claim.labels = new Array<LabelClass>();
            
            for(let innerPos = 0; innerPos < this.claimTypeDetailJsonData.length; innerPos++){
                    if(this.claimTypeDetailJsonData[innerPos].Claimfield.type === 'DropDown'){
                        let ddown = new DropDown();
                        let labelDDObj = new LabelClass();
                        labelDDObj.name = this.claimTypeDetailJsonData[innerPos].Claimfield.label;
                        labelDDObj.isRequired = (this.claimTypeDetailJsonData[innerPos].Claimfield.required === "1");

                        ddown.label = labelDDObj;
                        this.claimFieldOptionDetailJsonData =  this.claimTypeDetailJsonData[innerPos].Claimfield.Claimfieldoption;
                        let classOptArr = new Array<ClassOption>();
                        for(let innerinPos = 0; innerinPos < this.claimFieldOptionDetailJsonData.length; innerinPos++){
                            let classOpt = new ClassOption();
                             classOpt.name = this.claimFieldOptionDetailJsonData[innerinPos].name;
                             classOpt.belongsTo = this.claimFieldOptionDetailJsonData[innerinPos].belongsto;
                             classOpt.id = this.claimFieldOptionDetailJsonData[innerinPos].id;
                             classOptArr.push(classOpt);
                         }
                         ddown.classOption = classOptArr;
                         claim.dropdowns.push(ddown);
                    }
                    else if(this.claimTypeDetailJsonData[innerPos].Claimfield.type.includes('SingleLineText')){
                        let labelObj = new LabelClass();
                        labelObj.name = this.claimTypeDetailJsonData[innerPos].Claimfield.label;
                        labelObj.isRequired = (this.claimTypeDetailJsonData[innerPos].Claimfield.required === "1");
                        claim.labels.push(labelObj);
                    }
            }
            claimTypeArr.push(claim);
        }
        return Promise.resolve(claimTypeArr);
    }
    getUniqueArray(columnArray:string[]):string[]{
        let strUniqueArray:string[]=[]; 
        for(let i = 0; i<columnArray.length; i++)
        {
            if(i===0)
            {
                strUniqueArray.push(columnArray[i]);
            }
            else
            {
                console.log(strUniqueArray.find(item=>item==columnArray[i]));
                if((strUniqueArray.find(item=>item==columnArray[i]) == undefined))
                {
                    strUniqueArray.push(columnArray[i]);
                }
            }
        }
        return strUniqueArray;
    }
    
    getTodaysDate():string{
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let strDD = dd.toString();
        let strMM = mm.toString();
        let yyyy = today.getFullYear();
        if(dd<10){
            strDD='0'+strDD
        } 
        if(mm<10){
            strMM='0'+strMM
        } 
        let strtoday = strDD+'/'+strMM+'/'+yyyy;
        return strtoday;
  }

  storeClaim(claimToAdd:AddClaim):Promise<AddClaim[]>{
      //Write to DB
      let claimsURL = 'app/claims';
     let headers = new Headers({'Content-Type': 'application/json','auth-ticket':'asdfasfafs'});
     console.log('***************Data to store coming is **************************');
     console.log(claimToAdd);
     return this.http.post(claimsURL, JSON.stringify({claimType: claimToAdd.claimType, expense: claimToAdd.expense, date: claimToAdd.date}), {headers: headers})
            .toPromise()
            .then(res => res.json().data);  
  }
  getClaims():Promise<AddClaim[]>{
      //get all the claims from DB
      let claimsURL = 'app/claims';
      return this.http.get(claimsURL)
               .toPromise().then(response =>response.json().data as AddClaim[]);
  }
 
}