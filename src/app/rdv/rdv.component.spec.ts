import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Patient } from '../classes/patient';
import { Rdv } from '../classes/rdv';
import { Ville } from '../classes/ville';

import { RdvComponent } from './rdv.component';

describe('RdvComponent', () => {
  let component: RdvComponent;
  let fixture: ComponentFixture<RdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvComponent ],
      imports: [HttpClientModule, RouterTestingModule , StoreModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('affiche le bon h1', () => {
    const fixture = TestBed.createComponent(RdvComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Liste des Rdvs');
    // je cherche un span sous un élément html ayant la classe content -> je récupère son contenu
    // puis je compare avec "medical app is running!"
    
    expect(component).toBeTruthy();
  });

  it('vérifier la présence de tous les éléments sur la page', () => {
    const fixture = TestBed.createComponent(RdvComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#addbtn')?.textContent).toContain('Ajouter un Rdv');

    expect(compiled.querySelector('#searchForm .btn-primary')?.textContent).toEqual('Rechercher');

    expect(compiled.querySelectorAll('#no-items-message').length).toEqual(1);

    expect(compiled.querySelector('#no-items-message')?.textContent).toContain('Aucun Rdv trouvé');
  });

  it("should list all rdvs", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let v = new Ville(1, "Paris", 72000, "France");

    let p = new Patient(1, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v);
    
    // _id ?: number, _dateheure ?: Date, _duree ?: number, _note ?: string , _type ?: string , _patient ?: Patient
    component.rdvs = [
      new Rdv( 1 , new Date("2021-12-03 10:30") , 30, "RAS" , "consultation" , p ),
      new Rdv( 2 , new Date("2021-12-07 10:30") , 30, "RAS" , "consultation" , p ),
      new Rdv( 3 , new Date("2021-12-08 10:30") , 30, "RAS" , "consultation" , p ),
    ]

    fixture.detectChanges()
    expect(compiled.querySelectorAll('tbody tr').length).toBe(component.rdvs.length);

    expect(compiled.querySelectorAll('thead').length).toBe(1);
    expect(compiled.querySelectorAll('thead th').length).toBe(5);

    
  });

});
