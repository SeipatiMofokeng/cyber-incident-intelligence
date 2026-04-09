import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPredict } from './ai-predict.component';

describe('AiPredict', () => {
  let component: AiPredict;
  let fixture: ComponentFixture<AiPredict>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiPredict],
    }).compileComponents();

    fixture = TestBed.createComponent(AiPredict);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
