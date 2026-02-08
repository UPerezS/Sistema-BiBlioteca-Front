import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerlibrosComponent } from './user-verlibros.component';

describe('UserVerlibrosComponent', () => {
  let component: UserVerlibrosComponent;
  let fixture: ComponentFixture<UserVerlibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserVerlibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVerlibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
