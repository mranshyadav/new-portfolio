import { CustomCursor } from "./components/CustomCursor";
import { DevBanner } from "./components/DevBanner";
// import { VrindaChatbot } from './components/VrindaChatbot';
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { CaseStudy } from "./pages/CaseStudy";
import { Process } from "./pages/Process";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { ProvidersWrapper } from "./contexts/ProvidersWrapper";
import { CMSLayout } from "./components/cms/CMSLayout";
import { CMSDashboard } from "./components/cms/CMSDashboard";
import { ContentList } from "./components/cms/ContentList";
import { ContentEditor } from "./components/cms/ContentEditor";
import { MediaLibrary } from "./components/cms/MediaLibrary";
import { WebsiteContentEditor } from "./components/cms/WebsiteContentEditor";
import { ChatbotDashboard } from "./components/cms/ChatbotDashboard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout component for public pages
function PublicLayout() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const location = useLocation();
  const isCaseStudyPage =
    location.pathname.startsWith("/case-study/");

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: isCaseStudyPage
          ? "#0a0e1a"
          : "var(--bg-primary)",
      }}
    >
      <CustomCursor />
      {!isCaseStudyPage && (
        <DevBanner
          onDismiss={() => setIsBannerVisible(false)}
        />
      )}
      {!isCaseStudyPage && (
        <Header bannerVisible={isBannerVisible} />
      )}
      <main
        className="transition-all duration-300"
        style={{
          paddingTop: isCaseStudyPage
            ? "0"
            : isBannerVisible
              ? "120px"
              : "72px",
        }}
      >
        <Outlet />
      </main>
      {!isCaseStudyPage && <Footer />}
      {/* <VrindaChatbot /> */}
    </div>
  );
}

export default function App() {
  return (
    <ProvidersWrapper>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>
          {/* CMS Routes (No Header/Footer) */}
          <Route path="/admin" element={<CMSLayout />}>
            <Route index element={<CMSDashboard />} />
            <Route path="content" element={<ContentList />} />
            <Route
              path="content/new"
              element={<ContentEditor />}
            />
            <Route
              path="content/edit/:id"
              element={<ContentEditor />}
            />
            <Route path="media" element={<MediaLibrary />} />
            <Route
              path="website-content/edit/main"
              element={<WebsiteContentEditor />}
            />
            <Route
              path="chatbot"
              element={<ChatbotDashboard />}
            />
          </Route>

          {/* Public Routes (With Header/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route
              path="/case-study/:id"
              element={<CaseStudy />}
            />
            <Route path="/process" element={<Process />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProvidersWrapper>
  );
}