export interface Version {
    version: string;
}
export declare class AppController {
    constructor();
    getHello(): Version;
    getHealthVersion(): Version;
}
