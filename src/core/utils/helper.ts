export class Helper {
    public static deepCopy = (arr: any[]) => JSON.parse(JSON.stringify(arr));
}