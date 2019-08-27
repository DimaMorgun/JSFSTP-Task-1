import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthorModel } from '../shared/models';


@Injectable()
export class AuthorService {
    private endpointUrl = `${environment.apiHttpsRoute}:${environment.apiHttpsPort}/author`;

    constructor(private http: HttpClient) { }

    public async getAuthors(): Promise<AuthorModel[]> {
        const authors: AuthorModel[] = await this.http.get<AuthorModel[]>(this.endpointUrl).toPromise();

        return authors;
    }
}
