/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SlingSpec {
  id: string;
  name: string;
  width: string;
  swl: number; // kg
  breakingLoad: number; // ton
}

export interface ToolSpec {
  id: string;
  name: string;
  spec: string;
  swl: number; // kg
}

export const WEB_BELTS: SlingSpec[] = [
  { id: 'wb-25', name: '웹 벨트 25mm', width: '25mm', swl: 1000, breakingLoad: 6 },
  { id: 'wb-50', name: '웹 벨트 50mm', width: '50mm', swl: 2000, breakingLoad: 12 },
  { id: 'wb-75', name: '웹 벨트 75mm', width: '75mm', swl: 3000, breakingLoad: 18 },
  { id: 'wb-100', name: '웹 벨트 100mm', width: '100mm', swl: 4000, breakingLoad: 24 },
  { id: 'wb-125', name: '웹 벨트 125mm', width: '125mm', swl: 5000, breakingLoad: 30 },
  { id: 'wb-150', name: '웹 벨트 150mm', width: '150mm', swl: 6000, breakingLoad: 36 },
  { id: 'wb-200', name: '웹 벨트 200mm', width: '200mm', swl: 8000, breakingLoad: 48 },
  { id: 'wb-250', name: '웹 벨트 250mm', width: '250mm', swl: 10000, breakingLoad: 60 },
  { id: 'wb-300', name: '웹 벨트 300mm', width: '300mm', swl: 10000, breakingLoad: 72 },
];

export const ROUND_SLINGS: SlingSpec[] = [
  { id: 'rs-32', name: '라운드 슬링 32mm', width: '32mm', swl: 1000, breakingLoad: 6 },
  { id: 'rs-37', name: '라운드 슬링 37mm', width: '37mm', swl: 2000, breakingLoad: 12 },
  { id: 'rs-43', name: '라운드 슬링 43mm', width: '43mm', swl: 3000, breakingLoad: 18 },
  { id: 'rs-46', name: '라운드 슬링 46mm', width: '46mm', swl: 4000, breakingLoad: 24 },
  { id: 'rs-50', name: '라운드 슬링 50mm', width: '50mm', swl: 5000, breakingLoad: 30 },
  { id: 'rs-56', name: '라운드 슬링 56mm', width: '56mm', swl: 6000, breakingLoad: 36 },
  { id: 'rs-60', name: '라운드 슬링 60mm', width: '60mm', swl: 8000, breakingLoad: 48 },
  { id: 'rs-65', name: '라운드 슬링 65mm', width: '65mm', swl: 10000, breakingLoad: 60 },
  { id: 'rs-70', name: '라운드 슬링 70mm', width: '70mm', swl: 15000, breakingLoad: 90 },
  { id: 'rs-75', name: '라운드 슬링 75mm', width: '75mm', swl: 20000, breakingLoad: 120 },
  { id: 'rs-81', name: '라운드 슬링 81mm', width: '81mm', swl: 25000, breakingLoad: 150 },
  { id: 'rs-87', name: '라운드 슬링 87mm', width: '87mm', swl: 30000, breakingLoad: 180 },
  { id: 'rs-92', name: '라운드 슬링 92mm', width: '92mm', swl: 35000, breakingLoad: 210 },
  { id: 'rs-98', name: '라운드 슬링 98mm', width: '98mm', swl: 40000, breakingLoad: 240 },
  { id: 'rs-104', name: '라운드 슬링 104mm', width: '104mm', swl: 45000, breakingLoad: 270 },
  { id: 'rs-110', name: '라운드 슬링 110mm', width: '110mm', swl: 50000, breakingLoad: 300 },
  { id: 'rs-115', name: '라운드 슬링 115mm', width: '115mm', swl: 55000, breakingLoad: 330 },
  { id: 'rs-120', name: '라운드 슬링 120mm', width: '120mm', swl: 60000, breakingLoad: 360 },
  { id: 'rs-130', name: '라운드 슬링 130mm', width: '130mm', swl: 70000, breakingLoad: 420 },
  { id: 'rs-135', name: '라운드 슬링 135mm', width: '135mm', swl: 75000, breakingLoad: 450 },
  { id: 'rs-140', name: '라운드 슬링 140mm', width: '140mm', swl: 80000, breakingLoad: 480 },
  { id: 'rs-145', name: '라운드 슬링 145mm', width: '145mm', swl: 85000, breakingLoad: 510 },
  { id: 'rs-150', name: '라운드 슬링 150mm', width: '150mm', swl: 90000, breakingLoad: 540 },
  { id: 'rs-155', name: '라운드 슬링 155mm', width: '155mm', swl: 95000, breakingLoad: 570 },
  { id: 'rs-160', name: '라운드 슬링 160mm', width: '160mm', swl: 100000, breakingLoad: 600 },
];

