import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Clock, 
  Thermometer,
  Gauge,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const Production: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState('line1');

  const productionLines = [
    {
      id: 'line1',
      name: 'Ligne Lait Entier',
      status: 'running',
      product: 'Lait Entier 3.5%',
      progress: 75,
      temperature: 4.2,
      pressure: 1.8,
      speed: 850,
      efficiency: 94,
      target: 5000,
      current: 3750
    },
    {
      id: 'line2',
      name: 'Ligne Fromage',
      status: 'paused',
      product: 'Comté AOP',
      progress: 45,
      temperature: 12.5,
      pressure: 2.1,
      speed: 0,
      efficiency: 0,
      target: 800,
      current: 360
    },
    {
      id: 'line3',
      name: 'Ligne Yaourt',
      status: 'running',
      product: 'Yaourt Nature Bio',
      progress: 92,
      temperature: 6.1,
      pressure: 1.5,
      speed: 1200,
      efficiency: 98,
      target: 2000,
      current: 1840
    },
    {
      id: 'line4',
      name: 'Ligne Beurre',
      status: 'maintenance',
      product: 'Beurre Fermier',
      progress: 0,
      temperature: 8.0,
      pressure: 0,
      speed: 0,
      efficiency: 0,
      target: 300,
      current: 0
    }
  ];

  const selectedLineData = productionLines.find(line => line.id === selectedLine);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-50';
      case 'paused': return 'text-orange-600 bg-orange-50';
      case 'maintenance': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      default: return <Square className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestion de Production</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Nouvelle Production
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Exporter Données
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Lines List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lignes de Production</h3>
          <div className="space-y-3">
            {productionLines.map((line) => (
              <button
                key={line.id}
                onClick={() => setSelectedLine(line.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedLine === line.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{line.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(line.status)}`}>
                    {getStatusIcon(line.status)}
                    <span className="capitalize">{line.status}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{line.product}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all"
                    style={{ width: `${line.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{line.current} / {line.target} L</span>
                  <span>{line.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Line Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLineData && (
            <>
              {/* Line Controls */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedLineData.name}</h3>
                    <p className="text-gray-600">{selectedLineData.product}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Square className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm text-gray-500">{selectedLineData.current} / {selectedLineData.target} L</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 bg-blue-500 rounded-full transition-all"
                      style={{ width: `${selectedLineData.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{selectedLineData.progress}% complété</span>
                    <span>ETA: 2h 15min</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Thermometer className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Température</span>
                    </div>
                    <p className="text-xl font-bold text-blue-900">{selectedLineData.temperature}°C</p>
                    <p className="text-xs text-blue-600">Optimal: 4-6°C</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gauge className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Pression</span>
                    </div>
                    <p className="text-xl font-bold text-green-900">{selectedLineData.pressure} bar</p>
                    <p className="text-xs text-green-600">Normal: 1.5-2.5 bar</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Vitesse</span>
                    </div>
                    <p className="text-xl font-bold text-orange-900">{selectedLineData.speed} L/h</p>
                    <p className="text-xs text-orange-600">Capacité: 1000 L/h</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Efficacité</span>
                    </div>
                    <p className="text-xl font-bold text-purple-900">{selectedLineData.efficiency}%</p>
                    <p className="text-xs text-purple-600">Objectif: 95%</p>
                  </div>
                </div>
              </div>

              {/* Production Schedule */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Planning Production</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Lot #L2024-001 - Terminé</p>
                        <p className="text-sm text-green-700">Lait Entier 3.5% - 3,500L</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">06:00 - 10:30</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Play className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Lot #L2024-002 - En cours</p>
                        <p className="text-sm text-blue-700">Lait Entier 3.5% - 2,000L</p>
                      </div>
                    </div>
                    <span className="text-sm text-blue-600">10:30 - 14:00</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Lot #L2024-003 - Planifié</p>
                        <p className="text-sm text-gray-700">Yaourt Nature Bio - 1,500L</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">14:00 - 17:30</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};