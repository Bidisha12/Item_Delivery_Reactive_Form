import { MapsAPILoader } from '@agm/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-delivery',
  templateUrl: './item-delivery.component.html',
  styleUrls: ['./item-delivery.component.css'],
})
export class ItemDeliveryComponent implements OnInit {
  profileForm: any;
  proceed = false;
  test = false;
  show = false;
  terms = false;
  flag = false;
  public showData: any[] = [];
  public selectionModel: any;
  public selectionModel1: any;

  public selectionSource: any;
  public selectiondroptime: any;
  public selectionpickuptime: any;
  // public time: any;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  minDate = new Date();
  maxDate = '2022-01-01';

  public latitude: any;
  public longitude: any;
  zoom: any;
  address?: string;
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;
  @ViewChild('search1')
  public searchElementRef1!: ElementRef;

  constructor(
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit() {
    this.profileForm = new FormGroup({
      source: new FormControl('', Validators.required),
      pickup: new FormControl('', Validators.required),
      drop: new FormControl('', Validators.required),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      number: new FormControl('', [
        Validators.required,
        Validators.pattern('((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      time: new FormControl(''),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      subcategory: new FormControl('', Validators.required),
      pickuptime: new FormControl('', Validators.required),
      droptime: new FormControl('', Validators.required),
      pickUpContactName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      pickUpContactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      pickUpAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      dropContactName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      dropContactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      dropAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      itemDesc: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      customerEmail: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.emailPattern),
      ]),
    });

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );

      let autocomplete1 = new google.maps.places.Autocomplete(
        this.searchElementRef1.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });

      autocomplete1.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  public sourceData = [
    {
      sourceId: 1,
      sourceName: 'FaceBook',
    },
    {
      sourceId: 2,
      sourceName: 'LinkedIn',
    },
    {
      sourceId: 3,
      sourceName: 'Google',
    },
    {
      sourceId: 4,
      sourceName: 'Instagram',
    },
    {
      sourceId: 5,
      sourceName: 'Better Homes',
    },
    {
      sourceId: 6,
      sourceName: 'Email',
    },
    {
      sourceId: 7,
      sourceName: 'Twitter',
    },
  ];

  public main = [
    {
      id: 1,
      categoryName: 'Air Conditioners',
    },
    {
      id: 2,
      categoryName: 'Armories & Wardrobes',
    },
    {
      id: 3,
      categoryName: 'Bed & Bed Sets',
    },
    // {
    //   id: 4,
    //   categoryName: 'Ovens',
    //   rate2: 2000,
    // },
  ];

  public sub: any[] = [
    {
      rate: 1,
      subName: 'Air Conditioners 1',
      rate1: 50,
    },
    {
      rate: 1,
      subName: 'Air Conditioners 2',
      rate1: 30,
    },
    {
      rate: 1,
      subName: 'Air Conditioners 3',
      rate1: 40,
    },
    {
      rate: 2,
      subName: '2 Door Wardrobe',
      rate1: 50,
    },
    {
      rate: 2,
      subName: '3 Door Wardrobe',
      rate1: 70,
    },
    {
      rate: 2,
      subName: '5 Door Wardrobe',
      rate1: 80,
    },
    {
      rate: 3,
      subName: 'Single Bed & Mattress',
      rate1: 90,
    },
    {
      rate: 3,
      subName: 'Double Bed & Mattress',
      rate1: 100,
    },
    {
      rate: 3,
      subName: 'King Bed & Mattress',
      rate1: 700,
    },
  ];

  public picktime = [
    {
      id: 1,
      pickName: '08 AM-10 AM',
    },
    {
      id: 2,
      pickName: '10 AM-12 PM',
    },
    {
      id: 3,
      pickName: '12 PM-02 PM',
    },
    {
      id: 4,
      pickName: '02 PM-04 PM',
    },
  ];

  public droptime = [
    {
      id: 1,
      dropName: '02 PM-04 PM',
    },
    {
      id: 2,
      dropName: '04 PM-06 PM',
    },
    {
      id: 3,
      dropName: '06 PM-08 PM',
    },
    {
      id: 4,
      dropName: '08 PM-10 PM',
    },
  ];

  onSubmit() {
    // console.log(this.profileForm.value);
    this.http
      .post(
        'https://login-11034-default-rtdb.firebaseio.com/forms.json',
        this.profileForm.value
      )
      .subscribe((response) => {
        console.warn('repsonse ', response);
      });
    // this.profileForm.patchValue({
    //   mobile: `+971${this.profileForm.get('mobile').value}`,
    //   dropContactNumber: `+971${this.profileForm.get('dropContactNumber').value}`,
    //   pickUpContactNumber: `+971${this.profileForm.get('pickupMobile').value}`,
    //   this.http
    //     .post(
    //       'https://login-11034-default-rtdb.firebaseio.com/forms.json',
    //       this.profileForm.value
    //     )
    //     .subscribe((response) => {
    //       console.log('repsonse ', response);
    //     });
    //   console.log('profile', this.profileForm.value);
  }

  // TODO: Use EventEmitter with form value
  //console.log(this.profileForm.value);

  // updateProfile() {
  //   this.profileForm.patchValue({
  //     source: this.sourceData[1].sourceName,
  //     pickup: 'Bengaluru',
  //     drop: 'Mumbai',
  //     name: 'Karthik',
  //     number: '720475558',
  //     date: '2021-03-20',
  //     category: this.main[0],
  //     subcategory: this.sub[0],
  //   });
  // }

  // resetProfile() {
  //   this.profileForm.reset();
  // }

  onChange() {
    this.showData = this.sub.filter((o) => o.rate == this.selectionModel.id);
    if (this.showData.length > 0) {
      this.test = true;
    } else {
      this.test = false;
    }
  }

