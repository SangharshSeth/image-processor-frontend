// src/components/TechStack.tsx
import React from 'react';
import { FaReact, FaDocker, FaAws } from 'react-icons/fa';
import { SiGo, SiMongodb, SiAwslambda } from 'react-icons/si';

const TechStack: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">Our Tech Stack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* React */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <FaReact size={40} className="text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">React</h3>
        </div>
                
        {/* Golang */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <SiGo size={40} className="text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">Golang</h3>
        </div>
        
        {/* Docker */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <FaDocker size={40} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">Docker</h3>
        </div>
        
        {/* AWS */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <FaAws size={40} className="text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">AWS</h3>
        </div>
        
        {/* Lambda */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <SiAwslambda size={40} className="text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">Lambda</h3>
        </div>
        
        {/* MongoDB */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md border border-slate-300">
          <SiMongodb size={40} className="text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800">MongoDB</h3>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
