import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public getStringDate(monthDifference = 0): string {
    const todaysDate = new Date();
    todaysDate.setMonth(todaysDate.getMonth() + monthDifference);

    const month = todaysDate.getMonth() + 1;
    const day = todaysDate.getDate();

    return (
      todaysDate.getFullYear() +
      '-' +
      this.formatDateNumbersString(month) +
      '-' +
      this.formatDateNumbersString(day)
    );
  }

  public formatDateNumbersString(dateObject: number): string {
    return dateObject < 10 ? '0' + dateObject : dateObject.toString();
  }
}
