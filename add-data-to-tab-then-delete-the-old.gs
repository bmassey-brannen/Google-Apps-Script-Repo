// I use this script if I want to create a running list 
// Say I use a =query formula, this is "live" formula that can change at any time. 
// I want to use the function below to capture a snapshot in time and add to a running list

function captureNewHires() {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
  
   var dataSheet = ss.getSheetByName('Sheet 2');
   var logSheet = ss.getSheetByName('Running List');
   
   var data = dataSheet.getRange(2, 1, dataSheet.getLastRow() - 1, dataSheet.getLastColumn()).getValues();
   
   // Set the values in the destination sheet
   var destRange = logSheet.getRange(logSheet.getLastRow() + 1, 1, data.length, dataSheet.getLastColumn());
   destRange.setValues(data);
   
   // Clear the data in the source sheet
   var clear_data = ss.getSheetByName('Sheet 1');
   var clearRange = clear_data.getRange('A2:S');
   clearRange.clearContent();
}