export const SHACKLES: ToolSpec[] = [
  { id: 'sh-0.1875', name: '샤클', spec: '0.1875', swl: 330 },
  { id: 'sh-0.25', name: '샤클', spec: '0.25', swl: 500 },
  { id: 'sh-5/16', name: '샤클', spec: '5/16', swl: 750 },
  { id: 'sh-3/8', name: '샤클', spec: '3/8', swl: 1000 },
  { id: 'sh-7/16', name: '샤클', spec: '7/16', swl: 1500 },
  { id: 'sh-1/2', name: '샤클', spec: '1/2', swl: 2000 },
  { id: 'sh-5/8', name: '샤클', spec: '5/8', swl: 3250 },
  { id: 'sh-3/4', name: '샤클', spec: '3/4', swl: 4750 },
  { id: 'sh-7/8', name: '샤클', spec: '7/8', swl: 6050 },
  { id: 'sh-1', name: '샤클', spec: '1', swl: 8500 },
  { id: 'sh-1-1/8', name: '샤클', spec: '1-1/8', swl: 9500 },
  { id: 'sh-1-1/4', name: '샤클', spec: '1-1/4', swl: 12000 },
  { id: 'sh-1-3/8', name: '샤클', spec: '1-3/8', swl: 13500 },
  { id: 'sh-1-1/2', name: '샤클', spec: '1-1/2', swl: 17000 },
  { id: 'sh-1-3/4', name: '샤클', spec: '1-3/4', swl: 25000 },
  { id: 'sh-2', name: '샤클', spec: '2', swl: 35000 },
  { id: 'sh-2-1/2', name: '샤클', spec: '2-1/2', swl: 55000 },
  { id: 'sh-3', name: '샤클', spec: '3', swl: 85000 },
  { id: 'sh-3-1/2', name: '샤클', spec: '3-1/2', swl: 120000 },
  { id: 'sh-4', name: '샤클', spec: '4', swl: 150000 },
];

export const EYEBOLTS: ToolSpec[] = [
  { id: 'eb-m8', name: '아이볼트', spec: 'M8mm', swl: 80 },
  { id: 'eb-m10', name: '아이볼트', spec: 'M10mm', swl: 150 },
  { id: 'eb-m12', name: '아이볼트', spec: 'M12mm', swl: 220 },
  { id: 'eb-m16', name: '아이볼트', spec: 'M16mm', swl: 450 },
  { id: 'eb-m20', name: '아이볼트', spec: 'M20mm', swl: 630 },
  { id: 'eb-m22', name: '아이볼트', spec: 'M22mm', swl: 790 },
  { id: 'eb-m24', name: '아이볼트', spec: 'M24mm', swl: 950 },
  { id: 'eb-m30', name: '아이볼트', spec: 'M30mm', swl: 1500 },
  { id: 'eb-m36', name: '아이볼트', spec: 'M36mm', swl: 2300 },
  { id: 'eb-m42', name: '아이볼트', spec: 'M42mm', swl: 3400 },
  { id: 'eb-m48', name: '아이볼트', spec: 'M48mm', swl: 4500 },
  { id: 'eb-m64', name: '아이볼트', spec: 'M64mm', swl: 9000 },
  { id: 'eb-m80', name: '아이볼트', spec: 'M80mm', swl: 15000 },
  { id: 'eb-m90', name: '아이볼트', spec: 'M90mm', swl: 18000 },
  { id: 'eb-m100', name: '아이볼트', spec: 'M100mm', swl: 20000 },
];

