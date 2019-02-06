/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { PrecheMySuffixUpdateComponent } from 'app/entities/preche-my-suffix/preche-my-suffix-update.component';
import { PrecheMySuffixService } from 'app/entities/preche-my-suffix/preche-my-suffix.service';
import { PrecheMySuffix } from 'app/shared/model/preche-my-suffix.model';

describe('Component Tests', () => {
    describe('PrecheMySuffix Management Update Component', () => {
        let comp: PrecheMySuffixUpdateComponent;
        let fixture: ComponentFixture<PrecheMySuffixUpdateComponent>;
        let service: PrecheMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [PrecheMySuffixUpdateComponent]
            })
                .overrideTemplate(PrecheMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrecheMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecheMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrecheMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preche = entity;
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
                    const entity = new PrecheMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.preche = entity;
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
