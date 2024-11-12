import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const FocusWheel = () => {
  const [activeField, setActiveField] = useState(0);
  const [entries, setEntries] = useState(Array(12).fill(''));
  
  const handleEntryChange = (index, value) => {
    const newEntries = [...entries];
    newEntries[index] = value;
    setEntries(newEntries);
  };

  const handleNext = () => {
    if (activeField < 11) {
      setActiveField(activeField + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Small Circle */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold">Focus Wheel</h1>
          <span className="text-sm text-gray-600">
            {activeField + 1} / 12
          </span>
        </div>
        
        {/* Small Circle Preview */}
        <div className="relative w-24 h-24 mx-auto">
          {entries.map((entry, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            const radius = 45;
            const x = 50 + radius * Math.cos(angle - Math.PI/2);
            const y = 50 + radius * Math.sin(angle - Math.PI/2);
            
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`w-2 h-2 rounded-full ${
                  index === activeField 
                    ? 'bg-blue-500 ring-2 ring-blue-200' 
                    : entries[index] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Form Section */}
      <div className="pt-40 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-2">
            Statement {activeField + 1}
          </h2>
          <textarea
            value={entries[activeField]}
            onChange={(e) => handleEntryChange(activeField, e.target.value)}
            placeholder="Enter your positive statement..."
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleNext}
            disabled={!entries[activeField]}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-300"
          >
            {activeField < 11 ? (
              <>
                Next <ArrowRight size={16} />
              </>
            ) : (
              <>
                Complete <Check size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusWheel;
