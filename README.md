## Glob: Lob add-on for Google Docs 
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/1.png">
#### Converts current doc to PDF and sends it to Lob as a job.
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/4.png">

## How To Install (as Custom Script)

Note: You could publish the script to the Chrome Store as an official add-on to avoid these steps.

1. Open any Google Doc.
2. Under the `Tools` menu item, select `Script Editor`. (This will open a new tab/window)
3. In the new window, select `Create Script for Blank Project`.
4. This should create a new `code.gs` file. Delete its contents and replace with them with the included `code.gs` file.
5. Create a new HTML file called 'sidebar' for this Google script. (`File` > `New` > `Html file`)
6. Delete the initial contents of the file and replace them with the included `sidebar.html`.
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/2.png">
<img src="https://raw.githubusercontent.com/mikesteele/glob/master/screenshots/3.png">
7. Click back to editing `code.gs` and on the top menu bar, select `onOpen` and then hit `Run`.
8. Navigate back to your doc and you're ready to Lob your doc to anyone!

## Roadmap (<img src="https://camo.githubusercontent.com/14b12e62ad096e71d1e5f6942a88a5735f8a4f25/687474703a2f2f74616e6769656e742e77696b697370616365732e636f6d2f692f636865636b6d61726b2e676966"> - Completed, <img src="https://camo.githubusercontent.com/73ae70f857c2ea7914c8328308a118181db55cc8/68747470733a2f2f35353036336532373862366266653536303930642d63663334333430386430356165323935333337333462343965326336336666322e73736c2e6366322e7261636b63646e2e636f6d2f736d616c6c5f79656c6c6f775f69636f6e2e706e67"> - In Progress)
1. Able to generate and send Google Doc as PDF to Lob successfully <img src="https://camo.githubusercontent.com/14b12e62ad096e71d1e5f6942a88a5735f8a4f25/687474703a2f2f74616e6769656e742e77696b697370616365732e636f6d2f692f636865636b6d61726b2e676966">
2. Able to create a Lob letter job (setting_id: 100) from PDF'd Google Doc <img src="https://camo.githubusercontent.com/14b12e62ad096e71d1e5f6942a88a5735f8a4f25/687474703a2f2f74616e6769656e742e77696b697370616365732e636f6d2f692f636865636b6d61726b2e676966">
3. View price of job before sending. <img src="https://camo.githubusercontent.com/14b12e62ad096e71d1e5f6942a88a5735f8a4f25/687474703a2f2f74616e6769656e742e77696b697370616365732e636f6d2f692f636865636b6d61726b2e676966">
4. Able to pre-fill address inputs by highlighting address in Doc and parsing it into an address. <img src="https://camo.githubusercontent.com/73ae70f857c2ea7914c8328308a118181db55cc8/68747470733a2f2f35353036336532373862366266653536303930642d63663334333430386430356165323935333337333462343965326336336666322e73736c2e6366322e7261636b63646e2e636f6d2f736d616c6c5f79656c6c6f775f69636f6e2e706e67">
5. Able to customize (via drop-down menu) print settings
