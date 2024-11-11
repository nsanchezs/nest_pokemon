import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-interfaces-adapter";
import { Injectable } from "@nestjs/common";

@Injectable()  //decoramos el adapter
export class AxiosAdapter implements HttpAdapter {

    private readonly axios: AxiosInstance = axios

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await axios.get<T>(url);
            return data;

        } catch (error) {

            throw new Error("Method not implemented.");
        }

    }

}