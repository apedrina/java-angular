import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashaboard.component.css']
})
export class DashboardhComponent implements OnInit {

  searchNumber = new FormGroup({
    inputSearch1: new FormControl(''),
    inputSearch2: new FormControl('')

  });

  constructor(private http: HttpClient) {
    console.log('called dashboard component')

  }

  ngOnInit(): void { 
    
  }

}
