import React, { useState } from 'react';
import { useTokens } from '../context/TokenContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TokenAnalyticsProps {
  className?: string;
}

export const TokenAnalytics: React.FC<TokenAnalyticsProps> = ({ className = '' }) => {
  const { tokens, getTokenStats } = useTokens();
  const [selectedView, setSelectedView] = useState<'overview' | 'claims' | 'events'>('overview');
  
  const stats = getTokenStats();
  
  // Prepare data for the pie chart (token distribution by event)
  const eventDistribution = React.useMemo(() => {
    const eventCounts: Record<string, number> = {};
    tokens.forEach(token => {
      if (eventCounts[token.event]) {
        eventCounts[token.event]++;
      } else {
        eventCounts[token.event] = 1;
      }
    });
    
    return {
      labels: Object.keys(eventCounts),
      datasets: [
        {
          data: Object.values(eventCounts),
          backgroundColor: [
            '#9945FF', // Solana purple
            '#14F195', // Solana green
            '#00C2FF', // Solana blue
            '#FF9C00', // Solana orange
            '#FF3B9A', // Solana pink
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [tokens]);
  
  // Prepare data for the claims bar chart (claims over time)
  const claimsOverTime = React.useMemo(() => {
    // Group claims by date
    const claimsByDate: Record<string, number> = {};
    tokens
      .filter(token => token.claimed && token.claimedAt)
      .forEach(token => {
        const date = new Date(token.claimedAt as number).toLocaleDateString();
        if (claimsByDate[date]) {
          claimsByDate[date]++;
        } else {
          claimsByDate[date] = 1;
        }
      });
    
    // Sort dates
    const sortedDates = Object.keys(claimsByDate).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
    
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Claims per Day',
          data: sortedDates.map(date => claimsByDate[date]),
          backgroundColor: '#9945FF',
        },
      ],
    };
  }, [tokens]);
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Token Analytics</h2>
      
      {/* Navigation tabs */}
      <div className="flex mb-6 border-b">
        <button 
          className={`py-2 px-4 ${selectedView === 'overview' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          onClick={() => setSelectedView('overview')}
        >
          Overview
        </button>
        <button 
          className={`py-2 px-4 ${selectedView === 'claims' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          onClick={() => setSelectedView('claims')}
        >
          Claims
        </button>
        <button 
          className={`py-2 px-4 ${selectedView === 'events' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
          onClick={() => setSelectedView('events')}
        >
          Events
        </button>
      </div>
      
      {/* Overview tab */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Token Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Tokens</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalTokens}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Events</p>
                <p className="text-2xl font-bold text-purple-600">{stats.uniqueEvents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Claimed Tokens</p>
                <p className="text-2xl font-bold text-purple-600">{stats.claimedTokens}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Claim Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.claimRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Token Distribution</h3>
            <div className="h-48">
              {tokens.length > 0 ? (
                <Pie data={eventDistribution} options={{ maintainAspectRatio: false }} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Claims tab */}
      {selectedView === 'claims' && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Claims Over Time</h3>
            <div className="h-64">
              {tokens.filter(t => t.claimed).length > 0 ? (
                <Bar 
                  data={claimsOverTime} 
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }} 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No claim data available
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Claim Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Claimed Tokens</p>
                <p className="text-2xl font-bold text-purple-600">{stats.claimedTokens}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Claim Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.claimRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Claim Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.avgClaimTime ? `${stats.avgClaimTime.toFixed(1)} hrs` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Events tab */}
      {selectedView === 'events' && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Event Performance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tokens</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Group tokens by event and calculate stats */}
                  {Object.entries(tokens.reduce((acc: Record<string, { total: number, claimed: number }>, token) => {
                    if (!acc[token.event]) {
                      acc[token.event] = { total: 0, claimed: 0 };
                    }
                    acc[token.event].total++;
                    if (token.claimed) {
                      acc[token.event].claimed++;
                    }
                    return acc;
                  }, {})).map(([event, stats]) => (
                    <tr key={event}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{event}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{stats.total}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{stats.claimed}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {((stats.claimed / stats.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenAnalytics;
