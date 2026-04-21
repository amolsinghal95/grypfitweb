"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface InquiryItem {
  productId: number;
  title: string;
  sku: string;
  category: string;
  quantity?: number;
  notes?: string;
}

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (item: Omit<InquiryItem, "productId"> & { productId: number }) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateNotes: (productId: number, notes: string) => void;
  clearItems: () => void;
  totalCount: number;
  generateWhatsAppMessage: () => string;
  generateEmailMessage: () => string;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>(() => {
    // Load from localStorage on mount (client-side only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("grypfit-inquiry");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("grypfit-inquiry", JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((item: Omit<InquiryItem, "productId"> & { productId: number }) => {
    setItems((prev) => {
      // Check if item already exists
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        // Increase quantity if already exists
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  }, []);

  const updateNotes = useCallback((productId: number, notes: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, notes } : i
      )
    );
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("grypfit-inquiry");
    }
  }, []);

  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const generateWhatsAppMessage = () => {
    let message = "Hello! I'm interested in the following products:%0A%0A";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.title}%0A`;
      message += `   SKU: ${item.sku}%0A`;
      message += `   Quantity: ${item.quantity || 1}%0A`;
      if (item.notes) {
        message += `   Notes: ${item.notes}%0A`;
      }
      message += "%0A";
    });
    message += "%0APlease provide pricing and availability for bulk orders.%0A%0AThank you!";
    return message;
  };

  const generateEmailMessage = () => {
    let message = "Hello,\n\nI'm interested in the following products:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   SKU: ${item.sku}\n`;
      message += `   Quantity: ${item.quantity || 1}\n`;
      if (item.notes) {
        message += `   Notes: ${item.notes}\n`;
      }
      message += "\n";
    });
    message += "\nPlease provide pricing and availability for bulk orders.\n\nThank you!";
    return encodeURIComponent(message);
  };

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearItems,
        totalCount,
        generateWhatsAppMessage,
        generateEmailMessage,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}