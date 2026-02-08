import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgregarlibrosComponent } from './admin-agregarlibros.component';

describe('AdminAgregarlibrosComponent', () => {
  let component: AdminAgregarlibrosComponent;
  let fixture: ComponentFixture<AdminAgregarlibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAgregarlibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgregarlibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
