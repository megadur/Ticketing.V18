import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Gutachter } from '../../features/gutachter/data/types/gutachter';
import { Gutachten } from '../../features/gutachten/data/types/gutachten';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    
    items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
    ];

    gutachters: Gutachter[] = [
        { 
            id: 111, 
            name: 'Victor',
            starRating: 3.2,
            imageUrl: 'assets/images/man3.png',
            tags: ['rake', 'leaf', 'yard', 'home']   ,
            address: '1234 Anywhere St.', 
        }, 
        { id: 112, name: 'Wes',
            starRating: 2.2,
            imageUrl: 'assets/images/man3.png',
            tags: [ 'yard', 'home']   ,
            address: '1234 Anywhere St.', 

         }
    ];

    gutachtens: Gutachten[] = [
        {
            id: 0,
            description: 'Install a monitor arm',
            assigneeId: 111,
            completed: false
        },
        {
            id: 1,
            description: 'Move the desk to the new location',
            assigneeId: 111,
            completed: false
        }
    ];
    constructor() { }

    createDb() {
        return {
            items: this.items,
            gutachters: this.gutachters,
            gutachtens: this.gutachtens
        };
    }

    // CRUD methods

    // GET all items
    getAllItems(reqInfo: any): Observable<any> {
        const items = this.items;
        return reqInfo.utils.createResponse$(() => ({
            body: items,
            status: 200,
        }));
    }

    // GET item by id
    getItemById(reqInfo: any): Observable<any> {
        const id = reqInfo.id;
        const item = this.items.find((i: any) => i.id === id);
        return reqInfo.utils.createResponse$(() => ({
            body: item,
            status: item ? 200 : 404,
        }));
    }

    // POST new item
    addNewItem(reqInfo: any): Observable<any> {
        const newItem = reqInfo.utils.getJsonBody(reqInfo.req);
        newItem.id = this.items.length + 1; // Generate a new id
        this.items.push(newItem);
        return reqInfo.utils.createResponse$(() => ({
            body: newItem,
            status: 201,
        }));
    }

    // PUT updated item
    updateItem(reqInfo: any): Observable<any> {
        const id = reqInfo.id;
        const updatedItem = reqInfo.utils.getJsonBody(reqInfo.req);
        const index = this.items.findIndex((i: any) => i.id === id);
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...updatedItem };
            return reqInfo.utils.createResponse$(() => ({
                body: this.items[index],
                status: 200,
            }));
        } else {
            return reqInfo.utils.createResponse$(() => ({
                body: { error: 'Item not found' },
                status: 404,
            }));
        }
    }

    // DELETE item
    deleteItem(reqInfo: any): Observable<any> {
        const id = reqInfo.id;
        const index = this.items.findIndex((i: any) => i.id === id);
        if (index !== -1) {
            const deletedItem = this.items.splice(index, 1)[0];
            return reqInfo.utils.createResponse$(() => ({
                body: deletedItem,
                status: 200,
            }));
        } else {
            return reqInfo.utils.createResponse$(() => ({
                body: { error: 'Item not found' },
                status: 404,
            }));
        }
    }
}