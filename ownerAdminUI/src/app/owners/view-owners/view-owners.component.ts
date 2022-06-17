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
  // xử lý đơn vị hành chính

  public districts: string[] = ['Quận Huyện'];
  public vietnamData = [
    { city: 'Chọn thành phố', district: ['Quận Huyện'] },
    {
      city: 'An Giang',
      district: [
        'Thành phố Long Xuyên',
        'Thành phố Châu Đốc',
        'Thị xã Tân Châu',
        'Huyện An Phú',
        'Huyện Châu Phú',
        'Huyện Châu Thành',
        'Huyện Chợ Mới',
        'Huyện Phú Tân',
        'Huyện Thoại Sơn',
        'Huyện Tịnh Biên',
        'Huyện Tri Tôn',
      ],
    },
    {
      city: 'Bà Rịa - Vũng Tàu',
      district: [
        'Thành phố Vũng Tàu',
        'Thị xã Bà Rịa',
        'Thị xã Phú Mỹ',
        'Huyện Châu Đức',
        'Huyện Côn Đảo',
        'Huyện Đất Đỏ',
        'Huyện Long Điền',
        'Huyện Tân Thành',
        'Huyện Xuyên Mộc',
      ],
    },
    {
      city: 'Bạc Liêu',
      district: [
        'Thành phố Bạc Liêu',
        'Huyện Đông Hải',
        'Huyện Giá Rai',
        'Huyện Hòa Bình',
        'Huyện Hồng Dân',
        'Huyện Phước Long',
        'Huyện Vĩnh Lợi',
      ],
    },
    {
      city: 'Bắc Kạn',
      district: [
        'Thị xã Bắc Kạn',
        'Huyện Ba Bể',
        'Huyện Bạch Thông',
        'Huyện Chợ Đồn',
        'Huyện Chợ Mới',
        'Huyện Na Rì',
        'Huyện Ngân Sơn',
        'Huyện Pác Nặm',
      ],
    },
  ];


  ownerId: string | null | undefined;
  owner: Owner = {
    ownerId: '',
    name:'',
    dateOfBirth:'',
    address:''
  }

  ct = '';
  dis = '';
  isNewOwner = true;
  header = '';
  count = 0;
  selected = '';
  constructor(private readonly ownerService : OwnerService, private readonly route: ActivatedRoute,
    private matSnack:MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.ownerId = params.get('id');
        if(this.ownerId){
          if(this.ownerId.toLowerCase() === 'Add'.toLowerCase()){
            this.isNewOwner = true;
            this.header = 'Add New Owner';
            this.ownerService.getOwners().subscribe(
              (data)=>{
                this.count = data.length + 1;
                this.owner.ownerId ='owner' + this.count.toString();
              }
            );


          }else{
            this.isNewOwner = false;
            this.header = 'Edit Owner';
          }
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
        setTimeout(() => {
          this.router.navigateByUrl('owner')
        }, 2000);
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


  onAddNew() : void{
    this.ownerService.addOwner(this.owner).subscribe(
      (successResponse)=> {
        this.matSnack.open('Owner created succesfully',undefined,{
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


  public changeCity(event : any) : void{
    const city = event.value;
    if (!city) {
      return;
    }

    // cách 1
    // const search = this.vietnamData.filter((data) => data.city === city);
    // console.log('search', search);
    // if (search && search.length > 0) {
    //   this.districts = search[0].district;
    // }

    // cách 2

    this.districts = this.vietnamData.find((data) => data.city === city)?.district || [];
    this.selected = this.districts[0];
    this.ct= city;

  }



  public fillAddress(event: any): void {
    const district = event.value;
    if (!district) {
      return;
    }

    this.owner.address =district + ' - ' + this.ct;
  }

}
