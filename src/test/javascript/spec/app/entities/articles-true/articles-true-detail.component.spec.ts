/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CultuelTestModule } from '../../../test.module';
import { ArticlesTrueDetailComponent } from 'app/entities/articles-true/articles-true-detail.component';
import { ArticlesTrue } from 'app/shared/model/articles-true.model';

describe('Component Tests', () => {
    describe('ArticlesTrue Management Detail Component', () => {
        let comp: ArticlesTrueDetailComponent;
        let fixture: ComponentFixture<ArticlesTrueDetailComponent>;
        const route = ({ data: of({ articles: new ArticlesTrue(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CultuelTestModule],
                declarations: [ArticlesTrueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArticlesTrueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticlesTrueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.articles).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
