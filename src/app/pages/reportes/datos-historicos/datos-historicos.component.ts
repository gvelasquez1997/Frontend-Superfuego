import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-historicos',
  templateUrl: './datos-historicos.component.html',
  styleUrls: ['./datos-historicos.component.css']
})
export class DatosHistoricosComponent implements OnInit {

  date = null;
  selectedValue;

  constructor() { }

  ngOnInit() {
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

}
