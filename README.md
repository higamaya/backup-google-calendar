<div id="top"></div>

# About

Google Apps Script to backup Google Calendar into Google Drive.

The data is saved in iCalendar format with an extension of `.ics`.

<p align="right">(<a href="#top">Back to top</a>)</p>

# Usage

## Setup

#### 1. Create new project in GAS (Google Apps Script).

#### 2. Copy the following files in this repo to the GAS project.

* `main.js`
* `webapi.js`
* `index.html`

#### 3. Store the Secret Address[^1] of Google Calendar.

1. Deploy the GAS project as a web app.
1. Open the web app in your browser.
1. Enter the Secret Address of Google Calendar, and submit it.

Submitted secret address is stored in User Properties[^2] of the GAS project.

User Properties can be accessed only by the user, so your secret is safe.

#### 4. Install GAS trigger

Install GAS trigger to run backup task periodically. `main` function must be specified in the trigger.

<p align="right">(<a href="#top">Back to top</a>)</p>

## Customize

#### Folder in which backup files are saved

Defined as a constant `BACKUP_FOLDER_PATH` in `main.gs`.
Modify the constant if you want to change the folder.

#### File name of backups

Generated according to the datetime when the backup run.
For example, if backup run at 14:59:30 on October 18, 2021, the file name would be `backup_calendar_20211018145930.ics`.

File name can also be changed with the constants defined in `main.gs`.

#### Expiration for backup files

By default, expilation of backup files is 30 days, and expired files will be trashed.

Expilation days can also be changed with the constant defined in `main.gs`.

<p align="right">(<a href="#top">Back to top</a>)</p>

# License

MIT License.

<p align="right">(<a href="#top">Back to top</a>)</p>

# Contact

Send a direct message to Higama-ya's twitter account: [@higama_ya](https://twitter.com/higama_ya)

<p align="right">(<a href="#top">Back to top</a>)</p>

[^1]: Secret Address: https://support.google.com/calendar/answer/37648#zippy=%2Cget-your-calendar-view-only
[^2]: User Properties: https://developers.google.com/apps-script/guides/properties#comparison_of_property_stores
