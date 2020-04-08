import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalConstants } from '../global';
// import { AlertsService } from 'angular-alert-module';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
  shownavbutton: boolean;

  constructor(private router:Router,public shownavbtn:GlobalConstants,private toastrService: ToastrService ) { }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    console.log("this.router.url",this.router.url,"this.shownavbtn.shownavbutton",this.shownavbtn.shownavbutton);
    
// showSuccess() {
//     this.toastr.success('Hello world!', 'Toastr fun!');
//   }


const url = this.router.url;
if(url==='/login' || url==='/register'){
  this.shownavbutton = false;
}else{
  this.shownavbutton = true;
}


    // this.alerts.setDefaults('timeout',0);
    // this.alerts.setMessage('All the fields are required','error');
    // this.alerts.setMessage('Configurations saved successfully!','success');
    // this.alerts.setMessage('Please save all the changes before closing','warn');
    
  }


  Logout(){
    sessionStorage.removeItem('token');
    
  }

}
