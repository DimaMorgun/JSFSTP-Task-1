import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Book } from 'src/app/core/entities';

@Injectable()
export class BookService {
  private endpointUrl = `${environment.apiHttpRoute}${environment.apiHttpPort}/book`;

  constructor(private http: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    const books: Observable<Book[]> = this.http.get<Book[]>(this.endpointUrl);

    return books;
  }

}
