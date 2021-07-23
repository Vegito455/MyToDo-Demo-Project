import { Component, OnInit, ViewChild } from '@angular/core';
import * as logindata from '../../assets/Demodb.json/loginuser.json';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { GlobalConstants} from '../global';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  externaLoginUserData: any = (logindata as any).default;
  authenticatedUser: boolean = false;
  getAllUsersLS: string;
  getAllUsers: any = [];
  uniqUserArray = [];
  constructor(private router: Router,public shownavbtn:GlobalConstants,private toastrService: ToastrService) { }

  userModel = {
    email: '',
    password: ''
  }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    sessionStorage.removeItem('token');
    

    this.shownavbtn.shownavbutton=false;
    this.getAllUsersLS = localStorage.getItem('users');
    console.log("this.getAllUsersLS--->",this.getAllUsersLS)
    if (this.getAllUsersLS==undefined || this.getAllUsersLS == null) {
      this.getAllUsers = []
    }
    else {
      this.getAllUsers = JSON.parse(this.getAllUsersLS);
      console.log("this.getAllUsers===ngonit", this.getAllUsers);
    }

    this.removeDuplicateUsers();

  }

  removeDuplicateUsers() {
    console.log("removeDuplicateUsers fn called===this.externaLoginUserData", this.externaLoginUserData);
    console.log("this.getAllUsers===ngonit", this.getAllUsers);

    for (let i = 0; i < this.externaLoginUserData.length; i++) {

      const euser = this.externaLoginUserData[i];


      for (let j = 0; j < this.getAllUsers.length; j++) {

        const iuser = this.getAllUsers[j];
        console.log("inside euser", euser, "inside iuser===", iuser);
        var result = _.uniqWith(this.getAllUsers, _.isEqual(euser, iuser));
        if (result) {
          this.uniqUserArray.push(this.externaLoginUserData[i]);
        }
        console.log("this.uniqUserArray==", this.uniqUserArray);

      }
    }
    console.log("result===", result);    //duplicate record deleted
    this.uniqUserArray = result;
    localStorage.setItem('users', JSON.stringify(this.uniqUserArray));

  }

  onSubmit() {
    console.log("this.userModel===", this.userModel);
    console.log("this.externaLoginUserData===", this.uniqUserArray);


    for (let i = 0; i < this.uniqUserArray.length; i++) {
      const user = this.uniqUserArray[i];
      console.log("user===", user);

      this.authenticatedUser = _.isEqual(this.userModel, user);
      if (this.authenticatedUser) {
        this.shownavbtn.shownavbutton=true;
        sessionStorage.setItem('token',"xhsdfkhsdfkhsdfjhdsfkhghsdvfkhsdjdgshds");
        console.log("this.authenticatedUser===", this.authenticatedUser);
        this.router.navigate(['/maincard']);
        
        break;
      }
      
    }
    if(!this.authenticatedUser){
      this.toastrService.info('Incorrect Email Id or Password');
    }



  }



}
