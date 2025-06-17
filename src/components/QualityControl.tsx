import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Thermometer,
  Beaker,
  FileText,
  Plus
} from 'lucide-react';

export const QualityControl: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState('all');

  const qualityTests = [
    {
      id: 'QC001',
      batchId: 'L2024-001',
      product: 'Lait Entier 3.5%',
      testType: 'Microbiologique',
      status: 'passed',
      date: '2024-01-16 09:30',
      technician: 'Dr. Martin',
      results: {
        bacteria: { value: '<1000', unit: 'UFC/ml', limit: '<10000', status: 'pass' },
        coliform: { value: '<10', unit: 'UFC/ml', limit: '<100', status: 'pass' },
        salmonella: { value: 'Absent', unit: '', limit: 'Absent', status: 'pass' }
      }
    },
    {
      id: 'QC002',
      batchId: 'L2024-002',
      product: 'Fromage Comté',
      testType: 'Physico-chimique',
      status: 'pending',
      date: '2024-01-16 14:15',
      technician: 'Sophie Durand',
      results: {
        moisture: { value: 'En cours', unit: '%', limit: '<45%', status: 'pending' },
        fat: { value: 'En cours', unit: '%', limit: '32-35%', status: 'pending' },
        salt: { value: 'En cours', unit: '%', limit: '1.5-2.5%', status: 'pending' }
      }
    },
    {
      id: 'QC003',
      batchId: 'Y2024-001',
      product: 'Yaourt Nature Bio',
      testType: 'Sensoriel',
      status: 'failed',
      date: '2024-01-16 11:45',
      technician: 'Claire Moreau',
      results: {
        taste: { value: '6/10', unit: '', limit: '≥8/10', status: 'fail' },
        texture: { value: '8/10', unit: '', limit: '≥8/10', status: 'pass' },
        appearance: { value: '9/10', unit: '', limit: '≥8/10', status: 'pass' }
      }
    }
  ];

  const testTypes = [
    { id: 'all', name: 'Tous les Tests', count: qualityTests.length },
    { id: 'microbiologique', name: 'Microbiologique', count: 1 },
    { id: 'physico-chimique', name: 'Physico-chimique', count: 1 },
    { id: 'sensoriel', name: 'Sensoriel', count: 1 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getResultStatus = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'fail': return 'text-red-600';
      case 'pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const filteredTests = selectedTest === 'all' 
    ? qualityTests 
    : qualityTests.filter(test => test.testType.toLowerCase().includes(selectedTest.toLowerCase()));

  const summary = {
    totalTests: qualityTests.length,
    passed: qualityTests.filter(test => test.status === 'passed').length,
    failed: qualityTests.filter(test => test.status === 'failed').length,
    pending: qualityTests.filter(test => test.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contrôle Qualité</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouveau Test</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Rapport Qualité
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tests Totaux</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalTests}</p>
            </div>
            <Beaker className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conformes</p>
              <p className="text-2xl font-bold text-green-600">{summary.passed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Non Conformes</p>
              <p className="text-2xl font-bold text-red-600">{summary.failed}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-orange-600">{summary.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Test Type Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-wrap gap-3">
          {testTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedTest(type.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                selectedTest === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{type.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedTest === type.id ? 'bg-blue-700' : 'bg-gray-200'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {filteredTests.map((test) => (
          <div key={test.id} className={`bg-white rounded-xl shadow-sm border-2 p-6 ${getStatusColor(test.status)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(test.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Test {test.testType} - Lot {test.batchId}
                  </h3>
                  <p className="text-sm text-gray-600">{test.product}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">ID: {test.id}</p>
                <p className="text-sm text-gray-600">{test.date}</p>
                <p className="text-sm text-gray-600">Technicien: {test.technician}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(test.results).map(([key, result]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key === 'bacteria' ? 'Bactéries' :
                       key === 'coliform' ? 'Coliformes' :
                       key === 'salmonella' ? 'Salmonelles' :
                       key === 'moisture' ? 'Humidité' :
                       key === 'fat' ? 'Matière Grasse' :
                       key === 'salt' ? 'Sel' :
                       key === 'taste' ? 'Goût' :
                       key === 'texture' ? 'Texture' :
                       key === 'appearance' ? 'Aspect' : key}
                    </span>
                    <span className={`text-xs font-medium ${getResultStatus(result.status)}`}>
                      {result.status === 'pass' ? 'Conforme' :
                       result.status === 'fail' ? 'Non Conforme' : 'En cours'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-gray-600">Résultat: </span>
                      <span className={`font-medium ${getResultStatus(result.status)}`}>
                        {result.value} {result.unit}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Limite: {result.limit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Voir Rapport</span>
              </button>
              {test.status === 'pending' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Valider Résultats
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};