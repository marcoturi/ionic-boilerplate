import { DebugElement, Type, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Predicate } from "@angular/core/src/facade/collection";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavController }  from 'ionic-angular';
import { mockNavController } from 'ionic-angular/util/mock-providers';

/**
 * @ngdoc object
 * @name ComponentTestHelper
 * @description
 *
 * Helper class for creating tests. It encapsulates the TestBed initialization,
 * allowing the test to be DRY. To use, one must declare a beforeEach function in the
 * test, and inside construct this object like:
 *
 * @example
 *  <pre>
 *    let helper = new ComponentTest<MyComponent>();
 *    beforeEach((done) => {
 *      helper.init(MyComponent);
 *      done();
 *    });
 *
 *    //Add a spec
 *    it('this is my custom unity test', () => {
 *        expect(helper.fixture).toBeDefined();
 *        expect(helper.component).toBeDefined();
 *    });
 *  </pre>
 */
export class ComponentTest<T extends any> {

    /**
     * The component class reference passed to init() method.
     *
     * @ngdoc property
     * @name mockComponent
     * @propertyOf ComponentTestHelper
     */
    componentClass: Type<T>;

    /**
     * The parsed component instance
     *
     * @ngdoc property
     * @name component
     * @propertyOf ComponentTestHelper
     */
    component: T;

    /**
     * The debugElement representing a HTML element attached to the component.
     *
     * @ngdoc property
     * @name debugElement
     * @propertyOf ComponentTestHelper
     */
    debugElement: DebugElement;

    /**
     * Fixture for debugging and testing a component.
     *
     * @ngdoc property
     * @name fixture
     * @propertyOf
     */
    fixture: ComponentFixture<T>;

    // TODO: Add 'config' property to pass a specific providers and others configs
    //      To TestBed class 
    // TODO: Verify if typescript allow get class reference from Component object
    /**
     * The initializer function. Add default ionic dependencies and create 
     * a component instance
     *
     * @ngdoc method
     * @name init
     * @methodOf ComponentTestHelper
     */ 
    init (component: Type<T>): void {

        TestBed.configureTestingModule({
            declarations: [component],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: NavController, useValue: mockNavController},
            ],
        });
        TestBed.compileComponents();

        this.fixture = TestBed.createComponent(component);
        this.component = this.fixture.componentInstance;
        this.componentClass = component;
        this.debugElement = this.fixture.debugElement;
    }

    /**
     *  Return all elements matching the given selector
     *
     * @ngdoc method
     * @name all
     * @methodOf ComponentTestHelper
     */
    all(selector: Predicate<DebugElement>): DebugElement[] {
        return this.debugElement.queryAll(selector);
    }

    /**
     *  Return the first element matching the given selector
     *
     * @ngdoc method
     * @name find
     * @methodOf ComponentTestHelper
     */
    find(selector: Predicate<DebugElement>): DebugElement {
        return this.debugElement.query(selector);
    }

    /**
     *  Return the first element of parent element that matches the given selector
     *
     * @ngdoc method
     * @name findChildren
     * @methodOf ComponentTestHelper
     */
    findChildren(parentSelector: Predicate<DebugElement>, childSelector: Predicate<DebugElement>): DebugElement {
        let parentComponent: DebugElement = this.find(parentSelector);
        return parentComponent.query(childSelector);
    }
}
