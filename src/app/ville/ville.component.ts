import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Ville from '../classes/ville';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes : Array<Ville> = []; 
  httpOptions = {
    headers : new HttpHeaders({
      'Authorization' : "Basic YWRtaW46MTIzNA==" // admin - 1234
    })
  }

  constructor( private http : HttpClient ) {
  }

  ngOnInit(): void {
    this.reloadCities(); 
  }

  reloadCities():void{
    this.villes = []; 
    this.http.get<Ville[]>( "http://localhost:8080/api/ville" , this.httpOptions ).subscribe(
      data => { this.villes = data }
      //, err => console.log( "Une erreur est survenue" )
    );

  }

  clearCities():void{
    this.villes = []; 
  }

  delete( id : number ):void{
    if( confirm("Êtes vous sur ?") ){
      this.http.delete( "http://localhost:8080/api/ville/"+id , this.httpOptions ).subscribe(
        data => { 
          this.reloadCities(); 
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
    
  }

}
