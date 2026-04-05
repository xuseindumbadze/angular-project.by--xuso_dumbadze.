import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninModals } from './signin-modals';

describe('SigninModals', () => {
  let component: SigninModals;
  let fixture: ComponentFixture<SigninModals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninModals],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninModals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
