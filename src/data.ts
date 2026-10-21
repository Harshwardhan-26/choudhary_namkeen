// ─────────────────────────────────────────────────────────────
//  CLIENT CONTENT FILE  (mirrors data.json)
//  Rules from data.json: never invent prices / ingredients,
//  never present unverified data as official. Unknown = null / omitted.
// ─────────────────────────────────────────────────────────────

import type { L } from "./i18n";

import shopImg from "../assets/main_shop.jpeg";
import mirchiImg from "../assets/mirchibade.jpeg";
import kachoriImg from "../assets/kachori.jpeg";
import alooKachoriImg from "../assets/aloo_kachori.jpeg";
import plainPapdiImg from "../assets/plain_aloo_papdi.jpeg";
import masalaMungfaliImg from "../assets/masala_mungfali.jpeg";
import sehgariChivdaImg from "../assets/segari_chiwada.jpeg";
import sehgariMirchibadaImg from "../assets/segari_mirchibada.jpg";
import imartiImg from "../assets/imarti.jpeg";
import achaarImg from "../assets/achaar.jpeg";
import wafersImg from "../assets/wafers.jpeg";
import drinksImg from "../assets/cold_drinks.jpeg";
import chefImg from "../assets/chef.jpeg";
import yogeshImg from "../assets/yogesh.jpg";
import badaImg from "../assets/bada_choudhary.jpeg";

const ADDRESS = "119-120, 2nd B Road, near Gandhi Maidan, Sardarpura, Jodhpur, Rajasthan 342003";
const MAPS_QUERY = encodeURIComponent(`Choudhary Namkeen, ${ADDRESS}`);

export const SHOP = {
  nameEn: "Choudhary Namkeen",
  nameHi: "चौधरी नमकीन",
  tagline: { hi: "मिर्ची बड़ा वाला", en: "Mirchi Bada Wala" } as L, // from the shop's own signboard
  city: "Jodhpur",
  addressLines: ["119-120, 2nd B Road, near Gandhi Maidan", "Sardarpura, Jodhpur, Rajasthan 342003"],
  phone: "+91 94149 12798",
  // TODO: confirm this number is active on WhatsApp (digits only, country code first)
  whatsapp: "919414912798",
  // data.json: "Approximately 08:30-20:30", status: confirm_with_business
  hours: { hi: "लगभग सुबह 8:30 से रात 8:30", en: "Approx. 8:30 am to 8:30 pm" } as L,
  fssai: "12214032000858",
  zomato: "https://www.zomato.com/jodhpur/choudhary-namkeen-1-sardarpura/order",
  swiggy: "https://www.swiggy.com/city/jodhpur/choudhary-namkin-2nd-b-road-new-jodhpur-rest423114",
  mapEmbed: `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`,
  mapOpen: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
  mapDirections: `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`,
  // Text written on the shop's own board (see main_shop photo)
  boardLine: {
    hi: "विश्व विख्यात मिर्ची बड़े एवं ईमरती के निर्माता",
    en: "World-famous makers of Mirchi Bada and Imarti",
  } as L,
};

export const HERO_IMG = shopImg;

export type CatId = "hot" | "packet" | "vrat" | "mithai";

