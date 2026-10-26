import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocation as HouseInterface } from '../housinglocation'
import { Housing as HousingService } from '../housing';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocation],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button id="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
 <section class="results">
  @for (housingLocation of filteredLocationList; track housingLocation.id) {
    <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
  }
</section>
  `,
  styleUrl: './home.css'
})
export class Home {

  filteredLocationList: HouseInterface[] = [];
  housingLocationList: HouseInterface[] = [];
  housingService: HousingService = inject(HousingService);

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HouseInterface[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
}
