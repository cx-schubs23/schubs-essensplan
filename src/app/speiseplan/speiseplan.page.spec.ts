import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeiseplanPage } from './speiseplan.page';

describe('SpeiseplanPage', () => {
  let component: SpeiseplanPage;
  let fixture: ComponentFixture<SpeiseplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeiseplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeiseplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
