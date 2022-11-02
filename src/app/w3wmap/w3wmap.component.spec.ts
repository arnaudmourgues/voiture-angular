import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3wmapComponent } from './w3wmap.component';

describe('W3wmapComponent', () => {
  let component: W3wmapComponent;
  let fixture: ComponentFixture<W3wmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3wmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W3wmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
