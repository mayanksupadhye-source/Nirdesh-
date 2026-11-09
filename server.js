const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Mock API Routes ───────────────────────────────────────────────────────────

// Live flood alerts
app.get('/api/alerts', (req, res) => {
  res.json({
    alerts: [
      { id: 1, severity: 'critical', location: 'Pune - Karve Road', flood_depth: 0.8, lat: 18.5074, lng: 73.8077, timestamp: new Date().toISOString(), source: 'AI-Camera', risk: 'Avoid Travel' },
      { id: 2, severity: 'high', location: 'Mumbai - LBS Marg, Kurla', flood_depth: 0.5, lat: 19.0760, lng: 72.8777, timestamp: new Date().toISOString(), source: 'Sensor+CV', risk: 'Caution Advised' },
      { id: 3, severity: 'moderate', location: 'Nashik - College Road', flood_depth: 0.3, lat: 19.9975, lng: 73.7898, timestamp: new Date().toISOString(), source: 'Citizen Report', risk: 'Monitor Closely' },
      { id: 4, severity: 'low', location: 'Nagpur - Wardha Road', flood_depth: 0.1, lat: 21.1458, lng: 79.0882, timestamp: new Date().toISOString(), source: 'Rainfall Model', risk: 'Normal' },
      { id: 5, severity: 'critical', location: 'Chennai - Anna Salai', flood_depth: 0.95, lat: 13.0827, lng: 80.2707, timestamp: new Date().toISOString(), source: 'AI-Camera', risk: 'Road Closed' },
    ]
  });
});

// Real-time stats
app.get('/api/stats', (req, res) => {
  res.json({
    active_alerts: 47,
    roads_affected: 128,
    citizens_at_risk: 24300,
    districts_monitored: 312,
    model_accuracy: 94.2,
    response_time_avg_min: 8.3,
    flood_incidents_today: 23,
    resolved_today: 15,
    cameras_online: 1847,
    rain_gauges_active: 423,
    ndrf_teams_deployed: 18,
    helpline_calls_today: 3421
  });
});

// Weather data
app.get('/api/weather', (req, res) => {
  res.json({
    regions: [
      { name: 'Mumbai', rainfall_mm: 142, rainfall_forecast_mm: 180, temp: 28, humidity: 94, wind_kph: 35, flood_risk: 'High' },
      { name: 'Pune', rainfall_mm: 87, rainfall_forecast_mm: 110, temp: 24, humidity: 88, wind_kph: 22, flood_risk: 'Moderate' },
      { name: 'Chennai', rainfall_mm: 198, rainfall_forecast_mm: 220, temp: 31, humidity: 96, wind_kph: 42, flood_risk: 'Critical' },
      { name: 'Kolkata', rainfall_mm: 65, rainfall_forecast_mm: 90, temp: 29, humidity: 85, wind_kph: 18, flood_risk: 'Low' },
      { name: 'Hyderabad', rainfall_mm: 112, rainfall_forecast_mm: 140, temp: 26, humidity: 91, wind_kph: 28, flood_risk: 'High' },
      { name: 'Bengaluru', rainfall_mm: 73, rainfall_forecast_mm: 95, temp: 22, humidity: 82, wind_kph: 15, flood_risk: 'Moderate' }
    ]
  });
});

// Historical flood data
app.get('/api/historical', (req, res) => {
  res.json({
    yearly: [
      { year: 2019, incidents: 1240, affected_roads: 892, economic_loss_cr: 4200 },
      { year: 2020, incidents: 1580, affected_roads: 1120, economic_loss_cr: 6800 },
      { year: 2021, incidents: 1890, affected_roads: 1340, economic_loss_cr: 8900 },
      { year: 2022, incidents: 2210, affected_roads: 1560, economic_loss_cr: 11200 },
      { year: 2023, incidents: 1760, affected_roads: 1240, economic_loss_cr: 7400 },
      { year: 2024, incidents: 2050, affected_roads: 1480, economic_loss_cr: 9600 },
      { year: 2025, incidents: 980, affected_roads: 710, economic_loss_cr: 4100 }
    ],
    top_hotspots: [
      { location: 'Mumbai Coastal Belt', incidents_5yr: 342 },
      { location: 'Chennai Urban Core', incidents_5yr: 289 },
      { location: 'Kolkata South', incidents_5yr: 245 },
      { location: 'Hyderabad Old City', incidents_5yr: 198 },
      { location: 'Pune River Corridor', incidents_5yr: 176 }
    ]
  });
});

// Drain status
app.get('/api/drains', (req, res) => {
  res.json({
    total_monitored: 8420,
    blocked: 1247,
    partially_blocked: 2890,
    clear: 4283,
    critical_drains: [
      { id: 'DR-MH-001', location: 'Mumbai - Hindmata Junction', capacity_pct: 98, status: 'overflow_imminent' },
      { id: 'DR-MH-045', location: 'Pune - Sangam Bridge', capacity_pct: 87, status: 'near_capacity' },
      { id: 'DR-TN-012', location: 'Chennai - Cooum River Crossing', capacity_pct: 102, status: 'overflowing' },
      { id: 'DR-WB-003', location: 'Kolkata - Tolly Canal', capacity_pct: 79, status: 'monitoring' }
    ]
  });
});

