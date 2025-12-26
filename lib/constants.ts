// 1. 引入型別 (Import)
import { OperatingHours, ServiceItem, Symptom, Doctor, Clinic, AllianceHospital } from './types';

// ★★★ 關鍵修正：將引入的型別再次匯出，讓其他檔案也能從這裡讀取到 ★★★
export type { OperatingHours, ServiceItem, Symptom, Doctor, Clinic, AllianceHospital };

// 2. 診所基本資訊
export const CLINIC_INFO = {
  name: "高健診所",
  slogan: "高雄市民的健康就交給高健診所",
  address: "812高雄市小港區沿海一路88號",
  phone: "07 802 7828",
  bookingLink: "https://lin.ee/RIY5AtG",
  mapLink: "https://www.google.com/maps/search/?api=1&query=高健診所+高雄市小港區沿海一路88號"
};

// 3. 營業時間
export const OPERATING_HOURS: OperatingHours[] = [
  { day: "星期一", time: "08:00–22:00", isOpen: true },
  { day: "星期二", time: "08:00–16:00", isOpen: true },
  { day: "星期三", time: "08:00–22:00", isOpen: true },
  { day: "星期四", time: "08:00–16:00", isOpen: true },
  { day: "星期五", time: "08:00–22:00", isOpen: true },
  { day: "星期六", time: "08:00–16:00", isOpen: true },
  { day: "星期日", time: "休息", isOpen: false },
];

// 4. 門診時間說明
export const SCHEDULE_CONTEXT = `
詳細門診與洗腎時間:

[洗腎透析時段]
早班: 週一至週六 07:00 - 11:30
午班: 週一至週六 11:30 - 16:30
晚班: 週一、三、五 16:30 - 22:00

[門診時段]
早診: 週一至週六 09:30 - 12:00
午診: 
  - 週一、三、五: 14:00 - 17:00
  - 週二、週六: 12:00 - 16:00 (中午不休息)
  - 週四: 14:00 - 16:30
晚診: 週一、三、五 18:00 - 21:00
`;

// 5. 服務項目
export const SERVICES: ServiceItem[] = [
  {
    title: "血液透析中心",
    description: "醫學中心等級的洗腎環境，採用德國原裝透析機與雙重RO純水處理，提供小港、鳳山、林園地區腎友最安心的選擇。",
    icon: "Activity",
    items: [
      "高效率血液透析 (HD/HDF) - 改善疲倦與皮膚搔癢",
      "雙重逆滲透 (RO) 純水系統 - 嚴格控制細菌與內毒素",
      "配備每日消毒殺菌個人床單棉被 - 舒適透析空間",
      "溫馨接送車隊 (小港/鳳山/林園/大寮/前鎮)",
      "資深醫療護理團隊照護"
    ]
  },
  {
    title: "慢性病整合照護",
    description: "糖尿病與高血壓是腎臟病的主因。我們提供一站式的三高管理，不僅開藥，更教您如何透過飲食逆轉數值。",
    icon: "Stethoscope",
    items: [
      "糖尿病共照網認證 - 施打胰島素與血糖監測教學",
      "高血壓藥物精準調控 - 保護腎臟血管",
      "高血脂與膽固醇管理 - 預防心血管併發症",
      "痛風與高尿酸治療 - 減少腎結石風險",
      "一般內科 (感冒、腸胃炎、過敏、氣喘)"
    ]
  },
  {
    title: "腎臟健康檢查",
    description: "腎臟病早期沒有症狀。我們引進精密檢測儀器，只需微量尿液與血液，即可早期發現蛋白尿與腎功能異常。",
    icon: "ClipboardList",
    items: [
      "免費成人健康檢查 (30歲以上每3年1次)",
      "精準微量白蛋白尿檢測 (ACR) - 糖尿病腎病變篩檢",
      "腎絲球過濾率 (eGFR) 追蹤",
      "老人健檢與四癌篩檢 (大腸癌糞便潛血)",
      "腎臟超音波與心電圖檢查"
    ]
  },
  {
    title: "預防醫學與營養",
    description: "除了藥物治療，我們更重視「預防」。透過營養點滴與生活型態醫學，提升您的免疫力與修復力。",
    icon: "ShieldCheck",
    items: [
      "低蛋白飲食衛教 - 延緩洗腎時程",
      "ILIB 靜脈雷射 - 促進血液循環",
      "自費減重門診 (猛健樂) - 減輕腎臟負擔",
      "個人化營養點滴與維生素補充",
      "B、C 型肝炎追蹤與篩檢"
    ]
  }
];

