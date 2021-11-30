import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenAlreadyUsedComponent } from './token-already-used.component';

describe('TokenAlreadyUsedComponent', () => {
  let component: TokenAlreadyUsedComponent;
  let fixture: ComponentFixture<TokenAlreadyUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenAlreadyUsedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenAlreadyUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
