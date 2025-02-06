import {config} from "dotenv";
import {request, test} from "@playwright/test";
config();

let gmail = async (request) => {
    let gmailList = await request.get("https://gmail.googleapis.com/gmail/v1/users/me/messages", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.access_token
        }
    });

    let messageId = (await gmailList.json()).messages[0].id;

    let lastGmail = await request.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.access_token
        }
    });
    // console.log(await lastGmail.json());
    return (await lastGmail.json()).snippet;

};

export default {gmail}