export const CATEGORIES: {
  id: CatId;
  hi: string;
  en: string;
  blurb: L;
  photos: { src: string; cap: L; alt: string }[];
}[] = [
  {
    id: "hot",
    hi: "गरम-गरम",
    en: "Hot Snacks",
    blurb: { hi: "पीस के हिसाब से", en: "Priced per piece" },
    photos: [
      { src: mirchiImg, cap: { hi: "मिर्ची बड़ा", en: "Mirchi Vada" }, alt: "Mirchi vada" },
      { src: kachoriImg, cap: { hi: "कचौरी", en: "Kachori" }, alt: "Kachori frying in a kadhai" },
      { src: alooKachoriImg, cap: { hi: "आलू कचौरी", en: "Aloo Kachori" }, alt: "Aloo kachori" },
    ],
  },
  {
    id: "packet",
    hi: "पैकेट नमकीन",
    en: "Packaged Namkeen",
    blurb: { hi: "अलग-अलग पैक साइज़ में", en: "In different pack sizes" },
    photos: [
      { src: plainPapdiImg, cap: { hi: "प्लेन आलू पापड़ी", en: "Plain Aloo Papdi" }, alt: "Plain aloo papdi pack" },
      { src: masalaMungfaliImg, cap: { hi: "मसाला मूंगफली", en: "Masala Mungfali" }, alt: "Masala mungfali pack" },
    ],
  },
  {
    id: "vrat",
    hi: "व्रत स्पेशल",
    en: "Sehgari · Fasting",
    blurb: { hi: "व्रत-उपवास के लिए", en: "For fasting (vrat-upvaas)" },
    photos: [
      { src: sehgariChivdaImg, cap: { hi: "सेहगरी चिवड़ा", en: "Sehgari Chivda" }, alt: "Sehgari chivda pack" },
      {
        src: sehgariMirchibadaImg,
        cap: { hi: "सेहगरी मिर्ची बड़ा", en: "Sehgari Mirchi Bada" },
        alt: "Sehgari mirchi bada",
      },
    ],
  },
  {
    id: "mithai",
    hi: "मिठाई",
    en: "Traditional Sweets",
    blurb: { hi: "तोल के हिसाब से", en: "Priced by weight" },
    photos: [{ src: imartiImg, cap: { hi: "ईमरती", en: "Imarti" }, alt: "Imarti on a plate" }],
  },
];

export type Variant = {
  label: string; // "55 g", "1 kg", "piece"
  price: number | null;
  /** Set when Zomato and Swiggy list different prices: shown as a range. */
  priceMax?: number;
};

export type Product = {
  id: string;
  hi: string;
  en: string;
  cat: CatId;
  unit: "piece" | "pack";
  desc: L;
  variants: Variant[];
  /** true when data.json says price/weight still needs confirmation */
  needsConfirm?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "mirchi-vada",
    hi: "मिर्ची बड़ा",
    en: "Mirchi Vada",
    cat: "hot",
    unit: "piece",
    desc: { hi: "चौधरी का मशहूर जोधपुरी मिर्ची बड़ा।", en: "Choudhary's famous Jodhpuri mirchi vada." },
    variants: [{ label: "piece", price: 40 }],
  },
  {
    id: "mogar-kachori",
    hi: "मोगर कचौरी",
    en: "Mogar Kachori",
    cat: "hot",
    unit: "piece",
    desc: { hi: "पारंपरिक मोगर की कचौरी।", en: "Traditional mogar kachori." },
    variants: [{ label: "piece", price: 40 }],
  },
  {
    id: "aloo-kachori",
    hi: "आलू कचौरी",
    en: "Aloo Kachori",
    cat: "hot",
    unit: "piece",
    desc: {
      hi: "आलू कचौरी। ऑनलाइन लिस्टिंग के मुताबिक बिना प्याज़ के।",
      en: "Aloo kachori. Made without onion, as per the online listing.",
    },
    variants: [{ label: "piece", price: 40 }],
  },
  {
    id: "plain-aloo-papdi",
    hi: "प्लेन आलू पापड़ी",
    en: "Plain Aloo Papdi",
    cat: "packet",
    unit: "pack",
    desc: {
      hi: "लिस्टिंग में मूंगफली के तेल और सेंधा नमक का ज़िक्र है।",
      en: "The listing mentions groundnut oil and rock salt (sendha namak).",
    },
    variants: [
      { label: "55 g", price: 30 },
      { label: "250 g", price: 140 },
    ],
    needsConfirm: true,
  },
  {
    id: "masala-mungfali",
    hi: "मसाला मूंगफली",
    en: "Masala Mungfali",
    cat: "packet",
    unit: "pack",
    desc: { hi: "मसालेदार मूंगफली।", en: "Spiced peanuts." },
    variants: [
      { label: "55 g", price: 40 },
      { label: "250 g", price: 140 },
    ],
  },
  {
    id: "sehgari-chivda",
    hi: "सेहगरी चिवड़ा",
    en: "Sehgari Chivda",
    cat: "vrat",
    unit: "pack",
    desc: { hi: "व्रत स्पेशल चिवड़ा।", en: "Chivda for fasting (vrat)." },
    variants: [
      { label: "55 g", price: 40 },
      { label: "250 g", price: 140, priceMax: 160 },
      { label: "500 g", price: 280, priceMax: 320 },
    ],
  },
  {
    id: "sehgari-mirchibada",
    hi: "सेहगरी मिर्ची बड़ा",
    en: "Sehgari Mirchi Bada",
    cat: "vrat",
    unit: "pack",
    desc: { hi: "व्रत स्पेशल सेहगरी मिर्ची बड़ा।", en: "Sehgari mirchi bada for fasting (vrat)." },
    // TODO: pack size and price not confirmed yet. Fill in the variants below once known.
    variants: [{ label: "pack", price: 35 }],
    needsConfirm: true,
  },
  {
    id: "imarti",
    hi: "ईमरती",
    en: "Imarti",
    cat: "mithai",
    unit: "pack",
    desc: { hi: "फूल के आकार की पारंपरिक मिठाई।", en: "Traditional flower-shaped sweet." },
    variants: [
      { label: "250 g", price: 180 },
      { label: "500 g", price: 360 },
      { label: "1 kg", price: 720 },
    ],
  },
];

