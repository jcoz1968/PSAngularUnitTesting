import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroService } from './../hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture, mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3' }}}
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        { provide: HeroService, useValue: mockHeroService },
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
  });

  it('should render hero name in an h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

});