export const WIRE_ROPES_6X37_FC: SlingSpec[] = [
  { id: 'wr-fc-8', name: '6 X 37 + FC 8mm', width: '8mm', swl: 615, breakingLoad: 3.69 },
  { id: 'wr-fc-9', name: '6 X 37 + FC 9mm', width: '9mm', swl: 778, breakingLoad: 4.67 },
  { id: 'wr-fc-9.5', name: '6 X 37 + FC 9.5mm', width: '9.5mm', swl: 871, breakingLoad: 5.23 },
  { id: 'wr-fc-10', name: '6 X 37 + FC 10mm', width: '10mm', swl: 960, breakingLoad: 5.76 },
  { id: 'wr-fc-11.2', name: '6 X 37 + FC 11.2mm', width: '11.2mm', swl: 1205, breakingLoad: 7.23 },
  { id: 'wr-fc-12', name: '6 X 37 + FC 12mm', width: '12mm', swl: 1381, breakingLoad: 8.29 },
  { id: 'wr-fc-12.5', name: '6 X 37 + FC 12.5mm', width: '12.5mm', swl: 1500, breakingLoad: 9 },
  { id: 'wr-fc-14', name: '6 X 37 + FC 14mm', width: '14mm', swl: 1883, breakingLoad: 11.3 },
  { id: 'wr-fc-16', name: '6 X 37 + FC 16mm', width: '16mm', swl: 2450, breakingLoad: 14.7 },
  { id: 'wr-fc-18', name: '6 X 37 + FC 18mm', width: '18mm', swl: 3116, breakingLoad: 18.7 },
  { id: 'wr-fc-19.1', name: '6 X 37 + FC 19.1mm', width: '19.1mm', swl: 3416, breakingLoad: 20.5 },
  { id: 'wr-fc-20', name: '6 X 37 + FC 20mm', width: '20mm', swl: 3833, breakingLoad: 23 },
  { id: 'wr-fc-22.4', name: '6 X 37 + FC 22.4mm', width: '22.4mm', swl: 4816, breakingLoad: 28.9 },
  { id: 'wr-fc-24', name: '6 X 37 + FC 24mm', width: '24mm', swl: 5533, breakingLoad: 33.2 },
  { id: 'wr-fc-25', name: '6 X 37 + FC 25mm', width: '25mm', swl: 6000, breakingLoad: 36 },
  { id: 'wr-fc-26', name: '6 X 37 + FC 26mm', width: '26mm', swl: 6483, breakingLoad: 38.9 },
  { id: 'wr-fc-28', name: '6 X 37 + FC 28mm', width: '28mm', swl: 7533, breakingLoad: 45.2 },
  { id: 'wr-fc-30', name: '6 X 37 + FC 30mm', width: '30mm', swl: 8633, breakingLoad: 51.8 },
  { id: 'wr-fc-31.5', name: '6 X 37 + FC 31.5mm', width: '31.5mm', swl: 9533, breakingLoad: 57.2 },
  { id: 'wr-fc-33.5', name: '6 X 37 + FC 33.5mm', width: '33.5mm', swl: 10766, breakingLoad: 64.6 },
  { id: 'wr-fc-35.5', name: '6 X 37 + FC 35.5mm', width: '35.5mm', swl: 12100, breakingLoad: 72.6 },
  { id: 'wr-fc-37.5', name: '6 X 37 + FC 37.5mm', width: '37.5mm', swl: 13500, breakingLoad: 81 },
  { id: 'wr-fc-40', name: '6 X 37 + FC 40mm', width: '40mm', swl: 15366, breakingLoad: 92.2 },
  { id: 'wr-fc-42.5', name: '6 X 37 + FC 42.5mm', width: '42.5mm', swl: 17333, breakingLoad: 104 },
  { id: 'wr-fc-45', name: '6 X 37 + FC 45mm', width: '45mm', swl: 19500, breakingLoad: 117 },
  { id: 'wr-fc-47.5', name: '6 X 37 + FC 47.5mm', width: '47.5mm', swl: 21666, breakingLoad: 130 },
  { id: 'wr-fc-50', name: '6 X 37 + FC 50mm', width: '50mm', swl: 24000, breakingLoad: 144 },
  { id: 'wr-fc-53', name: '6 X 37 + FC 53mm', width: '53mm', swl: 27000, breakingLoad: 162 },
  { id: 'wr-fc-56', name: '6 X 37 + FC 56mm', width: '56mm', swl: 30166, breakingLoad: 181 },
  { id: 'wr-fc-60', name: '6 X 37 + FC 60mm', width: '60mm', swl: 34500, breakingLoad: 207 },
  { id: 'wr-fc-63', name: '6 X 37 + FC 63mm', width: '63mm', swl: 38166, breakingLoad: 229 },
  { id: 'wr-fc-67', name: '6 X 37 + FC 67mm', width: '67mm', swl: 43166, breakingLoad: 259 },
  { id: 'wr-fc-71', name: '6 X 37 + FC 71mm', width: '71mm', swl: 48500, breakingLoad: 291 },
  { id: 'wr-fc-75', name: '6 X 37 + FC 75mm', width: '75mm', swl: 54000, breakingLoad: 324 },
];

