export interface DefaultServerResponse<ResponseInterface> {
    response: any;
    Status: boolean;
    Message: string;
    ValidationErrors: string[];
    Data: ResponseInterface;
}


export interface newsFields {
    thumbnail: string
}

export interface newsResults {
    apiUrl: string,
    fields: newsFields[],
    id: string,
    isHosted: boolean,
    pillarId: string,
    pillarName: string,
    sectionId: string,
    sectionName: string,
    type: string,
    webPublicationDate: string,
    webTitle: string,
    webUrl: string
}

export interface news {
    currentPage: number,
    orderBy: string,
    pageSize: number,
    pages: number,
    results: newsResults[],
    startIndex: number,
    status: string,
    total: number,
    userTier: string,
}

export interface singleItem {
    id: string,

}

export interface IResponseItem {
    id: string | null | undefined;
    webTitle: string;
    fields: { thumbnail: string | undefined; trailText: string; };
    webPublicationDate: string | number | Date;
    sectionName: string;
    sectionId: string;
}