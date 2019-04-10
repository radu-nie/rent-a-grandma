export const FilesTypesEnum = {
    JPEG: 0,
    JPG: 1,
    PNG: 2,
    PDF: 3,
    DOC: 4,
    DOCX: 5
}

export class FileHelper {

    public static getExtention(fileType): string {

        var fileExtention = "";

        switch (fileType) {
            case FilesTypesEnum.JPG:
                fileExtention = ".jpg";
                break;
            case FilesTypesEnum.JPEG:
                fileExtention = ".jpeg";
                break;
            case FilesTypesEnum.PNG:
                fileExtention = ".png";
                break;
            case FilesTypesEnum.PDF:
                fileExtention = ".pdf";
                break;
            case FilesTypesEnum.DOC:
                fileExtention = ".doc";
                break;
            case FilesTypesEnum.DOCX:
                fileExtention = ".docx";
                break;
            default:
                break;
        }

        return fileExtention;
    }
}