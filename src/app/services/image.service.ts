import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'https://picsum.photos/200/300';

  constructor(private http: HttpClient) {}

  getRandomImage(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'blob' });
  }
}
