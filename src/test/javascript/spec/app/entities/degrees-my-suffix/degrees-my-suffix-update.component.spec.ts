/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { DegreesMySuffixUpdateComponent } from 'app/entities/degrees-my-suffix/degrees-my-suffix-update.component';
import { DegreesMySuffixService } from 'app/entities/degrees-my-suffix/degrees-my-suffix.service';
import { DegreesMySuffix } from 'app/shared/model/degrees-my-suffix.model';

describe('Component Tests', () => {
    describe('DegreesMySuffix Management Update Component', () => {
        let comp: DegreesMySuffixUpdateComponent;
        let fixture: ComponentFixture<DegreesMySuffixUpdateComponent>;
        let service: DegreesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DegreesMySuffixUpdateComponent]
            })
                .overrideTemplate(DegreesMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DegreesMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegreesMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DegreesMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.degrees = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DegreesMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.degrees = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
