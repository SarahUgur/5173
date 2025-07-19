import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Eye, MousePointer, Play, BarChart3 } from 'lucide-react';

interface AdRevenueProps {
  isAdmin?: boolean;
}

export default function AdRevenue({ isAdmin = false }: AdRevenueProps) {
  const [revenueData, setRevenueData] = useState({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    totalImpressions: 0,
    totalClicks: 0,
    ctr: 0, // Click-through rate
    rpm: 0, // Revenue per mille (per 1000 impressions)
    topPerformingAds: []
  });

  useEffect(() => {
    // Simuler real-time reklame data
    const interval = setInterval(() => {
      setRevenueData(prev => ({
        dailyRevenue: prev.dailyRevenue + (Math.random() * 5), // 0-5 kr per opdatering
        monthlyRevenue: prev.monthlyRevenue + (Math.random() * 5),
        totalImpressions: prev.totalImpressions + Math.floor(Math.random() * 10),
        totalClicks: prev.totalClicks + Math.floor(Math.random() * 2),
        ctr: ((prev.totalClicks + Math.floor(Math.random() * 2)) / (prev.totalImpressions + Math.floor(Math.random() * 10)) * 100) || 0,
        rpm: (prev.dailyRevenue + Math.random() * 5) / ((prev.totalImpressions + Math.floor(Math.random() * 10)) / 1000) || 0,
        topPerformingAds: [
          { name: 'Kärcher Banner', revenue: Math.random() * 50, clicks: Math.floor(Math.random() * 20) },
          { name: 'CleanPro Video', revenue: Math.random() * 80, clicks: Math.floor(Math.random() * 15) },
          { name: 'EcoClean Native', revenue: Math.random() * 30, clicks: Math.floor(Math.random() * 25) }
        ]
      }));
    }, 5000); // Opdater hvert 5. sekund

    return () => clearInterval(interval);
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-green-600" />
        Reklame Indtægter (Live)
      </h3>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">I dag</p>
              <p className="text-2xl font-bold text-green-800">{revenueData.dailyRevenue.toFixed(2)} kr</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Denne måned</p>
              <p className="text-2xl font-bold text-blue-800">{revenueData.monthlyRevenue.toFixed(0)} kr</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Visninger</p>
              <p className="text-2xl font-bold text-purple-800">{revenueData.totalImpressions.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Klik</p>
              <p className="text-2xl font-bold text-orange-800">{revenueData.totalClicks}</p>
            </div>
            <MousePointer className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">CTR (Click-through rate)</span>
              <span className="font-semibold text-gray-900">{revenueData.ctr.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RPM (Revenue per 1000)</span>
              <span className="font-semibold text-gray-900">{revenueData.rpm.toFixed(2)} kr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gennemsnitlig klik værdi</span>
              <span className="font-semibold text-gray-900">{(revenueData.dailyRevenue / Math.max(revenueData.totalClicks, 1)).toFixed(2)} kr</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Top Performing Ads</h4>
          <div className="space-y-2">
            {revenueData.topPerformingAds.map((ad, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{ad.name}</span>
                <div className="text-right">
                  <span className="font-semibold text-gray-900 text-sm">{ad.revenue.toFixed(2)} kr</span>
                  <p className="text-xs text-gray-500">{ad.clicks} klik</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-3">💰 Sådan Tjener Du Penge på Reklamer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-blue-800 mb-2">Reklame Netværker:</h5>
            <ul className="space-y-1 text-blue-700">
              <li>• <strong>Google AdSense</strong> - 0.20-2.00 kr per klik</li>
              <li>• <strong>Facebook Audience Network</strong> - 0.15-1.50 kr per klik</li>
              <li>• <strong>Amazon DSP</strong> - 0.10-1.00 kr per klik</li>
              <li>• <strong>Microsoft Advertising</strong> - 0.25-2.50 kr per klik</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-800 mb-2">Reklame Typer:</h5>
            <ul className="space-y-1 text-blue-700">
              <li>• <strong>Banner Ads</strong> - 0.50-1.00 kr per 1000 visninger</li>
              <li>• <strong>Video Ads</strong> - 2.00-5.00 kr per 1000 visninger</li>
              <li>• <strong>Native Ads</strong> - 1.00-3.00 kr per 1000 visninger</li>
              <li>• <strong>Sponsored Content</strong> - 5.00-20.00 kr per post</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">📈 Estimeret Månedlig Indtjening:</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Med 10.000 månedlige brugere:</p>
              <p className="font-semibold text-green-700">2.500 - 8.000 kr/måned</p>
            </div>
            <div>
              <p className="text-gray-600">Med 50.000 månedlige brugere:</p>
              <p className="font-semibold text-green-700">12.500 - 40.000 kr/måned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}