import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { KYCData } from '../types/kyc';
import { kycApi } from '../services/kycApi';

const AdminDashboard: React.FC = () => {
  // const navigate = useNavigate();
  const [kycQueue, setKycQueue] = useState<KYCData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedKYC, setSelectedKYC] = useState<KYCData | null>(null);
  // const [timers, setTimers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchKYCQueue();
    
    // Update timers every second
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchKYCQueue = async () => {
    try {
      setError('');
      setRefreshLoading(true);
      setLoading(true);
      
      // Add 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = await kycApi.getKYCQueue();
      setKycQueue(data);
      updateTimers();
    } catch (err) {
      setError('Failed to fetch KYC queue');
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  const updateTimers = () => {
    const newTimers: { [key: number]: string } = {};
    
    kycQueue.forEach(kyc => {
      if (kyc.created_at && (kyc.status === 'submitted' || kyc.status === 'under_review')) {
        const createdDate = new Date(kyc.created_at);
        const now = new Date();
        const elapsed = now.getTime() - createdDate.getTime();
        const remaining = 24 * 60 * 60 * 1000 - elapsed; // 24 hours in milliseconds
        
        if (remaining > 0) {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          
          newTimers[kyc.id!] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          newTimers[kyc.id!] = 'Overdue';
        }
      }
    });
    
    // setTimers(newTimers);
  };

  const handleStatusUpdate = async (kycId: number, newStatus: string) => {
    try {
      await kycApi.updateKYCStatus(kycId, { status: newStatus as any });
      await fetchKYCQueue();
      setSelectedKYC(null);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'under_review':
        return 'bg-yellow-500 text-white';
      case 'more_info_requested':
        return 'bg-orange-500 text-white';
      case 'submitted':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTimeRemaining = (kyc: KYCData): string => {
    if (!kyc.created_at) return 'Unknown';
    
    const createdDate = new Date(kyc.created_at);
    const now = new Date();
    const elapsed = now.getTime() - createdDate.getTime();
    const remaining = 24 * 60 * 60 * 1000 - elapsed; // 24 hours in milliseconds
    
    if (remaining <= 0) return 'Overdue';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const isAtRisk = (kyc: KYCData): boolean => {
    if (!kyc.created_at) return false;
    const createdDate = new Date(kyc.created_at);
    const now = new Date();
    const elapsed = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
    return elapsed >= 20; // At risk if 20+ hours have passed
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading KYC Queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-0 pt-0">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(90deg, #177cc0, #71b03e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                KYC Review Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/status')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Check Status
              </button> */}
              <button
                onClick={fetchKYCQueue}
                disabled={refreshLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {refreshLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Refreshing...
                  </>
                ) : (
                  'Refresh'
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
            <p className="text-2xl font-bold text-gray-900">{kycQueue.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
            <p className="text-2xl font-bold text-blue-600">
              {kycQueue.filter(k => k.status === 'submitted' || k.status === 'under_review').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">At Risk</h3>
            <p className="text-2xl font-bold text-red-600">
              {kycQueue.filter(k => isAtRisk(k)).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-2xl font-bold text-green-600">
              {kycQueue.filter(k => k.status === 'approved').length}
            </p>
          </div>
        </div>

        {/* KYC Queue Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {kycQueue.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No KYC applications found</h3>
              <p className="text-gray-500">There are currently no KYC applications to review.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Merchant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Remaining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {kycQueue.map((kyc) => (
                    <tr
                      key={kyc.id}
                      className={`hover:bg-gray-50 ${isAtRisk(kyc) ? 'animate-pulse bg-red-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{kyc.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {kyc.merchant_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {kyc.business_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(kyc.status)}`}>
                          {kyc.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-semibold ${isAtRisk(kyc) ? 'text-red-600' : getTimeRemaining(kyc) === 'Overdue' ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                          {getTimeRemaining(kyc)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {kyc.created_at ? new Date(kyc.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedKYC(kyc)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Review
                        </button>
                        {kyc.status === 'submitted' && (
                          <button
                            onClick={() => handleStatusUpdate(kyc.id!, 'under_review')}
                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                          >
                            Start Review
                          </button>
                        )}
                        {kyc.status === 'under_review' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(kyc.id!, 'approved')}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(kyc.id!, 'rejected')}
                              className="text-red-600 hover:text-red-900 mr-3"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {selectedKYC && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Review KYC Application #{selectedKYC.id}
                  </h3>
                  <button
                    onClick={() => setSelectedKYC(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Merchant Name</p>
                      <p className="font-medium">{selectedKYC.merchant_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Name</p>
                      <p className="font-medium">{selectedKYC.business_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Business Type</p>
                      <p className="font-medium">{selectedKYC.business_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expected Volume</p>
                      <p className="font-medium">{selectedKYC.expected_volume}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Documents</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>PAN Card</span>
                        <span className="text-green-600">✓ Uploaded</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>Aadhaar Card</span>
                        <span className="text-green-600">✓ Uploaded</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>Bank Statement</span>
                        <span className="text-green-600">✓ Uploaded</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    {selectedKYC.status === 'submitted' && (
                      <button
                        onClick={() => handleStatusUpdate(selectedKYC.id!, 'under_review')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                      >
                        Start Review
                      </button>
                    )}
                    {selectedKYC.status === 'under_review' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(selectedKYC.id!, 'approved')}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(selectedKYC.id!, 'rejected')}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(selectedKYC.id!, 'more_info_requested')}
                          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                        >
                          Request More Info
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