  showProceed() {
    this.proceed = true;
  }

  public itemsArr: any[] = [];
  public final = 0;
  public vat = 0;
  public total = 0;
  public subVat = 0;
  public subTotal = 0;
  public subFinal = 0;

  // calculate ()
  // {
  //   this.total += this.showData[0].rate1;
  //   this.vat = (this.showData[0].rate1 / 100) * 5;
  //   this.final += this.showData[0].rate1 + this.vat;
  //   this.subTotal += this.showData[0].rate1 + 34;
  //   this.subVat = (this.subTotal / 100) * 5;
  //   this.subFinal = this.subTotal + this.subVat;
  // }
  calculateTotal() {
      let sum = 0;
      this.itemsArr.forEach((item) => {
        sum += item.itemPrice;
      });
      return sum;

    // console.log('sum', sum);
  }

  // calculateTotalForDelete()
  // {
  //   let sum = 0;
  //   this.itemsArr.forEach((item) => {
  //     sum -= item.itemPrice;
  //   });
  //   // console.log('sum', sum);
  //   return sum;
  // }
  get totalCal() {
    return this.calculateTotal();
  }
  // CALCULATE VAT
  calculateVAT() {
    let total = this.calculateTotal();
    let vat = 0.05 * total;
    return vat;
  }
  get vatCal() {
    return this.calculateVAT();
  }
  // FINAL  QUOTE
  calculateFinalQuote() {
    return this.calculateTotal() + this.calculateVAT();
  }
  get finalQuote() {
    return this.calculateFinalQuote();
  }
  dateKeydownHandler() {
    return false;
  }

  displayform() {
    this.flag = true;
    this.showData = this.sub.filter((o) => o.subName == this.selectionModel1);
    if (this.showData.length <= 0) {
      this.showData = this.main.filter(
        (o) => o.categoryName == this.selectionModel
      );
    }
    this.itemsArr.push(this.showData[0]);
    this.total += this.showData[0].rate1;
    this.vat = (this.showData[0].rate1 / 100) * 5;

    this.final += this.showData[0].rate1 + this.vat;
    this.subTotal += this.showData[0].rate1 + 34;
    this.subVat = (this.subTotal / 100) * 5;
    this.subFinal = this.subTotal + this.subVat;
  }
  // copySellerDetails() {
  //   this.profileForm.patchValue({
  //     pickUpContactName: this.name.value,
  //     pickUpContactNumber: this.number.value,
  //   });
  // }

  seller: any = 'seller';
  buyer: any = 'buyer';

  copyUserDetails(data: any) {
    this.profileForm.patchValue({
      pickUpContactName: this.name.value,
      pickUpContactNumber: this.number.value,
      dropContactName: '',
      dropContactNumber: '',
    });
    if (data == this.seller) {
      this.profileForm.patchValue({
        pickUpContactName: this.name.value,
        pickUpContactNumber: this.number.value,
        dropContactName: '',
        dropContactNumber: '',
      });
    } else if (data == this.buyer) {
      this.profileForm.patchValue({
        dropContactName: this.name.value,
        dropContactNumber: this.number.value,
        pickUpContactName: '',
        pickUpContactNumber: '',
      });
    }
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.profileForm.get('pickuptime').setValidators([]);
      this.profileForm.get('droptime').setValidators([]);
      this.profileForm.get('pickuptime').setErrors(null);
      this.profileForm.get('droptime').setErrors(null);
    } else {
      this.profileForm.get('pickuptime').setValidators([Validators.required]);
      this.profileForm.get('droptime').setValidators([Validators.required]);
      this.profileForm.patchValue({
        time: '',
      });
    }
    this.profileForm.updateValueAndValidity();
    console.log(this.profileForm);
  }

  termsToggle() {
    this.terms = !this.terms;
  }

  // copyBuyerDetails() {
  //   this.profileForm.patchValue({
  //     dropContactName: this.name.value,
  //     dropContactNumber: this.number.value,
  //   });
  // }

  deleteHandeler(i) {
    this.calculateTotal();
    // for(let i=0; i < this.itemsArr.length; i++)
    // {
    let sum = 0;
    this.itemsArr.splice(i, 1);

    // }

    // this.calculateTotalForDelete();
  }

  get name() {
    return this.profileForm.get('name');
  }

  get pickup() {
    return this.profileForm.get('pickup');
  }

  get drop() {
    return this.profileForm.get('drop');
  }

  get number() {
    return this.profileForm.get('number');
  }

  onCountryChange(event) {
    console.log(event);
  }

  get pickUpContactName() {
    return this.profileForm.get('pickUpContactName');
  }

  get pickUpContactNumber() {
    return this.profileForm.get('pickUpContactNumber');
  }

  get pickUpAddress() {
    return this.profileForm.get('pickUpAddress');
  }

  get dropContactName() {
    return this.profileForm.get('dropContactName');
  }

  get dropContactNumber() {
    return this.profileForm.get('dropContactNumber');
  }

  get dropAddress() {
    return this.profileForm.get('dropAddress');
  }

  get itemDesc() {
    return this.profileForm.get('itemDesc');
  }

  get customerEmail() {
    return this.profileForm.get('customerEmail');
  }

  get source() {
    return this.profileForm.get('source');
  }

  get category() {
    return this.profileForm.get('category');
  }

  get subcategory() {
    return this.profileForm.get('subcategory');
  }

  get date() {
    return this.profileForm.get('date');
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  windowScrolled: boolean | undefined;

  scrollToTop() {
    this.profileForm.patchValue({
      category: undefined,
      subcategory: undefined,
    });
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  scrollToId(id: string) {
    var el = document.getElementById(id);
    el?.scrollIntoView();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphabetsOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 8
    )
      return true;
    else return false;
  }
}
