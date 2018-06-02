import { of } from 'rxjs/observable/of';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';

describe('HeroesComponent (shallow tests)', () => {
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
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ { provide: HeroService, useValue: mockHeroService }]
    });

    fixture = TestBed.createComponent(HeroesComponent);

    it('should do nothing', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES))
      fixture.detectChanges();

      expect(fixture.componentInstance.heroes.length).toBe(3);
    });

  });

});
