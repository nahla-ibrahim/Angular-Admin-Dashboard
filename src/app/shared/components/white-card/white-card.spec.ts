import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteCard } from './white-card';

describe('WhiteCard', () => {
  let component: WhiteCard;
  let fixture: ComponentFixture<WhiteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
