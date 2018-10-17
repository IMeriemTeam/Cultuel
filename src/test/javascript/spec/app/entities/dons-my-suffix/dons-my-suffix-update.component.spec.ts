/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { DonsMySuffixUpdateComponent } from 'app/entities/dons-my-suffix/dons-my-suffix-update.component';
import { DonsMySuffixService } from 'app/entities/dons-my-suffix/dons-my-suffix.service';
import { DonsMySuffix } from 'app/shared/model/dons-my-suffix.model';

describe('Component Tests', () => {
    describe('DonsMySuffix Management Update Component', () => {
        let comp: DonsMySuffixUpdateComponent;
        let fixture: ComponentFixture<DonsMySuffixUpdateComponent>;
        let service: DonsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [DonsMySuffixUpdateComponent]
            })
                .overrideTemplate(DonsMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DonsMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DonsMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DonsMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dons = entity;
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
                    const entity = new DonsMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dons = entity;
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
