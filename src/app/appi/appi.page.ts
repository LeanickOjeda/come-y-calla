import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appi',
  templateUrl: './appi.page.html',
  styleUrls: ['./appi.page.scss'],
})
export class AppiPage implements OnInit {

  characters = []

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit ()  {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
    .subscribe(res => {
      console.log(res);
      this.characters = res.results;
    })
  }

}
