
import { HttpService } from '@nestjs/axios';
import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()

export class GlobalService {
    constructor(private readonly httpService: HttpService) { }

    async fetchDataUrl(payload: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        body?: any;
        headers?: any;
    }): Promise<{ success: boolean; message: string; data: any }> {
        let result: { success: boolean; message: string; data: any };
        try {
            const httpService = this.httpService.axiosRef;
            const opts = payload?.headers ? { headers: payload.headers } : {};
            const body = payload?.body ? JSON.stringify(payload.body) : {};
            let resp: any
            switch (payload.method) {
                case 'GET':
                    resp = await httpService.get(payload.url, opts);
                    break;
                case 'POST':
                    resp = await httpService.post(payload.url, body, opts);
                    break;
                case 'PUT':
                    resp = await httpService.put(payload.url, body, opts);
                    break;
                case 'DELETE':
                    resp = await httpService.delete(payload.url, opts);
                    break;
                default:
                    return {
                        success: false,
                        message: 'Method not found',
                        data: null,
                    };
            }
            const data = await resp.data;
            result = {
                success: true,
                message: 'Success',
                data,
            };
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'Error';
            result = {
                success: false,
                message,
                data: null,
            };
        }
        return result;
    }
}