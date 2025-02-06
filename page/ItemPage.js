import fs from 'fs';
import {faker} from "@faker-js/faker";
import itemData from "../utils/item-data.json" assert {type: "json"};

class ItemPage {
    constructor(page) {
        this.btnAddCost = page.getByRole('button', {name: 'Add Cost'});
        this.itemName = page.getByRole('textbox', {name: 'Item Name'});
        this.quantity = page.locator('div').filter({hasText: /^-\+$/}).getByRole('spinbutton');
        this.quantityPlusBtn = page.getByRole('button', {name: '+'});
        this.quantityMinusBtn = page.getByRole('button', {name: '-'});
        this.amountInpNum = page.getByRole('spinbutton', { name: 'Amount' })
        this.purchaseDate = page.getByRole('textbox', { name: 'Purchase Date' })
        this.month = page.getByLabel('Month')
        this.remarks = page.getByRole('textbox', { name: 'Remarks' })
        this.btnSubmit = page.getByRole('button', { name: 'Submit' })
    }

    async addItem() {

        const date = new Date();
        let item = {
            itemName : faker.book.title(),
            quantity: Math.floor(Math.random() * 10),
            amount: Math.round(Math.random() * (9999 - 1000) + 1000),
            purchaseDate : date.toISOString().slice(0, 10),
            month : date.toLocaleString('default', { month: 'short' }),
            remarks : faker.lorem.paragraph()
        }

        await this.btnAddCost.click();
        await this.itemName.fill(item.itemName);
        for (let i = 0; i < item.quantity; i++) {
            await this.quantityPlusBtn.click();
        }
        await this.amountInpNum.fill(item.amount + "");
        await this.purchaseDate.fill(item.purchaseDate)
        await this.month.press(item.month.at(0))
        await this.remarks.fill(item.remarks)
        await this.btnSubmit.click();

        await itemData.push(item);
        await fs.writeFileSync('./utils/item-data.json', JSON.stringify(itemData, null, 2));
    }
}

export default ItemPage;