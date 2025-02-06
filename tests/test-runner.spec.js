import {test, expect} from '@playwright/test';
import fs from 'fs';
import {config} from "dotenv";

config();

import RegistrationPage from "../page/RegistrationPage.js";
import GmailService from '../service/gmail-service';
import LoginPage from "../page/LoginPage.js";

import UserData from "../utils/user-data.json" assert {type: "json"};
import ItemData from "../utils/item-data.json" assert {type: "json"};
import ItemPage from "../page/ItemPage.js";

// test.describe('01', () => {
//     test('Register a user', async ({ page, request }) => {
//         // Register a user
//         await page.goto('/register');
//         const user = await new RegistrationPage(page).registerUser(process.env.email_prefix);
//
//         // assert the toast message
//         await expect(page.getByText(`User ${user.firstName} ${user.lastName} registered`)).toBeVisible();
//
//         // assert the congratulation mail is sent
//         await page.waitForTimeout(15000);
//         const latestGmail = await GmailService.gmail(request);
//         await expect(latestGmail.toString()).toEqual(`Dear ${user.firstName}, Welcome to our platform! We&#39;re excited to have you onboard. Best regards, Road to Career`);
//
//         UserData.push(user);
//         fs.writeFileSync("./utils/user-data.json", JSON.stringify(UserData, null, 2));
//     });
// });

test('Visit the site. Register a user and assert if the congratulation mail is sent and also assert the toast message', async ({page, request}) => {
    // Register a user
    await page.goto('/register');
    const user = await new RegistrationPage(page).registerUser(process.env.email_prefix);

    await test.step("assert the toast message", async () => {
        // assert the toast message
        await expect(page.getByText(`User ${user.firstName} ${user.lastName} registered`)).toBeVisible();
    });

    await test.step("assert the congratulation mail is sent", async () => {
        // assert the congratulation mail is sent
        await page.waitForTimeout(15000);
        const latestGmail = await GmailService.gmail(request);
        await expect(latestGmail.toString()).toEqual(`Dear ${user.firstName}, Welcome to our platform! We&#39;re excited to have you onboard. Best regards, Road to Career`);

        UserData.push(user);
        fs.writeFileSync("./utils/user-data.json", JSON.stringify(UserData, null, 2));
    });
});

test('Then login with the user and add random 2 items and assert that 2 items are showing on the item list', async ({page}) => {
    await page.goto('/login');
    const latestUser = await UserData[UserData.length - 1];
    await new LoginPage(page).loginForm(latestUser.email, latestUser.password);
    await expect(page.getByText('Dashboard')).toBeVisible()

    await test.step("add random 2 items", async () => {
        // add random 2 items
        while (ItemData.length > 0)
            ItemData.pop();

        const itemPage = await new ItemPage(page);
        await itemPage.addItem();
        await itemPage.addItem();
    });

    await test.step("assert that 2 items are showing on the item list", async () => {
        const searchBox = await page.getByRole('textbox', {name: 'Search items...'});
        await searchBox.fill(ItemData[0].itemName);
        await expect(page.getByText('Total Rows:')).toContainText("Total Rows: 1")
        await searchBox.clear();
        await searchBox.fill(ItemData[1].itemName);
        await expect(page.getByText('Total Rows:')).toContainText("Total Rows: 1")
    });
});

test('Then go to profile settings and upload a profile photo and logout', async ({page}) => {
    await page.goto('/login');
    const latestUser = await UserData[UserData.length - 1];
    await new LoginPage(page).loginForm(latestUser.email, latestUser.password);
    await expect(page.getByText('Dashboard')).toBeVisible()

    // go to profile settings
    await page.goto('/user');
    await page.getByRole('button', { name: 'account of current user' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await expect(page.getByRole('heading', { name: 'User Details' })).toBeVisible()

    // upload a profile photo
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator('input[type="file"]').setInputFiles(`${process.cwd()}\\resources\\profile.jpg`);
    await page.getByRole('button', { name: 'Upload Image' }).click();
    await page.waitForTimeout(5000);

    // logout
    await page.getByRole('button', { name: 'account of current user' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.pause();
});

test.only('Then click on "Reset it here" from login page and then reset new password', async ({page}) => {


    await page.pause();
});

