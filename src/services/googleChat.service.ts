// googleSheetsService.js
import { google, GoogleApis, sheets_v4 } from 'googleapis';
import path from 'path';
const { readFile } = require('fs').promises;
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  let credentials = null;
  // The path to your credentials file
  const credentialsFile = path.join(__dirname, '../config/credentials.json');
  if (credentialsFile) {
    const credentialsData = await readFile(credentialsFile);
    credentials = JSON.parse(credentialsData);
  }
  const auth = new google.auth.GoogleAuth({
    projectId: 'chatbot-388208',
    scopes: SCOPES,
    credentials,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({ spreadsheetId, auth }: { spreadsheetId: string; auth: any }) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({
  spreadsheetId,
  auth,
  sheetName,
}: {
  spreadsheetId: string;
  auth: any;
  sheetName: string;
}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

async function addSpreadSheetValues({
  spreadsheetId,
  auth,
  sheetName,
  values,
}: {
  spreadsheetId: string;
  auth: any;
  sheetName: string;
  values: any;
}) {
  const range = `${sheetName}`;
  const request = {
    auth,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [values],
    },
  };
  const response = await sheets.spreadsheets.values.append(request);
  return response;
}

export const googleService = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
  addSpreadSheetValues,
};
