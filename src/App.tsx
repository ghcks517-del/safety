/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, CheckCircle2, Info, ChevronRight, Settings2, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WEB_BELTS, ROUND_SLINGS, SHACKLES, EYEBOLTS, type SlingSpec, type ToolSpec } from './constants';

const SLING_METHODS = [
  { id: 'straight', name: '일자 견인', factor: 1.0 },
  { id: 'choker', name: '고리 견인', factor: 0.8 },
  { id: 'u_shape', name: 'U자 견인', factor: 2.0 },
  { id: 'uu_shape', name: 'UU자 견인', factor: 4.0 },
  { id: 'triangle_45', name: '△자 견인45°', factor: 1.8 },
  { id: 'triangle_90', name: '△자 견인90°', factor: 1.4 },
];

const TENSION_FACTORS: Record<number, number> = {
  5: 11.424,
  10: 5.7588,
  15: 3.8637,
  20: 2.9238,
  25: 2.3862,
  30: 2,
  35: 1.2434,
  40: 1.5667,
  45: 1.4142,
  50: 1.3054,
  55: 1.2208,
  60: 1.1547,
  65: 1.1034,
  70: 1.0642,
  75: 1.0353,
  80: 1.0154,
  85: 1.0038,
  90: 1,
};

export default function App() {
  const [weight, setWeight] = useState<number>(1.0);
  const [machineType, setMachineType] = useState<string>('천장크레인');
  const [machineCapacity, setMachineCapacity] = useState<number>(5);
  const [angle, setAngle] = useState<number>(60);
  const [slingCount, setSlingCount] = useState<number>(2);
  
  // Selection States
  const [beltType, setBeltType] = useState<'web' | 'round'>('web');
  const [selectedSlingId, setSelectedSlingId] = useState<string>(WEB_BELTS[1].id);
  const [slingMethodId, setSlingMethodId] = useState<string>(SLING_METHODS[0].id);
  const [useShackle, setUseShackle] = useState<boolean>(false);
  const [selectedShackleId, setSelectedShackleId] = useState<string>(SHACKLES[2].id);
  const [useEyebolt, setUseEyebolt] = useState<boolean>(false);
  const [selectedEyeboltId, setSelectedEyeboltId] = useState<string>(EYEBOLTS[4].id);

  const [tension, setTension] = useState<number>(0);
  const [systemCapacity, setSystemCapacity] = useState<number>(0);
  const [isSafe, setIsSafe] = useState<boolean>(true);
  const [weakestLink, setWeakestLink] = useState<string>('');
  const [slingSafety, setSlingSafety] = useState<{ isSafe: boolean; reason: string }>({ isSafe: true, reason: '' });
  const [shackleSafety, setShackleSafety] = useState<{ isSafe: boolean; reason: string; isUsed: boolean }>({ isSafe: true, reason: '', isUsed: false });
  const [eyeboltSafety, setEyeboltSafety] = useState<{ isSafe: boolean; reason: string; isUsed: boolean }>({ isSafe: true, reason: '', isUsed: false });

  useEffect(() => {
    // 1. Calculate System Capacity (Weakest Link)
    const slingList = beltType === 'web' ? WEB_BELTS : ROUND_SLINGS;
    const currentSling = slingList.find(s => s.id === selectedSlingId);
    const currentMethod = SLING_METHODS.find(m => m.id === slingMethodId);
    const currentShackle = SHACKLES.find(s => s.id === selectedShackleId);
    const currentEyebolt = EYEBOLTS.find(e => e.id === selectedEyeboltId);
    const linkName = `슬링벨트(${currentMethod?.name})`;

    // 2. Calculate Tension and System Capacity
    const weightInKg = weight * 1000;
    const tensionFactor = TENSION_FACTORS[angle] || 1;
    const calculatedTension = (weightInKg / (slingCount || 1)) * tensionFactor;
    setTension(calculatedTension);

    if (machineType === '지게차') {
      const forkliftSafetyLimit = machineCapacity * 0.85;
      const isForkliftSafe = forkliftSafetyLimit > weight;
      setIsSafe(isForkliftSafe);
      setWeakestLink('지게차 허용 하중 (85% 기준)');
      setSystemCapacity(forkliftSafetyLimit * 1000);
    } else {
      // New formula for Cranes: ((Breaking Load * Sling Count) / (6 * Tension Factor)) * Efficiency
      const breakingLoad = currentSling?.breakingLoad || 0;
      const efficiency = currentMethod?.factor || 1.0;
      
      const calculatedSystemCapacityTon = ((breakingLoad * slingCount) / (6 * tensionFactor)) * efficiency;
      const calculatedSystemCapacityKg = calculatedSystemCapacityTon * 1000;
      
      setSystemCapacity(calculatedSystemCapacityKg);

      // 3. Safety Check
      const isSlingSafe = calculatedSystemCapacityTon > (weight + 0.5);
      setSlingSafety({ 
        isSafe: isSlingSafe, 
        reason: isSlingSafe ? '' : `시스템 용량(${(calculatedSystemCapacityTon).toFixed(2)}t)이 (총중량+0.5)t을 초과하지 못함` 
      });

      const shackleLiftingAngle = 90 - (180 - angle) / 2;
      
      // Shackle Adjustment Factor
      let shackleAdj = 0;
      if (shackleLiftingAngle >= 91) shackleAdj = 0;
      else if (shackleLiftingAngle >= 46) shackleAdj = 0.5;
      else if (shackleLiftingAngle >= 16) shackleAdj = 0.7;
      else if (shackleLiftingAngle >= 6) shackleAdj = 0.85;
      else shackleAdj = 1;

      const shackleCapacityTon = ((currentShackle?.swl || 0) / 1000) * shackleAdj * slingCount;
      const isShackleSafe = !useShackle || shackleCapacityTon > (weight + 0.5);
      
      setShackleSafety({
        isSafe: isShackleSafe,
        isUsed: useShackle,
        reason: !useShackle ? '' : shackleLiftingAngle >= 91 ? '인양각도 91° 이상' : !isShackleSafe ? `허용하중(${shackleCapacityTon.toFixed(2)}t)이 (총중량+0.5)t 미달` : ''
      });

      // Eyebolt Adjustment Factor
      let eyeboltAdj = 0;
      if (shackleLiftingAngle >= 91) eyeboltAdj = 0;
      else if (shackleLiftingAngle >= 46) eyeboltAdj = 0.25;
      else if (shackleLiftingAngle >= 6) eyeboltAdj = 0.3;
      else eyeboltAdj = 1;

      const eyeboltCapacityTon = ((currentEyebolt?.swl || 0) / 1000) * eyeboltAdj * slingCount;
      const isEyeboltSafe = !useEyebolt || eyeboltCapacityTon > (weight + 0.5);

      setEyeboltSafety({
        isSafe: isEyeboltSafe,
        isUsed: useEyebolt,
        reason: !useEyebolt ? '' : shackleLiftingAngle >= 91 ? '인양각도 91° 이상' : !isEyeboltSafe ? `허용하중(${eyeboltCapacityTon.toFixed(2)}t)이 (총중량+0.5)t 미달` : ''
      });

      const isMachineSafe = (weight + 0.5) * 0.9 <= machineCapacity;
      
      setIsSafe(isSlingSafe && isMachineSafe && isShackleSafe && isEyeboltSafe);
      
      if (!isMachineSafe) {
        setWeakestLink('기계 정격 하중 초과 (안전율 고려)');
      } else if (!isShackleSafe) {
        setWeakestLink('샤클 안전 기준 미달');
      } else if (!isEyeboltSafe) {
        setWeakestLink('아이볼트 안전 기준 미달');
      } else if (!isSlingSafe) {
        setWeakestLink('슬링벨트 하중 한계 초과 (파단하중 기준)');
      } else {
        setWeakestLink(linkName);
      }
    }
  }, [weight, angle, slingCount, machineType, beltType, selectedSlingId, slingMethodId, useShackle, selectedShackleId, useEyebolt, selectedEyeboltId]);

  // Reset selected sling when belt type changes
  useEffect(() => {
    const slingList = beltType === 'web' ? WEB_BELTS : ROUND_SLINGS;
    setSelectedSlingId(slingList[0].id);
  }, [beltType]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">중량물 하중 계산기</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* Visual Guide */}
        {machineType !== '지게차' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">시각적 가이드</span>
              <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                <Info className="w-3 h-3" /> 수평각 기준
              </span>
            </div>
            <div className="relative h-40 flex items-start justify-center border-b-2 border-slate-200 mb-2 pt-4">
              <svg width="200" height="140" viewBox="0 0 200 140" className="overflow-visible">
                {/* Vertical center line */}
                <line x1="100" y1="10" x2="100" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
                
                {/* Sling Lines */}
                <motion.line 
                  x1="100" y1="10" 
                  animate={{ 
                    x2: 100 + 70 * Math.cos((angle * Math.PI) / 180),
                    y2: 10 + 70 * Math.sin((angle * Math.PI) / 180)
                  }}
                  stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" 
                />
                <motion.line 
                  x1="100" y1="10" 
                  animate={{ 
                    x2: 100 - 70 * Math.cos((angle * Math.PI) / 180),
                    y2: 10 + 70 * Math.sin((angle * Math.PI) / 180)
                  }}
                  stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" 
                />
                
                {/* Hook Point (Apex) */}
                <circle cx="100" cy="10" r="5" fill="#1e293b" />
                
                {/* Load (Rectangle) */}
                <motion.rect
                  animate={{
                    x: 100 - 70 * Math.cos((angle * Math.PI) / 180) - 5,
                    y: 10 + 70 * Math.sin((angle * Math.PI) / 180),
                    width: 2 * 70 * Math.cos((angle * Math.PI) / 180) + 10,
                  }}
                  height="40"
                  fill="#1e293b"
                  rx="4"
                />
              </svg>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2 text-xs font-bold text-slate-400">
                중량물
              </div>
            </div>
            <div className="text-center mt-6">
              <span className="text-4xl font-black text-indigo-600">{angle}°</span>
            </div>
          </div>
        )}

        {/* Basic Info Form */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Settings2 className="w-4 h-4" /> 기본 정보
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1">총 중량 (ton)</label>
              <input 
                type="number" 
                step="0.01"
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1">사용 기계</label>
              <select 
                value={machineType} 
                onChange={(e) => setMachineType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold appearance-none"
              >
                <option value="지게차">지게차</option>
                <option value="천장크레인">천장크레인</option>
                <option value="이동식 크레인">이동식 크레인</option>
              </select>
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-bold text-slate-500 ml-1">사용 기계 재원 (Ton)</label>
              <input 
                type="number" 
                step="0.1"
                value={machineCapacity} 
                onChange={(e) => setMachineCapacity(Number(e.target.value))}
                placeholder="예: 5"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              />
            </div>
          </div>

          {machineType !== '지게차' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 ml-1 flex justify-between">
                <span>줄걸이 각도 (수평각)</span>
                <span className="text-indigo-600 font-bold">{angle}°</span>
              </label>
              <input 
                type="range" 
                min="30" 
                max="90" 
                step="5"
                value={angle} 
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          )}
        </div>

        {/* Tool Selection Section */}
        {machineType !== '지게차' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> 도구 및 규격 선택
            </h2>
            
            {/* Belt Type Selection */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <label className="text-sm font-bold text-slate-700">벨트 종류</label>
              <select 
                value={beltType}
                onChange={(e) => setBeltType(e.target.value as 'web' | 'round')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              >
                <option value="web">웹 벨트</option>
                <option value="round">라운드 슬링</option>
              </select>
            </div>

            {/* Specification Selection */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <label className="text-sm font-bold text-slate-700">규격(안전하중)</label>
              <select 
                value={selectedSlingId}
                onChange={(e) => setSelectedSlingId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              >
                {(beltType === 'web' ? WEB_BELTS : ROUND_SLINGS).map(s => (
                  <option key={s.id} value={s.id}>{s.width} - {(s.swl/1000).toFixed(0)}ton</option>
                ))}
              </select>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500">파단하중</span>
                <span className="text-sm font-black text-slate-700">
                  {(beltType === 'web' ? WEB_BELTS : ROUND_SLINGS).find(s => s.id === selectedSlingId)?.breakingLoad} ton
                </span>
              </div>
            </div>

            {/* Number of Slings Selection */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <label className="text-sm font-bold text-slate-700">줄걸이 수 (가닥)</label>
              <input 
                type="number" 
                min="1"
                value={slingCount} 
                onChange={(e) => setSlingCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              />
            </div>

            {/* Slinging Method Selection */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
              <label className="text-sm font-bold text-slate-700">줄걸이 방법</label>
              <select 
                value={slingMethodId}
                onChange={(e) => setSlingMethodId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
              >
                {SLING_METHODS.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Shackle Selection */}
            <div className={`rounded-2xl p-4 shadow-sm border transition-all space-y-3 ${useShackle ? 'bg-white border-slate-200' : 'bg-slate-100 border-transparent opacity-60'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="useShackle" 
                    checked={useShackle} 
                    onChange={(e) => setUseShackle(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  <label htmlFor="useShackle" className="text-sm font-bold text-slate-700 cursor-pointer">샤클 사용</label>
                </div>
              </div>
              
              {useShackle && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 pt-2 border-t border-slate-100"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 ml-1">규격(안전하중)</label>
                    <select 
                      value={selectedShackleId}
                      onChange={(e) => setSelectedShackleId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                    >
                      {SHACKLES.map(s => (
                        <option key={s.id} value={s.id}>{s.spec} - {(s.swl/1000).toLocaleString(undefined, { minimumFractionDigits: 2 })}ton</option>
                      ))}
                    </select>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${
                    (90 - (180 - (machineType === '지게차' ? 90 : angle)) / 2) >= 91 
                      ? 'bg-rose-100 border-rose-200 text-rose-900' 
                      : 'bg-indigo-50 border-indigo-100 text-indigo-900'
                  }`}>
                    <span className="text-xs font-bold">인양각도</span>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black">
                        {(90 - (180 - (machineType === '지게차' ? 90 : angle)) / 2).toFixed(1)}°
                      </span>
                      {(90 - (180 - (machineType === '지게차' ? 90 : angle)) / 2) >= 91 && (
                        <span className="text-[10px] font-bold text-rose-600">작업 불가</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Eyebolt Selection */}
            <div className={`rounded-2xl p-4 shadow-sm border transition-all space-y-3 ${useEyebolt ? 'bg-white border-slate-200' : 'bg-slate-100 border-transparent opacity-60'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="useEyebolt" 
                    checked={useEyebolt} 
                    onChange={(e) => setUseEyebolt(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600"
                  />
                  <label htmlFor="useEyebolt" className="text-sm font-bold text-slate-700 cursor-pointer">아이볼트 사용</label>
                </div>
              </div>

              {useEyebolt && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 pt-2 border-t border-slate-100"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 ml-1">규격(안전하중)</label>
                    <select 
                      value={selectedEyeboltId}
                      onChange={(e) => setSelectedEyeboltId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
                    >
                      {EYEBOLTS.map(e => (
                        <option key={e.id} value={e.id}>{e.spec} - {(e.swl/1000).toLocaleString(undefined, { minimumFractionDigits: 2 })}ton</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-700">인양각도</span>
                    <span className="text-sm font-black text-indigo-900">
                      {(90 - (180 - (machineType === '지게차' ? 90 : angle)) / 2).toFixed(1)}°
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Result Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={isSafe ? 'safe' : 'danger'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-2xl p-6 border-2 transition-colors ${
              isSafe 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-rose-50 border-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isSafe ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                )}
                <span className={`text-lg font-bold ${isSafe ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isSafe ? '작업 가능 (안전)' : '작업 불가 (위험)'}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                isSafe ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
              }`}>
                {machineType === '지게차' 
                  ? ((weight / (machineCapacity * 0.85)) * 100).toFixed(0)
                  : ((tension / systemCapacity) * 100).toFixed(0)}% 부하
              </div>
            </div>

            <div className="space-y-3">
              {machineType === '지게차' ? (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">작업 가능 중량</span>
                  <span className={`text-xl font-black ${isSafe ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {(machineCapacity * 0.85).toFixed(2)} <small className="text-xs">ton</small>
                  </span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Belt Safety */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">벨트 사용 합격 여부</span>
                    <div className="flex flex-col items-end">
                      <span className={`font-bold ${slingSafety.isSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {slingSafety.isSafe ? '합격' : '불합격'}
                      </span>
                      {!slingSafety.isSafe && <span className="text-[10px] text-rose-500 font-medium">{slingSafety.reason}</span>}
                    </div>
                  </div>
                  
                  {/* Shackle Safety */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">샤클 사용 합격 여부</span>
                    <div className="flex flex-col items-end">
                      <span className={`font-bold ${!shackleSafety.isUsed ? 'text-slate-400' : shackleSafety.isSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {!shackleSafety.isUsed ? '미사용' : shackleSafety.isSafe ? '합격' : '불합격'}
                      </span>
                      {shackleSafety.isUsed && !shackleSafety.isSafe && <span className="text-[10px] text-rose-500 font-medium">{shackleSafety.reason}</span>}
                    </div>
                  </div>

                  {/* Eyebolt Safety */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">아이볼트 사용 합격 여부</span>
                    <div className="flex flex-col items-end">
                      <span className={`font-bold ${!eyeboltSafety.isUsed ? 'text-slate-400' : eyeboltSafety.isSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {!eyeboltSafety.isUsed ? '미사용' : eyeboltSafety.isSafe ? '합격' : '불합격'}
                      </span>
                      {eyeboltSafety.isUsed && !eyeboltSafety.isSafe && <span className="text-[10px] text-rose-500 font-medium">{eyeboltSafety.reason}</span>}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200/50 w-full my-1" />
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">가닥당 계산 하중</span>
                    <span className={`text-xl font-black ${isSafe ? 'text-emerald-900' : 'text-rose-900'}`}>
                      {(tension / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small className="text-xs">ton</small>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-medium">시스템 정격 하중 (SWL)</span>
                      <span className="text-[10px] text-slate-400 font-bold italic">가장 약한 도구 기준: {weakestLink}</span>
                    </div>
                    <span className="font-bold text-slate-700">
                      {(systemCapacity / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small className="text-xs">ton</small>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {!isSafe && (
              <div className="mt-4 p-3 bg-rose-100 rounded-xl text-xs text-rose-800 font-medium leading-relaxed flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {machineType === '지게차' 
                  ? `총 중량이 지게차 허용 하중(${(machineCapacity * 0.85).toFixed(2)}ton)을 초과합니다.`
                  : weakestLink === '기계 정격 하중 초과 (안전율 고려)'
                    ? `(총 중량 + 0.5) × 0.9 값이 기계 재원(${machineCapacity}ton)을 초과합니다.`
                    : `계산된 하중이 ${weakestLink}의 정격 하중을 초과합니다. 규격을 높이거나 각도를 조절하세요.`}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Safety Tips */}
        <div className="bg-slate-800 rounded-2xl p-5 text-white">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" /> 현장 안전 지침
          </h3>
          <ul className="text-xs space-y-2 text-slate-300 font-medium">
            <li className="flex gap-2">
              <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
              1. 중량물 취급 작업 전 하중 검토를 필수적으로 실시하고 부적합 판정 시 조건을 변경하여 현장에 적용하세요
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
              2. 작업에 사용되는 모든 도구는 작업 전에 점검을 실시하세요
            </li>
            <li className="flex gap-2">
              <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
              3. 조금의 손상이라도 있는 경우 사용을 금지하며, 신호수 배치를 철저히 하세요
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}



