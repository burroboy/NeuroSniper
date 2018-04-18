## NeuroSniper
Chrome extension to extract coordinate information from Neuroglancer 
(https://github.com/janelia-flyem/neuroglancer)

## Installation
1. Clone or download the repository at https://github.com/burroboy/NeuroSniper.
2. Open Chrome and navigate to the chrome extensions page. It can search 
[chrome://extensions/](chrome://extensions/).
3. Enable **Developer mode**
4. Click **Load Unpacked extension** and select the directory where the plugin is found.

# How to use?
Open neuroglancer in chrome, position your view in the EM, enter 
your assignment data into the NeuroSniper popup window,
and press copy in NeuroSniper.  This will copy your data into
clipboard so it call easily be pasted into a spreadsheet.

The **User**, **Assignment ID**, **Supervoxel ID**, and **Comment** fields only serve to persist
your data between uses of the Chrome extension.  **Segmentation Prefixes** allows you to match 
prefixed segmentation IDs to user selected segmentation.  If any segmentation meets this criteria
it will be included, otherwise it selects the first ID in the page URL.