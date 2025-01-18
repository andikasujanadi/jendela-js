# jendela-js

**jendela-js** is a simple JavaScript library for creating draggable windows. It allows you to add interactive window components to your web applications. This project is currently in development and is open for contributions.

## Features

- **Draggable Windows**: Move windows around the screen.
- **Customizable**: Easily modify window behavior and appearance.
- **Lightweight**: Minimal dependencies, just pure JavaScript.

## Installation

### Option 1: Download Release Package (coming soon)
```bash
git clone https://github.com/andikasujanadi/jendela-js.git
```
And import Jendela-JS CSS and javascript file to your project
```html
<link rel="stylesheet" href="jendela.css">
```
```html
<script src="jendela.js"></script>
```
### Option 2: Using NPM

You can include the library in your project by downloading the module from NPM.
```bash
npm i @andikasujanadi/jendela.js
```
Import the module
```javascript
  import { addWindow } from '@andikasujanadi/jendela.js'
  import '@andikasujanadi/jendela.js/dist/styles.css';
```
## Usage

### Initialize a Window

In your JavaScript file, use the following code to create a new window:
```javascript
addWindow({
    title:'Testing Window',
    theme:'jendela-xp',
    body:'this is body',
});
```
This function will add a new window directly to HTML body.
### Window Class Structure
This class structure is for reference to make a new style
```html
<div class="jendela yourstyle-theme">
    <div class="seHandle cornerHandle"></div>
    <div class="swHandle cornerHandle"></div>
    <div class="neHandle cornerHandle"></div>
    <div class="nwHandle cornerHandle"></div>
    <div class="endHandle"></div>
    <div class="startHandle"></div>
    <div class="bottomHandle"></div>
    <div class="topHandle"></div>
    <div class="header">
        <div class="title"></div>
        <div class="headerButtonContainer">
            <div class="headerButton headerButtonMinimize">
                <div class="icon"></div>
            </div>
            <div class="headerButton headerButtonResize">
                <div class="icon"></div>
            </div>
            <div class="headerButton headerButtonClose">
                <div class="icon"></div>
            </div>
        </div>
    </div>
    <div class="body"></div>
</div>
```

### Adding Your Own Styles

This is the example of jendela classic theme CSS:
<details>
<summary>Click to expand</summary>

```css
.jendela-classic {
    background-color: #FCFCFC;
    border: #D4D0C8 solid 4px;

    .header {
        background: rgb(12, 38, 108);
        background: linear-gradient(90deg, rgba(12, 38, 108, 1) 0%, rgba(185, 219, 255, 1) 100%);
        color: white;
    }

    .title {
        padding: 6px;
    }

    .headerButtonContainer {
        padding-top: 2px;
        padding-right: 2px;
        gap: 2px;
    }

    .headerButton {
        width: 20px !important;
        height: 20px !important;
        background-color: #D4D0C8;
        border-style: solid;
        border-width: 3px;
        border-color: #ebe8e3 #747270 #747270 #ebe8e3;
    }

    .headerButton:active {
        border-color: #747270 #ebe8e3 #ebe8e3 #747270;
    }

    .headerButton .icon{
        position: absolute;
        margin: 4px 4px;
        height: 11px!important;
        width: 11px!important;
    }

    .headerButtonMinimize .icon {
        top:3px;
        position: absolute;
        background-image: url("data:image/svg+xml,%3Csvg%20width='8'%20height='2'%20viewBox='0%200%208%202'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0%200H8V2H0V0Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        filter: invert(1);
    }

    .headerButtonResize .icon {
        position: absolute;
        background-image: url("data:image/svg+xml,%3Csvg%20width='10'%20height='8'%20viewBox='0%200%2010%208'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10%200H0V8H10V0ZM9%202H1V7H9V2Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        filter: invert(1);
    }

    .headerButtonClose .icon {
        position: absolute;
        background-image: url("data:image/svg+xml,%3Csvg%20width='8'%20height='7'%20viewBox='0%200%208%207'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M1%201H0V0H2V1H3V2H5V1H6V0H8V1H7V2H6V3H5V4H6V5H7V6H8V7H6V6H5V5H3V6H2V7H0V6H1V5H2V4H3V3H2V2H1V1Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        filter: invert(1);
    }
}
.jendela-classic.inactive{
    border-color: #d9d9d9;
    .header{
        background: linear-gradient(90deg, rgb(107, 107, 107) 0%, rgb(224, 224, 224) 100%);
    }
}
```

</details>

## Window Parameters

You can customize the following options when creating a window:

| **Option**          | **Description**                            | **Default**       |
|---------------------|--------------------------------------------|-------------------|
| `title`             | The title of the window.                   | `''`              |
| `body`              | The content inside the window.             | `''`              |
| `theme`             | Set the theme of the window.               | `jendela-classic` |
| `minimizeButton`    | Set to `true` to show the minimize button. | `true`            |
| `resizeButton`      | Set to `true` to show the resize button.   | `true`            |
| `closeButton`       | Set to `true` to show the close button.    | `true`            |
| `minWidth`          | The minimum width of the window, preventing resizing smaller than this value. | `200` |
| `minHeight`         | The minimum height of the window, preventing resizing smaller than this value.| `200` |
| `width`             | The initial width of the window.                         | `min_width`                |
| `height`            | The initial height of the window.                        | `min_height`               |
| `left`              | The initial horizontal position of the window.           | `calc(50% - ${width/2}px)` |
| `top`               | The initial vertical position of the window.             | `calc(50% - ${height/2}px)`|


Example:
```javascript
addWindow({
    title: 'My Custom Window',
    body: 'This is a window with custom settings.',
    theme: 'jendela-xp',
    minimizeButton: false,
    minWidth: 300,
});
```
## Planned Features

### Version 1.0
- [x] Customizable themes
- [x] Resizable windows
- [x] Minimize/Restore functionality
- [x] Fullscreen support
- [x] Window Animations
- [x] Multi-window support
- [x] Focus/Blur state management
- [x] Hierarchical z-index management
- [x] Separating CSS file
- [x] Focus/Blur theme variant
- [x] Dynamic border radius style for button
- [x] add default theme for guide
- [x] Support touch screen device
- [x] add libadwaita theme
- [x] add parameter: min, max, position, size
- [x] NPM support
- [x] Fix css bug in minify css

### Next Version
- [ ] Window animation on create
- [ ] Improve resize and minimize function
- [ ] Dark theme variant
- [ ] Out of border safety
- [ ] Snap to grid
- [ ] Advance touch screen
- [ ] Button arrangement
- [ ] Integrated Taskbar Support
- [ ] Enhanced drag-and-drop behavior
- [ ] Responsive design adjustments
- [ ] Save and load window state
- [ ] Accessibility improvements (e.g., keyboard navigation)

## Contributing

- Fork the repository.
- Create a new branch for your feature or bug fix.
   ```bash
   git checkout -b feature-name
   ```
- Install node modules.

  ```bash
  npm i
  ```
  or
  ```bash
  npm install
  ```
- Run development mode server.
    ```bash
  npm run dev
  ```
- You can access it in example folder. Make sure to include index.html.
  ```
  http://localhost:10001/example/index.html
  ```
- Make your changes inside src folder.
- Commit your changes.
   ```bash
   git commit -m 'Add feature-name'
   ```
- Push to the branch.
   ```bash
   git push origin feature-name
   ```
- Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
