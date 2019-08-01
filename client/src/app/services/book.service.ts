import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BookModel } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class BookService {
  private endpointUrl = `${environment.apiHttpsRoute}:${environment.apiHttpsPort}/book`;

  constructor(private http: HttpClient) { }

  public async getBooks(): Promise<BookModel[]> {
    const books: BookModel[] = await this.http.get<BookModel[]>(this.endpointUrl).toPromise();

    return books;
  }

}
