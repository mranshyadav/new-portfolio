import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "./AuthContext";
import { CMSProvider } from "./CMSContext";
import { WebsiteContentProvider } from "./WebsiteContentContext";
import { ChatbotProvider } from "./ChatbotContext";

interface ProvidersWrapperProps {
  children: React.ReactNode;
}

export function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WebsiteContentProvider>
          <CMSProvider>
            <ChatbotProvider>
              {children}
            </ChatbotProvider>
          </CMSProvider>
        </WebsiteContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}