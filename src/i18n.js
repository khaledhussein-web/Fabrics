// This is the js variable that contains the data that needs to be translated
const currentYear = new Date().getFullYear();

const arabicYear = new Intl.NumberFormat("ar", {
  useGrouping: false,
  numberingSystem: "arab",
}).format(new Date().getFullYear());

export const UI = {
  en: {
    dir: "ltr",
    brand: "StageWare",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      products: "Products",
      contact: "Contact Us",
      feedback: "Feedback",
      Test: "test",
    },

    hero: {
      slogan: "Elegance in Every Detail",
      subtitle:
        "Premium fabrics, flooring, and decorative materials - designed, delivered, and installed with care.",
      cta: "View Products",
      quote: "Get a Quote",
    },

    contact: {
      title: "Contact Us",
      form: {
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        send: "Send Message",
      },
      company: {
        address: "123 Main Street, Beirut, Lebanon",
        phone: "+961 1 234 567",
        email: "info@stageware.com",
      },
      success: "Thanks! We will contact you soon.",
    },

    footer: {
      rightsReserved: "All rights reserved",
      StageWare: "StageWare",
      date: currentYear,
    },

    productsCategories: {
      fabrics: "Fabrics",
      tracks: "Tracks",
      frames: "Frames",
      flooring: "Flooring",
    },

    fabricsSubCategories: {
      decoration: "Decoration fabrics",
      ph: "Projection screens & Hologram",
    },

    tracksSubCategories: {
      chainTrack: "Chain Track",
      revealSystems: "Reveal Systems",
      rollups: "Rollups",
    },

    fabricsDirectSubCategories: {
      acousticMaskingBlackout: "Acoustic, Masking and Blackout",
      chromaKey: "Chroma Key",
      decorativeDisplay: "Decorative and Display",
      digitalPrint: "Digital Print",
      muslinCanvasScenic: "Muslin, Canvas and Scenic",
      scrimGauzeNetting: "Scrim, Gauze and Netting",
      sheersSilksSatins: "Sheers, Silks and Satins",
      velvetNatural: "Velvet - Natural",
      velvetSynthetic: "Velvet - Synthetic",
    },

    allSubCategories: {
      decoration: "Decoration fabrics",
      ph: "Projection screens & Hologram",
      chainTrack: "Chain Track",
      revealSystems: "Reveal Systems",
      rollups: "Rollups",
    },

    productsDetails: {
      details: "Details",
      product_code: "Product Code",
      width: "Width",
      fabric_thickness: "Fabric Thickness",
      fr_durability: "FR Durability",
      roll_length: "Roll Length",
      weight: "Weight",
      fr_certification: "FR Certification",
      custom_dye: "Custom Dye",
      length: "Length",
      diameter: "Diameter",
      perfect_for: "Perfect For",
      gain: "Gain",
      transmittance: "Transmittance",
    },
  },

  ar: {
    dir: "rtl",
    brand: "ستايج وير",
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      products: "المنتجات",
      contact: "اتصل بنا",
      feedback: "آراء العملاء",
    },

    hero: {
      slogan: "الأناقة في كل تفصيل",
      subtitle: "أقمشة وأرضيات ومواد ديكور عالية الجودة، بتنفيذ احترافي متكامل.",
      cta: "عرض المنتجات",
      quote: "اطلب عرض سعر",
    },

    contact: {
      title: "اتصل بنا",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        message: "الرسالة",
        send: "إرسال",
      },
      company: {
        address: "123 شارع رئيسي، بيروت، لبنان",
        phone: "+961 1 234 567",
        email: "info@stageware.com",
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
      ph: "شاشات العرض والهولوغرام",
    },

    tracksSubCategories: {
      chainTrack: "مسار السلسلة",
      revealSystems: "أنظمة الإخفاء",
      rollups: "أنظمة اللف",
    },

    fabricSubCategories: {
      acousticMaskingBlackout: "أقمشة العزل الصوتي والتعتيم",
      chromaKey: "كروما كي (خلفيات التصوير)",
      decorativeDisplay: "أقمشة الديكور والعرض",
      digitalPrint: "الطباعة الرقمية",
      muslinCanvasScenic: "أقمشة الموسلين والكانفاس والمشاهد",
      scrimGauzeNetting: "أقمشة السكريم والشاش والشبك",
      sheersSilksSatins: "أقمشة الشيفون والحرير والساتان",
      velvetNatural: "مخمل طبيعي",
      velvetSynthetic: "مخمل صناعي",
    },

    allSubCategories: {
      decoration: "أقمشة الديكور",
      ph: "شاشات العرض والهولوغرام",
      chainTrack: "مسار السلسلة",
      revealSystems: "أنظمة الإخفاء",
      rollups: "أنظمة اللف",
    },

    productsDetails: {
      details: "التفاصيل",
      product_code: "رمز المنتج",
      width: "العرض",
      fabric_thickness: "السماكة",
      fr_durability: "مقاومة الاشتعال",
      roll_length: "طول اللفة",
      weight: "الوزن",
      fr_certification: "شهادات مقاومة الاشتعال",
      custom_dye: "صباغة مخصصة",
      length: "الطول",
      diameter: "القطر",
      perfect_for: "الاستخدام المثالي",
      gain: "معامل السطوع",
      transmittance: "النفاذية الضوئية",
    },
  },
};

