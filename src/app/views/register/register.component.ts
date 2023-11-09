import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('closebutton') closebutton: any;
  mregisterForm!: FormGroup;
  formdata: any;
  p: number = 1;
  firstna: any;
  lastna: any;
  mobile: any;
  emal: any;
  constructor(private http: HttpClient, private authservice: AuthService) {}
  ngOnInit() {
    this.getListitem();
    this.mregisterForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      email: new FormControl(''),
      mobileno: new FormControl(''),
      uid: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      cpassword: new FormControl(''),
      utype: new FormControl(''),
      status: new FormControl(''),
      log_year: new FormControl(''),
    });
  }

  list: any = [];

  getListitem() {
    this.authservice.GetAllMregister().subscribe((res) => {
      console.log(res);
      return (this.list = res);
    });
  }

  onEdit(lists: any) {
    this.mregisterForm.controls['firstname'].setValue(lists.firstname);
    this.mregisterForm.controls['lastname'].setValue(lists.lastname);
    this.mregisterForm.controls['email'].setValue(lists.email);
    this.mregisterForm.controls['mobileno'].setValue(lists.mobileno);
    this.mregisterForm.controls['uid'].setValue(lists.uid);
    this.mregisterForm.controls['username'].setValue(lists.username);
    this.mregisterForm.controls['password'].setValue(lists.password);
    this.mregisterForm.controls['cpassword'].setValue(lists.cpassword);
    this.mregisterForm.controls['utype'].setValue(lists.utype);
    this.mregisterForm.controls['status'].setValue(lists.status);
    this.mregisterForm.controls['log_year'].setValue(lists.log_year);
  }

  onEditSubmit() {
    this.formdata = JSON.stringify(this.mregisterForm.value);
    console.log(this.formdata);

    this.authservice
      .updatemRegister(this.mregisterForm.value)
      .subscribe((res) => {
        this.closebutton.nativeElement.click();
        this.getListitem();
        return (this.formdata = res);
      });
  }
  onDeleteAction() {}
  filterTerm!: string;
  param: any;
  Search(value: any) {
    if (
      this.firstna == '' &&
      this.lastna == '' &&
      this.mobile == '' &&
      this.emal == ''
    ) {
      this.getListitem();
    } else {
      if (this.firstna == undefined) {
        this.firstna = '';
      }
      if (this.lastna == undefined) {
        this.lastna = '';
      }
      if (this.mobile == undefined) {
        this.mobile = '';
      }
      if (this.emal == undefined) {
        this.emal = '';
      }
      this.param = {
        firstname: this.firstna,
        lastname: this.lastna,
        mobileno: this.mobile,
        email: this.emal,
      };
      console.log(this.param);
      this.authservice.filterSearch(this.param).subscribe((res) => {
        return (this.list = res);
      });
    }
  }
}
