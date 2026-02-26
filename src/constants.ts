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
