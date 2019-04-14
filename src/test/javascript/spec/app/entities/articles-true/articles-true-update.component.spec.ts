/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { ArticlesTrueUpdateComponent } from 'app/entities/articles-true/articles-true-update.component';
import { ArticlesTrueService } from 'app/entities/articles-true/articles-true.service';
import { ArticlesTrue } from 'app/shared/model/articles-true.model';

describe('Component Tests', () => {
    describe('ArticlesTrue Management Update Component', () => {
        let comp: ArticlesTrueUpdateComponent;
        let fixture: ComponentFixture<ArticlesTrueUpdateComponent>;
        let service: ArticlesTrueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [ArticlesTrueUpdateComponent]
            })
                .overrideTemplate(ArticlesTrueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticlesTrueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticlesTrueService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ArticlesTrue(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.articles = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ArticlesTrue();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.articles = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