// Citizen reports
app.get('/api/reports', (req, res) => {
  res.json({
    total_today: 847,
    verified: 612,
    pending: 183,
    false_positive: 52,
    recent: [
      { id: 1, location: 'Andheri West, Mumbai', description: 'Water logging on SV Road near station', votes: 42, verified: true, timestamp: '2026-11-10T05:12:00Z' },
      { id: 2, location: 'Wakad, Pune', description: 'Underpass flooded, vehicles stranded', votes: 38, verified: true, timestamp: '2026-11-10T05:08:00Z' },
      { id: 3, location: 'T Nagar, Chennai', description: 'Knee deep water on Usman Road', votes: 29, verified: false, timestamp: '2026-11-10T04:55:00Z' },
      { id: 4, location: 'Salt Lake, Kolkata', description: 'Drainage overflow near Sector V', votes: 15, verified: true, timestamp: '2026-11-10T04:40:00Z' }
    ]
  });
});

// Submit citizen report
app.post('/api/reports', (req, res) => {
  const { location, description, lat, lng, image_url } = req.body;
  res.json({
    success: true,
    report_id: 'RPT-' + Date.now(),
    message: 'Report submitted successfully. Our AI is verifying your report.',
    estimated_response: '15 minutes'
  });
});

// Emergency resources
app.get('/api/resources', (req, res) => {
  res.json({
    ndrf_teams: [
      { id: 'NDRF-7', location: 'Mumbai', status: 'deployed', personnel: 45, boats: 8 },
      { id: 'NDRF-12', location: 'Chennai', status: 'standby', personnel: 45, boats: 6 },
      { id: 'NDRF-3', location: 'Kolkata', status: 'deployed', personnel: 45, boats: 10 }
    ],
    shelters: [
      { name: 'Bandra Community Center', city: 'Mumbai', capacity: 500, occupied: 312, lat: 19.054, lng: 72.838 },
      { name: 'Rajarajan School', city: 'Chennai', capacity: 800, occupied: 621, lat: 13.082, lng: 80.278 },
      { name: 'Salt Lake Stadium', city: 'Kolkata', capacity: 2000, occupied: 487, lat: 22.578, lng: 88.400 }
    ],
    helplines: [
      { name: 'NDRF Helpline', number: '011-24363260', available: '24/7' },
      { name: 'Flood Emergency', number: '1077', available: '24/7' },
      { name: 'NDMA', number: '1800-180-1253', available: '24/7' },
      { name: 'State Disaster', number: '1070', available: '24/7' }
    ]
  });
});

// AI Model insights
app.get('/api/ai-insights', (req, res) => {
  res.json({
    prediction_next_6h: [
      { region: 'Mumbai Suburbs', risk_level: 'Critical', confidence: 91, expected_depth_cm: 85 },
      { region: 'Chennai Anna Nagar', risk_level: 'High', confidence: 87, expected_depth_cm: 55 },
      { region: 'Pune Camp Area', risk_level: 'Moderate', confidence: 78, expected_depth_cm: 30 },
      { region: 'Hyderabad Secunderabad', risk_level: 'High', confidence: 83, expected_depth_cm: 48 }
    ],
    model_performance: { accuracy: 94.2, false_positives_rate: 3.1, recall: 96.8, f1_score: 95.5 },
    data_sources: [
      { name: 'ISRO Satellite Feed', status: 'active', last_update: '2 min ago' },
      { name: 'IMD Rainfall Data', status: 'active', last_update: '5 min ago' },
      { name: 'City CCTV Network', status: 'active', last_update: '30 sec ago' },
      { name: 'Citizen Reports API', status: 'active', last_update: 'realtime' },
      { name: 'Drainage Sensor Grid', status: 'active', last_update: '1 min ago' },
      { name: 'Historical Flood DB', status: 'active', last_update: 'static' }
    ]
  });
});

// Serve all pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/map', (req, res) => res.sendFile(path.join(__dirname, 'public', 'map.html')));
app.get('/alerts', (req, res) => res.sendFile(path.join(__dirname, 'public', 'alerts.html')));
app.get('/analytics', (req, res) => res.sendFile(path.join(__dirname, 'public', 'analytics.html')));
app.get('/resources', (req, res) => res.sendFile(path.join(__dirname, 'public', 'resources.html')));
app.get('/report', (req, res) => res.sendFile(path.join(__dirname, 'public', 'report.html')));
app.get('/ai-insights', (req, res) => res.sendFile(path.join(__dirname, 'public', 'ai-insights.html')));

app.listen(PORT, () => {
  console.log(`NIRDESH server running on http://localhost:${PORT}`);
});