// 6. 腎臟病症狀檢測
export const KIDNEY_SYMPTOMS: Symptom[] = [
  { id: 'foam', question: '小便時是否有不易消散的泡沫 (蛋白尿)?', riskWeight: 2 },
  { id: 'edema', question: '最近是否感覺下肢或臉部容易水腫?', riskWeight: 2 },
  { id: 'fatigue', question: '是否經常感到不明原因的疲倦或貧血?', riskWeight: 1 },
  { id: 'bp', question: '是否有高血壓且難以控制?', riskWeight: 2 },
  { id: 'urine_color', question: '尿液顏色是否異常 (如深茶色、血色)?', riskWeight: 3 },
  { id: 'pain', question: '是否有腰部兩側痠痛的感覺?', riskWeight: 1 },
  { id: 'family', question: '直系親屬中是否有腎臟病史?', riskWeight: 2 },
  { id: 'diabetes', question: '本身是否有糖尿病病史?', riskWeight: 3 },
];

// 定義文章介面 (這是你在本檔案內定義的，所以 export 沒問題)
export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  imageUrl?: string;
}

// 8. 醫療團隊
export const MEDICAL_TEAM: Doctor[] = [
  {
    name: "洪錦傳",
    title: "院長 / 主治醫師",
    specialties: ["腎臟專科", "內科", "糖尿病共同照護"],
    experience: [
      "高雄榮總內科部 腎臟科主治醫師",
      "屏東東港安泰醫院 腎臟科主治醫師"
    ],
    certifications: [
      "台灣內科醫學會 專科醫師",
      "台灣腎臟醫學會 專科醫師",
      "中華民國醫用超音波學會 會員"
    ]
  },
  {
    name: "吳美美",
    title: "主治醫師",
    specialties: ["腎臟專科", "內科", "三高慢性腎病防治"],
    experience: [
      "台中榮民總院 腎臟內科醫師",
      "高雄聖功醫院 腎臟内科主治醫師",
      "高雄三泰醫院 腎臟內科醫師"
    ],
    certifications: [
      "台灣內科醫學會 專科醫師",
      "台灣腎臟醫學會 專科醫師",
      "糖尿病共同照護網 認證醫師"
    ]
  },
  {
    name: "護理照護團隊",
    title: "20 年資歷",
    specialties: ["急重症照護", "雙證照護理", "門診照護"],
    experience: [
      "擁有 20 年以上 臨床血液透析照護經驗",
      "醫學中心等級照護標準，專注併發症預防",
      "具備血液透析與腹膜透析雙專業護理證照",
      "提供重症諮詢與在地門診服務"
    ],
    certifications: [
      "國家級護理師執照",
      "血液透析與腹膜透析專科護理認證",
      "ACLS 高級心臟救命術認證"
    ]
  }
];

