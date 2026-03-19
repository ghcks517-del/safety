import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera, Stage } from '@react-three/drei';
import { Info, AlertTriangle, CheckCircle2, Box, Circle, Layers, Wind, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

// --- Sub-components ---

const ShapeVisualizer = ({ shape, dimensions }: { shape: string, dimensions: any }) => {
  // Force Stage to recalculate camera when dimensions change
  const stageKey = useMemo(() => JSON.stringify({ shape, dimensions }), [shape, dimensions]);

  return (
    <div className="h-64 w-full bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 45 }}>
        <OrbitControls makeDefault enablePan={false} minDistance={2} maxDistance={100} />
        
        <Stage 
          key={stageKey}
          environment="city" 
          intensity={0.5} 
          adjustCamera={1.5} // Adds padding to the view
          center={{ top: true }}
        >
          <group position={[0, 0, 0]}>
            {shape === 'rectangle' && (
              <mesh position={[0, dimensions.h / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[dimensions.w || 0.1, dimensions.h || 0.1, dimensions.l || 0.1]} />
                <meshStandardMaterial color="#4f46e5" opacity={0.8} transparent />
              </mesh>
            )}
            {shape === 'cylinder' && (
              <mesh position={[0, dimensions.h / 2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[(dimensions.m || 0.1) / 2, (dimensions.m || 0.1) / 2, dimensions.h || 0.1, 32]} />
                <meshStandardMaterial color="#4f46e5" opacity={0.8} transparent />
              </mesh>
            )}
            {shape === 'combined' && (
              <group>
                {/* Rectangle part */}
                <mesh position={[0, dimensions.rectH / 2, 0]} castShadow receiveShadow>
                  <boxGeometry args={[dimensions.rectW || 0.1, dimensions.rectH || 0.1, dimensions.rectL || 0.1]} />
                  <meshStandardMaterial color="#4f46e5" opacity={0.8} transparent />
                </mesh>
                {/* Cylinder part - placed on top of rectangle for visualization */}
                <mesh position={[0, dimensions.rectH + dimensions.cylH / 2, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[(dimensions.cylM || 0.1) / 2, (dimensions.cylM || 0.1) / 2, dimensions.cylH || 0.1, 32]} />
                  <meshStandardMaterial color="#6366f1" opacity={0.8} transparent />
                </mesh>
              </group>
            )}
          </group>
        </Stage>
        
        <Grid 
          infiniteGrid 
          fadeDistance={30} 
          fadeStrength={5} 
          cellSize={1} 
          sectionSize={5} 
          sectionColor="#334155" 
          cellColor="#1e293b" 
        />
        <ambientLight intensity={0.5} />
      </Canvas>
      <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3D 시각화</span>
      </div>
    </div>
  );
};

const VolumeInputSection = ({ 
  knowsVolume, 
  setKnowsVolume, 
  directVolume, 
  setDirectVolume,
  shape,
  setShape,
  dimensions,
  setDimensions,
  calculatedVolume
}: any) => {
  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-500" /> 체적을 알고 계신가요?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setKnowsVolume(true)}
            className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
              knowsVolume 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            YES (직접 입력)
          </button>
          <button
            onClick={() => setKnowsVolume(false)}
            className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
              !knowsVolume 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            NO (치수 계산)
          </button>
        </div>
      </div>

      {knowsVolume ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <label className="text-sm font-bold text-slate-700">체적 직접 입력 (m³)</label>
          <input
            type="number"
            value={directVolume || ''}
            onChange={(e) => setDirectVolume(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-2xl text-center"
            placeholder="0"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Shape Selection */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'rectangle', name: '사각형', icon: Box },
                { id: 'cylinder', name: '원통형', icon: Circle },
                { id: 'combined', name: '결합형', icon: Layers },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id)}
                  className={`flex flex-col items-center gap-2 py-3 rounded-xl transition-all border-2 ${
                    shape === s.id 
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                      : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                  <span className="text-xs font-bold">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3D Visualizer */}
          <ShapeVisualizer shape={shape} dimensions={dimensions} />

          {/* Dimension Inputs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            {shape === 'rectangle' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">높이 (H)</label>
                  <input type="number" value={dimensions.h || ''} onChange={(e) => setDimensions({...dimensions, h: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-center" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">폭 (W)</label>
                  <input type="number" value={dimensions.w || ''} onChange={(e) => setDimensions({...dimensions, w: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-center" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">길이 (L)</label>
                  <input type="number" value={dimensions.l || ''} onChange={(e) => setDimensions({...dimensions, l: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-center" />
                </div>
              </div>
            )}
            {shape === 'cylinder' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">직경 (M)</label>
                  <input type="number" value={dimensions.m || ''} onChange={(e) => setDimensions({...dimensions, m: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-center" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">높이 (H)</label>
                  <input type="number" value={dimensions.h || ''} onChange={(e) => setDimensions({...dimensions, h: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-center" />
                </div>
              </div>
            )}
            {shape === 'combined' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest border-l-4 border-indigo-600 pl-2">사각형 부분</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">높이 (H)</label>
                      <input type="number" value={dimensions.rectH || ''} onChange={(e) => setDimensions({...dimensions, rectH: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">폭 (W)</label>
                      <input type="number" value={dimensions.rectW || ''} onChange={(e) => setDimensions({...dimensions, rectW: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">길이 (L)</label>
                      <input type="number" value={dimensions.rectL || ''} onChange={(e) => setDimensions({...dimensions, rectL: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center text-sm" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-widest border-l-4 border-indigo-600 pl-2">원통형 부분</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">직경 (M)</label>
                      <input type="number" value={dimensions.cylM || ''} onChange={(e) => setDimensions({...dimensions, cylM: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">높이 (H)</label>
                      <input type="number" value={dimensions.cylH || ''} onChange={(e) => setDimensions({...dimensions, cylH: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-bold text-center text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-sm font-bold text-slate-500">
                체적은 <span className="text-indigo-600 text-lg font-black">{calculatedVolume.toFixed(2)}</span> m³ 입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FanCapacitySection = ({ fanCapacity, setFanCapacity, fanUnit, setFanUnit }: any) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
        <Wind className="w-4 h-4 text-indigo-500" /> 송풍기/배기팬 용량
      </label>
      <div className="space-y-4">
        <input
          type="number"
          value={fanCapacity || ''}
          onChange={(e) => setFanCapacity(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-black text-2xl text-center"
          placeholder="0"
        />
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFanUnit('m3/hr')}
            className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
              fanUnit === 'm3/hr' 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            m³/hr
          </button>
          <button
            onClick={() => setFanUnit('m3/min')}
            className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
              fanUnit === 'm3/min' 
                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            m³/min
          </button>
        </div>
      </div>
    </div>
  );
};

const VentilationResultSection = ({ requiredVentilation, currentVentilation }: any) => {
  const isSafe = currentVentilation >= requiredVentilation;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
        <div className="w-1 h-6 bg-indigo-600 rounded-full" />
        필요환기량
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Pre-ventilation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center space-y-3">
          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">작업 전 (사전환기)</div>
          <p className="text-lg font-black text-slate-800 leading-tight">
            최소 <span className="text-amber-600 text-2xl">30분</span> 이상<br />
            사전 환기를 실시하시오
          </p>
        </div>

        {/* Continuous ventilation */}
        <div className={`rounded-2xl p-6 shadow-lg border-2 transition-all space-y-6 ${
          isSafe 
            ? 'bg-emerald-500 border-emerald-400 text-white' 
            : 'bg-rose-500 border-rose-400 text-white'
        }`}>
          <div className="flex justify-between items-center">
            <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">작업 중 (지속환기)</div>
            {isSafe ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-white/20 pb-4">
              <span className="text-xs font-bold opacity-80">분당 필요 환기량</span>
              <span className="text-2xl font-black">{requiredVentilation.toFixed(2)} <span className="text-sm font-bold opacity-80">m³/min</span></span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold opacity-80">분당 현재 송풍량</span>
              <span className="text-2xl font-black">{currentVentilation.toFixed(2)} <span className="text-sm font-bold opacity-80">m³/min</span></span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-sm font-black">
              {isSafe 
                ? "작업이 가능합니다" 
                : "해당 송풍기/배풍기로 작업이 불가합니다\n(용량을 올려주세요)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function VentilationCalculatorView() {
  const [knowsVolume, setKnowsVolume] = useState(true);
  const [directVolume, setDirectVolume] = useState(0);
  const [shape, setShape] = useState('rectangle');
  const [dimensions, setDimensions] = useState({
    h: 0, w: 0, l: 0, // rect
    m: 0, // cyl
    rectH: 0, rectW: 0, rectL: 0, cylM: 0, cylH: 0 // combined
  });
  const [fanCapacity, setFanCapacity] = useState(0);
  const [fanUnit, setFanUnit] = useState<'m3/hr' | 'm3/min'>('m3/hr');

  const calculatedVolume = useMemo(() => {
    if (knowsVolume) return directVolume;
    
    if (shape === 'rectangle') {
      return dimensions.h * dimensions.w * dimensions.l;
    } else if (shape === 'cylinder') {
      return ((3.14 * Math.pow(dimensions.m, 2)) / 4) * dimensions.h;
    } else if (shape === 'combined') {
      const rectV = dimensions.rectH * dimensions.rectW * dimensions.rectL;
      const cylV = ((3.14 * Math.pow(dimensions.cylM, 2)) / 4) * dimensions.cylH;
      return rectV + cylV;
    }
    return 0;
  }, [knowsVolume, directVolume, shape, dimensions]);

  const requiredVentilation = calculatedVolume * 0.4;
  const currentVentilation = fanUnit === 'm3/hr' ? fanCapacity / 60 : fanCapacity;

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-12 space-y-8">
      <VolumeInputSection 
        knowsVolume={knowsVolume}
        setKnowsVolume={setKnowsVolume}
        directVolume={directVolume}
        setDirectVolume={setDirectVolume}
        shape={shape}
        setShape={setShape}
        dimensions={dimensions}
        setDimensions={setDimensions}
        calculatedVolume={calculatedVolume}
      />

      <FanCapacitySection 
        fanCapacity={fanCapacity}
        setFanCapacity={setFanCapacity}
        fanUnit={fanUnit}
        setFanUnit={setFanUnit}
      />

      <VentilationResultSection 
        requiredVentilation={requiredVentilation}
        currentVentilation={currentVentilation}
      />
    </div>
  );
}
