 const colors_of_properties = {
   "Red": "#ea4949",
   "Pink": "#E8B5BB",
  "Blue": "#5656f5",
  "Green": "#43B741",
  "Yellow": "#F4ED62",
  "Orange": "#FFA500",
  "Light_Blue": "#ADD8E6",
  "Brown": "#CC996D",
  "#FFFFFF":"#FFFFFF",
};

const colors_of_players = [
  '#a259ff', '#163bf3', '#0acf83' , '#f24e1e'
]

const card_details = {
  "cities": { 
    "Go":{
      "Card_Color":"#FFFFFF",
      "City":"Go",
    },
    "Rasayani": {
      "Card_Color": "#CC996D",
      "City": "Rasayani",
      "Purchase_Price": "60",
      "Rent": "2",
      "Rent_with_1_House": "10",
      "Rent_with_2_Houses": "30",
      "Rent_with_3_Houses": "90",
      "Rent_with_4_Houses": "160",
      "Rent_with_Hotel": "250",
      "House_Price": "50",
      "Hotel_Price": "50",
    },
    "Community_Chest_1":{
      "Card_Color":"#FFFFFF",
      "City":"Community Chest",
    },
    "Karjat": {
      "Card_Color": "#CC996D",
      "City": "Karjat",
      "Purchase_Price": "60",
      "Rent": "4",
      "Rent_with_1_House": "20",
      "Rent_with_2_Houses": "60",
      "Rent_with_3_Houses": "180",
      "Rent_with_4_Houses": "320",
      "Rent_with_Hotel": "450",
      "House_Price": "50",
      "Hotel_Price": "50",
    },
    "IncomeTax":{
      "Card_Color":"#FFFFFF",
      "City":"Income Tax",
      "Purchase_Price": "200",
    },
    "TurbheStation": {
      "Card_Color": "#FFFFFF",
      "City": "Turbhe Station",
      "Purchase_Price": "200",
      "Rent": "25",
      "Rent_with_1_Railroads": "20",
      "Rent_with_2_Railroads": "50",
      "Rent_with_3_Railroads": "100",
      "Rent_with_4_Railroads": "200",
    },
    "Turbhe": {
      "Card_Color": "#ADD8E6",
      "City": "Turbhe",
      "Purchase_Price": "100",
      "Rent": "6",
      "Rent_with_1_House": "30",
      "Rent_with_2_Houses": "90",
      "Rent_with_3_Houses": "270",
      "Rent_with_4_Houses": "400",
      "Rent_with_Hotel": "550",
      "House_Price": "50",
      "Hotel_Price": "50",
    },
    "Chance_1":{
      "Card_Color":"#FFFFFF",
      "City":"Chance",
    },
    "KoparKairane": {
      "Card_Color": "#ADD8E6",
      "City": "Kopar Kairane",
      "Purchase_Price": "100",
      "Rent": "6",
      "Rent_with_1_House": "30",
      "Rent_with_2_Houses": "90",
      "Rent_with_3_Houses": "270",
      "Rent_with_4_Houses": "400",
      "Rent_with_Hotel": "550",
      "House_Price": "50",
      "Hotel_Price": "50",
    },
    "Ghansoli": {
      "Card_Color": "#ADD8E6",
      "City": "Ghansoli",
      "Purchase_Price": "120",
      "Rent": "8",
      "Rent_with_1_House": "40",
      "Rent_with_2_Houses": "100",
      "Rent_with_3_Houses": "300",
      "Rent_with_4_Houses": "450",
      "Rent_with_Hotel": "600",
      "House_Price": "50",
      "Hotel_Price": "50",
    },
    "Jail":{
      "Card_Color":"#FFFFFF",
      "City":"Jail",
    },
    "Airoli": {
      "Card_Color": "#E8B5BB",
      "City": "Airoli",
      "Purchase_Price": "140",
      "Rent": "10",
      "Rent_with_1_House": "50",
      "Rent_with_2_Houses": "150",
      "Rent_with_3_Houses": "450",
      "Rent_with_4_Houses": "625",
      "Rent_with_Hotel": "750",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "ElectricCompany": {
      "Card_Color": "#FFFFFF",
      "City": "Electric Company",
      "Purchase_Price": "150",
      "Rent": "Dice roll * 5 times the roll if one utility is owned, or * 10 times the roll if both utilities are owned",
    },
    "Uran": {
      "Card_Color": "#E8B5BB",
      "City": "Uran",
      "Purchase_Price": "140",
      "Rent": "10",
      "Rent_with_1_House": "50",
      "Rent_with_2_Houses": "150",
      "Rent_with_3_Houses": "450",
      "Rent_with_4_Houses": "625",
      "Rent_with_Hotel": "750",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "Ulwe": {
      "Card_Color": "#E8B5BB",
      "City": "Ulwe",
      "Purchase_Price": "160",
      "Rent": "12",
      "Rent_with_1_House": "60",
      "Rent_with_2_Houses": "180",
      "Rent_with_3_Houses": "500",
      "Rent_with_4_Houses": "700",
      "Rent_with_Hotel": "900",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "UlweStation": {
      "Card_Color": "#FFFFFF",
      "City": "Ulwe Station",
      "Purchase_Price": "200",
      "Rent": "25",
      "Rent_with_2_Railroads": "50",
      "Rent_with_3_Railroads": "100",
      "Rent_with_4_Railroads": "200",
    },
    "PushpakNagar": {
      "Card_Color": "#FFA500",
      "City": "Pushpak Nagar",
      "Purchase_Price": "180",
      "Rent": "14",
      "Rent_with_1_House": "70",
      "Rent_with_2_Houses": "200",
      "Rent_with_3_Houses": "550",
      "Rent_with_4_Houses": "750",
      "Rent_with_Hotel": "950",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "Community_Chest_2":{
      "Card_Color":"#FFFFFF",
      "City":"Community Chest",
    },
    "JNPT": {
      "Card_Color": "#FFA500",
      "City": "JNPT",
      "Purchase_Price": "180",
      "Rent": "14",
      "Rent_with_1_House": "70",
      "Rent_with_2_Houses": "200",
      "Rent_with_3_Houses": "550",
      "Rent_with_4_Houses": "750",
      "Rent_with_Hotel": "950",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "ElephantaCaves": {
      "Card_Color": "#FFA500",
      "City": "Elephanta Caves",
      "Purchase_Price": "200",
      "Rent": "16",
      "Rent_with_1_House": "80",
      "Rent_with_2_Houses": "220",
      "Rent_with_3_Houses": "600",
      "Rent_with_4_Houses": "800",
      "Rent_with_Hotel": "1000",
      "House_Price": "100",
      "Hotel_Price": "100",
    },
    "FreeParking":{
      "Card_Color":"#FFFFFF",
      "City":"Free Parking",
    },
    "TalojaMIDC": {
      "Card_Color": "#ea4949",
      "City": "Taloja MIDC",
      "Purchase_Price": "220",
      "Rent": "18",
      "Rent_with_1_House": "90",
      "Rent_with_2_Houses": "250",
      "Rent_with_3_Houses": "700",
      "Rent_with_4_Houses": "875",
      "Rent_with_Hotel": "1050",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "Chance_2":{
      "Card_Color":"#FFFFFF",
      "City":"Chance",
    },
    "Kalamboli": {
      "Card_Color": "#ea4949",
      "City": "Kalamboli",
      "Purchase_Price": "220",
      "Rent": "18",
      "Rent_with_1_House": "90",
      "Rent_with_2_Houses": "250",
      "Rent_with_3_Houses": "700",
      "Rent_with_4_Houses": "875",
      "Rent_with_Hotel": "1050",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "NewPanvel": {
      "Card_Color": "#ea4949",
      "City": "New Panvel",
      "Purchase_Price": "240",
      "Rent": "20",
      "Rent_with_1_House": "100",
      "Rent_with_2_Houses": "300",
      "Rent_with_3_Houses": "750",
      "Rent_with_4_Houses": "925",
      "Rent_with_Hotel": "1100",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "PanvelStation": {
      "Card_Color": "#FFFFFF",
      "City": "Panvel Station",
      "Purchase_Price": "200",
      "Rent": "25",
      "Rent_with_2_Railroads": "50",
      "Rent_with_3_Railroads": "100",
      "Rent_with_4_Railroads": "200",
    },
    "Mansarovar": {
      "Card_Color": "#F4ED62",
      "City": "Mansarovar",
      "Purchase_Price": "260",
      "Rent": "22",
      "Rent_with_1_House": "110",
      "Rent_with_2_Houses": "330",
      "Rent_with_3_Houses": "800",
      "Rent_with_4_Houses": "975",
      "Rent_with_Hotel": "1150",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "Juinagar": {
      "Card_Color": "#F4ED62",
      "City": "Juinagar",
      "Purchase_Price": "260",
      "Rent": "22",
      "Rent_with_1_House": "110",
      "Rent_with_2_Houses": "330",
      "Rent_with_3_Houses": "800",
      "Rent_with_4_Houses": "975",
      "Rent_with_Hotel": "1150",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "WaterWorks": {
      "Card_Color": "#FFFFFF",
      "City": "Water Works",
      "Purchase_Price": "150",
      "Rent": "Dice roll * 5 times the roll if one utility is owned, or * 10 times the roll if both utilities are owned",
    },
    "Sanpada": {
      "Card_Color": "#F4ED62",
      "City": "Sanpada",
      "Purchase_Price": "280",
      "Rent": "24",
      "Rent_with_1_House": "120",
      "Rent_with_2_Houses": "360",
      "Rent_with_3_Houses": "850",
      "Rent_with_4_Houses": "1025",
      "Rent_with_Hotel": "1200",
      "House_Price": "150",
      "Hotel_Price": "150",
    },
    "GoToJail":{
      "Card_Color":"#FFFFFF",
      "City":"Go To Jail",
    },
    "Seawoods": {
      "Card_Color": "#43B741",
      "City": "Seawoods",
      "Purchase_Price": "300",
      "Rent": "26",
      "Rent_with_1_House": "130",
      "Rent_with_2_Houses": "390",
      "Rent_with_3_Houses": "900",
      "Rent_with_4_Houses": "1100",
      "Rent_with_Hotel": "1275",
      "House_Price": "200",
      "Hotel_Price": "200",
    },
    "CBDBelapur": {
      "Card_Color": "#43B741",
      "City": "CBD Belapur",
      "Purchase_Price": "300",
      "Rent": "26",
      "Rent_with_1_House": "130",
      "Rent_with_2_Houses": "390",
      "Rent_with_3_Houses": "900",
      "Rent_with_4_Houses": "1100",
      "Rent_with_Hotel": "1275",
      "House_Price": "200",
      "Hotel_Price": "200",
    },
    "Community_Chest_3":{
      "Card_Color":"#FFFFFF",
      "City":"Community Chest",
    },
    "Nerul": {
      "Card_Color": "#43B741",
      "City": "Nerul",
      "Purchase_Price": "320",
      "Rent": "28",
      "Rent_with_1_House": "150",
      "Rent_with_2_Houses": "450",
      "Rent_with_3_Houses": "1000",
      "Rent_with_4_Houses": "1200",
      "Rent_with_Hotel": "1400",
      "House_Price": "200",
      "Hotel_Price": "200",
    },
    "KhargharStation": {
      "Card_Color": "#FFFFFF",
      "City": "Kharghar Station",
      "Purchase_Price": "200",
      "Rent": "25",
      "Rent_with_2_Railroads": "50",
      "Rent_with_3_Railroads": "100",
      "Rent_with_4_Railroads": "200",
    },
    "Chance_3":{
      "Card_Color":"#FFFFFF",
      "City":"Chance",
    },
    "Kharghar": {
      "Card_Color": "#5656f5",
      "City": "Kharghar",
      "Purchase_Price": "350",
      "Rent": "35",
      "Rent_with_1_House": "175",
      "Rent_with_2_Houses": "500",
      "Rent_with_3_Houses": "1100",
      "Rent_with_4_Houses": "1300",
      "Rent_with_Hotel": "1500",
      "House_Price": "200",
      "Hotel_Price": "200",
    },
    "LuxaryTax":{
      "Card_Color":"#FFFFFF",
      "City":"Luxary Tax",
      "Purchase_Price": "75"
    },
    "Vashi": {
      "Card_Color": "#5656f5",
      "City": "Vashi",
      "Purchase_Price": "400",
      "Rent": "50",
      "Rent_with_1_House": "200",
      "Rent_with_2_Houses": "600",
      "Rent_with_3_Houses": "1400",
      "Rent_with_4_Houses": "1700",
      "Rent_with_Hotel": "2000",
      "House_Price": "200",
      "Hotel_Price": "200",
    }
  }
};

const chances_cards = [
  {
    "title": "Advance to Go (Collect 200)",
    "description": "Collect 200 as you pass \"Go.\"",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:200, position:1};
    }
  },
  {
    "title": "Advance to Kalamboli",
    "description": "If you pass \"Go,\" collect 200.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:200, position:24};
    }
  },
  {
    "title": "Drunk and Drive",
    "description": "Pay fine of 100.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-100, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Bank pays you dividend",
    "description": "Collect 50 from Bank",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:50, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Go to Jail",
    "description": "Go directly to Jail. Do not pass \"Go,\" do not collect 200.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-50, position:11};
    }
  },
  {
    "title": "Pay poor tax of 15.",
    "description": "",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-15, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Advance to Vashi",
    "description": "Advance to Vashi.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:0, position:40};
    }
  },
  {
    "title": "Make repairs on all your property",
    "description": "For each house and hotel pay 50.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:0, position:currPlayerCurrentLocation};
    }
  },
];
const chest_cards =  [
  {
    "title": "Advance to Go (Collect 200)",
    "description": "Collect 200 as you pass \"Go.\"",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:200, position:1};
    }
  },
  {
    "title": "Bank error in your favor",
    "description": "Collect 200.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:200, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Doctor's fees",
    "description": "Pay 50.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-50, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Go to Jail",
    "description": "Go directly to Jail. Do not pass \"Go,\" do not collect 200.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-50, position:11};
    }
  },
  {
    "title": "Income tax refund",
    "description": "Collect 20.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:20, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Pay hospital fees of 100.",
    "description": "",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-100, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "Pay school fees of 150.",
    "description": "",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:-150, position:currPlayerCurrentLocation};
    }
  },
  {
    "title": "You are assessed for street repairs",
    "description": "Pay 70 per house and per hotel.",
    "thisWillHappen": ({currPlayerCurrentLocation})=>{
      return {money:0, position:currPlayerCurrentLocation};
    }
  }
];

export {colors_of_properties, colors_of_players, card_details,chances_cards,chest_cards};