import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info.tuievolution@gmail.com",
    href: "mailto:info.tuievolution@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+90 (555) 000-0000",
    href: "tel:+905550000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Istanbul, Turkiye",
    href: "#",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      // .env dosyasından değişkenleri çekiyoruz
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your .env file."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus({
        type: "error",
        message:
          err?.text || "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyiniz.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Ana kapsayıcı rengi CSS'teki body renginden (var(--bg-primary)) otomatik alır
    <section id="contact" className="py-32 relative overflow-hidden min-h-screen transition-colors duration-500">
      
      {/* Arka plan efektleri (Temaya uygun renkler) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--accent)' }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-wider uppercase opacity-80" style={{ color: 'var(--accent)' }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's build{" "}
            <span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>
              something great.
            </span>
          </h2>
          <p className="text-lg opacity-80">
            Aklınızda bir proje mi var? Dinlemek isteriz. Bize bir mesaj gönderin ve nasıl birlikte çalışabileceğimizi konuşalım.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Form Alanı - Glass Efekti Uygulandı */}
          <div className="glass p-8 rounded-3xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 opacity-90"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Adınız..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  // Input stilleri: Arka plan bg-secondary, kenarlık accent/30
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all placeholder-opacity-50"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'rgba(var(--accent), 0.2)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 opacity-90"
                >
                  Email
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all placeholder-opacity-50"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'rgba(var(--accent), 0.2)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 opacity-90"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Mesajınız..."
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none placeholder-opacity-50"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'rgba(var(--accent), 0.2)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {/* Buton - Accent rengi kullanıldı */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:brightness-110"
                style={{ 
                  backgroundColor: 'var(--accent)', 
                  color: 'white' // Buton metni her zaman beyaz (kontrast için)
                }}
              >
                {isLoading ? (
                  <>Gönderiliyor...</>
                ) : (
                  <>
                    Mesajı Gönder
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Bildirim Alanı */}
              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    submitStatus.type === "success"
                      ? "bg-green-100/10 border-green-500 text-green-500"
                      : "bg-red-100/10 border-red-500 text-red-500"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 mt-4">
            {/* Bilgi Kartı - .card sınıfı kullanıldı */}
            <div className="card border border-white/10">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    {/* İkon Kutusu - Accent rengi ve şeffaflık */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300"
                      style={{ 
                        backgroundColor: 'rgba(var(--accent), 0.1)', 
                        color: 'var(--accent)' 
                      }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div className="text-sm opacity-70">
                        {item.label}
                      </div>
                      <div className="font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card - Glass Efekti */}
            <div className="glass p-8 rounded-3xl border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-sm leading-relaxed opacity-80">
                Şu anda yeni fırsatlara ve heyecan verici projelere açığız. İster tam kapsamlı bir proje, ister danışmanlık olsun, konuşmaya hazırız!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;