// 9. 高雄診所名冊
export const KAOHSIUNG_CLINICS_LIST: Clinic[] = [
  { name: "高健診所", address: "高雄市小港區沿海一路88號", phone: "07-8027828" },
  { name: "惠仁醫院", address: "高雄市新興區中山一路67-2號", phone: "07-2010196" },
  { name: "李一鳴內科診所", address: "高雄市新興區復興一路44號", phone: "07-2266893" },
  { name: "高欣診所", address: "高雄市新興區復興一路44號2樓", phone: "07-2266893" },
  { name: "好生診所", address: "高雄市前金區七賢二路183號", phone: "07-2867000" },
  { name: "上順診所", address: "高雄市前金區中一路225號3樓", phone: "07-2725227" },
  { name: "高雄市立聯合醫院大同院區", address: "高雄市前金區中華三路68號", phone: "07-2618131#2321" },
  { name: "五福診所", address: "高雄市前金區中華四路318號1樓", phone: "07-2213933" },
  { name: "阮綜合醫療社團法人阮綜合醫院", address: "高雄市苓雅區成功一路62號", phone: "07-3342765" },
  { name: "國軍高雄總醫院", address: "高雄市苓雅區中正一路2號", phone: "07-7496592" },
  { name: "財團法人天主教聖功醫院", address: "高雄市苓雅區建國一路352號", phone: "07-2249423" },
  { name: "高雄市立民生醫院", address: "高雄市苓雅區凱旋二路134號", phone: "07-7511131" },
  { name: "財團法人高雄基督教信義醫院", address: "高雄市苓雅區華新街86號", phone: "07-3321111#238" },
  { name: "聖安診所", address: "高雄市苓雅區大順三路186號", phone: "07-7277057" },
  { name: "愛欣診所", address: "高雄市苓雅區正義路136號5樓", phone: "07-7497077" },
  { name: "家綾診所", address: "高雄市苓雅區海邊路66號", phone: "07-2412492" },
  { name: "吳三江內科診所", address: "高雄市苓雅區憲政路240號", phone: "07-2222088" },
  { name: "昱泰診所", address: "高雄市苓雅區興中一路227號", phone: "07-5378768" },
  { name: "佳明診所", address: "高雄市苓雅區中正一路136號", phone: "07-7263727" },
  { name: "保順診所", address: "高雄市苓雅區成功一路145號", phone: "07-2695856" },
  { name: "新鴻遠診所", address: "高雄市苓雅區建國一路113-2號1樓", phone: "07-7229860" },
  { name: "高雄市立聯合醫院美術館院區", address: "高雄市鼓山區中華一路976號", phone: "07-5552565" },
  { name: "腎美診所", address: "高雄市鼓山區中華一路336號", phone: "07-5544900" },
  { name: "高雄市立旗津醫院", address: "高雄市旗津區廟前路1-1號", phone: "07-5715101" },
  { name: "博佑診所", address: "高雄市前鎮區一心一路243號", phone: "07-3334591" },
  { name: "吉泰內科診所", address: "高雄市前鎮區保泰路419號2F", phone: "07-7616000#200" },
  { name: "安順診所", address: "高雄市前鎮區后安路263號1樓", phone: "07-8128320" },
  { name: "佑鎮診所", address: "高雄市前鎮區樹人路128號", phone: "07-8121606" },
  { name: "高雄醫學大學附設醫院", address: "高雄市三民區自由一路100號", phone: "07-3121101" },
  { name: "南山醫院", address: "高雄市三民區建國三路151號", phone: "07-2882105" },
  { name: "祐生醫院", address: "高雄市三民區建國三路60號", phone: "07-2866695" },
  { name: "文雄醫院", address: "高雄市三民區察哈爾二街132號", phone: "07-3165275" },
  { name: "長清診所", address: "高雄市三民區九如一路135號", phone: "07-3851441" },
  { name: "德恩診所", address: "高雄市三民區民族一路390號", phone: "07-3958282" },
  { name: "茂田診所", address: "高雄市三民區民誠一路236號", phone: "07-3103127" },
  { name: "建安診所", address: "高雄市三民區大順二路649號", phone: "07-3860999" },
  { name: "高雄新高鳳醫院", address: "高雄市三民區莊敬路288號", phone: "07-3872624" },
  { name: "高悅診所", address: "高雄市三民區九如一路162號1樓", phone: "07-3820123" },
  { name: "義大大昌醫院", address: "高雄市三民區大昌一路305號6樓", phone: "07-5599123#7419" },
  { name: "僾彼高榮育仁診所", address: "高雄市三民區九如一路896號1樓", phone: "07-3891080" },
  { name: "右昌聯合醫院", address: "高雄市楠梓區軍校路930號", phone: "07-3630015" },
  { name: "健仁醫院", address: "高雄市楠梓區楠陽路136號", phone: "07-3529393" },
  { name: "佑強診所", address: "高雄市楠梓區德民路908號", phone: "07-3683687" },
  { name: "楠華診所", address: "高雄市楠梓區興楠路295號", phone: "07-5715101" },
  { name: "興義診所", address: "高雄市楠梓區興楠路342號", phone: "07-3539993" },
  { name: "安馨楠梓內科診所", address: "高雄市楠梓區楠都東街209號", phone: "07-3529393" },
  { name: "佳澤診所", address: "高雄市楠梓區大學東路207號1樓", phone: "07-3601262" },
  { name: "高雄市立小港醫院", address: "高雄市小港區山明路482號", phone: "07-8036783" },
  { name: "佳生診所", address: "高雄市小港區康莊路136號", phone: "07-8053465" },
  { name: "明港診所", address: "高雄市小港區華山路137號", phone: "07-8055116" },
  { name: "高雄榮民總醫院", address: "高雄市左營區大中一路386號", phone: "07-3422121#2051" },
  { name: "國軍左營醫院", address: "高雄市左營區軍校路553號", phone: "07-5810179" },
  { name: "龍華診所", address: "高雄市左營區自由二路67號", phone: "07-5563868" },
  { name: "田源診所", address: "高雄市左營區政德路230號", phone: "07-3432641" },
  { name: "東陽診所", address: "高雄市左營區華夏路626號", phone: "07-3457778" },
  { name: "宗禾診所", address: "高雄市左營區博愛4路80號1樓", phone: "07-3500980" },
  { name: "聖博診所", address: "高雄市左營區博愛三路201號3樓", phone: "07-3496666" },
  { name: "劉內兒科診所", address: "高雄市仁武區灣內村仁心路6號", phone: "07-3710778" },
  { name: "尚清診所", address: "高雄市仁武區中華路245號", phone: "07-3758955" },
  { name: "國軍岡山醫院", address: "高雄市岡山區大義二路1號", phone: "07-6250919" },
  { name: "高雄市立岡山醫院", address: "高雄市岡山區壽天路12號", phone: "07-6243376" },
  { name: "蔣榮福診所", address: "高雄市岡山區中山南路452號", phone: "07-6228719" },
  { name: "仁康診所", address: "高雄市岡山區介壽路74號", phone: "07-6262988" },
  { name: "岡山內科診所", address: "高雄市岡山區岡山路146.148號", phone: "07-6213371" },
  { name: "安泰診所", address: "高雄市岡山區岡山路434號4 F 5B", phone: "07-6233500" },
  { name: "惠川醫院", address: "高雄市岡山區岡山路92號", phone: "07-6229292" },
  { name: "永順診所", address: "高雄市岡山區岡山路72號1樓", phone: "07-6243376" },
  { name: "路竹診所", address: "高雄市路竹區國昌路136號", phone: "07-6975903" },
  { name: "義大醫療財團法人義大醫院", address: "高雄市燕巢區角宿村義大路1號", phone: "07-6150011" },
  { name: "義大癌治療醫院", address: "高雄市燕巢區角宿里義大路21號", phone: "07-615-0011#6550" },
  { name: "湖康診所", address: "高雄市湖內區中正路一段397號", phone: "07-6997126" },
  { name: "高雄市立鳳山醫院", address: "高雄市鳳山區經武路42號", phone: "07-7418151" },
  { name: "嘉美診所", address: "高雄市鳳山區中山路79號", phone: "07-7413668" },
  { name: "長新診所", address: "高雄市鳳山區建國路二段59-2號", phone: "07-7192233" },
  { name: "新華田內科診所", address: "高雄市鳳山區曹公路16-4號", phone: "07-7999128" },
  { name: "佳醫診所", address: "高雄市鳳山區五甲二路357號", phone: "07-7669191" },
  { name: "惠德醫院", address: "高雄市鳳山區福祥街81號", phone: "07-8126000#1202" },
  { name: "高晟診所", address: "高雄市鳳山區鳳東路368號", phone: "07-7823399" },
  { name: "揚銘診所", address: "高雄市鳳山區自由路111號1樓", phone: "07-7905605" },
  { name: "鴻仁健康診所", address: "高雄市鳳山區青年路2段148號1樓", phone: "07-7408333" },
  { name: "健聖診所", address: "高雄市大寮區中正路2號", phone: "07-7861303" },
  { name: "幸安診所", address: "高雄市大寮區鳳林三路526號", phone: "07-7812855" },
  { name: "建佑醫院", address: "高雄市林園區東林西路360號", phone: "07-6418677" },
  { name: "高雄長庚醫院", address: "高雄市鳥松區大埤路123號", phone: "07-7317123" },
  { name: "廣聖醫院", address: "高雄市旗山區中華路618號", phone: "07-6623125" },
  { name: "芳民診所", address: "高雄市旗山區大德里德昌路16號", phone: "07-6622355" },
  { name: "鴻源診所", address: "高雄市旗山區延平一路200號", phone: "07-6628788" },
  { name: "溪洲醫院", address: "高雄市旗山區延平一路412號7F", phone: "07-6622096" },
  { name: "衛生福利部旗山醫院", address: "高雄市旗山區大德里中學路60號", phone: "07-6613811#1535" },
  { name: "永萣診所", address: "高雄市茄萣區白砂路251號", phone: "07-6904979" },
  { name: "壬禾診所", address: "高雄市鼓山區美術南三路82號", phone: "07-5557300" },
  { name: "裕禾診所", address: "高雄市前鎮區南天街125號", phone: "07-3313811" },
  { name: "為好診所", address: "高雄市鼓山區九如四路957號", phone: "07-5215489#112" }
];

