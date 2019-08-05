export interface BookModel {
    id?: string;
    name?: string;
    price?: number;
    type?: string;
    imageSrc?: string;
    authors?: string[];
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;

    isInCard?: boolean;
}
