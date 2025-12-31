import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const regionalData = [
  { region: 'Asia-Pacific', market2024: 28.5, market2030: 56.5, cagr: 10.5, share: 38.5 },
  { region: 'North America', market2024: 24.8, market2030: 48, cagr: 10, share: 33.5 },
  { region: 'Europe', market2024: 17.8, market2030: 46, cagr: 11, share: 24.0 },
  { region: 'Latin America', market2024: 1.9, market2030: 3.5, cagr: 9, share: 2.5 },
  { region: 'Middle East & Africa', market2024: 1.1, market2030: 2.75, cagr: 12.5, share: 1.5 }
];

const technologyData = [
  { tech: 'IP Cameras', size2024: 45, size2030: 102.5, cagr: 15 },
  { tech: 'AI Video Analytics', size2024: 6.5, size2030: 28.8, cagr: 30.6 },
  { tech: 'Cloud/VSaaS', size2024: 6.05, size2030: 13, cagr: 15.5 },
  { tech: 'Video Analytics', size2024: 12.7, size2030: 43.4, cagr: 20.5 },
  { tech: 'Body-Worn Cameras', size2024: 7.3, size2030: 28.2, cagr: 14.1 }
];

const aiApplicationsData = [
  { name: 'Intrusion & Perimeter', share: 45.7, cagr: 28 },
  { name: 'Retail Analytics', share: 24, cagr: 24 },
  { name: 'Facial Recognition', share: 15, cagr: 18 },
  { name: 'License Plate (LPR)', share: 12, cagr: 20 },
  { name: 'Behavior Analysis', share: 8, cagr: 32 }
];

const competitorData = [
  { company: 'Hikvision', revenue: 12.84, position: 'Global #1' },
  { company: 'Dahua', revenue: 4.5, position: 'Global #2' },
  { company: 'Axis', revenue: 2.27, position: 'EU Leader' },
  { company: 'Hanwha', revenue: 1.5, position: 'Growing' },
  { company: 'Bosch', revenue: 1.2, position: 'Enterprise' },
  { company: 'Milestone', revenue: 0.28, position: '#2 VMS' }
];

const revenueModelData = [
  { type: 'Hardware Sales', mix2024: 60, mix2030: 52.5, margin: 27.5 },
  { type: 'Software Licensing', mix2024: 19, mix2030: 26.5, margin: 77.5 },
  { type: 'Cloud/VSaaS', mix2024: 6.5, mix2030: 13.5, margin: 50 },
  { type: 'Professional Services', mix2024: 11, mix2030: 11, margin: 40 },
  { type: 'Recurring Maintenance', mix2024: 9, mix2030: 11, margin: 70 }
];

const verticalData = [
  { vertical: 'Retail', size: 25, cagr: 7.5 },
  { vertical: 'Casino/Gaming', size: 6.4, cagr: 16.4 },
  { vertical: 'Healthcare', size: 4.5, cagr: 14 },
  { vertical: 'Banking', size: 3.8, cagr: 9 },
  { vertical: 'Education', size: 3.5, cagr: 17.5 },
  { vertical: 'Logistics', size: 2.34, cagr: 16.5 }
];

const franceMetrics = [
  { metric: 'Market Size 2024', value: 1.9, unit: '$B' },
  { metric: 'Market Size 2030', value: 3.45, unit: '$B' },
  { metric: 'CAGR', value: 13.6, unit: '%' },
  { metric: 'Public Cameras', value: 902, unit: 'K' },
  { metric: 'Municipalities', value: 6, unit: 'K+' },
  { metric: 'Body-Worn Cameras', value: 54, unit: 'K' }
];

const marketGrowthTimeline = [
  { year: '2024', global: 64, france: 1.9, ai: 6.5 },
  { year: '2025', global: 72, france: 2.16, ai: 8.5 },
  { year: '2026', global: 81, france: 2.45, ai: 11.1 },
  { year: '2027', global: 91, france: 2.78, ai: 14.5 },
  { year: '2028', global: 102, france: 3.16, ai: 18.9 },
  { year: '2029', global: 114, france: 3.59, ai: 24.7 },
  { year: '2030', global: 127, france: 3.45, ai: 28.8 }
];

const COLORS = {
  primary: '#0f172a',
  secondary: '#1e40af',
  accent: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  teal: '#14b8a6',
  orange: '#f97316'
};

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const ChartCard = ({ title, subtitle, children }) => (
  <div style={{
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    marginBottom: '24px'
  }}>
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#0f172a',
        margin: '0 0 4px 0',
        fontFamily: "'DM Sans', sans-serif"
      }}>{title}</h3>
      {subtitle && (
        <p style={{
          fontSize: '13px',
          color: '#64748b',
          margin: 0,
          fontFamily: "'DM Sans', sans-serif"
        }}>{subtitle}</p>
      )}
    </div>
    {children}
  </div>
);

