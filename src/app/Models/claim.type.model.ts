export class ClaimType{
    name:string;
    id:number;
    dropdowns:DropDown[];
    labels:LabelClass[];
}

export class DropDown{
    label:LabelClass;
    classOption:ClassOption[];
}

export class ClassOption{
    name:string;
    belongsTo:number;
    id:number;
}

export class LabelClass{
    name:string;
    isRequired:boolean;
}

export class ExpenseHead{
    name:string;
    id:number;
}

export class AddClaim{  //Extensible class to add more fields as an when needed
    claimType:string;
    expense:number;
    date:string;
}