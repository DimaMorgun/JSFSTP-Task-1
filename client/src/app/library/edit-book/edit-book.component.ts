import { Component } from '@angular/core';

import {
    BookService,
    AuthorService,
} from 'src/app/services';

import {
    BookModel,
    AuthorModel,
    DropdownModel,
} from 'src/app/shared/models';

@Component({
    selector: 'app-edit-book',
    templateUrl: './edit-book.component.html',
    styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
    public allBooks: BookModel[] = new Array<BookModel>();
    public paginatedBooks: BookModel[] = new Array<BookModel>();
    public allAuthors: AuthorModel[] = new Array<AuthorModel>();
    public allDropdownAuthor: DropdownModel[] = new Array<DropdownModel>();
    public selectedDropdownAuthors: Map<string, DropdownModel[]> = new Map<string, DropdownModel[]>();

    public dropdownSettings: any = {
        singleSelection: false,
        text: 'Select Authors',
        enableSearchFilter: true,
        classes: 'author-dropdown',
    };

    public page = 0;
    private limit = 5;

    constructor(
        private authorService: AuthorService,
        private bookService: BookService,
    ) {
        this.initialize();
    }

    public hasContent(): boolean {
        const hasBookContent: boolean = (this.allBooks && this.allBooks.length > 0);

        return hasBookContent;
    }

    public onFileChanged(book: BookModel, event: any): void {
        const file: File = event.target.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            console.log(myReader.result);
        };
        myReader.readAsDataURL(file);
    }

    public onAuthorSelected(book: BookModel, selectedAuthor: DropdownModel): void {
        const authorModel: AuthorModel = this.allAuthors.find(author => author.id === selectedAuthor.id);

        if (authorModel) {
            book.authors.push(authorModel.id);
        }
    }

    public onAuthorDeselected(book: BookModel, deselectedAuthor: DropdownModel): void {
        book.authors = book.authors.filter(authorId => authorId !== deselectedAuthor);
    }

    public onSelectedAllAuthors(book: BookModel): void {
        book.authors = this.allAuthors.map(author => {
            return author.id;
        });
    }

    public onDeselectedAllAuthors(book: BookModel): void {
        book.authors = new Array<string>();
    }

    public saveChanges(book: BookModel) {
        console.log(book);
    }

    private async initialize(): Promise<void> {
        this.allBooks = await this.bookService.getBooks();
        this.allAuthors = await this.authorService.getAuthors();

        this.initializeDropdownAuthors();
        this.initializeBookDropdownAuthors();

        await this.getPaginatedBooks(this.page);
    }

    private async getPaginatedBooks(page: number): Promise<void> {
        const startIndex: number = page * this.limit;
        const endIndex: number = startIndex + this.limit;
        const paginatedBooks: BookModel[] = this.allBooks.slice(startIndex, endIndex);

        if (this.allBooks && this.allBooks.length === 0) {
            this.paginatedBooks = this.allBooks;
            return;
        }

        if (paginatedBooks && paginatedBooks.length > 0) {
            this.page = page;
            this.paginatedBooks = paginatedBooks;
        }
    }

    private initializeDropdownAuthors() {
        this.allDropdownAuthor = this.allAuthors.map((author) => {
            const dropdownElement: DropdownModel = {};
            dropdownElement.id = author.id;
            dropdownElement.itemName = author.name;

            return dropdownElement;
        });
    }

    private initializeBookDropdownAuthors() {
        this.allBooks.map(book => {
            const bookAuthors: AuthorModel[] = this.allAuthors.filter(author => book.authors.includes(author.id));
            const bookDropdownAuthors: DropdownModel[] = this.getDropdownAuthors(bookAuthors);

            this.selectedDropdownAuthors[book.id] = bookDropdownAuthors;
        });
    }

    private getDropdownAuthors(authorModels: AuthorModel[]): DropdownModel[] {
        const dropdownAuthors: DropdownModel[] = authorModels.map(author => {
            const dropdownAuthor: DropdownModel = {};
            dropdownAuthor.id = author.id;
            dropdownAuthor.itemName = author.name;

            return dropdownAuthor;
        });

        return dropdownAuthors;
    }
}