const StatCard = ({ label, value, unit, trend, color }) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
    borderRadius: '12px',
    padding: '20px',
    border: `1px solid ${color}30`,
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '28px',
      fontWeight: '800',
      color: color,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {value}<span style={{ fontSize: '16px', fontWeight: '600' }}>{unit}</span>
    </div>
    <div style={{
      fontSize: '12px',
      color: '#64748b',
      marginTop: '4px',
      fontWeight: '500',
      fontFamily: "'DM Sans', sans-serif"
    }}>{label}</div>
    {trend && (
      <div style={{
        fontSize: '11px',
        color: '#10b981',
        marginTop: '8px',
        fontWeight: '600'
      }}>▲ {trend}</div>
    )}
  </div>
);

export default function VideoSecurityMarketCharts() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'regional', label: 'Regional' },
    { id: 'technology', label: 'Technology' },
    { id: 'competitive', label: 'Competitive' },
    { id: 'business', label: 'Business Models' },
    { id: 'france', label: 'France Focus' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '32px'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
        borderRadius: '20px',
        padding: '40px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '30%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          transform: 'translateY(50%)'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '16px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            📊 MARKET RESEARCH • DECEMBER 2024
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#ffffff',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px'
          }}>
            Video Security Market Analysis
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#94a3b8',
            margin: 0,
            maxWidth: '600px'
          }}>
            Comprehensive visualization of global market dynamics, technology trends, and competitive landscape
          </p>
          
          {/* Key Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '32px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#3b82f6' }}>$54-74B</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>2024 Market Size</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>$88-165B</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>2030 Projection</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#f59e0b' }}>30.6%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>AI Analytics CAGR</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ec4899' }}>13.6%</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>France CAGR (EU's Fastest)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s ease',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#64748b',
              boxShadow: activeTab === tab.id 
                ? '0 4px 12px rgba(59, 130, 246, 0.4)' 
                : '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ChartCard title="Market Growth Projection (2024-2030)" subtitle="Global market size in $ billions">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketGrowthTimeline}>
                <defs>
                  <linearGradient id="globalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="global" name="Global Market ($B)" stroke="#3b82f6" fill="url(#globalGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="ai" name="AI Analytics ($B)" stroke="#10b981" fill="url(#aiGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Regional Market Share 2024" subtitle="Percentage of global video surveillance market">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="share"
                  nameKey="region"
                  label={({ region, share }) => `${share}%`}
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}%`, 'Market Share']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Technology Segment CAGR Comparison" subtitle="Growth rates by technology segment (2024-2030)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={technologyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                <YAxis dataKey="tech" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}%`, 'CAGR']}
                />
                <Bar dataKey="cagr" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {technologyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cagr > 20 ? '#10b981' : entry.cagr > 15 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="AI Applications Market Share" subtitle="Distribution of AI video analytics applications">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={aiApplicationsData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Radar name="Market Share %" dataKey="share" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                <Radar name="CAGR %" dataKey="cagr" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* Regional Tab */}
      {activeTab === 'regional' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ChartCard title="Regional Market Size: 2024 vs 2030" subtitle="Market value in $ billions by region">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit="B" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value}B`, '']}
                />
                <Legend />
                <Bar dataKey="market2024" name="2024" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="market2030" name="2030 (Projected)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Regional CAGR Comparison" subtitle="Compound annual growth rate by region (2024-2030)">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionalData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} unit="%" domain={[0, 15]} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}%`, 'CAGR']}
                />
                <Bar dataKey="cagr" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cagr >= 12 ? '#ef4444' : entry.cagr >= 10.5 ? '#f59e0b' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div style={{ gridColumn: '1 / -1' }}>
            <ChartCard title="Regional Market Growth Trajectory" subtitle="Projected market expansion by region">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {regionalData.map((region, index) => (
                  <div key={region.region} style={{
                    background: `linear-gradient(135deg, ${CHART_COLORS[index]}15 0%, ${CHART_COLORS[index]}05 100%)`,
                    borderRadius: '12px',
                    padding: '20px',
                    border: `1px solid ${CHART_COLORS[index]}30`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '12px' }}>
                      {region.region}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: CHART_COLORS[index] }}>
                      ${region.market2024}B
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', margin: '4px 0' }}>→</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
                      ${region.market2030}B
                    </div>
                    <div style={{
                      marginTop: '12px',
                      padding: '4px 10px',
                      background: region.cagr >= 12 ? '#fef2f2' : region.cagr >= 10.5 ? '#fffbeb' : '#eff6ff',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: region.cagr >= 12 ? '#dc2626' : region.cagr >= 10.5 ? '#d97706' : '#2563eb',
                      display: 'inline-block'
                    }}>
                      {region.cagr}% CAGR
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Technology Tab */}
      {activeTab === 'technology' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ChartCard title="Technology Segment Growth" subtitle="Market size evolution 2024 to 2030 ($ billions)">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={technologyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="tech" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value}B`, '']}
                />
                <Legend />
                <Bar dataKey="size2024" name="2024 Size ($B)" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="size2030" name="2030 Size ($B)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="AI Video Analytics Applications" subtitle="Market share vs growth rate comparison">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={aiApplicationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="share" name="Market Share %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cagr" name="CAGR %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div style={{ gridColumn: '1 / -1' }}>
            <ChartCard title="Technology Adoption Highlights" subtitle="Key metrics and trends">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <StatCard label="IP Camera Revenue Share" value="71" unit="%" color="#3b82f6" trend="14-16% CAGR" />
                <StatCard label="Edge AI in New Cameras" value="30" unit="%" color="#10b981" trend="Growing rapidly" />
                <StatCard label="Cloud/VSaaS Deployments" value="33" unit="%" color="#f59e0b" trend="13.5% CAGR" />
                <StatCard label="AI Analytics CAGR" value="30.6" unit="%" color="#ef4444" trend="Fastest segment" />
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Competitive Tab */}
      {activeTab === 'competitive' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ChartCard title="Major Competitors by Revenue" subtitle="2024 revenue in $ billions">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={competitorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} unit="B" />
                <YAxis dataKey="company" type="category" tick={{ fontSize: 12, fill: '#64748b' }} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name, props) => [`$${value}B`, props.payload.position]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {competitorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 2 ? '#ef4444' : CHART_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="VMS Market Leaders" subtitle="Video Management System competitive positioning">
            <div style={{ padding: '20px 0' }}>
              {[
                { name: 'Genetec Security Center', position: '#1 Globally', share: '18.3%', model: 'Closed ecosystem' },
                { name: 'Milestone XProtect', position: '#2 Globally', share: '$280M rev', model: 'Open platform' },
                { name: 'Verkada', position: 'Cloud-native', share: '$4.5B val', model: 'Full-stack SaaS' },
                { name: 'Eagle Eye Networks', position: 'Pure cloud', share: 'Growing', model: 'Camera-agnostic' }
              ].map((vms, index) => (
                <div key={vms.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  background: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: `linear-gradient(135deg, ${CHART_COLORS[index]} 0%, ${CHART_COLORS[index]}80 100%)`,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px',
                    marginRight: '16px'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>{vms.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{vms.model}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: CHART_COLORS[index], fontSize: '13px' }}>{vms.position}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{vms.share}</div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <div style={{ gridColumn: '1 / -1' }}>
            <ChartCard title="NDAA Displacement Opportunity" subtitle="Western government restrictions creating $10B+ addressable market">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { region: 'United States', impact: '$5-8B', status: 'NDAA Section 889 + FCC Ban' },
                  { region: 'United Kingdom', impact: '$2-3B', status: 'Removal from sensitive sites' },
                  { region: 'Canada', impact: '$0.5-1B', status: 'Federal shutdown order' },
                  { region: 'Australia', impact: '$300-500M', status: 'Federal office removal' },
                  { region: 'Denmark', impact: 'Growing', status: 'PET recommendation' },
                  { region: 'Lithuania', impact: 'Complete', status: 'National government ban' }
                ].map((item, index) => (
                  <div key={item.region} style={{
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{item.region}</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#dc2626', margin: '8px 0' }}>{item.impact}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.status}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Business Models Tab */}
      {activeTab === 'business' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ChartCard title="Revenue Mix Evolution" subtitle="2024 vs 2030 projected revenue composition">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueModelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="mix2024" name="2024 Mix %" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mix2030" name="2030 Mix %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Gross Margin by Revenue Type" subtitle="Profitability comparison across business models">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueModelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} unit="%" domain={[0, 100]} />
                <YAxis dataKey="type" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value}%`, 'Gross Margin']}
                />
                <Bar dataKey="margin" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {revenueModelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.margin >= 70 ? '#10b981' : entry.margin >= 40 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="B2B Vertical Market Sizing" subtitle="Commercial segment breakdown ($ billions)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={verticalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="vertical" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar dataKey="size" name="Market Size ($B)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cagr" name="CAGR %" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="VSaaS Pricing Landscape" subtitle="Annual cost per camera by provider tier">
            <div style={{ padding: '10px 0' }}>
              {[
                { provider: 'Verkada', range: '$199 - $1,799', model: 'Full-stack SaaS', target: 'Mid-market enterprise' },
                { provider: 'Rhombus', range: '$99 - $199', model: 'Tiered license', target: 'SMB to mid-market' },
                { provider: 'Generic VSaaS', range: '$24 - $96', model: 'Basic monitoring', target: 'SMB price-sensitive' },
                { provider: 'Traditional On-Premise', range: '$200 - $400', model: 'Perpetual + 15-20%/yr', target: 'Enterprise control' }
              ].map((item, index) => (
                <div key={item.provider} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>{item.provider}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.model} • {item.target}</div>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {item.range}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {/* France Focus Tab */}
      {activeTab === 'france' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <ChartCard title="France Market Highlights" subtitle="Europe's fastest-growing video surveillance market">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
                <StatCard label="Market Size 2024" value="$1.9" unit="B" color="#3b82f6" />
                <StatCard label="Projected 2030" value="$3.5" unit="B" color="#10b981" />
                <StatCard label="CAGR" value="13.6" unit="%" color="#ef4444" trend="EU's Fastest" />
                <StatCard label="Public Cameras" value="902" unit="K+" color="#f59e0b" />
                <StatCard label="Municipalities" value="6" unit="K+" color="#8b5cf6" />
                <StatCard label="Body-Worn Cameras" value="54" unit="K" color="#ec4899" />
              </div>
            </ChartCard>
          </div>

          <ChartCard title="France Growth Drivers" subtitle="Key factors accelerating market expansion">
            <div style={{ padding: '10px 0' }}>
              {[
                { driver: 'Paris 2024 Olympics', impact: 'High', desc: 'Infrastructure investments & technology validation' },
                { driver: 'March 2023 AI Legislation', impact: 'High', desc: 'Enabling algorithmic detection at public events' },
                { driver: 'Smart City Initiatives', impact: 'Medium', desc: 'Paris, Lyon, Marseille deployments' },
                { driver: 'Security Priorities', impact: 'High', desc: 'Government response to terrorism threats' },
                { driver: 'CNIL Framework', impact: 'Medium', desc: 'Regulatory clarity for GDPR compliance' }
              ].map((item, index) => (
                <div key={item.driver} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: index % 2 === 0 ? '#f8fafc' : '#ffffff',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.impact === 'High' ? '#10b981' : '#f59e0b',
                    marginRight: '16px'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>{item.driver}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.desc}</div>
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    background: item.impact === 'High' ? '#dcfce7' : '#fef3c7',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: item.impact === 'High' ? '#166534' : '#92400e'
                  }}>
                    {item.impact} Impact
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="French Channel Partners" subtitle="Key integrators and distribution network">
            <div style={{ padding: '10px 0' }}>
              {[
                { type: 'National System Integrators', partners: 'DEF Sûreté, PERIN Sécurité, SPIE Service PSR', focus: 'Enterprise accounts' },
                { type: 'Regional Integrators', partners: 'TEB Vidéo & Sécurité, ISO Sécurité', focus: 'Mid-market' },
                { type: 'Distribution Partners', partners: 'AASSET Security, Euromip', focus: 'Product availability' },
                { type: 'Technology Partners', partners: 'Videtics, Wintics, ChapsVision', focus: 'AI analytics' }
              ].map((item, index) => (
                <div key={item.type} style={{
                  padding: '16px',
                  background: `linear-gradient(135deg, ${CHART_COLORS[index]}10 0%, ${CHART_COLORS[index]}05 100%)`,
                  borderRadius: '10px',
                  marginBottom: '10px',
                  border: `1px solid ${CHART_COLORS[index]}20`
                }}>
                  <div style={{ 
                    fontWeight: '700', 
                    color: CHART_COLORS[index], 
                    fontSize: '13px',
                    marginBottom: '6px'
                  }}>{item.type}</div>
                  <div style={{ fontSize: '12px', color: '#0f172a', marginBottom: '4px' }}>{item.partners}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Focus: {item.focus}</div>
                </div>
              ))}
            </div>
          </ChartCard>

          <div style={{ gridColumn: '1 / -1' }}>
            <ChartCard title="CNIL Compliance Requirements" subtitle="Key regulatory obligations for French market entry">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {[
                  { req: 'Authorization', desc: 'Prefectural authorization for public spaces' },
                  { req: 'Data Retention', desc: 'Maximum 30 days (CNIL recommendation)' },
                  { req: 'Transparency', desc: 'Mandatory signage with pictograms' },
                  { req: 'Workplace Restrictions', desc: 'Cannot film workstations (except cash)' },
                  { req: 'DPIA', desc: 'Mandatory for large-scale monitoring' }
                ].map((item, index) => (
                  <div key={item.req} style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '10px',
                      margin: '0 auto 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '13px', marginBottom: '6px' }}>{item.req}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '32px',
        color: '#64748b',
        fontSize: '12px'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          Data sourced from Grand View Research, MarketsandMarkets, Mordor Intelligence, CNIL, AN2V
        </p>
        <p style={{ margin: 0 }}>
          Report Date: December 2024 • Video Security Market Analysis
        </p>
      </div>
    </div>
  );
}
