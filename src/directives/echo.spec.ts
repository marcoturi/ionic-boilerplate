import {
  Component,
  DebugElement,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { EchoDirective } from './echo.directive';

@Component({template: '<div ibEcho></div><div></div>'})
class TestComponent {
}

describe('Echo Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let lists: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule(
      {
        declarations: [
          EchoDirective,
          TestComponent,
        ],
        imports:      [
          IonicModule.forRoot(TestComponent),
        ],
      }).createComponent(TestComponent);
    fixture.detectChanges();

    lists = fixture.debugElement.queryAll(By.css('[ibEcho]'));
  });

  it('should see directive', () => {
    expect(lists).toBeDefined();
  });

  it('see click me', () => {
    expect(lists[0].nativeElement.textContent).toBe('Click Me');
  });

  it('should see greetings', () => {
    lists[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(lists[0].nativeElement.textContent)
      .toBe('Greetings from echo directive.');
  });

});
