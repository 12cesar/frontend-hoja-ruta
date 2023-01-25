import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search=new FormControl('');
  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>this.searchEmiter.emit(value));

  }

  //tipo=new FormControl('');
  //@Input() dataEntrante:any;
  @Output('search') searchEmiter = new EventEmitter<string>()
}
