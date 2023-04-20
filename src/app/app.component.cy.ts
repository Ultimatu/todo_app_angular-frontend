import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    cy.visit('/');
    cy.get('app-root').should('exist');
  });

  it(`should have as title 'frontend'`, () => {
    cy.visit('/');
    cy.get('app-root').find('h1').should('have.text', 'frontend');
  });

  it('should render title', () => {
    cy.visit('/');
    cy.get('.content span').should('have.text', 'frontend app is running!');
  });
});
