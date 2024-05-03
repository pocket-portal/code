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

This example hosts a simple, one page website to your WEMOS D1 Mini.

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

## Content Overview

The `index.html` gives you some basic building blocks to build your page's content:

- Headings: `<h1>`, `<h2>`
- Images: `<img>`
- Images with captions inside of a `<figure>` element
- Paragraphs: `<p>`
- Audio: `<audio>`
- Video: `<video>`
- Blockquote: `<blockquote>`
- Example of an SMS link which can open the user's text app with pre-populated text using an `<a>` tag

### Text and Headings

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

### Media: Photos, Audio, Video

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

### SMS

Want people to text you "LIMBO" to RSVP to the block party? Want to showcase your transit system's automated SMS bus schedule? Do it with an SMS link!

To make your own, create an `<a>` tag. The `href`'s attribute should include `sms:` followed by the phone number, then `?&body=` followed by the message that you would like to prepopulate in the user's SMS app.

In the example below, the text `(555) 555-5555` will be hyperlinked:

```html
<a href="sms:5555555555?&body=Thank you!">(555) 555-5555</a>
```

Upon clicking on the link, the user's texting app will create a draft message saying "Thank you!" to be sent to the phone number 5555555555.

## Styling

In the `style.css` file, you'll find some pre-made styling options.

To make customization easier, I've made use of reusable CSS variables.

The variables are declared at the `:root` like `--this`, and are reused later in the stylesheet as such: `var(--variable-in-use)`.

To quickly and consistently customize the styling of the page, simply tweak the variable values at the root.

### Colours

For instance, to change the colour of the page background to Deep Sky Blue, edit its variable to this:

```css
  --background-colour: DeepSkyBlue;
```

or this:

```css
  --background-colour: #00BFFF;
```

or this:

```css
  --background-colour: rgb(0, 191, 255);
```

### Fonts

The project makes use of serif and sans-serif web safe fonts, rather than loading custom font files. Web safe fonts are widely available across different operating systems and web browsers, and numerous fallbacks are in place:

```css
 --sans-serif-font: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
```

For example, if the device doesn't have "ui-sans-serif" installed, the next available font will be displayed.

## Extras: JavaScript, Stylesheets, etc.

This project doesn't make use of JavaScript libraries, font files, or additionnal stylesheets, but that doesn't mean you can't!

It's certainly possible to make use of certain additional resources for your pocket portal. Just remember to:
- Self-host all the necessary files to your board. Watch out for calls to CDNs and files hosted online, since your pocket portal doesn't actually connect to the Internet.
- Be mindful of the size of these additionnal files in relation to your board's storage capacity, and their impact on the page load.
- Remove spaces from the file names.
- Test early, often, and across devices and operating systems whenever possible.


