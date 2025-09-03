import React from "react";
import { Armchair, Monitor } from "lucide-react";

interface PreviewSeatsProps {
  seats: number[][];
  showLegend?: boolean;
  seatSize?: "sm" | "md" | "lg";
  className?: string;
}

const PreviewSeats: React.FC<PreviewSeatsProps> = ({
  seats,
  showLegend = true,
  seatSize = "md",
  className = "",
}) => {
  const seatStatusConfig = {
    0: {
      label: "Available",
      bgColor: "bg-green-100 hover:bg-green-200",
      borderColor: "border-green-300",
      iconColor: "text-green-600",
    },
    1: {
      label: "Reserved",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      iconColor: "text-yellow-600",
    },
    2: {
      // ✅ was 3
      label: "Paid",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      iconColor: "text-red-600",
    },
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      seat: "w-8 h-8",
      icon: "w-4 h-4",
      gap: "gap-1",
      text: "text-xs",
    },
    md: {
      seat: "w-10 h-10",
      icon: "w-5 h-5",
      gap: "gap-2",
      text: "text-sm",
    },
    lg: {
      seat: "w-12 h-12",
      icon: "w-6 h-6",
      gap: "gap-3",
      text: "text-base",
    },
  };

  const currentSizeConfig = sizeConfig[seatSize];

  // Calculate rows with letters (A, B, C, etc.)
  const getRowLabel = (index: number): string => {
    return String.fromCharCode(65 + index); // A=65 in ASCII
  };

  // Get seat number (1-indexed)
  const getSeatNumber = (index: number): number => {
    return index + 1;
  };

  // Count seats by status
  const countSeatsByStatus = () => {
    const counts = { 0: 0, 1: 0, 3: 0 };
    seats.forEach((row) => {
      row.forEach((seat) => {
        if (seat in counts) {
          counts[seat as keyof typeof counts]++;
        }
      });
    });
    return counts;
  };

  const seatCounts = countSeatsByStatus();

  return (
    <div className={`w-full  ${className}`}>
      {/* Screen/Stage indicator */}

      {/* Seats Grid */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg">
            <Monitor className="w-5 h-5" />
            <span className="font-semibold">SCREEN/STAGE</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className={`inline-block ${currentSizeConfig.gap}`}>
            {seats.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex justify-center items-center ${currentSizeConfig.gap} mb-2`}
              >
                {/* Row label */}
                <div
                  className={`${currentSizeConfig.seat} flex items-center justify-center font-bold text-gray-700 ${currentSizeConfig.text}`}
                >
                  {getRowLabel(rowIndex)}
                </div>

                {/* Seats in row */}
                {row.map((seatStatus, seatIndex) => {
                  const config =
                    seatStatusConfig[
                      seatStatus as keyof typeof seatStatusConfig
                    ];

                  return (
                    <div
                      key={`${rowIndex}-${seatIndex}`}
                      className={`
                        ${currentSizeConfig?.seat}
                        ${config?.bgColor}
                        ${config?.borderColor}
                        border-2 rounded-lg flex items-center justify-center
                        transition-all duration-200 cursor-pointer
                        relative group
                      `}
                      title={`Seat ${getRowLabel(rowIndex)}${getSeatNumber(
                        seatIndex
                      )} - ${config.label}`}
                    >
                      <Armchair
                        className={`${currentSizeConfig.icon} ${config.iconColor}`}
                      />

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        {getRowLabel(rowIndex)}
                        {getSeatNumber(seatIndex)} - {config.label}
                      </div>
                    </div>
                  );
                })}

                {/* Seat numbers on the right */}
                <div
                  className={`${currentSizeConfig.seat} flex items-center justify-center font-bold text-gray-700 ${currentSizeConfig.text}`}
                >
                  {getRowLabel(rowIndex)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {Object.entries(seatStatusConfig).map(([status, config]) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className={`
                  w-6 h-6 ${config.bgColor} ${config.borderColor} border-2 rounded flex items-center justify-center
                `}
                >
                  <Armchair className={`w-3 h-3 ${config.iconColor}`} />
                </div>
                <span className="text-sm text-gray-700">
                  {config.label} (
                  {seatCounts[Number(status) as keyof typeof seatCounts]})
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-3 border-t border-gray-300">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Total Seats: {seats.flat().length}</span>
              <span>Available: {seatCounts[0]}</span>
              <span>Reserved: {seatCounts[1]}</span>
              <span>Paid: {seatCounts[3]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewSeats;
