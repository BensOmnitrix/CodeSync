import { useNavigate } from 'react-router-dom';
import { GitPullRequest, LogOut, Settings, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { prService } from '../services/pr-service';
import { getCurrentUser } from '../utils/jwt';
import type { DecodedToken } from '../utils/jwt';
import { logout } from '../services/auth-service';

interface DashboardStats {
  openPRs: number;
  mergedPRs: number;
  totalReviews: number;
  totalRepositories: number;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    openPRs: 0,
    mergedPRs: 0,
    totalReviews: 0,
    totalRepositories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    const fetchPRStats = async () => {
      try {
        const prs = await prService.getPullRequests();
        const openPRs = prs.filter(pr => pr.status === 'OPEN').length;
        const mergedPRs = prs.filter(pr => pr.status === 'MERGED').length;
        const totalRepositories = new Set(prs.map(pr => pr.repository.id)).size;
        const totalReviews = prs.length; // You can adjust this logic based on your needs

        setStats({
          openPRs,
          mergedPRs,
          totalReviews,
          totalRepositories,
        });
      } catch (error) {
        console.error('Failed to fetch PR stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GitPullRequest className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">CodeSync</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Welcome, <span className="font-semibold">{user?.username || 'User'}</span></span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Dashboard</h2>
          <p className="text-slate-600 text-lg">Manage and review your pull requests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <button
            onClick={() => navigate('/pr')}
            className="group bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className="p-8">
              <div className="mb-4 p-3 bg-blue-100 rounded-lg inline-block group-hover:scale-110 transition-transform">
                <GitPullRequest className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pull Requests</h3>
              <p className="text-slate-600 mb-6">View and manage all pull requests</p>
              <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                <span>View PRs</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/')}
            className="group bg-white rounded-lg border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className="p-8">
              <div className="mb-4 p-3 bg-green-100 rounded-lg inline-block group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Home</h3>
              <p className="text-slate-600 mb-6">Return to the home page</p>
              <div className="flex items-center gap-2 text-green-600 font-medium group-hover:gap-3 transition-all">
                <span>Go Home</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button
            className="group bg-white rounded-lg border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 overflow-hidden opacity-60 cursor-not-allowed"
          >
            <div className="p-8">
              <div className="mb-4 p-3 bg-purple-100 rounded-lg inline-block">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Settings</h3>
              <p className="text-slate-600 mb-6">Configure your preferences</p>
              <div className="flex items-center gap-2 text-purple-600 font-medium">
                <span>Coming Soon</span>
              </div>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-slate-600 text-sm font-medium mb-2">Open PRs</div>
            <div className="text-3xl font-bold text-blue-600">{loading ? '-' : stats.openPRs}</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-slate-600 text-sm font-medium mb-2">Merged PRs</div>
            <div className="text-3xl font-bold text-purple-600">{loading ? '-' : stats.mergedPRs}</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-slate-600 text-sm font-medium mb-2">Code Reviews</div>
            <div className="text-3xl font-bold text-green-600">{loading ? '-' : stats.totalReviews}</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-slate-600 text-sm font-medium mb-2">Repositories</div>
            <div className="text-3xl font-bold text-orange-600">{loading ? '-' : stats.totalRepositories}</div>
          </div>
        </div>
      </div>
    </div>
  );
};