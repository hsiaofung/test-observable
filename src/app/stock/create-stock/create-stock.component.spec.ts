import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";
import { CreateStockComponent } from "./create-stock.component";
import { StockService } from "../../services/stock.service";
import { Stock } from "../../model/stock";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe("createStockComponent", () => {
  let component: CreateStockComponent;
  let fixture: ComponentFixture<CreateStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStockComponent],
      providers: [StockService],
      imports: [FormsModule], // CreateStockComponent 需要FormsModule
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create stock through service", async(() => {
    // 以async的回傳值作為it函式的第二個參數
    expect(component).toBeTruthy();
    component.stock = new Stock("My New Test Stock", "MNTS", 100, 120, "NYSE");
    component.createStock({ valid: true });

    fixture.whenStable().then(() => {
      // 等待測試執行非同步流程
      fixture.detectChanges(); //改變後更新視圖
      expect(component.message).toEqual(
        "Stock with code MNTS successfully created"
      );
      const messageEl = fixture.debugElement.query(By.css(".message"))
        .nativeElement;
      expect(messageEl.textContent).toBe(
        "Stock with code MNTS successfully created"
      );
    });
  }));

  it("should create stock through service wih fakeAsync", fakeAsync(() => {
    expect(component).toBeTruthy();
    component.stock = new Stock("My New Test Stock", "MNTS", 100, 120, "NYSE");
    component.createStock({ valid: true });
    tick();
    fixture.detectChanges();
    expect(component.message).toEqual(
      "Stock with code MNTS successfully created"
    );
    const messageEl = fixture.debugElement.query(By.css(".message"))
      .nativeElement;
    expect(messageEl.textContent).toBe(
      "Stock with code MNTS successfully created"
    );
  }));
});
