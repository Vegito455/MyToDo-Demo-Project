import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { GlobalConstants } from '../global';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
// import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators';


import * as data from '../../assets/Demodb.json/data.json';
import * as taskDataforSBIDFHI from '../../assets/Demodb.json/taskDataforSBIDFHI.json';
import * as taskDataforFCSSL from '../../assets/Demodb.json/taskDataforFCSSL.json';
import * as taskDataforCFMS from '../../assets/Demodb.json/taskDataforCFMS.json';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
  displaystatus = true;
  externalData: any = (data as any).default;
  showsucessalert: boolean = false;
  showwarningalert: boolean = false;
  warningmsg: string;
  firstTimeInitialize: boolean = false;
  TotalCount: any;
  disableAddCardButton: boolean = false;
  cannotComplete: boolean = true;
  id: any;
  taskData: any;
  updatedExternalData: boolean =false;
  mainTitle: any;
  constructor(private fb: FormBuilder, private toastrService: ToastrService,
    private route: ActivatedRoute) { }

  toDoForm: FormGroup;

  ngOnInit() {
   

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.mainTitle= params['title'];
      console.log("query param id", this.id,"this.mainTitle===",this.mainTitle);
    });

    this.getexternalDatafromJsonFile();


    this.toastrService.overlayContainer = this.toastContainer;  //for toast
    // this.shownavbtn.shownavbutton = true;
    // this.shownavbtn.shownavbutton = false;
    this.firstTimeInitialize = false;
    window.addEventListener('scroll', this.scroll, true);
    // this.toDoForm.value =this.externalData[0];
    // window.scroll(0,50);
    window.onscroll = function (e) {
      console.log("window.scrollY====", window.scrollY); // Value of scroll Y in px
    };

    console.log("window.onscroll====", window.onscroll);
    //     console.log("getArray.controls=====",this.getArray.controls)
    // console.log("this.toDoForm=====ngonit called",this.toDoForm.value.card[0])
    // console.log("externalData======ngonit called",this.externalData[0],"this.externalData[0].length==",this.externalData[0].card.length);

    // for(let i=0;i<this.externalData[0].card.length;i++){
    //   console.log("loop init")
    // this.toDoForm.value.card.push(this.externalData[0].card[i]);
    // console.log("for loop ==",this.toDoForm.value.card[i]);

    // this.getExternalData();
    if (this.taskData.length) {
      this.getAllData();
    }

  }
  getexternalDatafromJsonFile() {

    console.log("getexternalDatafromJsonFile called")
    if (this.id==1 && this.mainTitle==='SBIDFHI') {
     
      this.taskData = (taskDataforSBIDFHI as any).default;
      console.log("inside if====this.id",this.id," this.taskData===",this.taskData);
    }
    else if (this.id==2 && this.mainTitle==='FCSSL') {
      this.taskData = (taskDataforFCSSL as any).default;
      console.log("inside if====this.id",this.id," this.taskData===",this.taskData);
    }



    else if (this.id==4 && this.mainTitle==='CFMS') {
      this.taskData = (taskDataforCFMS as any).default;
      console.log("inside if====this.id",this.id," this.taskData===",this.taskData);
    }else{
      this.taskData=[];
    }
console.log(" this.taskData===", this.taskData)


  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event): void => {
    console.log("event====", event)
    
  };


  initializeMyToDoForm() {
    this.toDoForm = this.fb.group({
      card: this.fb.array([
        this.InitCardItemRow()
      ])
    })
  }

  // console.log("this.toDoForm=====after loop",this.toDoForm.value)

  // this.addToDoCard();

  // }

  InitCardItemRow() {
    return this.fb.group(
      {
        title: ['',[Validators.required,Validators.maxLength(25)]],
        text: [''],
        saveStatus: [0],
        todoStatus: [0]
      }
    )
  }

  get getArray() {
    return (this.toDoForm.get('card') as FormArray);
  }


  addToDoCard() {


    if (!this.firstTimeInitialize) {
      this.initializeMyToDoForm();
      this.firstTimeInitialize = true;
      this.disableAddCardButton = true;
      const control = <FormArray>this.toDoForm.controls["card"];
      console.log("first Time Initialized===", control);
    } else {

      console.log("addToDoCard called===");
      if (this.disableAddCardButton === false) {
        const cardArr = this.getArray.controls;
        this.getArray.controls.push(this.InitCardItemRow());
        for (let i = 0; i < this.getArray.controls.length; i++) {

          console.log("form array pe loop laga k check kar raha hu ADD me", this.getArray.controls[i]);
        }
        console.log("else push add card =======new  this.getArray", this.getArray);
        this.disableAddCardButton = true;
        this.updatedExternalData = false;
        this.cannotComplete=true;
      } else {
        console.log("show Warning Toast for save previous card first");
        this.toastrService.warning('Kindly Save the Previous Task!');
      }

    }

    console.log("disabled===kindly Save the previous card")
  }

  deleteToDoCard(index: number) {
    console.log("deleteToDoCard called===");

    const control = <FormArray>this.toDoForm.controls["card"];
    if (control != null) {
      this.TotalCount = control.value.length;
    }
    control.removeAt(index);
    this.toastrService.info('Task Deleted!');
this.disableAddCardButton = true;
    console.log("After deleteToDoCard ===", this.getArray.controls.length);
    if (this.getArray.controls.length === 0) {
      this.disableAddCardButton = false;
      this.firstTimeInitialize = false;
    }
  }

  TaskCompleted() {
    console.log("TaskCompleted called===");
    this.toastrService.info('Succesfully Completed Task!');
    this.cannotComplete = true;
  }
  // onSubmit(){
  //   console.log("deleteToDoCard called===",(this.toDoForm.value));

  //   const controls = <FormArray>this.toDoForm.controls["cards"];

  // }
  submitCardData(index: number) {
    const controls = this.getArray.controls
    // controls.removeAt(index);
    console.log("submitCardData called===", controls[index]);

    this.disableAddCardButton = false;
    this.cannotComplete = false;
    
    this.toastrService.success('Succesfully Saved Task!');

    // for(let i=0;i<this.getArray.controls.length;i++){

    // console.log("form array pe loop laga k check kar raha hu submit me",this.getArray.controls[i]);

    // }

    console.log("form array pe loop laga k check kar raha hu submit me", this.getArray.controls[index].value);

    /*  timers.setInterval(() => {
       this.showsucessalert=true;
     }, 2000);
     
     
     this.showsucessalert=false; */

    // controls[index].patchValue([
    //   {title:""},
    //   {text:""},
    //   {saveStatus:1},
    //   {todoStatus:0}
    // ])

    // console.log("submitCardData After PatchValue===",controls[index]);


  }


  // getExternalData(){
  //   console.log("getExternalData====this.toDoForm.value",this.toDoForm.value);
  //   const controls = <FormArray>this.toDoForm.controls["card"];

  // console.log("const controls = <FormArray>this.toDoForm.controls",controls);



  // }

  addExternalDataToDoCard() {


    if (!this.firstTimeInitialize) {
      this.initializeMyToDoForm();
      this.firstTimeInitialize = true;
      // this.disableAddCardButton = true;
      const control = <FormArray>this.toDoForm.controls["card"];
      console.log("first Time Initialized===", control);
    } else {
      console.log("addToDoCard called===");
      // if (this.disableAddCardButton === false) {
        const cardArr = this.getArray.controls;
        this.getArray.controls.push(this.InitCardItemRow());
        for (let i = 0; i < this.getArray.controls.length; i++) {

          console.log("form array pe loop laga k check kar raha hu ADD me", this.getArray.controls[i]);
        }
        console.log("else push add card =======new  this.getArray", this.getArray);
        // this.disableAddCardButton = true;
      // } else {
      //   console.log("show Warning Toast for save previous card first");
      //   this.toastrService.warning('Kindly Save the Previous Task!');
      // }

    }

    console.log("disabled===kindly Save the previous card")
  }
  getAllData() {
    console.log("getAllData called===", this.taskData);

    for (let i = 0; i < this.taskData.length; i++) {
      this.addExternalDataToDoCard();
    

      (<FormArray>this.toDoForm.controls['card']).at(i).patchValue(this.taskData[i]);
      const updateformarray = <FormArray>this.toDoForm.controls['card'];
      console.log("valuejson",updateformarray)

    }
this.updatedExternalData = true;
  }

}
