import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpiredMessageComponent } from './token-expired-message.component';

describe('TokenExpiredMessageComponent', () => {
  let component: TokenExpiredMessageComponent;
  let fixture: ComponentFixture<TokenExpiredMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenExpiredMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenExpiredMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
