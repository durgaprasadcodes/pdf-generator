import './App.css'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

function App() {

  const ref = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(ref.current, { scale: 2, logging: true, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = 200; // smaller than page width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("document.pdf");
  }

  return (
    <div className="container">
      <div id="invoice" ref={ref} className="invoice">
        <h1>Invoice</h1>
        <hr />

        <h3>Customer</h3>
        <p>John Doe</p>

        <h3>Items</h3>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>React Course</td>
              <td className="text-right">$50</td>
            </tr>

            <tr>
              <td>JavaScript Course</td>
              <td className="text-right">$40</td>
            </tr>
          </tbody>
        </table>

        <hr />

        <h2 className="total">Total: $90</h2>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default App
