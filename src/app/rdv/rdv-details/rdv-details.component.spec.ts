import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Patient } from 'src/app/classes/patient';
import { Rdv } from 'src/app/classes/rdv';
import { Ville } from 'src/app/classes/ville';
import { RdvDetailsComponent } from './rdv-details.component';

function getRandomInt(min:number, max : number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


describe('RdvDetailsComponent', () => {
  let component: RdvDetailsComponent;
  let fixture: ComponentFixture<RdvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvDetailsComponent ],
      imports: [HttpClientModule, RouterTestingModule , StoreModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should add rdv", async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let v = new Ville(1, "Paris", 72000, "France");

    let p = new Patient(41, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v);

    component.rdv = new Rdv( undefined , new Date("2021-12-"+getRandomInt(1,30)+" 10:30") , 30, "RAS" , "consultation" , p )

    let user = {
      "id": 1,
      "username": "admin",
      "email": "admin@admin.com",
      "roles": "ROLE_ADMIN",
      "password": "YWRtaW46MTIzNA==",
      "name": "AdministrateurLM",
      "photouser": "inti7ar.jpg"
    }

    sessionStorage.setItem("user", JSON.stringify(user))

    let nbavantAjout = 0
    component.rdvService.getAll().subscribe(
      data => {
        nbavantAjout = data.length
        console.log("nb avant ajout  = " + data.length)
      }
    )

    component.submit();

    let nbapresAjout = 0
    component.rdvService.getAll().subscribe(
      data => {
        nbapresAjout = data.length
        console.log("nb après ajout  = " + data.length)
      }
    )

    fixture.whenStable().then(() => {
      expect(nbapresAjout).toBe(nbavantAjout + 1);
    })

  });
  
});
