# Introduction

Here are some example projects to help you in your pocket portal adventures! Skip to a section for specific instructions on how to customize the files.

# 1-Pocket_Portal--SSID_Network_Name

With this sketch, your WEMOS D1 Mini will be able to broadcast an SSID network name to nearby devices. That way, when someone looks through their list of Wi-Fi access points, they'll see the one you set!

To change the SSID name, edit the text between double quotes in the `WiFi.softAP()` function. The example in this file will create a network called "Pocket Portal Power Play".

```c++
WiFi.mode(WIFI_AP);WiFi.softAP("Pocket Portal Power Play");
```

Your network's SSID name can be up to 32 characters long, but in practice you should stick to 31 characters. That's because some devices use null-terminated strings for SSID names.

Give it a try!


# 2-Pocket_Portal--Simple_Page

![Scroll through of the simple web page example](https://i.imgur.com/nQq1PGC.gif)

This example hosts a simple web page to get you started.

It includes headings, text, an image, an audio clip, video clip, and even an SMS link which can open the user's text app with pre-populated text

## [Live Demo](https://pocket-portal.github.io/code/Example%20Projects/2-Pocket_Portal--Simple_Page/data/index.html)

<details>
<summary><h2>Instructions</h2></summary>

You will find the code for the server (`.ino` sketch file, `DNSServer.cpp`, and `DNSServer.h`) as well as the static site files inside of the data folder.

To edit the SSID network name, open the `.ino` sketch file in Arduino, find the `STASSID` macro and edit its value between double quotes. In the example, the SSID is set to "Come in, grab a seat":

```c++
#define STASSID "Come in, grab a seat" // ✨ set your network name here ✨
```

To edit the actual site, open the `data` folder with VS Code / VS Codium / the text editor of your choice:

```ascii
.
└── data/
    ├── index.html
    ├── media-audio.mp3
    ├── media-cover_image.JPG
    ├── media-video.mp4
    └── style.css
```

### Content Overview

The `index.html` gives you some basic building blocks to build your page's content:

- Headings: `<h1>`, `<h2>`
- Images: `<img>`
- Images with captions inside of a `<figure>` element
- Paragraphs: `<p>`
- Audio: `<audio>`
- Video: `<video>`
- Blockquote: `<blockquote>`
- Example of an SMS link which can open the user's text app with pre-populated text using an `<a>` tag

#### Text and Headings

To create a new heading or paragraph, make sure to wrap the text with the appropriate HTML tag:

```html
<h1>This is a first-level heading, only to be used once on the page</h1>
```

```html
<h2>This is a second-level heading</h2>
```

```html
<h3>Select your heading level based on your content's hierarchy</h3>
```

```html
<p>This is a paragraph.</p>
```

#### Media: Photos, Audio, Video

To use your own media on the page (images, audio, video), copy the file(s) over to the `data` folder; it can even be inside of a subdirectory, so long as its inside `data`.

<mark>Make sure there are no spaces in the file name.</mark>

Then, use the appropriate HTML tag, and use the media's relative path as the `src=""`:

```html
<video controls src="video.mp4" type="video/mp4"></video>
```

```html
<audio controls src="subfolder/cool-music.mp3" type="audio/mpeg"></audio>
```

```html
<img src="image-photo.JPG" alt="provide a description the image">
```

Using `.mp3` for audio, `.mp4` for video, and `.png`, `.jpg`, `.gif` for images are safe bets, compatibility-wise.

#### SMS

Want people to text you "LIMBO" to RSVP to the block party? Want to showcase your transit system's automated SMS bus schedule? Do it with an SMS link!

To make your own, create an `<a>` tag. The `href`'s attribute should include `sms:` followed by the phone number, then `?&body=` followed by the message that you would like to prepopulate in the user's SMS app.

In the example below, the text `(555) 555-5555` will be hyperlinked:

```html
<a href="sms:5555555555?&body=Thank you!">(555) 555-5555</a>
```

Upon clicking on the link, the user's texting app will create a draft message saying "Thank you!" to be sent to the phone number 5555555555.

### Styling

In the `style.css` file, you'll find some pre-made styling options.

To make customization easier, I've made use of reusable CSS variables.

The variables are declared at the `:root` like `--this`, and are reused later in the stylesheet as such: `var(--variable-in-use)`.

To quickly and consistently customize the styling of the page, simply tweak the variable values at the root.

#### Colours

For instance, to change the colour of the page background to Deep Sky Blue, edit its variable to this:

```css
  --background-colour: DeepSkyBlue;
```

or a HEX code like this:

```css
  --background-colour: #00BFFF;
```

or an RGB value like this:

```css
  --background-colour: rgb(0, 191, 255);
```

#### Fonts

The project makes use of serif and sans-serif web safe fonts, rather than loading custom font files. Web safe fonts are widely available across different operating systems and web browsers, and numerous fallbacks are in place:

```css
 --sans-serif-font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
```

For example, if the device doesn't have "ui-sans-serif" installed, the next available font will be displayed.

### Extras: JavaScript, Stylesheets, etc.

This project doesn't make use of JavaScript libraries, font files, or additionnal stylesheets, but that doesn't mean you can't!

It's certainly possible to make use of certain additional resources for your pocket portal. Just remember to:
- Self-host all the necessary files to your board. Watch out for calls to CDNs and files hosted online, since your pocket portal doesn't actually connect to the Internet.
- Be mindful of the size of these additionnal files in relation to your board's storage capacity, and their impact on the page load.
- Remove spaces from the file names.
- Test early, often, and across devices and operating systems whenever possible.
</details>


# 3-Pocket_Portal--Colouring_Page

A digital colouring page to pass the time.

![Digital coolouring page bring filled in](https://i.imgur.com/JNEba4v.gif)

## [Live Demo](https://pocket-portal.github.io/code/Example%20Projects/3-Pocket_Portal--Colouring_Page/data/index.html)

<details>
<summary><h2>Instructions</h2></summary>

To get started, you'll need a line illustration to use for the colouring page. This could be something that you've created, commissioned, or found online with a creative commons license. This drawing should, ideally, be in `.svg` format, but if it isn't, fret not! Go to the next step to find out how to convert your image.

If your image is already in `.svg` format, or in another vector format that can easily be converted to `.svg` (such as `.eps`, `.ai`, `.sketch`), skip to [Preparing your SVG](#Preparing-your-SVG-for-the-Coloring-Page).

### Vectorizing a raster image

If your drawing is in a raster graphic format (JPEG, PNG, etc.), you will need to vectorize it.

Luckily, you can easily do this with [Inkscape](https://inkscape.org/), a free, open-source, and cross-platform vector graphics editor.

To do so:

1. Open the Inkscape app.

2. In the menu, go to `File > Import...` or press `CTRL + I`. Select your raster graphic illustration to load it inside your document.

3. To resize your document to fit the image, go to `File > Document Properties`. Go to the `Display` tab, select your image on the canvas, and then select "Resize to content" in the `Document Properties` panel (right above "Scale".).

4. Select your illustration. Then, in the menu, go to `Path > Trace Bitmap`. A panel will appear with [various settings documented here](https://inkscape-manuals.readthedocs.io/en/latest/tracing-an-image.html).

5. For a line drawing, "Brightness cutoff" with the default settings is a good start. The better the image quality, the better the result.

6. Once you're satisfied with the settings, hit "Apply". The vectorized drawing will appear over the original image, and will be selected. Set it aside, and inspect the result. If you don't like the initial results, repeat steps 4-5 until you're satisfied.

7. Delete the original image, and align the image to the center of the document. The lines should be black, and what was previously white should be transparent. Save your work as an `.svg`.


### Preparing your SVG for the Coloring Page

You will need to create two layers inside of your `.svg` illustrations: a top one for the black lines, and a bottom one for the white background.

To do so, open the file in the editor of your chocie. The following steps are done using [Inkscape](https://inkscape.org/), a free, open-source, and cross-platform vector graphics editor.

1. Open your illustration in Inkscape.

2. <mark>Add a rectangle with a black outline to close/create shapes of elements that stick out beyond the edge of the document. Make sure the rectangle is inside the bounding box. Bring the border to the top, and turn the border into a path.</mark>

3. <mark>Add a white rectangle below the border and black lines. Select the black lines and white background. In the menu, go to Path > Exclusion. You'll notice that the paths combined to create a cutout: The black outline becomes transparent, and the white remains (hollowed out), essentially designating what will be coloured in. Select the black border and white cutout. In the menu, select Path > Intersection.</mark>

4. <mark>Create a Layer or Group for the hollow white part, and give the grouping a memorable name (i.e. "Colour"). Select the hollow white path object, and in the menu, select `Object > Break Apart`. Test to see if it works: select a fragment of your illustration, and see if it can be moved independently from the rest. These sections will be grouped together for colouring in your colouring page.</mark>

5. <mark>Once satisfied, add a black rectangle at the bottom to act like the lines. Create a distinct Layer or Group for that background as you've done in Step 4.</mark>

6. Once complete, save the document. In the menu, go to `File > Export...` or `CTRL + SHIFT + E`. Select `Plain SVG` as the format, and export the file.

### Adding the vector illustration to the coloring page

1. In the text editor of your choice (VS Code / VS Codium / Notepad++ / etc.) open the `.svg` file. Select all the contents of the file, and copy them.
   
2. Open the `data` folder for this project in the text editor. Open the `index.html` file, and find the area where the example SVG drawing starts and ends. Remove the existing image, and paste the text you copied in step 1.

  ```html
  <div id="main">
    <!-- 🔄 SVG Drawing starts here -->
    ...
    <!-- 🔄 SVG Drawing ends here -->
  </div>
  ```

3. In your SVG markup, there should be two SVG groups, designated with a `<g>` tag. The first one should be your black rectangle. The second one will contain all the paths for the hollowed white fragments. Copy the ID value for this 2nd group. In this project example, the group appears as such and has the ID `colour`:

```html
<g id="colour" style="display:inline">
        <path style="display:inline;fill:#ffffff;fill-rule:evenodd;stroke-width:0.0217255;stroke-linecap:square;
```

4. Open colouringbook.js, and replace the value of the `svgID` variable with the group's ID value. Here's how this looks for this project example:

```js
var svgID = "colour";
```

5. To have the illustration take up the width of the screen, open the `index.html` file and set the SVG illustration's `width` to `100%` and `height` to `auto`. Here's how this looks in the project example:

```html
 <svg width="100%" height="auto" viewBox="0 0 150.16163 211.66666" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
```
</details>

# 4-Pocket_Portal--Music_Player

Share your favourite jams with nearby devices. 🎵

![Music player page](https://i.imgur.com/HAF35Vy.png)

## [Live Demo](https://pocket-portal.github.io/code/Example%20Projects/4-Pocket_Portal--Music_Player/data/index.html)

<details>
<summary><h2>Instructions</h2></summary>

### Adding your music

1. Add your music files tto the `data` > `audio` folder.

2. Open the `index.html` in the code text editor of your choice, and edit/add the `<div class="song-item">` for each of your songs:

   The song title: `<div class="song-title">TITLE</div>`

   The artist: `<div class="song-artist">ARTIST</div>`

   The duration: `<div class="song-duration">00:00</div>`

   The location of the song's file: `<audio controls preload="auto">
                <source src="audio/FILENAME.mp3" type="audio/mpeg">
            </audio>`

   All together:
   ```html
   <div class="song-item">
      <div class="song-info">
          <div>
              <div class="song-title">TITLE</div>
              <div class="song-artist">ARTIST</div>
          </div>
          <div class="song-duration">00:00</div>
      </div>
      <audio controls preload="auto">
          <source src="audio/FILENAME.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
      </audio>
  </div>
   ```


### Styling the page

In the `style.css` file, you'll find some pre-made styling options.

To make customization easier, I've made use of reusable CSS variables.

The variables are declared at the `:root` like `--this`, and are reused later in the stylesheet as such: `var(--variable-in-use)`.

To quickly and consistently customize the styling of the page, simply tweak the variable values at the root.

#### Colours

For instance, to change the colour of the page background to Deep Sky Blue, edit its variable to this:

```css
  --background-colour: DeepSkyBlue;
```

or a HEX code like this:

```css
  --background-colour: #00BFFF;
```

or an RGB value like this:

```css
  --background-colour: rgb(0, 191, 255);
```

#### Fonts

The project makes use of serif and sans-serif web safe fonts, rather than loading custom font files. Web safe fonts are widely available across different operating systems and web browsers, and numerous fallbacks are in place:

```css
 --sans-serif-font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
```

For example, if the device doesn't have "ui-sans-serif" installed, the next available font will be displayed.

</details>


# 5-Pocket_Portal--Eliza_Chatbot

If you want to host a self-contained chatbot right inside your portal, this one's for you! It's inspired by [ELIZA](https://en.wikipedia.org/wiki/ELIZA), an early NLP program, and is based on code and design by [Masswerk](https://www.masswerk.at/elizabot/) and [cargo.site](https://cargo2support.cargo.site/Add-a-Chatbot).

![chat conversation between human and ELIZA](https://i.imgur.com/yJMNruG.png)


## [Live Demo](https://pocket-portal.github.io/code/Example%20Projects/5-Pocket_Portal--Eliza_Chatbot/data/index.html)

<details>
<summary><h2>Instructions</h2></summary>

### Changing phrases

To edit ELIZA's stock phrases, open and edit the `data` > `scripts` > `elizadata.js` file in the code text editor of your choice.

### Styling the chat

In the `style.css` file, you'll find some pre-made styling options.

To make customization easier, I've made use of reusable CSS variables.

The variables are declared at the `:root` like `--this`, and are reused later in the stylesheet as such: `var(--variable-in-use)`.

To quickly and consistently customize the styling of the page, simply tweak the variable values at the root.

#### Colours

For instance, to change the colour of the page background to Deep Sky Blue, edit its variable to this:

```css
  --background-colour: DeepSkyBlue;
```

or a HEX code like this:

```css
  --background-colour: #00BFFF;
```

or an RGB value like this:

```css
  --background-colour: rgb(0, 191, 255);
```

#### Fonts

The project makes use of serif and sans-serif web safe fonts, rather than loading custom font files. Web safe fonts are widely available across different operating systems and web browsers, and numerous fallbacks are in place:

```css
 --sans-serif-font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
```

For example, if the device doesn't have "ui-sans-serif" installed, the next available font will be displayed.
</details>