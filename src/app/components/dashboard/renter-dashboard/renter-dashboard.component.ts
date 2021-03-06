import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../../services/cars.service";
import {TripService} from "../../../services/trip.service";
import {Car} from "../../../models/car.interface";

@Component({
  selector: 'app-renter-dashboard',
  templateUrl: './renter-dashboard.component.html',
  styleUrls: ['./renter-dashboard.component.css']
})
export class RenterDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService, private router: Router) {
  }

  cars: any[];
  trips: any[] = [];
  renterId: string;

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {
      this.renterId = params['uid'];
    });


    this.tripService.getPendingApprovals().subscribe(data => {
      this.cars = data;
      for (var car of this.cars) {
        var temp = car.trips.map(trip => {
          if (trip.status == "New" && trip.renter._id == this.renterId) {
            trip.href = "#" + trip._id;
            trip.car = {_id: car._id, name: car.make + " " + car.model};
            trip.startDate = new Date(trip.startDate);
            trip.endDate = new Date(trip.endDate);
            return trip;
          }
        });
        if(temp[0] != undefined) {
          Array.prototype.push.apply(this.trips, temp);
        }
        debugger;
      }
    });
  }

  customerProfile(customerId) {
    this.router.navigate(['/user/' + customerId + '/profile']);
  }

  changeTripStatus(tripId, status) {
    this.tripService.changeTripStatus(tripId, status).subscribe(data => {
      //Remove this trip from the pending approvals list
      this.trips = this.trips.filter(trip => {
        return trip._id != trip.id;
      });
    }, error => {
      debugger;
    });
  }

  carView(carId) {
    this.router.navigate(['/car/' + carId]);
  }

}
