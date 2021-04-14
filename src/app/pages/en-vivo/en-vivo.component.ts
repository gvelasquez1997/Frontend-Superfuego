import { Component, OnInit } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-en-vivo',
  templateUrl: './en-vivo.component.html',
  styleUrls: ['./en-vivo.component.css']
})
export class EnVivoComponent implements OnInit {

  value1 = 300;

  constructor() { }

  ngOnInit() {
  }

  marks: NzMarks = {
    0: '0 psi',
    300: '300 psi',
    500: {
      style: {
        color: '#f50'
      },
      label: '<strong>500 psi</strong>'
    }
  };
  

}
