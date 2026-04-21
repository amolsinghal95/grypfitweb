"use client";

interface Weight {
  value: number;
  unit: string;
}

interface Dimensions {
  length: number;
  width?: number;
  height?: number;
  unit: string;
}

interface ProductPdfData {
  title: string;
  sku: string;
  price?: string;
  shortDescription?: string;
  longDescription?: string;
  category?: string;
  image?: string;
  weight?: Weight;
  dimensions?: Dimensions;
  material?: string;
  colors?: {
    name: string;
    hex: string;
  }[];
}

async function fetchImageAsDataUrl(url?: string): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function downloadProductPdf(product: ProductPdfData) {
  const [{ default: pdfMake }, pdfFontsModule] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts").catch(() => undefined),
  ]);

  const attachVfsFromModule = (mod: any) => {
    if (!mod) return false;
    if (mod.pdfMake?.vfs) {
      (pdfMake as any).vfs = mod.pdfMake.vfs;
      return true;
    }
    if (mod.vfs) {
      (pdfMake as any).vfs = mod.vfs;
      return true;
    }
    if (mod.default?.vfs) {
      (pdfMake as any).vfs = mod.default.vfs;
      return true;
    }
    if (mod.default?.pdfMake?.vfs) {
      (pdfMake as any).vfs = mod.default.pdfMake.vfs;
      return true;
    }
    return false;
  };

  let vfsAttached = attachVfsFromModule(pdfFontsModule);
  if (!vfsAttached) {
    try {
      const CDN = "https://unpkg.com/pdfmake@0.2.7/build/vfs_fonts.js";
      const resp = await fetch(CDN);
      if (resp.ok) {
        const js = await resp.text();
        // eslint-disable-next-line no-new-func
        new Function("pdfMake", js)(pdfMake);
        if (
          (pdfMake as any).vfs &&
          Object.keys((pdfMake as any).vfs).length > 0
        ) {
          vfsAttached = true;
        }
      }
    } catch (e) {
      console.warn("Failed to load vfs_fonts from CDN:", e);
    }
  }

  const imageData = await fetchImageAsDataUrl(product.image).catch(() => null);
  const content: any[] = [];

  content.push({
    columns: [
      { text: product.title ?? "Product Specs", style: "headerLeft" },
      imageData
        ? { image: imageData, width: 120, alignment: "right" }
        : { text: "", width: 120 },
    ],
  });
  content.push({ text: "\n" });

  content.push({
    columns: [
      { text: `SKU: ${product.sku ?? "-"}`, style: "meta" },
      {
        text: `Category: ${product.category ?? "-"}`,
        style: "meta",
        alignment: "center",
      },
      {
        text: `Price: ${product.price ?? "-"}`,
        style: "meta",
        alignment: "right",
      },
    ],
  });
  content.push({ text: "\n" });

  content.push({ text: "Short Description", style: "sectionTitle" });
  content.push({
    text: product.shortDescription ?? "-",
    margin: [0, 4, 0, 8],
  });

  content.push({ text: "Long Description", style: "sectionTitle" });
  content.push({
    text: product.longDescription ?? "-",
    margin: [0, 4, 0, 12],
  });

  const specBody: any[] = [
    [
      { text: "Specification", style: "tableHeader" },
      { text: "Value", style: "tableHeader" },
    ],
  ];

  if (product.weight) {
    specBody.push([
      { text: "Weight" },
      { text: `${product.weight.value} ${product.weight.unit}` },
    ]);
  }

  if (product.dimensions) {
    const length = product.dimensions.length ?? "";
    const width = product.dimensions.width ?? "";
    const height = product.dimensions.height ?? "";
    const unit = product.dimensions.unit ?? "";
    const dims =
      width && height
        ? `${length} x ${width} x ${height} ${unit}`
        : `${length} ${unit}`.trim();

    specBody.push([{ text: "Dimensions" }, { text: dims }]);
  }

  if (product.material) {
    specBody.push([{ text: "Material" }, { text: product.material }]);
  }

  if (Array.isArray(product.colors) && product.colors.length > 0) {
    specBody.push([
      { text: "Colors Available" },
      { text: product.colors.map((c) => c.name).join(", ") },
    ]);
  }

  specBody.push([
    { text: "Generated On" },
    { text: new Date().toLocaleString() },
  ]);

  content.push({
    text: "Specifications",
    style: "sectionTitle",
    margin: [0, 6, 0, 6],
  });
  content.push({
    table: { widths: ["auto", "*"], body: specBody },
    layout: {
      fillColor: (rowIndex: number) => (rowIndex % 2 === 0 ? "#F7F7F7" : null),
    },
    margin: [0, 0, 0, 16],
  });

  const website =
    typeof window !== "undefined" ? window.location.origin : "https://gryp.fit";
  const emailEnv = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "business@gryp.fit";

  content.push({
    text: "Contact",
    style: "sectionTitle",
    margin: [0, 6, 0, 6],
  });
  content.push({
    columns: [
      { text: "Phone: +918449291260", style: "contactText" },
      {
        text: `Email: ${emailEnv}`,
        style: "contactText",
        alignment: "center",
      },
      {
        text: `Website: ${website}`,
        style: "contactText",
        alignment: "right",
      },
    ],
    margin: [0, 0, 0, 12],
  });

  content.push({
    text: "Note: This document is generated by Gryp.fit.",
    style: "footnote",
    margin: [0, 10, 0, 0],
  });

  const docDefinition: any = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],
    content,
    watermark: {
      text: "Gryp.fit",
      color: "#000000",
      opacity: 0.06,
      bold: true,
      italics: false,
      angle: -45,
    },
    styles: {
      headerLeft: { fontSize: 18, bold: true, margin: [0, 0, 0, 2] },
      meta: { fontSize: 10, color: "#555" },
      sectionTitle: { fontSize: 12, bold: true, margin: [0, 6, 0, 6] },
      tableHeader: { bold: true, fillColor: "#EEE", fontSize: 11 },
      footnote: { fontSize: 9, color: "#666" },
      contactText: { fontSize: 10, color: "#333" },
    },
    defaultStyle: { fontSize: 11 },
    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: "right",
          margin: [0, 0, 40, 0],
        },
      ],
      columnGap: 10,
      fontSize: 9,
      color: "#666",
    }),
  };

  const pdfGenerator = (pdfMake as any).createPdf(docDefinition);
  const filename = `${product.sku || "product"}_specs.pdf`;

  if (typeof pdfGenerator.getBlob === "function") {
    const generatedBlob: Blob = await new Promise((resolve, reject) => {
      pdfGenerator.getBlob(
        (blob: Blob) => resolve(blob),
        (err: any) => reject(err)
      );
    });

    const blob =
      generatedBlob.type === "application/pdf"
        ? generatedBlob
        : new Blob([generatedBlob], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return;
  }

  pdfGenerator.download(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
