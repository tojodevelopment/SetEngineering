import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "18005550123";
  const message = encodeURIComponent("Hello, I'm interested in your industrial components. Can you help me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-4 md:right-6 w-14 h-14 bg-industrial-success rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform z-40 animate-pulse-amber"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" />
    </a>
  );
}
