import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  @Input('step') step: number = 1;  

  constructor() { }

  ngOnInit(): void {
  }

}
