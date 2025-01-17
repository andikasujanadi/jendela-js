# jendela-js

**jendela-js** is a simple JavaScript library for creating draggable windows. It allows you to add interactive window components to your web applications. This project is currently in development and is open for contributions.

## Features

- **Draggable Windows**: Move windows around the screen.
- **Customizable**: Easily modify window behavior and appearance.
- **Lightweight**: Minimal dependencies, just pure JavaScript.

## Installation

### Option 1: Clone the repository
```bash
git clone https://github.com/andikasujanadi/jendela-js.git
```
### Option 2: Using CDN (coming soon)

You can include the library in your project by linking to the hosted version (once it's available).
```javascript
<script src="https://cdn.jsdelivr.net/npm/jendela-js@latest"></script>
```
## Usage

### Initialize a Window

In your JavaScript file, use the following code to create a new window:
```javascript
add_window({
    title:'Testing Window',
    theme:'jendela-xp',
    body:'this is body',
});
```
This function will add a new window directly to HTML body.
### Add Styles

This is the example of jendela classic CSS:
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

    .headerButtonMinimize .icon {
        top:3px;
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: url("data:image/svg+xml,%3Csvg%20width='8'%20height='2'%20viewBox='0%200%208%202'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M0%200H8V2H0V0Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 10px 10px;
        filter: invert(1);
    }

    .headerButtonResize .icon {
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: url("data:image/svg+xml,%3Csvg%20width='10'%20height='8'%20viewBox='0%200%2010%208'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10%200H0V8H10V0ZM9%202H1V7H9V2Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px 12px;
        filter: invert(1);
    }

    .headerButtonClose .icon {
        position: absolute;
        height: 100%;
        width: 100%;
        background-image: url("data:image/svg+xml,%3Csvg%20width='8'%20height='7'%20viewBox='0%200%208%207'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M1%201H0V0H2V1H3V2H5V1H6V0H8V1H7V2H6V3H5V4H6V5H7V6H8V7H6V6H5V5H3V6H2V7H0V6H1V5H2V4H3V3H2V2H1V1Z'%20fill='white'%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 10px 10px;
        filter: invert(1);
    }
}
```
## Window Parameters

You can customize the following options when creating a window:

- `title`: The title of the window.
- `body`: The content inside the window.
- `theme`: Set the theme of the window. Default is `jendela-classic`.
- `minimize_button`: Set to `true` to show the minimize button (default: `true`).
- `resize_button`: Set to `true` to show the resize button (default: `true`).
- `close_button`: Set to `true` to show the close button (default: `true`).

Example:
```javascript
add_window({
    title: 'My Custom Window',
    body: 'This is a window with custom settings.',
    theme: 'jendela-xp',
    minimize_button: false,
    resize_button: true,
    close_button: true
});
```
## Planned Features

- [x] Customizable themes
- [x] Resizable windows
- [x] Minimize/Restore functionality
- [x] Fullscreen support
- [x] Window Animations
- [x] Multi-window support
- [x] Focus/Blur state management
- [x] Hierarchical z-index management
- [ ] Dynamic button style
- [ ] Focus/Blur theme variant
- [ ] Snap to grid
- [ ] Accessibility improvements (e.g., keyboard navigation)
- [ ] Save and load window state
- [ ] Responsive design adjustments
- [ ] Enhanced drag-and-drop behavior
- [ ] Performance optimizations
- [ ] Integrated Taskbar Support

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature-name'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
