import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticlesTrue } from 'app/shared/model/articles-true.model';
import { ArticlesTrueService } from './articles-true.service';

@Component({
    selector: 'jhi-articles-true-delete-dialog',
    templateUrl: './articles-true-delete-dialog.component.html'
})
export class ArticlesTrueDeleteDialogComponent {
    articles: IArticlesTrue;

    constructor(
        protected articlesService: ArticlesTrueService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articlesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'articlesListModification',
                content: 'Deleted an articles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-articles-true-delete-popup',
    template: ''
})
export class ArticlesTrueDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articles }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ArticlesTrueDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.articles = articles;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/articles-true', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/articles-true', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
