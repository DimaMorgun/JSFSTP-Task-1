export interface UploadFileModel {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    buffer?: Buffer;
    size?: number;
}
