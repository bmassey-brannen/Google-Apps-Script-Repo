function calendarPull() {
  const ss = SpreadsheetApp.getActive(); // can be flexed to openByID(sheetId).getSheetByName("Name")
  const sheet = ss.getSheetByName("Calendar Dates");  // name of the tab in your google sheet

  // Get input data
  const [[start_time, end_time, id_cal, desiredTitle]] = sheet.getRange("A2:D2").getValues();  // Can be adjusted to pull other fields

  // this scrupt references your google sheet to find the start time and end time you would like to filter on. 
  //A2 = [desired start date]
  //B2 = [desired end date]
  //C2 = the calendar id (found in google calendar menu)
  //D2 = the name of the reoccuring meeting you want to pull. 

  // Get calendar object
  const cal = CalendarApp.getCalendarById(id_cal);  // referenced in google sheet (Set to cell C2)

  try {
    // Get events
    const events = cal.getEvents(new Date(start_time), new Date(end_time), { search: desiredTitle })
                      .map(e => [e.getTitle(), e.getStartTime()]);

    // Write events to sheet
    sheet.getRange(7, 1, events.length, events[0].length).setValues(events);
  } catch (e) {
    Logger.log(`Error retrieving events: ${e}`);
    return;
  }
}


//Set up a trigger in google apps script to change on calendar edit. if any dates move the google sheet will pull automatically
