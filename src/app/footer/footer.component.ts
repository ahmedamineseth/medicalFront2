import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../auth.guard';
import { User } from '../classes/user';
import { httpOptions } from '../variables';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  public user: User = new User();

  @ViewChild('fileInput') inputEl: ElementRef | undefined;

  constructor(private guard: AuthGuard, private http : HttpClient ) { this.user = guard.getUser() }

  ngOnInit(): void {
  }

  update(  ){
    this.user = this.guard.getUser()
    console.log( this.guard.getUser() ); 
  }

  submit() {
    let inputEl: HTMLInputElement = this.inputEl?.nativeElement;
    
    console.log( inputEl ); 

    if( inputEl != undefined && inputEl.files != undefined ){
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();

      console.log( "*********" ); 

      console.log( inputEl.files ); 

      
      formData.append('username', "" + this.user.username );
      formData.append('password', "" + this.user.password );
      formData.append('email', "" + this.user.email );
      formData.append('name', "" + this.user.name );

      if (fileCount > 0) { // a file was selected  
        formData.append('photouser', inputEl.files[0] );
      }

      this.http.put<User>( environment.backendUri + "profil/"+this.user.id , formData  , httpOptions ).subscribe(
        {
          next: (data) => { 
            console.log( data )
          },
          error: (err) => { console.log(err.error.message) }
        }
      )

        // do whatever you do...
        // subscribe to observable to listen for response
      }

  }
}


