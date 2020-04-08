import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as mainCardData from '../../assets/Demodb.json/mainCardData.json';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.css']
})
export class MainCardComponent implements OnInit {
  @ViewChild('startModalApproveOpen', { static: false }) startModalApproveOpen: ElementRef;
  @ViewChild('startModalApproveClose', { static: false }) startModalApproveClose: ElementRef;
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;


  mainCardData: any = (mainCardData as any).default;
  cardDataArray:any=[];

  modal = {
    name: '',
    id: 1

  }

  title: any='';
  newcardDataArray: any=[];
  ShowCard: boolean;

  constructor( private toastrService: ToastrService) { }

  ngOnInit() {
    this.cardDataArray=this.mainCardData;
    this.toastrService.overlayContainer = this.toastContainer;  //for toast

    if(this.cardDataArray.length>0){
      this.ShowCard = true;
    }else{
      this.ShowCard=false;
    }
  }

  addNewCard() {
    console.log("addNewCard called", this.title,"this.cardDataArray===",this.cardDataArray)
    const generatedid = this.cardDataArray.length + 1;

    const payload = {
      
      "name": (this.title).toUpperCase(),
      'id':  generatedid,
     
    };


    // this.modal.name = (this.title).toUpperCase();
    // this.modal.id = generatedid;

    console.log("payload===", payload);

    this.cardDataArray.push(payload);
    this.toastrService.success('Succesfully Added!');
    console.log("this.cardDataArray==",this.cardDataArray);
    this.title='';

    if(this.cardDataArray.length>0){
  this.ShowCard = true;
}else{
  this.ShowCard=false;
}
  }

  removeCard(index : Number){

    const removeId = index;
    const removingobject = _.find(this.cardDataArray, {id:removeId});
    console.log("removingobject", removingobject);
// (this.cardDataArray).removeAt(index);
// for(let i=0;i<this.cardDataArray.length;i++){
//   console.log("this.cardDataArray.length===",this.cardDataArray.length)
// console.log("_.isEqual(this.cardDataArray[i],removingobject)",!(_.isEqual(this.cardDataArray[i],removingobject)));
// if(!(_.isEqual(this.cardDataArray[i],removingobject))){
// this.newcardDataArray.push(this.cardDataArray[i]);

// }
// }
this.cardDataArray = this.cardDataArray.filter(({ id }) => id !== removingobject.id);
console.log("this.cardDataArray",this.cardDataArray);
// this.cardDataArray=this.newcardDataArray;
this.toastrService.info('Card Deleted!');

if(this.cardDataArray.length>0){
  this.ShowCard = true;
}else{
  this.ShowCard=false;
}
// (this.cardDataArray).removeAt(1);

  }




}




