import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class SortService {

    sortByProperties: string[];
    sortByOrders: string[];
    sortingIcons: any;

    sortArray(array: any[], columnName: string, columnNameIcon: string, sortingIcons: any)  {

        let index = this.sortByProperties.indexOf(columnName);
        let isInSortArray =  index !== -1 ;

        if (isInSortArray) {
            if (this.sortByOrders[index] == 'asc') {

                this.sortByOrders[index] = 'desc';

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = true;
            }
            else {
                _.pullAt(this.sortByProperties,[index]);
                _.pullAt(this.sortByOrders,[index]);

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = false;
            }
        } else {
            // For one column sort:
            this.sortByProperties = [];
            this.sortByOrders = [];
            this.resetSortingIcons(sortingIcons);
            //

            this.sortByProperties.push(columnName);
            this.sortByOrders.push('asc');

            this.sortingIcons[columnNameIcon].asc = true;
            this.sortingIcons[columnNameIcon].sort = true;
        }

        return  _.orderBy(array, this.sortByProperties, this.sortByOrders);
    }

    resetSortingIcons(sortingIcons: any){

        for (let key in sortingIcons) {
            sortingIcons[key].asc = false;
            sortingIcons[key].sort = false;
        }
    }
}