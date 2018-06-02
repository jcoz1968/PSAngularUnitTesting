import { HeroComponent } from './../hero/hero.component';
import { of } from 'rxjs/observable/of';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

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
        HeroComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

});
