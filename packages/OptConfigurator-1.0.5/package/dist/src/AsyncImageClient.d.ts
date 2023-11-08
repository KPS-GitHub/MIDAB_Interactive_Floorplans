/** Data for image to be loaded lazily from the server using IFetcher */
export interface IAsyncImageData {
    id: string;
    broken: boolean;
    imageURL?: string;
    imageContent: string | null;
    imageElement: HTMLImageElement | null;
    hasImage: boolean;
}
export declare class AsyncImageData implements IAsyncImageData {
    id: string;
    imageURL?: string | undefined;
    imageContent: string | null;
    broken: boolean;
    imageElement: HTMLImageElement | null;
    get hasImage(): boolean;
    constructor(id: string, imageURL?: string | undefined);
}
export interface IAsyncImageClient {
    fetchImage<T extends IAsyncImageData>(floorplanImage: T): Promise<T>;
    getBlobUrl(floorplanImage: IAsyncImageData): Promise<string>;
}
export declare type IFetcher = (url: string, headers: {
    [key: string]: string;
}) => Promise<Response>;
export declare class AsyncImageClient implements IAsyncImageClient {
    currentFetchRequests: Map<string, Promise<string>>;
    constructor(fetcher: IFetcher);
    fetcher: IFetcher;
    private imageURLToBlobURL;
    getBlobUrl(floorplanImage: IAsyncImageData): Promise<string>;
    fetchImageOrEmpty<T extends IAsyncImageData>(floorplanImage: T): Promise<T | null>;
    fetchImage<T extends IAsyncImageData>(floorplanImage: T): Promise<T>;
}
