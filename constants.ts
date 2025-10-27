
export const DEFAULT_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Document</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        p {
            margin-bottom: 1em;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: 'Courier New', Courier, monospace;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1em 0;
        }
    </style>
</head>
<body>

    <h1>Welcome to the HTML to PDF Converter</h1>

    <p>
        This is a sample HTML document to demonstrate the conversion functionality. You can <strong>edit this text</strong>,
        paste your own HTML code, or upload an HTML file to see how it gets converted into a PDF.
    </p>
    
    <p>The converter uses <code>jsPDF</code> and <code>html2canvas</code> to render the HTML content in the browser and then generate a downloadable PDF document.</p>
    
    <img src="https://picsum.photos/600/300" alt="Random placeholder image">

    <h2>Features</h2>
    <ul>
        <li>Client-side conversion (no server needed).</li>
        <li>Live preview of your HTML.</li>
        <li>Support for both pasting code and uploading files.</li>
        <li>Multi-page PDF generation with orientation control.</li>
    </ul>

    <h3>Long Content Example</h3>
    <p>This section is added to demonstrate how the content will flow onto multiple pages if it's too long for a single A4 page. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin sed quam. Sed vitae lectus. Quisque eu justo. Donec hendrerit. Donec urna. In hac habitasse platea dictumst. Maecenas vitae. </p>
    <p>Nullam feugiat, turpis vitae top-porttitor, ante turpis mollis lacus, eu laoreet erat est nec sapien. Proin euismod, libero at pellentesque faucibus, magna nulla semper tortor, in mollis enim metus id dolor. Praesent nonummy, justo in scelerisque imperdiet, nulla ipsum vehicula massa, ac eleifend nibh velit at lorem. Vivamus vel sapien. Integer sit amet risus. Nunc aliquam, magna at consectetuer consectetuer, augue justo scelerisque ante, a eu eros. Duis mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ac ligula. Aliquam erat volutpat. </p>

</body>
</html>
`;
