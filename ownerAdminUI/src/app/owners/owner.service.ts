import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../model/api-models/owner.model';
import { UpdateOwnerRequest } from '../model/api-models/update-owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private baseApiUrl = 'https://localhost:7152';
  constructor(private httpClient : HttpClient) { }

  getOwners() : Observable<Owner[]>{
    return this.httpClient.get<Owner[]>(this.baseApiUrl + '/api/owner');
  }

  getOwner(ownerId : string) : Observable<Owner>{
    return this.httpClient.get<Owner>(this.baseApiUrl + '/api/owner/' + ownerId);
  }

  updateOwner(ownerId:string, ownerRequest:Owner) : Observable<Owner>{
    const UpdateOwnerRequest:UpdateOwnerRequest = {
      name: ownerRequest.name,
      dateOfBirth: ownerRequest.dateOfBirth,
      address: ownerRequest.address
    }

    return this.httpClient.put<Owner>(this.baseApiUrl + '/api/owner/' + ownerId, UpdateOwnerRequest);
  }

  deleteOwner(ownerId : string) : Observable<Owner>{
    return this.httpClient.delete<Owner>(this.baseApiUrl + '/api/owner/' + ownerId);
  }

  addOwner(ownerRequest:Owner) : Observable<Owner>{
    const AddOwnerRequest:Owner = {
      ownerId: ownerRequest.ownerId,
      name: ownerRequest.name,
      dateOfBirth: ownerRequest.dateOfBirth,
      address: ownerRequest.address
    };

    return this.httpClient.post<Owner>(this.baseApiUrl + '/api/owner', AddOwnerRequest);
  }


}
