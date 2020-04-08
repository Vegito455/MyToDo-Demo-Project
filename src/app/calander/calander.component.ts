import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent implements OnInit {

  public month: number = new Date().getMonth();
    public fullYear: number = new Date().getFullYear();
    public dateValue: Date = new Date(this.fullYear, this.month);
    public minDate: Date = new Date(this.fullYear, this.month);
    public maxDate: Date = new Date(this.fullYear,36);
    
  constructor() { }

  ngOnInit() {
  }

}
