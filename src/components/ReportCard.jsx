import React from 'react';

const ReportCard = ({ icon, title, value, malayalam, color = "primary" }) => {
  const colorClasses = {
    primary: "border-primary-200 bg-primary-50",
    green: "border-green-200 bg-green-50",
    blue: "border-blue-200 bg-blue-50",
    yellow: "border-yellow-200 bg-yellow-50",
    red: "border-red-200 bg-red-50"
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${colorClasses[color]} hover:scale-105 transition-transform duration-200 cursor-default`}>
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
          {malayalam && <p className="text-xs text-gray-600 mb-1">{malayalam}</p>}
          <p className="font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;