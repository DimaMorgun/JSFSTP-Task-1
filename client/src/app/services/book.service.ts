import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BookModel, BookFilterModel } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
    private endpointUrl = `${environment.apiHttpsRoute}:${environment.apiHttpsPort}/book`;

    constructor(private http: HttpClient) { }

    public async getBooks(): Promise<BookModel[]> {
        const books: BookModel[] = await this.http.get<BookModel[]>(this.endpointUrl).toPromise();

        return books;
    }

    public async getBookById(bookId: string): Promise<BookModel> {
        const book: BookModel = await this.http.get<BookModel>(`${this.endpointUrl}/${bookId}`).toPromise();

        return book;
    }

    public async getFilteredBooks(bookFilterModel: BookFilterModel): Promise<BookModel[]> {
        if (!bookFilterModel) {
            return new Array<BookModel>();
        }

        let httpParams = new HttpParams();
        for (const key of Object.keys(bookFilterModel)) {
            if (Array.isArray(bookFilterModel[key])) {
                console.log(bookFilterModel[key]);
                bookFilterModel[key].forEach(value => httpParams = httpParams.append(key, value));
            } else {
                console.log(bookFilterModel[key]);
                httpParams = httpParams.append(key, bookFilterModel[key]);
            }
        }

        console.log(httpParams);
        const paramsString = httpParams.toString();
        console.log(paramsString);

        const books: BookModel[] = await this.http.get<BookModel[]>(`${this.endpointUrl}/filter?${paramsString}`).toPromise();

        return books;
    }
}
