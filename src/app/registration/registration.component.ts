import { Component, OnInit, ViewChild } from '@angular/core';
import * as logindata from '../../assets/Demodb.json/loginuser.json';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
  externaLoginUserData: any = (logindata as any).default;
  authenticatedUser: boolean = false;
  localdata: string;
  getAllUsers: any=[];
  constructor(private router: Router, public shownavbtn: GlobalConstants, private toastrService: ToastrService) { }

  userModel = {
    email: '',
    password: ''
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.shownavbtn.shownavbutton = false;
    this.externaLoginUserData = (logindata as any).default;
    this.localdata = localStorage.getItem('users');
    if (this.localdata === null) {
      localStorage.setItem('users', null);
    } else {
      this.getAllUsers = JSON.parse(this.localdata);
      console.log("this.getAllUsers===ngonit", this.getAllUsers);
    }
  }



  onSubmit() {
    console.log("this.userModel===", this.userModel);
    console.log("this.externaLoginUserData===", this.getAllUsers);
    // console.log("JSON.stringify(this.userModel)===",JSON.stringify(this.userModel));
    // localStorage.setItem('users',JSON.stringify(this.userModel));
    this.getAllUsers.push(this.userModel);
    localStorage.setItem('users', JSON.stringify(this.getAllUsers));

    this.toastrService.success('Successfully Registered!');


    setTimeout(() => {
      console.log("inside stinterval ==== route to login");
      this.router.navigate(['/login']);
    }, 2000);




  }



}




