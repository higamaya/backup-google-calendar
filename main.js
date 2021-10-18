const BACKUP_FOLDER_PATH = "backup/calendar";
const BACKUP_FILE_PREFIX = "backup_calendar_";
const BACKUP_FILE_EXT = ".ics";

const BACKUP_FILE_EXPIRATION_DAYS = 400;

const PROP_ICAL_URL = "iCalUrl";

function main() {

  // Get current datetime
  let now = Date.now();

  // Get data to backup
  let iCalUrl = getICalURL();
  if (!iCalUrl) {
    throw "URL of calendar is not set.";
  }
  let content = UrlFetchApp.fetch(iCalUrl).getContentText();

  // Save the data into Google Drive
  let folder = makeFolder(DriveApp.getRootFolder(), BACKUP_FOLDER_PATH);
  let fileName = BACKUP_FILE_PREFIX + formateDate(now, "yyyyMMddHHmmss") + BACKUP_FILE_EXT;
  let file = folder.createFile(fileName, content);
  console.log("Created new file:", file.getName());

  // Remove old data
  let expiration = now - (BACKUP_FILE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  removeExpiredFiles(folder, expiration);
}

function getICalURL() {
  return PropertiesService.getUserProperties().getProperty(PROP_ICAL_URL);
}

function setICalURL(url) {
  PropertiesService.getUserProperties().setProperty(PROP_ICAL_URL, url);
}

function makeFolder(parentFolder, relativePath) {
  let pathParts = relativePath.split("/");
  let folder = parentFolder;
  for (const part of pathParts) {
    let folders = folder.getFoldersByName(part);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = folder.createFolder(part);
    }
  }
  return folder;
}

function formateDate(dateValue, format) {
  let date = new Date(dateValue);
  return format.replace(/yyyy/g, date.getFullYear())
    .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    .replace(/dd/g, ('0' + date.getDate()).slice(-2))
    .replace(/HH/g, ('0' + date.getHours()).slice(-2))
    .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    .replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
}

function removeExpiredFiles(folder, expiration) {
  let files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    let dateCreated = file.getDateCreated().valueOf();
    if (dateCreated < expiration) {
      file.setTrashed(true);
      console.log("Trashed expired file:", file.getName(), formateDate(dateCreated, "yyyy-MM-dd HH:mm:ss"));
    }
  }
}
