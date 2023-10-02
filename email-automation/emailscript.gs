function send_Email(){
  // Get active spreadsheet and the sheet name
  const ss = SpreadsheetApp.getActiveSpreadsheet(); // call active gsheet
  const sheet = ss.getSheetByName('<Insert Sheet Name>'); //sheet name

//reference your alias email here (must set up alias in gmail settings)
  const emailSender = "<Exampleemail@XX.com";
  const emailTemplate = 'HTML Template'; // this is the other file listed in our google apps script folder
  
//get data from sheet
// starting row, starting column, numRows (-1 to remove header row), num columns
  const range = sheet.getRange(2,1,sheet.getLastRow()-1, sheet.getLastColumn());
  const data = range.getValues();

//initiate for loop to look through your data
  for(const [index, row] of data.entries()) {
    const line = index + 2; // Rows vector starts at 0 so we should first read the second line
    
    // if email has not been sent yet. This is the logic I used but can be adjusted to your prefereance. I wanted it to be like fort knox and not accidentally send messages if I didn't want them to

    // logic section referenced in lines 43-47
      if(row[<Enter the col # but subtract 1 (column A = 0, B=1, etc...)>] === "Not Sent" 
      && row[<Enter the col # but subtract 1 (column A = 0, B=1, etc...)>] !== "Sent" 
      && row[<Enter the col # but subtract 1 (column A = 0, B=1, etc...)>] !== "DO NOT SEND" 
      && row[<Enter the col # but subtract 1 (column A = 0, B=1, etc...)>] !== "") {

    //Call in the email template you want to use
      const template = HtmlService.createTemplateFromFile(emailTemplate);


    // Fill template with variables and call the content
      template.row = row;
      const message = template.evaluate().getContent();
      
    //send email and write in line
      const subject = `${row[1]} This is the Subject Line`; // row 1 would be column B and you can add to the subject line

      const recipient = row[2]; // row 2 would be column C and it would contain all of the emails you want to loop through

    //Configure email to send out
      //MailApp.sendEmail({to: row[13], subject: subject_name, htmlBody: message}); //I wanted to send as an alias and not my personal email so I did not use the Mail.App function

      GmailApp.sendEmail(recipient, subject, message, {from: emailSender, htmlBody: message}); //GmailApp allowed me to send as an alias (has to be configured in your gmail settings)


    // I wanted to change the google sheet to show "Sent" in all of the fields I referenced in lines 19-23. This is the opposite of the Col # -1 = row[].
    // in this case line,1 = column A, line 2 = B. can be confusing at first but it is an important distinction when trouble shooting
      sheet.getRange(line,1).setValue("Sent");
      sheet.getRange(line,2).setValue("Sent");
      SpreadsheetApp.flush();  //writes sent to the columns above
    }
  }
}
