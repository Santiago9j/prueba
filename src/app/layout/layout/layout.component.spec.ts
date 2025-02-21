import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener un <app-header>', () => {
    const headerElement = debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('Debe contener un <router-outlet>', () => {
    const routerOutletElement = debugElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });

  it('Debe contener un <app-footer>', () => {
    const footerElement = debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });
});
