import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorViewComponent } from './floor-view.component';

describe('FloorViewComponent', () => {
  let component: FloorViewComponent;
  let fixture: ComponentFixture<FloorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorViewComponent]
    });
    fixture = TestBed.createComponent(FloorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
