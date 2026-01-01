"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 5000,
        style: {
          background: "#171717",
          color: "#e5e5e5",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
          maxWidth: "500px",
        },
        // Success toast
        success: {
          duration: 6000,
          iconTheme: {
            primary: "#10b981",
            secondary: "#fff",
          },
          style: {
            background: "#171717",
            color: "#e5e5e5",
            border: "1px solid #10b981",
          },
        },
        // Error toast
        error: {
          duration: 7000,
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fff",
          },
          style: {
            background: "#171717",
            color: "#e5e5e5",
            border: "1px solid #dc2626",
          },
        },
        // Loading toast
        loading: {
          iconTheme: {
            primary: "#0066c3",
            secondary: "#fff",
          },
          style: {
            background: "#171717",
            color: "#e5e5e5",
            border: "1px solid #0066c3",
          },
        },
      }}
    />
  );
}
