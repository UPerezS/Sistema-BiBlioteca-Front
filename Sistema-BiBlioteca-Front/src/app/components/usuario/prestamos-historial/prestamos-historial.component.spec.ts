import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosHistorialComponent } from './prestamos-historial.component';

describe('PrestamosHistorialComponent', () => {
  let component: PrestamosHistorialComponent;
  let fixture: ComponentFixture<PrestamosHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestamosHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
