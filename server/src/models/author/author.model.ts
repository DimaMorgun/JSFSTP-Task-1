export interface AuthorModel {
    id?: string;
    name?: string;
    country?: string;
    birthday?: Date;
    deathday?: Date;
    books?: string[];
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}
