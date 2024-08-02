export class Helper {
    public static deepCopy = (arr: number[] | string[]) => JSON.parse(JSON.stringify(arr));
}