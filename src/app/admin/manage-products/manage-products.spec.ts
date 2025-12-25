import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProducts } from './manage-products';

describe('ManageProducts', () => {
  let component: ManageProducts;
  let fixture: ComponentFixture<ManageProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize empty products array', () => {
    expect(component.products).toEqual([]);
  });

  it('should open form when openForm is called', () => {
    component.openForm();
    expect(component.showForm).toBe(true);
  });

  it('should close form when closeForm is called', () => {
    component.closeForm();
    expect(component.showForm).toBe(false);
  });

  it('should reset form data', () => {
    component.newProduct = { id: 1, name: 'Test', material: 'Test', price: 100, image: '', description: '' };
    component.resetForm();
    expect(component.newProduct.name).toBe('');
    expect(component.newProduct.price).toBe(0);
  });
});
