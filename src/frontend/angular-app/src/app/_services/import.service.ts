import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BackendService {

    constructor(public http: HttpClient) { }

    public async uploadFile(fileToUpload: File) {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post<Object>(`${environment.apiUrl}/api/upload`, formData).toPromise()

    }



}