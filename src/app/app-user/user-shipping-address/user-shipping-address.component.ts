
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserShippingAddressesService } from 'src/app/services/user-shipping-addresses.service';
import { UserPersonalDetailsComponent } from '../user-personal-details/user-personal-details.component';
import { ShippingAddress } from '../user-shipping-addresses';

@Component({
  selector: 'app-user-shipping-address',
  templateUrl: './user-shipping-address.component.html',
  styleUrls: ['./user-shipping-address.component.css']
})
export class UserShippingAddressComponent implements OnInit {

  userShippingAddressForm: FormGroup | any;
  userShippingAddress: ShippingAddress;
  isDefaultChecked: boolean = false;

  constructor(private authService: AuthService, private userShippingAddressService: UserShippingAddressesService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserPersonalDetailsComponent>) {

      this.userShippingAddress = {
        fullName: '',
        address: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
        default: false
      }
   }

  ngOnInit(): void {

    this.userShippingAddressForm = new FormGroup ( {
          
      fullName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('')
     })
  }


  saveUserAddress() {

       this.userShippingAddress.fullName = this.userShippingAddressForm.get('fullName').value;
       this.userShippingAddress.address = this.userShippingAddressForm.get('address').value;
       this.userShippingAddress.phoneNumber = this.userShippingAddressForm.get('phoneNumber').value;
       this.userShippingAddress.city = this.userShippingAddressForm.get('city').value;
       this.userShippingAddress.state = this.userShippingAddressForm.get('state').value;
       this.userShippingAddress.zipCode = this.userShippingAddressForm.get('zipCode').value;
       this.userShippingAddress.default = this.isDefaultChecked;


       this.userShippingAddressService.saveAddressForAUser(this.getLoggedInUsername(), this.userShippingAddress).subscribe(() => {
         
              this.onClose();

              this.snackBar.open("Address saved", 'X', {
                duration: 5000,
                verticalPosition: 'top',
                panelClass: ['green-snackbar']
              });

              this.refreshParent();
       })

  }

  checkDefault(event: any) {

    if (event.checked) {
      this.isDefaultChecked = true;
    } else {
      this.isDefaultChecked = false;
    }
  }

  onClose() {
    this.userShippingAddressForm.reset();
    this.dialogRef.close();
  }

  refreshParent() {
    window.location.reload();
  }

  onClear() {
    this.userShippingAddress.default = false;
    this.userShippingAddressForm.reset();
  }

  getLoggedInUsername(): string {
    return this.authService.getEmail();
  }

}