export const WIRE_ROPES_6X4_IWRC: SlingSpec[] = [
  { id: 'wr-iwrc-8', name: '6 X 4 + IWRC 8mm', width: '8mm', swl: 693, breakingLoad: 4.16 },
  { id: 'wr-iwrc-9', name: '6 X 4 + IWRC 9mm', width: '9mm', swl: 876, breakingLoad: 5.26 },
  { id: 'wr-iwrc-9.5', name: '6 X 4 + IWRC 9.5mm', width: '9.5mm', swl: 978, breakingLoad: 5.87 },
  { id: 'wr-iwrc-10', name: '6 X 4 + IWRC 10mm', width: '10mm', swl: 1083, breakingLoad: 6.5 },
  { id: 'wr-iwrc-11.2', name: '6 X 4 + IWRC 11.2mm', width: '11.2mm', swl: 1358, breakingLoad: 8.15 },
  { id: 'wr-iwrc-12', name: '6 X 4 + IWRC 12mm', width: '12mm', swl: 1561, breakingLoad: 9.37 },
  { id: 'wr-iwrc-12.5', name: '6 X 4 + IWRC 12.5mm', width: '12.5mm', swl: 1683, breakingLoad: 10.1 },
  { id: 'wr-iwrc-14', name: '6 X 4 + IWRC 14mm', width: '14mm', swl: 2133, breakingLoad: 12.8 },
  { id: 'wr-iwrc-16', name: '6 X 4 + IWRC 16mm', width: '16mm', swl: 2766, breakingLoad: 16.6 },
  { id: 'wr-iwrc-18', name: '6 X 4 + IWRC 18mm', width: '18mm', swl: 3500, breakingLoad: 21 },
  { id: 'wr-iwrc-19.1', name: '6 X 4 + IWRC 19.1mm', width: '19.1mm', swl: 3950, breakingLoad: 23.7 },
  { id: 'wr-iwrc-20', name: '6 X 4 + IWRC 20mm', width: '20mm', swl: 4333, breakingLoad: 26 },
  { id: 'wr-iwrc-22.4', name: '6 X 4 + IWRC 22.4mm', width: '22.4mm', swl: 5433, breakingLoad: 32.6 },
  { id: 'wr-iwrc-24', name: '6 X 4 + IWRC 24mm', width: '24mm', swl: 5983, breakingLoad: 35.9 },
  { id: 'wr-iwrc-25', name: '6 X 4 + IWRC 25mm', width: '25mm', swl: 6750, breakingLoad: 40.5 },
  { id: 'wr-iwrc-26', name: '6 X 4 + IWRC 26mm', width: '26mm', swl: 7333, breakingLoad: 44 },
  { id: 'wr-iwrc-28', name: '6 X 4 + IWRC 28mm', width: '28mm', swl: 8500, breakingLoad: 51 },
  { id: 'wr-iwrc-30', name: '6 X 4 + IWRC 30mm', width: '30mm', swl: 9750, breakingLoad: 58.5 },
  { id: 'wr-iwrc-31.5', name: '6 X 4 + IWRC 31.5mm', width: '31.5mm', swl: 10750, breakingLoad: 64.5 },
  { id: 'wr-iwrc-33.5', name: '6 X 4 + IWRC 33.5mm', width: '33.5mm', swl: 12166, breakingLoad: 73 },
  { id: 'wr-iwrc-35.5', name: '6 X 4 + IWRC 35.5mm', width: '35.5mm', swl: 13666, breakingLoad: 82 },
  { id: 'wr-iwrc-37.5', name: '6 X 4 + IWRC 37.5mm', width: '37.5mm', swl: 15250, breakingLoad: 91.5 },
  { id: 'wr-iwrc-40', name: '6 X 4 + IWRC 40mm', width: '40mm', swl: 17333, breakingLoad: 104 },
  { id: 'wr-iwrc-42.5', name: '6 X 4 + IWRC 42.5mm', width: '42.5mm', swl: 19500, breakingLoad: 117 },
  { id: 'wr-iwrc-45', name: '6 X 4 + IWRC 45mm', width: '45mm', swl: 21833, breakingLoad: 131 },
  { id: 'wr-iwrc-47.5', name: '6 X 4 + IWRC 47.5mm', width: '47.5mm', swl: 24433, breakingLoad: 146.6 },
  { id: 'wr-iwrc-50', name: '6 X 4 + IWRC 50mm', width: '50mm', swl: 27083, breakingLoad: 162.5 },
  { id: 'wr-iwrc-53', name: '6 X 4 + IWRC 53mm', width: '53mm', swl: 30416, breakingLoad: 182.5 },
  { id: 'wr-iwrc-56', name: '6 X 4 + IWRC 56mm', width: '56mm', swl: 33966, breakingLoad: 203.8 },
  { id: 'wr-iwrc-60', name: '6 X 4 + IWRC 60mm', width: '60mm', swl: 39000, breakingLoad: 234 },
  { id: 'wr-iwrc-63', name: '6 X 4 + IWRC 63mm', width: '63mm', swl: 42983, breakingLoad: 257.9 },
  { id: 'wr-iwrc-67', name: '6 X 4 + IWRC 67mm', width: '67mm', swl: 48500, breakingLoad: 291 },
  { id: 'wr-iwrc-71', name: '6 X 4 + IWRC 71mm', width: '71mm', swl: 54500, breakingLoad: 327 },
  { id: 'wr-iwrc-75', name: '6 X 4 + IWRC 75mm', width: '75mm', swl: 60833, breakingLoad: 365 },
];
