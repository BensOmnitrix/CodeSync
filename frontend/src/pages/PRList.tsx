import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prService } from '../services/pr-service';
import type { PullRequest } from '../types/pr';
import { GitPullRequest, Calendar, User, MessageSquare, Lock } from 'lucide-react';

export const PRList: React.FC = () => {
  const [prs, setPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'MERGED' | 'CLOSED'>('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPRs = async () => {
      setLoading(true);
      try {
        const data = await prService.getPullRequests();
        setPRs(data);
      } catch (error) {
        console.error('Failed to load PRs:', error);
        setPRs([]);
      } finally {
        setLoading(false);
      }
    };

    loadPRs();
  }, []);

  const filteredPRs = prs.filter(pr => {
    if (filter === 'ALL') return true;
    return pr.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'text-green-600 bg-green-50 border border-green-200';
      case 'MERGED':
        return 'text-purple-600 bg-purple-50 border border-purple-200';
      case 'CLOSED':
        return 'text-red-600 bg-red-50 border border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'now';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GitPullRequest className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Pull Requests</h1>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['ALL', 'OPEN', 'MERGED', 'CLOSED'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status}
                {status === 'ALL' && ` (${prs.length})`}
                {status === 'OPEN' && ` (${prs.filter(p => p.status === 'OPEN').length})`}
                {status === 'MERGED' && ` (${prs.filter(p => p.status === 'MERGED').length})`}
                {status === 'CLOSED' && ` (${prs.filter(p => p.status === 'CLOSED').length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-600">Loading pull requests...</p>
            </div>
          </div>
        ) : filteredPRs.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <GitPullRequest className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No pull requests found</p>
            <p className="text-slate-500 text-sm mt-2">Try changing your filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPRs.map((pr) => (
              <button
                key={pr.id}
                onClick={() => navigate(`/pr/${pr.id}`)}
                className="w-full bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden group"
              >
                <div className="p-6 flex items-start gap-4">
                  {/* Left Icon */}
                  <div className="shrink-0 mt-1">
                    <div className={`p-2 rounded-full ${getStatusColor(pr.status).split(' ')[0]} bg-opacity-10`}>
                      <GitPullRequest className={`w-5 h-5 ${getStatusColor(pr.status).split(' ')[0]}`} />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {pr.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${getStatusColor(pr.status)}`}>
                        {pr.status}
                      </span>
                    </div>

                    {pr.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {pr.description}
                      </p>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{pr.author.username}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(pr.createdAt)}</span>
                      </div>
                      {pr.commits && (
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>{pr.commits} commits</span>
                        </div>
                      )}
                      {pr.changes && (
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>{pr.changes} files changed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="shrink-0 ml-4 text-slate-400 group-hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-slate-100 group-hover:bg-blue-100 transition-colors">
                  <div
                    className={`h-full ${pr.status === 'MERGED' ? 'bg-purple-600' : pr.status === 'OPEN' ? 'bg-green-600' : 'bg-red-600'}`}
                    style={{ width: pr.status === 'MERGED' ? '100%' : pr.status === 'OPEN' ? '60%' : '30%' }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PRList;
