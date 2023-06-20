import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditsComponent } from './task-edits.component';

describe('TaskEditsComponent', () => {
  let component: TaskEditsComponent;
  let fixture: ComponentFixture<TaskEditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditsComponent]
    });
    fixture = TestBed.createComponent(TaskEditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
