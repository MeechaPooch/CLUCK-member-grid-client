// Load slack app
import { signin_secret, token } from './slack_secrets.js'
import { WebClient } from "@slack/web-api"
const client = new WebClient(token);
// import { createEventAdapter } from "@slack/events-api"

// Load google sheets
import { GoogleSpreadsheet } from "google-spreadsheet";
import {readFileSync, writeFileSync} from 'fs'
const hours_sheet_id = '10AcplDpfbXlECQYaFuTFcIeN2U8raP9XysuN3e31js0'
let sheet = null;
await (async () => {
    const google_client_secret = JSON.parse(readFileSync('./client_secret.json'))
    const doc = await new GoogleSpreadsheet(hours_sheet_id)
    await doc.useServiceAccountAuth(google_client_secret)
    await doc.loadInfo()
    sheet = doc.sheetsByIndex[0]
})()

// Get names
let names = []

const startNameRow = 3
const endNameRow = 60
const nameColumn = 0
await sheet.loadCells({startRowIndex: startNameRow, endRowIndex: endNameRow+1, startColumnIndex: nameColumn, endColumnIndex:nameColumn+1})
for(let y=startNameRow; y<=endNameRow; y++) {
    let cell = sheet.getCell(y,nameColumn)
    let name = cell.value
    if(name!='Name' && name!=null && name!='' && name!=' ') {
        names.push(name)
    }
}
// Huzzah! Names aquired!

// Load slack users data
let userlist = await client.users.list()
let users = userlist.members
users = users.filter(elem=>{return !elem.deleted})
// console.log(users)

// member obj:
// full name, first name, profile picture url

// Build members catalogue
let members = []
names.forEach(name=>{
    let foundMember = users.find(elem=>{return elem.real_name.includes(name.trim()) || name.includes(elem.real_name.trim())});
    if(!foundMember) {
        members.push({
            name:name,
            firstname:name.split(' ')[0],
            img:'defpic.jpg'
        })
    } else {
        members.push({
            name:name,
            firstname:name.split(' ')[0],
            img:foundMember.profile.image_original
        })
    }
})

writeFileSync('members.js','define({members: '+JSON.stringify(members)+' })')