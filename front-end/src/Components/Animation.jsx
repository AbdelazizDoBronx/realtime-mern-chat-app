import React from 'react';

const styles = {
  impulseAnimation: 'animate-pulse', // Tailwind's pulse animation
};

const Animation = () => {
  // Generate an array of 9 squares (indexes 0-8)
  const squares = Array.from({ length: 9 }, (_, index) => index );

  return (
    <div className="grid grid-cols-3 gap-4">
      {squares.map((i) => (
        <div
          key={i}
          className={`h-20 w-20 flex items-center justify-center border-2 rounded-md ${
            i % 2 !== 0 ? `${styles.impulseAnimation} bg-slate-500` : 'bg-gray-300'
          }`}
        >
        </div>
      ))}
    </div>
  );
};

export default Animation;
