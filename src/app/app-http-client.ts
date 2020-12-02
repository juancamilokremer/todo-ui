import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';

export interface RequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

export abstract class AppHttpClient {
    private api: string;

    constructor(protected httpClient: HttpClient,
        protected apiKey: string,
        protected serviceName: string,
        protected version?: string) {
        this.api = environment[apiKey as keyof object];
        this.api += version ? `/${version}/${serviceName}` : `/${serviceName}`;
    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @param {string} api use if there is needed to send request to different back-end than the default one.
     * @returns {Observable<T>}
     */
    protected get<T>(endPoint: string, options?: RequestOptions): Observable<T> {
        return this.httpClient.get<T>(this.api + endPoint, options).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} body body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    protected post<T>(endPoint: string, body: Object, options?: RequestOptions): Observable<T> {
        return this.httpClient.post<T>(this.api + endPoint, body, options).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} body body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    protected put<T>(endPoint: string, body: Object, options?: RequestOptions): Observable<T> {
        return this.httpClient.put<T>(this.api + endPoint, body, options).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    protected delete<T>(endPoint: string, options?: RequestOptions): Observable<T> {
        return this.httpClient.delete<T>(this.api + endPoint, options).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }
}