// 10. 合作醫院
export const ALLIANCE_HOSPITALS: AllianceHospital[] = [
  {
    name: "高雄市政府衛生局",
    address: "高雄市苓雅區凱旋二路132-1號",
    phone: "07-7134000",
    url: "https://health.kcg.gov.tw/"
  },
  {
    name: "高雄小港衛生局",
    address: "高雄市小港區小港路158號",
    phone: "07-8216939",
    url: "https://sig.kcg.gov.tw/"
  },
  {
    name: "高雄市立小港醫院",
    address: "高雄市小港區山明路482號",
    phone: "07-8036783",
    url: "https://www.kmhk.org.tw/"
  },
  {
    name: "高雄榮民總醫院",
    address: "高雄市左營區大中一路386號",
    phone: "07-3422121",
    url: "https://www.vghks.gov.tw/"
  },
  {
    name: "高雄醫學大學附設醫院",
    address: "高雄市三民區自由一路100號",
    phone: "07-3121101",
    url: "https://www.kmuh.org.tw/"
  },
  {
    name: "高雄長庚紀念醫院",
    address: "高雄市鳥松區大埤路123號",
    phone: "07-7317123",
    url: "https://www.cgmh.org.tw/tw/Systems/AreaInfo/10"
  },
  {
    name: "義大醫療財團法人",
    address: "高雄市燕巢區角宿村義大路1號",
    phone: "07-6150011",
    url: "https://www.edah.org.tw/"
  },
  {
    name: "阮綜合醫院",
    address: "高雄市苓雅區成功一路62號",
    phone: "07-3342765",
    url: "http://www.yuanhosp.com.tw/"
  },
  {
    name: "健仁醫院",
    address: "高雄市楠梓區楠陽路136號",
    phone: "07-3529393",
    url: "https://www.jiannren.org.tw/"
  },
  {
    name: "國軍高雄總醫院",
    address: "高雄市苓雅區中正一路2號",
    phone: "07-7496592",
    url: "https://802.mnd.gov.tw/"
  }
];