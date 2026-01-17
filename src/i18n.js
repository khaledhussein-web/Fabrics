// This is the js variable that contains the data that needs to be translated 
const currentYear = new Date().getFullYear();

const arabicYear = new Intl.NumberFormat('ar', { 
    useGrouping: false,
    numberingSystem: 'arab' // <-- This forces the Eastern Arabic digits
}).format(new Date().getFullYear());
console.log("Arabic year: " , arabicYear)
// The variable 'arabicYear' now holds the string "٢٠٢٥"

export const UI = {
  en: {
    dir: "ltr",
    brand: "StageWare",
    nav: { home: "Home", about: "About Us", services: "Our Services", products: "Products", contact: "Contact Us", feedback: "Feedback" , Test: "test"},

    hero: {
      slogan: "Elegance in Every Detail",
      subtitle: "Premium fabrics, flooring, and decorative materials — designed, delivered, and installed with care.",
      cta: "View Products",
      quote: "Get a Quote",
    },
    contact: {
      title: "Contact Us",
      form: { name: "Full Name", email: "Email", phone: "Phone", message: "Message", send: "Send Message" },
      company: {
        address: "123 Main Street, Beirut, Lebanon",
        phone: "+961 1 234 567",
        email: "info@stageware.com"
      },
      success: "Thanks! We will contact you soon.",
    },

    footer: {
      rightsReserved: "All rights reserved",
      StageWare: "StageWare",
      date: currentYear, 
    },


     // Top-level product category names (used in Navbar dropdown links)
    productsCategories: {
      fabrics: "Fabrics",
      tracks: "Tracks",
      frames: "Frames",
      flooring: "Flooring",
    },

    //  Nested Frabrics sub-category names (used in the nested Fabrics dropdown links)
    fabricsSubCategories: {
      decoration: "Decoration fabrics",
      projectionScreens: "Projection screens",
      holograme: "Holograme",
    },

      tracksSubCategories: {
      chainTrack: "Chain Track",
      revealSystems: "Reveal Systems",
      rollups: "Rollups",
    },
      fabricSubCategories: {
      acousticMaskingBlackout: "Acoustic, Masking and Blackout",
      chromaKey: "Chroma Key",
      decorativeDisplay: "Decorative and Display",
      digitalPrint: "Digital Print",
      muslinCanvasScenic: "Muslin, Canvas and Scenic",
      projectionScreens: "Projection Screens",
      scrimGauzeNetting: "Scrim, Gauze and Netting",
      sheersSilksSatins: "Sheers, Silks and Satins",
      velvetNatural: "Velvet – Natural",
      velvetSynthetic: "Velvet – Synthetic",
    },


  },















  ar: {
    dir: "rtl",
    brand: "ستايج وير",
    nav: { home: "الرئيسية", about: "من نحن", services: "خدماتنا", products: "المنتجات", contact: "اتصل بنا", feedback: "آراء العملاء" },

    hero: {
      slogan: "الأناقة في كل تفصيل",
      subtitle: "أقمشة وأرضيات عالية الجودة.",
      cta: "عرض المنتجات",
      quote: "اطلب عرض سعر",
    },

    contact: {
      title: "اتصل بنا",
      form: { name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف", message: "الرسالة", send: "إرسال" },
      company: {
        address: "123 شارع رئيسي، بيروت، لبنان",
        phone: "+961 1 234 567",
        email: "info@stageware.com"
      },
      success: "شكرًا! سنتواصل معك قريبًا.",
    },

      footer: {
      rightsReserved: "جميع الحقوق محفوظة",
      StageWare: "ستايج وير",
      date: arabicYear,
    },
  
      productsCategories: {
      fabrics: "الأقمشة",
      tracks: "المسارات",
      frames: "الإطارات",
      flooring: "الأرضيات",
    },

    fabricsSubCategories: {
      decoration: "أقمشة الديكور",
      projectionScreens: "شاشات العرض",
      holograme: "الهولوجرام",
     
    },

    tracksSubCategories: {
      chainTrack: "مسار السلسلة",
      revealSystems: "شاشة المشاريع",
      rollups: "التجميعات"
    },
      fabricSubCategories: {
      acousticMaskingBlackout: "أقمشة العزل الصوتي والتعتيم",
      chromaKey: "كروما (خلفيات التصوير)",
      decorativeDisplay: "أقمشة الديكور والعرض",
      digitalPrint: "الطباعة الرقمية",
      muslinCanvasScenic: "أقمشة الموسلين والكانفاس والسينوغراف",
      projectionScreens: "شاشات العرض",
      scrimGauzeNetting: "أقمشة الشاش والشبك (سكريم)",
      sheersSilksSatins: "أقمشة الشيفون والحرير والساتان",
      velvetNatural: "مخمل طبيعي",
      velvetSynthetic: "مخمل صناعي",
    }


    
  },



  
};
