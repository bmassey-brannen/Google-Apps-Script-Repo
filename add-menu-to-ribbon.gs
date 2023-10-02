function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Scripts')
  .addItem('Name', 'Function. ')
  
  .addSeparator()
  .addSubMenu(ui.createMenu('Sub Menu Name')
          .addItem('Name', 'Function. ')
  .addToUi();

}
