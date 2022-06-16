import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../model/api-models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private baseApiUrl = 'https://localhost:7152';
  constructor(private httpClient : HttpClient) { }

  getOwners() : Observable<Owner[]>{
    return this.httpClient.get<Owner[]>(this.baseApiUrl + '/api/owner');
  }
}
