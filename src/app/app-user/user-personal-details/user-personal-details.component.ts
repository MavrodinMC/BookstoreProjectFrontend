import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserPersonalDetailsService } from 'src/app/services/user-personal-details.service';
import { UserShippingAddressesService } from 'src/app/services/user-shipping-addresses.service';
import { UserPersonalDetailsPayload } from '../user-personal-details';
import { ShippingAddress } from '../user-shipping-addresses';

@Component({
  selector: 'app-user-personal-details',
  templateUrl: './user-personal-details.component.html',
  styleUrls: ['./user-personal-details.component.css']
})
export class UserPersonalDetailsComponent implements OnInit {

  userProfile: UserPersonalDetailsPayload | any;
  userDetailsForm: FormGroup | any;
  userShippingAddress: ShippingAddress[] | any;
  userShippingAddressForm: FormGroup | any;

  constructor(private userPersonalDetailsService: UserPersonalDetailsService, private authService: AuthService, private userShippingAddressService: UserShippingAddressesService,private snackBar: MatSnackBar) { 
    this.userProfile = {};
    this.userShippingAddress = {};
  }

  ngOnInit(): void {

   this.getUserProfileByEmail();
   this.getUserAddressesByEmail();

   this.userDetailsForm = new FormGroup ( {
          
    favoriteAuthor: new FormControl(this.userProfile.favoriteAuthor, Validators.required),
    favoriteBook: new FormControl(this.userProfile.favoriteBook, Validators.required),
    favoriteQuote: new FormControl(this.userProfile.favoriteQuote, Validators.required),
    aboutYourself: new FormControl(this.userProfile.aboutYouself, Validators.required)

   })

   this.userShippingAddressForm = new FormGroup ( {
          
    fullname: new FormControl(this.userShippingAddress.fullname, Validators.required),
    address: new FormControl(this.userShippingAddress.address, Validators.required),
    phoneNumber: new FormControl(this.userShippingAddress.phoneNumber, Validators.required),
    city: new FormControl(this.userShippingAddress.city, Validators.required),
    state: new FormControl(this.userShippingAddress.state, Validators.required),
    zipCode: new FormControl(this.userShippingAddress.zipCode)

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

  getUserAddressesByEmail() {

    this.userShippingAddressService.getUserShippingAddresses(this.getLoggedInUsername()).subscribe(data => {

      this.userShippingAddress = data;
      this.userShippingAddressForm.patchValue({fullName: this.userShippingAddress.fullName});
      this.userShippingAddressForm.patchValue({address: this.userShippingAddress.address});
      this.userShippingAddressForm.patchValue({phoneNumber: this.userShippingAddress.phoneNumber});
      this.userShippingAddressForm.patchValue({city: this.userShippingAddress.city});
      this.userShippingAddressForm.patchValue({state: this.userShippingAddress.state});
      this.userShippingAddressForm.patchValue({zipCode: this.userShippingAddress.zipCode});
      

       console.log(this.userShippingAddress);

    })
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

    })
  })
}

  getLoggedInUsername(): string {
    return this.authService.getEmail();
  }

}
