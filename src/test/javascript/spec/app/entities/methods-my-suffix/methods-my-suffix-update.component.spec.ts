/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { MethodsMySuffixUpdateComponent } from 'app/entities/methods-my-suffix/methods-my-suffix-update.component';
import { MethodsMySuffixService } from 'app/entities/methods-my-suffix/methods-my-suffix.service';
import { MethodsMySuffix } from 'app/shared/model/methods-my-suffix.model';

describe('Component Tests', () => {
    describe('MethodsMySuffix Management Update Component', () => {
        let comp: MethodsMySuffixUpdateComponent;
        let fixture: ComponentFixture<MethodsMySuffixUpdateComponent>;
        let service: MethodsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [MethodsMySuffixUpdateComponent]
            })
                .overrideTemplate(MethodsMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MethodsMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MethodsMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MethodsMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.methods = entity;
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
                    const entity = new MethodsMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.methods = entity;
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
