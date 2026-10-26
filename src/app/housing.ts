import { Injectable } from '@angular/core';
import { HousingLocation as HouseInterface } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class Housing {

  url = 'http://localhost:3000/locations';


  async getAllHousingLocations(): Promise<HouseInterface[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HouseInterface | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
