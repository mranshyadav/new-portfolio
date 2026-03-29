import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { useChatbot } from "../contexts/ChatbotContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "vrinda";
  timestamp: Date;
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  businessSize?: string;
  isRegistered?: boolean;
  currentChallenge?: string;
  purpose?: string;
  hasBusiness?: boolean;
  requirement?: string;
  conversationStage:
    | "greeting"
    | "collecting_contact"
    | "identifying_purpose"
    | "business_check"
    | "business_details"
    | "qualifying"
    | "qualified"
    | "converted";
  leadTemperature?: "hot" | "warm" | "cold";
}

export function VrindaChatbot() {
  const { addInteraction } = useChatbot();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [sessionId] = useState(`session-${Date.now()}`);
  const [leadData, setLeadData] = useState<LeadData>({
    conversationStage: "greeting",
    leadTemperature: "cold",
  });
  const [questionAsked, setQuestionAsked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat after 5 seconds
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        // Send first message immediately after opening
        setTimeout(() => {
          addVrindaMessage(
            "Hi 👋 I'm Vrinda. I'll quickly understand your needs and guide you properly.\nMay I know your name and contact number?"
          );
          setLeadData((prev) => ({ ...prev, conversationStage: "collecting_contact" }));
        }, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  const addVrindaMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "vrinda",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
      setQuestionAsked(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Extract contact info from text
  const extractContactInfo = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const phoneRegex = /(\+?\d[\d\s-]{8,})/;
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);

    return { email: emailMatch?.[0], phone: phoneMatch?.[0] };
  };

  // Check if user is asking a question (interrupt handling)
  const isQuestion = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const questionWords = [
      "what",
      "how",
      "why",
      "when",
      "where",
      "who",
      "can you",
      "do you",
      "tell me",
      "explain",
      "price",
      "cost",
      "service",
      "offer",
    ];
    return (
      text.includes("?") || questionWords.some((word) => lowerText.includes(word))
    );
  };

  // Answer common questions
  const answerQuestion = (text: string): string | null => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("service") || lowerText.includes("what do you do")) {
      return "I help businesses with web development, mobile apps, custom software solutions, UI/UX design, and digital transformation. We specialize in turning ideas into scalable digital products.\n\nNow, let me understand your specific needs better.";
    }

    if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much")) {
      return "Pricing depends on your specific requirements and project scope. Once I understand what you need, I can provide a tailored quote that fits your budget and goals.\n\nLet's continue so I can give you accurate pricing.";
    }

    if (lowerText.includes("portfolio") || lowerText.includes("work") || lowerText.includes("project")) {
      return "We've delivered projects across fintech, e-commerce, healthcare, and SaaS platforms. You can explore our case studies on the website.\n\nWhat kind of project are you planning?";
    }

    if (lowerText.includes("team") || lowerText.includes("company") || lowerText.includes("experience")) {
      return "We're a team of senior designers, developers, and business strategists with 10+ years of combined experience. We focus on quality, not quantity.\n\nNow, tell me about your business.";
    }

    return null;
  };

  // Classify lead temperature
  const updateLeadTemperature = (newLeadData: LeadData) => {
    let temperature: "hot" | "warm" | "cold" = "cold";

    // Hot lead criteria
    if (
      newLeadData.hasBusiness &&
      newLeadData.currentChallenge &&
      (newLeadData.email || newLeadData.phone)
    ) {
      temperature = "hot";
    }
    // Warm lead criteria
    else if (
      (newLeadData.name || newLeadData.email || newLeadData.phone) &&
      newLeadData.purpose
    ) {
      temperature = "warm";
    }

    setLeadData((prev) => ({ ...prev, leadTemperature: temperature }));
  };

  // Intelligent response system
  const processUserMessage = (userText: string) => {
    const lowerText = userText.toLowerCase();
    const { email, phone } = extractContactInfo(userText);

    // Update contact info if found
    if (email) setLeadData((prev) => ({ ...prev, email }));
    if (phone) setLeadData((prev) => ({ ...prev, phone }));

    // Handle interruptions - answer questions first
    if (isQuestion(userText) && !questionAsked) {
      const answer = answerQuestion(userText);
      if (answer) {
        addVrindaMessage(answer);
        setQuestionAsked(true);
        return; // Return early, will resume flow on next message
      }
    }

    // STEP 1: Collecting Contact Info
    if (leadData.conversationStage === "collecting_contact") {
      // Check if we have name
      if (!leadData.name) {
        // Extract name (assume first message is name if no contact info)
        if (!email && !phone && userText.split(" ").length <= 3) {
          setLeadData((prev) => ({ ...prev, name: userText }));
          addVrindaMessage(
            `Great to meet you, ${userText}! 😊\n\nWhat's the best number or email to reach you?`
          );
        } else if (email || phone) {
          // Got contact without name
          const nameFromEmail = email?.split("@")[0];
          setLeadData((prev) => ({
            ...prev,
            name: nameFromEmail || "there",
            email,
            phone,
          }));
          addVrindaMessage(
            `Perfect! Got your details. What brings you here today?\n\n1️⃣ Looking for services\n2️⃣ Exploring for business growth\n3️⃣ Just browsing\n4️⃣ Have a specific query`
          );
          setLeadData((prev) => ({ ...prev, conversationStage: "identifying_purpose" }));
        } else {
          addVrindaMessage(
            "I didn't quite catch that. Could you share your name and phone number? For example: 'John, +91-9876543210'"
          );
        }
        return;
      }

      // Have name, need contact
      if (!leadData.email && !leadData.phone) {
        if (email || phone) {
          setLeadData((prev) => ({ ...prev, email, phone }));
          addVrindaMessage(
            `Perfect! Got it. Now, what brings you here today?\n\n1️⃣ Looking for services\n2️⃣ Exploring for business growth\n3️⃣ Just browsing\n4️⃣ Have a specific query`
          );
          setLeadData((prev) => ({ ...prev, conversationStage: "identifying_purpose" }));
        } else {
          addVrindaMessage(
            "I need your email or phone number to continue. This helps me send you relevant information. 📧"
          );
        }
        return;
      }
    }

    // STEP 2: Identifying Purpose
    if (leadData.conversationStage === "identifying_purpose") {
      let purpose = "";

      if (
        lowerText.includes("service") ||
        lowerText.includes("1") ||
        lowerText.includes("looking")
      ) {
        purpose = "Looking for services";
        setLeadData((prev) => ({ ...prev, purpose, leadTemperature: "warm" }));
      } else if (
        lowerText.includes("growth") ||
        lowerText.includes("2") ||
        lowerText.includes("business")
      ) {
        purpose = "Business growth";
        setLeadData((prev) => ({ ...prev, purpose, leadTemperature: "warm" }));
      } else if (
        lowerText.includes("browse") ||
        lowerText.includes("3") ||
        lowerText.includes("just looking")
      ) {
        purpose = "Browsing";
        setLeadData((prev) => ({ ...prev, purpose, leadTemperature: "cold" }));
      } else if (
        lowerText.includes("query") ||
        lowerText.includes("4") ||
        lowerText.includes("question")
      ) {
        purpose = "Specific query";
        setLeadData((prev) => ({ ...prev, purpose }));
      } else {
        purpose = userText;
        setLeadData((prev) => ({ ...prev, purpose }));
      }

      addVrindaMessage("Got it! Do you currently run a business?");
      setLeadData((prev) => ({ ...prev, conversationStage: "business_check" }));
      return;
    }

    // STEP 3: Business Check
    if (leadData.conversationStage === "business_check") {
      const hasBusiness =
        lowerText.includes("yes") ||
        lowerText.includes("yeah") ||
        lowerText.includes("i do") ||
        lowerText.includes("i run");
      setLeadData((prev) => ({ ...prev, hasBusiness }));

      if (hasBusiness) {
        addVrindaMessage(
          "Excellent! Let me understand your business better.\n\nWhat's your business name?"
        );
        setLeadData((prev) => ({
          ...prev,
          conversationStage: "business_details",
          leadTemperature: "warm",
        }));
      } else {
        addVrindaMessage(
          "No problem! Are you planning to start a business or looking for individual services?"
        );
        setLeadData((prev) => ({ ...prev, conversationStage: "qualifying" }));
      }
      return;
    }

    // STEP 4: Business Details (for business owners)
    if (leadData.conversationStage === "business_details") {
      if (!leadData.company) {
        setLeadData((prev) => ({ ...prev, company: userText }));
        addVrindaMessage(
          `Nice! ${userText} sounds great.\n\nWhat type of business is it?\n\n1️⃣ Service-based\n2️⃣ Product-based\n3️⃣ Both`
        );
        return;
      }

      if (!leadData.businessType) {
        let type = "";
        if (lowerText.includes("service") || lowerText.includes("1")) {
          type = "Service-based";
        } else if (lowerText.includes("product") || lowerText.includes("2")) {
          type = "Product-based";
        } else if (lowerText.includes("both") || lowerText.includes("3")) {
          type = "Both";
        } else {
          type = userText;
        }
        setLeadData((prev) => ({ ...prev, businessType: type }));
        addVrindaMessage("Is your business registered?");
        return;
      }

      if (leadData.isRegistered === undefined) {
        const registered =
          lowerText.includes("yes") ||
          lowerText.includes("yeah") ||
          lowerText.includes("registered");
        setLeadData((prev) => ({ ...prev, isRegistered: registered }));
        addVrindaMessage(
          `What's your current business size?\n\n1️⃣ Solo / Freelancer\n2️⃣ 2-10 employees\n3️⃣ 11-50 employees\n4️⃣ 50+ employees`
        );
        return;
      }

      if (!leadData.businessSize) {
        let size = "";
        if (lowerText.includes("solo") || lowerText.includes("1")) {
          size = "Solo";
        } else if (lowerText.includes("2-10") || lowerText.includes("2")) {
          size = "2-10 employees";
        } else if (lowerText.includes("11-50") || lowerText.includes("3")) {
          size = "11-50 employees";
        } else if (lowerText.includes("50") || lowerText.includes("4")) {
          size = "50+ employees";
        } else {
          size = userText;
        }
        setLeadData((prev) => ({ ...prev, businessSize: size }));
        addVrindaMessage(
          `What's your biggest challenge right now?\n\n1️⃣ Need more sales/leads\n2️⃣ Branding & online presence\n3️⃣ Need a website/app\n4️⃣ Want to automate processes\n5️⃣ Scaling the business`
        );
        return;
      }

      if (!leadData.currentChallenge) {
        let challenge = "";
        if (lowerText.includes("sales") || lowerText.includes("lead") || lowerText.includes("1")) {
          challenge = "Need more sales/leads";
        } else if (lowerText.includes("brand") || lowerText.includes("2")) {
          challenge = "Branding & online presence";
        } else if (
          lowerText.includes("website") ||
          lowerText.includes("app") ||
          lowerText.includes("3")
        ) {
          challenge = "Need a website/app";
        } else if (
          lowerText.includes("automat") ||
          lowerText.includes("process") ||
          lowerText.includes("4")
        ) {
          challenge = "Want to automate processes";
        } else if (lowerText.includes("scal") || lowerText.includes("5")) {
          challenge = "Scaling the business";
        } else {
          challenge = userText;
        }
        setLeadData((prev) => ({
          ...prev,
          currentChallenge: challenge,
          conversationStage: "qualifying",
          leadTemperature: "hot",
        }));

        // Now recommend solution
        const recommendation = getRecommendation(challenge);
        addVrindaMessage(recommendation);
        
        // Save interaction
        addInteraction(messages, {
          ...leadData,
          currentChallenge: challenge,
          conversationStage: "qualified",
        });
        
        return;
      }
    }

    // STEP 5: Qualifying (for non-business owners or after business details)
    if (leadData.conversationStage === "qualifying") {
      if (!leadData.hasBusiness) {
        // Asked if planning to start or individual service
        if (
          lowerText.includes("start") ||
          lowerText.includes("planning") ||
          lowerText.includes("new business")
        ) {
          addVrindaMessage(
            "Perfect timing! Starting right is crucial.\n\nWhat kind of business are you planning?\n\n💡 E-commerce\n💡 Service business\n💡 SaaS/Tech product\n💡 Something else"
          );
          setLeadData((prev) => ({ ...prev, requirement: userText }));
        } else {
          addVrindaMessage(
            "Got it! What specific service are you looking for?\n\n📱 Website/App development\n🎨 UI/UX Design\n🚀 Digital marketing\n⚙️ Custom software"
          );
          setLeadData((prev) => ({ ...prev, requirement: userText }));
        }
        setLeadData((prev) => ({ ...prev, conversationStage: "qualified" }));
        return;
      }

      // Final recommendation given, ask for next step
      addVrindaMessage(
        "Would you like to:\n\n📞 Schedule a call\n💬 Chat on WhatsApp\n📧 Get a detailed proposal via email\n\nWhat works best for you?"
      );
      setLeadData((prev) => ({ ...prev, conversationStage: "converted" }));
      return;
    }

    // STEP 6: Qualified - Give recommendation
    if (leadData.conversationStage === "qualified") {
      const requirement = userText;
      setLeadData((prev) => ({ ...prev, requirement }));
      
      const recommendation = getRecommendation(requirement);
      addVrindaMessage(recommendation);
      
      // Save interaction
      addInteraction(messages, { ...leadData, requirement });
      
      return;
    }

    // STEP 7: Converted - Handle follow-up preference
    if (leadData.conversationStage === "converted") {
      if (lowerText.includes("call") || lowerText.includes("phone")) {
        addVrindaMessage(
          `Perfect! Our team will call you at ${leadData.phone || "your number"} within 24 hours.\n\n🚀 Meanwhile, you can also reach us on WhatsApp for faster response: +91-XXXXXXXXXX\n\nAnything else I can help you with?`
        );
      } else if (lowerText.includes("whatsapp") || lowerText.includes("chat")) {
        addVrindaMessage(
          "Great choice! 💚\n\nClick here to chat with us on WhatsApp: wa.me/91XXXXXXXXXX\n\nOur team will respond within minutes!"
        );
      } else if (lowerText.includes("email") || lowerText.includes("proposal")) {
        addVrindaMessage(
          `Excellent! We'll send a detailed proposal to ${leadData.email || "your email"} within 24 hours.\n\n📧 Check your inbox (and spam folder just in case).\n\nWe're excited to work with you! 🎉`
        );
      } else {
        addVrindaMessage(
          "Just let me know: call, WhatsApp, or email? I'll set it up right away! 😊"
        );
      }
      
      // Save final interaction
      addInteraction(messages, leadData);
      
      return;
    }

    // Fallback
    addVrindaMessage(
      "I want to make sure I understand you correctly. Could you elaborate a bit?"
    );
  };

  // Get recommendation based on challenge/requirement
  const getRecommendation = (challenge: string): string => {
    const lowerChallenge = challenge.toLowerCase();

    if (lowerChallenge.includes("sales") || lowerChallenge.includes("lead")) {
      return `Based on what you've shared, here's what I recommend:\n\n✅ Custom CRM + Lead Generation System\n✅ Conversion-optimized website\n✅ Marketing automation\n\nThis will help you capture, nurture, and convert more leads on autopilot.\n\n💰 Expected ROI: 3-5x within 6 months\n\nInterested? We can start with a discovery call.`;
    }

    if (lowerChallenge.includes("brand") || lowerChallenge.includes("presence")) {
      return `Perfect! Here's my recommendation:\n\n✅ Professional website with modern UI/UX\n✅ Brand identity & design system\n✅ SEO-optimized content\n\nThis establishes credibility and attracts high-quality clients.\n\n🎯 Timeline: 4-6 weeks\n💡 Starting at competitive rates based on scope\n\nShall we discuss this in detail?`;
    }

    if (lowerChallenge.includes("website") || lowerChallenge.includes("app")) {
      return `Great! Based on your business, I suggest:\n\n✅ Responsive web app (works on all devices)\n✅ Custom features tailored to your workflow\n✅ Scalable architecture for future growth\n\n🚀 We can deliver an MVP in 6-8 weeks\n💻 Full support & maintenance included\n\nWant to see some similar projects we've done?`;
    }

    if (lowerChallenge.includes("automat") || lowerChallenge.includes("process")) {
      return `Automation is a game-changer! Here's what fits you:\n\n✅ Custom workflow automation\n✅ Integration with your existing tools\n✅ Reporting & analytics dashboard\n\n⏱️ Save 10-20 hours/week\n📈 Reduce errors by 90%\n\nLet's map your process and show you exactly what's possible.`;
    }

    if (lowerChallenge.includes("scal")) {
      return `Scaling requires the right foundation. I recommend:\n\n✅ Scalable tech infrastructure\n✅ Process automation\n✅ Performance optimization\n\nThis ensures your business can handle 10x growth without breaking.\n\n🎯 We've helped businesses scale from 50 to 500+ users smoothly.\n\nReady to build for scale?`;
    }

    // Generic recommendation
    return `Based on what you've shared, here's what I think will work best:\n\n✅ Custom solution tailored to your needs\n✅ Modern, scalable technology\n✅ Full support from concept to launch\n\nWe specialize in turning business challenges into competitive advantages.\n\n💡 Let's discuss your specific requirements in detail. How about a quick call?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    processUserMessage(inputValue);
    setInputValue("");

    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-light) 100%)",
            }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "var(--accent-blue)",
                opacity: 0.5,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "60px" : "600px",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-light) 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                  V
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Vrinda</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p className="text-white/90 text-xs">Online - Sales Agent</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div
                  className="h-[440px] overflow-y-auto px-5 py-4 space-y-4"
                  style={{
                    background: "var(--bg-secondary)",
                  }}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                          message.sender === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                        }`}
                        style={{
                          background:
                            message.sender === "user"
                              ? "var(--accent-blue)"
                              : "var(--bg-primary)",
                          color:
                            message.sender === "user" ? "white" : "var(--text-primary)",
                          border:
                            message.sender === "vrinda"
                              ? "1px solid var(--border-default)"
                              : "none",
                        }}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div
                        className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                        style={{
                          background: "var(--bg-primary)",
                          border: "1px solid var(--border-default)",
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ background: "var(--text-secondary)" }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ background: "var(--text-secondary)" }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ background: "var(--text-secondary)" }}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                  className="px-4 py-3 border-t"
                  style={{
                    background: "var(--bg-primary)",
                    borderColor: "var(--border-default)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
                      style={{
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-default)",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--accent-blue)",
                      }}
                    >
                      <Send className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
