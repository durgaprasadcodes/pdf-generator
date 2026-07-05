# 📄 React PDF Generator

A simple React application that converts an HTML invoice into a high-quality PDF using **html2canvas** and **jsPDF**.

The project captures a React component as an image and embeds it into an A4 PDF while maintaining proper alignment and good image quality.

<div align="center">
  
  [🌏 LIVE DEMO](https://durgaprasadcodes.github.io/pdf-generator/)
</div>

---

## 🚀 Features

* 📄 Generate PDF from HTML
* ⚛️ Built with React
* 🖼️ High-resolution PDF using `html2canvas`
* 📑 Automatic A4 page generation
* 📌 Centered invoice inside the PDF
* 🎨 Easy to customize invoice layout
* 💾 One-click PDF download

---

## 📦 Dependencies

Install the required packages:

```bash
npm install jspdf html2canvas
```

or

```bash
yarn add jspdf html2canvas
```

---

## 📁 Project Structure

```
src/
│── App.jsx
│── App.css
│── main.jsx
│
public/
```

---

# 📚 Technologies Used

* React
* JavaScript (ES6+)
* html2canvas
* jsPDF
* CSS

---

# ⚙️ How It Works

The application follows these steps:

1. The invoice is rendered as a normal HTML component.
2. `useRef()` references the invoice container.
3. When the **Download PDF** button is clicked:

   * `html2canvas` captures the invoice.
   * The canvas is converted into a PNG image.
   * `jsPDF` creates an A4 PDF.
   * The image is centered inside the PDF.
   * The PDF is downloaded automatically.

---

# 📄 Core Code Explanation

## 1. Reference the Invoice

```jsx
const ref = useRef();
```

`useRef` stores a reference to the invoice DOM element that will later be converted into a PDF.

---

## 2. Capture HTML

```jsx
const canvas = await html2canvas(ref.current, {
  scale: 2,
  logging: true,
  useCORS: true,
});
```

### Options

| Option        | Purpose                         |
| ------------- | ------------------------------- |
| scale: 2      | Improves image quality          |
| logging: true | Displays debug logs             |
| useCORS: true | Loads external images correctly |

The result is a Canvas object.

---

## 3. Convert Canvas to Image

```jsx
const imgData = canvas.toDataURL("image/png");
```

The canvas is converted into a PNG image because `jsPDF` inserts images into PDFs.

---

## 4. Create PDF

```jsx
const pdf = new jsPDF("p", "mm", "a4");
```

Parameters:

| Value | Meaning              |
| ----- | -------------------- |
| p     | Portrait orientation |
| mm    | Millimeters          |
| a4    | Standard A4 page     |

---

## 5. Get PDF Dimensions

```jsx
const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();
```

Returns:

* Width = 210 mm
* Height = 297 mm

These values are used to center the invoice.

---

## 6. Calculate Image Size

```jsx
const imgWidth = 200;
const imgHeight = (canvas.height * imgWidth) / canvas.width;
```

This preserves the original aspect ratio of the captured image.

---

## 7. Center the Image

```jsx
const x = (pageWidth - imgWidth) / 2;
const y = (pageHeight - imgHeight) / 2;
```

The image is positioned in the center of the PDF.

---

## 8. Add Image

```jsx
pdf.addImage(
  imgData,
  "PNG",
  x,
  y,
  imgWidth,
  imgHeight
);
```

This inserts the PNG image into the PDF.

---

## 9. Download PDF

```jsx
pdf.save("document.pdf");
```

Triggers the browser download.

---

# 🧠 Complete PDF Generation Flow

```
React Component
       │
       ▼
   useRef()
       │
       ▼
html2canvas()
       │
       ▼
 Canvas Image
       │
       ▼
toDataURL()
       │
       ▼
 PNG Image
       │
       ▼
 jsPDF
       │
       ▼
 addImage()
       │
       ▼
 document.pdf
```

---

# 📷 Invoice Layout

The invoice contains:

* Invoice Title
* Customer Details
* Items Table
* Total Amount
* Download Button

The invoice can be customized with additional fields such as:

* Company Logo
* Address
* GST Number
* Tax Details
* Discounts
* Payment Status
* Signature
* QR Code

---

# 🎯 Advantages of This Approach

* Very easy to implement
* Uses existing HTML and CSS
* Supports complex layouts
* Fast PDF generation
* No need to redesign the document
* Works well for invoices, reports, receipts, and certificates

---

# ⚠️ Limitations

Since the PDF is generated from a screenshot of the HTML:

* Text is stored as an image (not selectable).
* PDF file size may increase with large content.
* Multi-page documents require additional logic.
* Complex CSS effects may render differently.

---

# 🚀 Future Improvements

* Multi-page PDF support
* Dynamic invoice data
* Company branding
* Page numbers
* Headers and footers
* Automatic scaling for long invoices
* Export to PNG/JPEG
* Print support
* Dark mode invoice theme

---

# 📜 License

This project is open-source and available under the MIT License.
