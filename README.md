## Glob: Lob add-on for Google Docs 
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/1.png">
#### Converts current doc to PDF and sends it to Lob as a job.
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/4.png">

## How To Install (as Custom Script)

Note: You could publish the script as an official add-on to avoid these steps.

For more information on publishing a Docs add-on, see <a href="https://developers.google.com/apps-script/add-ons/publish">this article</a>.

1. Open any Google Doc.
2. Under the `Tools` menu item, select `Script Editor`. (This will open a new tab/window)
3. In the new window, select `Create Script for Blank Project`.
4. This should create a new `code.gs` file. Delete its contents and replace with them with the included `code.gs` file.
5. Create a new HTML file called 'sidebar' for this Google script. (`File` > `New` > `Html file`)
6. Delete the initial contents of the file and replace them with the included `sidebar.html`.
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/2.png">
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/3.png">
7. Fill in your `LIVE_API_KEY` and `TEST_API_KEY` in `sidebar.html`
8. Click back to editing `code.gs` and on the top menu bar, select `onOpen` and then hit `Run`.
9. Navigate back to your doc and you're ready to Lob your doc to anyone!

## Known Issues
1. Duplicate addresses
2. State dropdown
