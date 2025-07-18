const MarqueeText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Inline keyframes for marquee */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Scrolling content container */}
      <div
        className="flex w-max"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        <span className="text-2xl font-semibold text-primary px-4 whitespace-nowrap">
          Vi är engagerade i att förenkla din vardag, därför erbjuder vi hemstädning, storstädning, flyttstädning och fönsterputs med hög precision.
        </span>
        <span className="text-2xl font-semibold text-primary px-4 whitespace-nowrap">
          Vi är engagerade i att förenkla din vardag, därför erbjuder vi hemstädning, storstädning, flyttstädning och fönsterputs med hög precision.
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
