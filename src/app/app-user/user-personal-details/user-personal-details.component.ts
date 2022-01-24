import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserPersonalDetailsService } from 'src/app/services/user-personal-details.service';
import { UserShippingAddressesService } from 'src/app/services/user-shipping-addresses.service';
import { UserPersonalDetailsPayload } from '../user-personal-details';
import { UserShippingAddressComponent } from '../user-shipping-address/user-shipping-address.component';

@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: ['./user-personal-details.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserPersonalDetailsComponent implements OnInit {

  addressList: MatTableDataSource<any>;
  userProfile: UserPersonalDetailsPayload | any;
  userDetailsForm: FormGroup | any;
  displayedColumns: string[] = ['fullName', 'address', 'phoneNumber', 'city', 'state', 'zipCode', 'actions', 'default'];

  constructor(private userPersonalDetailsService: UserPersonalDetailsService, private authService: AuthService, private userShippingAddressService: UserShippingAddressesService, private snackBar: MatSnackBar, private dialog: MatDialog) { 
    this.userProfile = {};
    this.addressList = new MatTableDataSource();
  }

  ngOnInit() {

   this.getUserProfileByEmail();
   this.getUserAddresses();
  
   this.userDetailsForm = new FormGroup ( {
          
    favoriteAuthor: new FormControl(this.userProfile.favoriteAuthor, Validators.required),
    favoriteBook: new FormControl(this.userProfile.favoriteBook, Validators.required),
    favoriteQuote: new FormControl(this.userProfile.favoriteQuote, Validators.required),
    aboutYourself: new FormControl(this.userProfile.aboutYourself, Validators.required)

   })
  }

  getUserProfileByEmail() {
     
    this.userPersonalDetailsService.getUserDetailsByEmail(this.getLoggedInUsername()).subscribe(data => {
       this.userProfile = data;
       this.userDetailsForm.patchValue({favoriteAuthor: this.userProfile.favoriteAuthor});
       this.userDetailsForm.patchValue({favoriteBook: this.userProfile.favoriteBook});
       this.userDetailsForm.patchValue({favoriteQuote: this.userProfile.favoriteQuote});
       this.userDetailsForm.patchValue({aboutYourself: this.userProfile.aboutYourself});
       console.log(this.userProfile);
    })
  }

  getUserAddresses(){
    this.userShippingAddressService.getUserShippingAddresses(this.getLoggedInUsername()).subscribe(data => {

        this.addressList = new MatTableDataSource(data);
    });
  }

  updateUserProfilebyId(id: number): void {

    this.userProfile.favoriteAuthor = this.userDetailsForm.get('favoriteAuthor').value;
    this.userProfile.favoriteBook = this.userDetailsForm.get('favoriteBook').value;
    this.userProfile.favoriteQuote = this.userDetailsForm.get('favoriteQuote').value;
    this.userProfile.aboutYourself = this.userDetailsForm.get('aboutYourself').value;

    
    this.userPersonalDetailsService.updateuserDetailsById(id, this.userProfile).subscribe( data => {
      
      this.userProfile = data;
      this.snackBar.open("Changes saved!", 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['green-snackbar']

      });
    });
 }

 updateAddressForAUser(row: any) {

  this.userShippingAddressService.populateShippingAddressUpdateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  
  this.dialog.open(UserShippingAddressComponent, dialogConfig);

 }

 deleteAddressForAUser(shippingAddressId: number): void {

  if (confirm('Are you sure you want to delete this record?')) {

    this.userShippingAddressService.deleteAddressForAUser(shippingAddressId, this.getLoggedInUsername()).subscribe(() => {

      this.addressList.data.splice(shippingAddressId, 0);

      this.snackBar.open("Address deleted!", 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar']
  
        });
  
        this.ngOnInit();

    });

  }
 }

 refreshParent() {
  window.location.reload();
}

  getLoggedInUsername(): string {
    return this.authService.getEmail();
  }

  openAddressForm() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserShippingAddressComponent, dialogConfig);
  }

}
