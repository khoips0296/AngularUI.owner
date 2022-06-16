import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../model/ui-models/owner.model';
import { OwnerService } from './owner.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners : Owner[] = [];
  displayedColumns: string[] = ['ownerId','name','dateOfBirth','address','edit'];
  dataSource: MatTableDataSource<Owner> = new MatTableDataSource<Owner>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private ownerService : OwnerService) { }

  ngOnInit(): void {
    //Lấy và nạp thông tin owner
    this.ownerService.getOwners()
    .subscribe(
      (successResponse) => {
          this.owners = successResponse;
          this.dataSource = new MatTableDataSource<Owner>(this.owners);

          if(this.matPaginator){
            this.dataSource.paginator = this.matPaginator;
          }

          if(this.matSort){
            this.dataSource.sort = this.matSort;
          }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }


  filterOwner(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
