import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from '@angular/core';
import { HeroService } from '../hero.service';
import { HeroComponent } from './../hero/hero.component';
import { of } from 'rxjs/observable/of';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkPrams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkPrams;
  }
}

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [ { provide: HeroService, useValue: mockHeroService }]
    });

    fixture = TestBed.createComponent(HeroesComponent);
   });

  it('should render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentsDEs.length).toEqual(3);
    for(let i = 0;  i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it('should call heroService.deleteHero when delete button is clicked', () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropogation: () => {}});
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addbtn = fixture.debugElement.query(By.css('button')).nativeElement;
    // console.log(addbtn);

    inputElement.value = name;
    // addbtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    // const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    // expect(heroText).toContain(name);
  });

});
