let sheetID = '17LxsTOx2caP247WaUT9RzLzvEmA9GOGwP49Ygwi0yw4';

function doGet(e) {
  const page = e.parameter.page || 'login';
  if (page === 'admin') return HtmlService.createHtmlOutputFromFile('admin');
  if (page === 'form') return HtmlService.createHtmlOutputFromFile('form');
  return HtmlService.createHtmlOutputFromFile('index');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function checkLogin(id, password) {
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName('Employees');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id && data[i][1] === password) {
      return { success: true, id: id };
    }
  }
  return { success: false };
}

function saveLead(lead) {
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName('Leads');
  sheet.appendRow([
    new Date(), lead.agentID, lead.email, lead.name, lead.mobile,
    lead.altMobile, lead.employment, lead.language, lead.hasCreditCard
  ]);
}

function addEmployee(id, password) {
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName('Employees');
  sheet.appendRow([id, password]);
}

function deleteEmployee(id) {
  const sheet = SpreadsheetApp.openById(sheetID).getSheetByName('Employees');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
}
