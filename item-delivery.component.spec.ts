import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeliveryComponent } from './item-delivery.component';

describe('ItemDeliveryComponent', () => {
  let component: ItemDeliveryComponent;
  let fixture: ComponentFixture<ItemDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
