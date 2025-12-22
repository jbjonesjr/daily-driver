## electron based
This app is based on electron. This makes it so it can run easily on my desktop and potentially be transferred to the cloud later.
It should use modern electron packages, build process, and tests. It should run on my mac osx system without much concern.

## App Design
The left plane is a file tree view. There are different filtes/views you can organize them by. The defeault is create date, but there is also a task list view (completed vs incomplete), and due date view. These three views should be toggled by a drop down menu at the top of the pane. This pane can be collapsable.

The center pane is the document editing pane. Expect to write and format in github formated markdown. This pane is not collapsible.

The right pane is collabsable, and is used for actions and details. The properties section will live in this pane. Other modules will live here too. I think a sharing module eventually makes sense. As would some sort of "whare with AI" module. 

## Related files
Documents can have related files. This shuld be added into each document as needed, but there should be a virtual pane on the right side that extracts all links to related documents for easy tracking. This pane should provide icons easily displaying file type (Google Sheet, Doc, Webpage, GitHub link, etc) as well as the file title. Each item in the pane should have 2 actions, depending on how you click it (maybe a right click menu?): visit file, jump to file in doc (which navigates the document pane to that location).

## Calendar invites
For documents related to a zoom meeting, you should be able ot click a button in the UI, near the top of the document, that opens the meeting from the daily driver app. This lets it be more of a control center where i spent all my time in.

## Header view
The right pane should have a table of contents/heading view that quickly displays the structure of the document. Clicking a heading jumps the document to the right location.

## describing the tree view
I have multiple workstreams that i mangage each day. Some are created and closed within the day. Others are multi-day. Organizing them in some way is critical to reduce the cognitive load. The way I do it today is create a folder for each day and store the documents under them, but that is inflexible for different views, as well as the folder doesn't have useful metadata. 

I would love for the center pane, when selecting a date, to display inferred data. "docuemnts created on this date (with links to open them), completed on this day (links), etc. It could also include a view of my google calendar for that day as well. This can almost be my control center for the day. It can include links to items currently WIP, and provide a quick way to create blank documents from the calendar events of the day.

## Menubar widget
Have a menubar widget that let's me provide a title and/or brief description that would automatically create a new document from that scaffold

## Document metadata
Documents can have many properties associated with them. My initial assumption is:

Title (text)
Complete (boolean)
Create Date (date)
Complete Date (date)
Due Date (date)
Shared (boolean)

However, editing the front matter would be a pain. They should instead appear in a properties pane in a sidebar. 

This should let the documents be used for things like reporting and searching. Can you create a document that describes this properties format, as well as implementing a parser and watcher that updates the properties pane as needed?

## Remarkable integration
I use a remarkable 2 tablet, and it would be great to have a way to sync a document (in pdf format) down to my remarkable in a WIP progress. Then I could edit it offline, and have the changes sync back to my tool. I could have a watcher/action that takes the updated documents and edits, and integrate them back into my core document.

## Quick switching
You can use keyboard shotcuts `cmd-t`) to go to navigate to a file or other content. Priority in the list of files is given to matches in that day, that week, and then that month before going through the entire database.


