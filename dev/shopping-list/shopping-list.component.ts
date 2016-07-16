import {Component, OnInit} from '@angular/core';
import {NewItemComponent} from "./new-item.component";
import {ItemComponent} from "./item.component";
import {ShoppingListService} from "./shopping-list.service";

@Component({
    selector: 'shopping-list',
    template: `
        <section>
            <new-item></new-item>
        </section>
        <section>
            <h3>My List</h3>
            <div class="list">
                <ul>
                    <li *ngFor="#listItem of listItems" (click)="onSelect(listItem)">{{listItem.name}} ({{listItem.amount}})</li>
                </ul> </div>
        </section>
        <section *ngIf="selectedItem != null">
            <edit-item [item]="selectedItem" (removed)="onRemove()"></edit-item>
        </section>
    `,
    directives: [NewItemComponent, ItemComponent],
    providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit{
    listItems: Array<{ListItem}>;
    selectedItem: ListItem;

    constructor(private _shoppingListService: ShoppingListService) {}

    onSelect(item: ListItem) {
        this.selectedItem = item;
    }

    ngOnInit():any {
        this.listItems = this._shoppingListService.getItems();
    }

    onRemove() {
        this.selectedItem = null;
    }

}