export type Lang = "hi" | "en";
export type L = { hi: string; en: string };

export const UI = {
  city: { hi: "जोधपुर", en: "Jodhpur" },
  navPrices: { hi: "भाव", en: "Prices" },
  navMoments: { hi: "पल", en: "Moments" },
  navFaces: { hi: "चेहरे", en: "Faces" },
  navVisit: { hi: "दुकान", en: "Visit" },
  bag: { hi: "थैला", en: "Bag" },
  bagEmpty: { hi: "खाली", en: "empty" },
  openBag: { hi: "अपना थैला खोलें", en: "Open your order bag" },
  closeBag: { hi: "थैला बंद करें", en: "Close bag" },
  less: { hi: "कम", en: "Less" },
  more: { hi: "ज़्यादा", en: "More" },

  eyebrowTag: { hi: "मिर्ची बड़ा वाला", en: "Home of the Mirchi Bada" },
  place: { hi: "सरदारपुरा, जोधपुर", en: "Sardarpura, Jodhpur" },
  lede: {
    hi: "गांधी मैदान के पास, सरदारपुरा में। गरम मिर्ची बड़ा, मोगर कचौरी और ईमरती, साथ में पैकेट वाली और व्रत की सेहगरी नमकीन।",
    en: "Near Gandhi Maidan in Sardarpura. Hot mirchi bada, mogar kachori and imarti, plus packaged namkeen and sehgari namkeen for fasting.",
  },
  ctaPrices: { hi: "भाव देखो", en: "See prices" },
  ctaWa: { hi: "WhatsApp पे ऑर्डर", en: "Order on WhatsApp" },
  onlineToo: { hi: "ऑनलाइन भी:", en: "Also online:" },
  scribble: { hi: "गरम · ताज़ा · कुरकुरा", en: "Hot · Fresh · Crunchy" },

  menuEyebrow: { hi: "बही खाता", en: "The ledger" },
  menuTitle: { hi: "हमारे भाव", en: "Our Prices" },
  menuSub: {
    hi: "थैला भरो, सीधा WhatsApp पे भेज दो।",
    en: "Fill the bag and send it straight to us on WhatsApp.",
  },
  all: { hi: "सब", en: "All" },
  perPiece: { hi: "/ पीस", en: "/ piece" },
  footNote: {
    hi: "* भाव Zomato / Swiggy की लिस्टिंग के हिसाब से हैं, दुकान पर अलग हो सकते हैं। ऑर्डर से पहले कन्फर्म कर लें।",
    en: "* Prices follow the Zomato / Swiggy listings and may differ at the shop. Please confirm before ordering.",
  },
  extrasTitle: { hi: "और भी मिलता है", en: "Also available" },
  extrasNote: { hi: "भाव दुकान पर पूछ लें।", en: "Ask at the shop for prices." },

  momentsTitle: { hi: "नमकीन कब?", en: "When is it namkeen time?" },
  facesTitle: { hi: "दुकान के चेहरे", en: "The faces of the shop" },

  visitEyebrow: { hi: "आइए", en: "Come by" },
  visitTitle: { hi: "दुकान पे आओ", en: "Visit the shop" },
  hoursNote: {
    hi: "टाइमिंग पक्की करने के लिए एक कॉल कर लें।",
    en: "Call once to confirm the timings.",
  },
  directions: { hi: "रास्ता बताओ", en: "Get directions" },
  homeOnline: { hi: "घर बैठे:", en: "From home:" },

  bagTitle: { hi: "आपका थैला", en: "Your bag" },
  bagEmptyMsg: {
    hi: "थैला अभी खाली है। भाव से कुछ उठा लो।",
    en: "Your bag is empty. Pick something from the prices.",
  },
  estimated: { hi: "अनुमानित", en: "Estimated" },
  modeShop: { hi: "दुकान से लूँगा", en: "I'll pick up" },
  modeHome: { hi: "घर मँगवाना है", en: "Deliver to me" },
  namePh: { hi: "आपका नाम", en: "Your name" },
  notePh: {
    hi: "कोई नोट? (अलग पैकिंग, कम तीखा…)",
    en: "Any note? (separate packing, less spicy…)",
  },
  sendWa: { hi: "WhatsApp पे भेजो", en: "Send on WhatsApp" },
  fine: {
    hi: "भाव ऑनलाइन लिस्टिंग के हिसाब से अनुमान हैं। फ़ाइनल भाव और भुगतान दुकान पर कन्फर्म होगा।",
    en: "Prices are estimates based on the online listing. Final price and payment are confirmed at the shop.",
  },

  // WhatsApp message
  waHello: { hi: "नमस्ते", en: "Hello" },
  waIntro: { hi: "मुझे ये ऑर्डर देना है:", en: "I would like to place this order:" },
  waEstimate: { hi: "अनुमानित", en: "Approx." },
  waEstimateNote: { hi: "(ऑनलाइन भाव के हिसाब से)", en: "(as per online prices)" },
  waName: { hi: "नाम", en: "Name" },
  waPickup: { hi: "दुकान से लेने आऊँगा", en: "I will pick it up from the shop" },
  waDeliver: { hi: "घर पे मँगवाना है", en: "Please deliver to my home" },
  waNote: { hi: "नोट", en: "Note" },
  waPiece: { hi: "पीस", en: "piece" },
} satisfies Record<string, L>;
