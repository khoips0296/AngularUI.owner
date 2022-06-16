import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/model/ui-models/owner.model';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-view-owners',
  templateUrl: './view-owners.component.html',
  styleUrls: ['./view-owners.component.css']
})
export class ViewOwnersComponent implements OnInit {

  ownerId: string | null | undefined;
  owner: Owner = {
    ownerId: '',
    name:'',
    dateOfBirth:'',
    address:''
  }


  constructor(private readonly ownerService : OwnerService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.ownerId = params.get('id');
        if(this.ownerId){
          this.ownerService.getOwner(this.ownerId).subscribe(
            (successResponse)=>{
              this.owner = successResponse;
            }
          );
        }
      }
    );
  }

}