// TODO: confirm with the client that these are sold in the shop. No rates in data.json,
// so none are shown. Set to [] to hide the whole strip.
export const EXTRAS: { img: string; label: L; alt: string }[] = [
  { img: achaarImg, label: { hi: "अचार", en: "Pickles" }, alt: "Jars of pickle" },
  { img: wafersImg, label: { hi: "वेफर्स", en: "Wafers" }, alt: "Potato wafers" },
  { img: drinksImg, label: { hi: "कोल्ड ड्रिंक", en: "Cold drinks" }, alt: "Cold drinks" },
];

// TODO: confirm names, roles and permission to publish these photos.
export const FACES: { img: string; label: L; alt: string }[] = [
  { img: badaImg, label: { hi: "ज्योति साहब", en: "Jyoti Choudhary" }, alt: "Bada Choudhary at the shop" },
  { img: yogeshImg, label: { hi: "योगेश जी", en: "Yogesh Choudhary" }, alt: "Yogesh at the shop" },
  {
    img: chefImg,
    label: { hi: "उस्ताद जी", en: "Ustaad ji" },
    alt: "Cook beside the kadhai frying mirchi vada",
  },
];

// TODO: rewrite in the client's own words once we hear their story.
export const MOMENTS: { no: L; title: L; body: L }[] = [
  {
    no: { hi: "०१", en: "01" },
    title: { hi: "चाय के साथ", en: "With chai" },
    body: {
      hi: "मारवाड़ में चाय अकेली नहीं आती। सुबह की हो या शाम की, साथ में कुछ कुरकुरा तो बनता है।",
      en: "In Marwar, chai never comes alone. Morning or evening, something crunchy has to go with it.",
    },
  },
  {
    no: { hi: "०२", en: "02" },
    title: { hi: "मेहमान आएं तो", en: "When guests arrive" },
    body: {
      hi: "घर आए मेहमान को खाली हाथ नहीं भेजते। थाली में कुछ गरम, कुछ मीठा, कुछ नमकीन।",
      en: "A guest never leaves empty-handed. Something hot, something sweet, something salty on the plate.",
    },
  },
  {
    no: { hi: "०३", en: "03" },
    title: { hi: "सफ़र का साथी", en: "Travel companion" },
    body: {
      hi: "जोधपुर से जैसलमेर की सड़क हो या ट्रेन का लंबा सफ़र। एक पैकेट साथ, और रास्ता छोटा।",
      en: "Whether it's the road from Jodhpur to Jaisalmer or a long train ride, one packet along makes the journey shorter.",
    },
  },
];
