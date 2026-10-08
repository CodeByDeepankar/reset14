import React, { useState } from 'react';
import { Lock, Delete } from 'lucide-react';

interface AppLockScreenProps {
  correctPin: string;
  onUnlock: () => void;
}

export const AppLockScreen: React.FC<AppLockScreenProps> = ({ correctPin, onUnlock }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  const handleDigit = (digit: string) => {
    if (enteredPin.length >= 4) return;
    const newPin = enteredPin + digit;
    setEnteredPin(newPin);

    if (newPin.length === 4) {
      if (newPin === correctPin) {
        onUnlock();
      } else {
        setErrorShake(true);
        setTimeout(() => {
          setEnteredPin('');
          setErrorShake(false);
        }, 600);
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090C] p-6 select-none">
      <div className="w-full max-w-xs flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-3xl bg-[#181B22] border border-[#1F242E] flex items-center justify-center mx-auto text-[#8B5CF6]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-white">RESET 14</h2>
          <p className="text-xs text-[#8B93A1]">Enter 4-digit PIN to access protocol</p>
        </div>

        {/* PIN Dots */}
        <div className={`flex gap-4 ${errorShake ? 'animate-bounce text-[#EF4444]' : ''}`}>
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                enteredPin.length > idx
                  ? 'bg-[#8B5CF6] border-[#8B5CF6] scale-110'
                  : 'bg-[#181B22] border-[#2A303C]'
              }`}
            />
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="w-16 h-16 rounded-3xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-lg font-bold text-white flex items-center justify-center mx-auto transition active:scale-95"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="w-16 h-16 rounded-3xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-lg font-bold text-white flex items-center justify-center mx-auto transition active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-16 h-16 rounded-3xl bg-[#111318] hover:bg-[#181B22] border border-[#1F242E] text-sm text-[#8B93A1] hover:text-white flex items-center justify-center mx-auto transition active:scale-95"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
