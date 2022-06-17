import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private readonly ownerService : OwnerService, private readonly route: ActivatedRoute,
    private matSnack:MatSnackBar, private router: Router) { }

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

  onUpdate() : void{
    this.ownerService.updateOwner(this.owner.ownerId, this.owner).subscribe(
      (successResponse)=>{
        this.matSnack.open('Owner updated succesfully',undefined,{duration: 2000});
      },
      (errorResponse)=>{

      }
    );
  }

  onDelete() : void{
    //delete method
    this.ownerService.deleteOwner(this.owner.ownerId).subscribe(
      (successResponse)=>{
        this.matSnack.open('Owner deleted succesfully',undefined,{
          duration:2000
        });

        setTimeout(() => {
          this.router.navigateByUrl('owner')
        }, 2000);
      },
      (errorResponse)=>{

      }
    );
  }

}
