import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {NumberModel} from 'src/app/_models/lrdbnumber';

@Component({
  selector: 'core-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('numbers') numbers: NumberModel[] = []
  @Input('page') page = 1;
  @Input('pageSize') pageSize = 10;
  @Output() change: EventEmitter<Object> = new EventEmitter<Object>(true);
  pageItens : NumberModel[] = []
  totalItens;
  
  constructor() {}

  ngOnChanges(simpleChanges: SimpleChange) {
    let numbers = simpleChanges['numbers'].currentValue;
    if (simpleChanges['numbers'].currentValue instanceof Array) {
      if (numbers.length <= this.pageSize) {
        this.pageItens = this.numbers

      } else {
        this.pageItens = numbers.slice(0, this.pageSize)

      }

    } else {
      this.pageItens = numbers

    }
    this.totalItens = numbers.length
    this.change.emit(this.pageItens)

  }

  ngOnInit(): void {}

  loadPage(event) {
    let index;
    if (this.page > 1) {
      index = (this.page - 1) * this.pageSize;

    } else {
      index = 0
    }
    if (this.numbers.length <= this.pageSize) {
      this.pageItens = this.numbers

    } else {
      this.pageItens = this.numbers.slice(index, index + this.pageSize)

    }
    this.change.emit(this.pageItens)

  }

}
