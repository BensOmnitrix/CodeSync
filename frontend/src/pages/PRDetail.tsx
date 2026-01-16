import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { prService } from '../services/pr-service';
import type { PullRequest, FileChange } from '../types/pr';
import DiffViewer from '../components/DiffViewer';
import {
  ArrowLeft,
  GitPullRequest,
  User,
  Calendar,
  MessageSquare,
  Code,
  GitBranch,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export const PRDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pr, setPR] = useState<PullRequest | null>(null);
  const [fileChanges, setFileChanges] = useState<FileChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'files' | 'details'>('files');

  useEffect(() => {
    const loadPRDetails = async () => {
      setLoading(true);
      if (!id) return;

      try {
        const prData = await prService.getPullRequest(id);
        setPR(prData);

        if (prData) {
          const files = await prService.getFileChanges(id);
          setFileChanges(files);
        }
      } catch (error) {
        console.error('Failed to load PR details:', error);
        setPR(null);
        setFileChanges([]);
      } finally {
        setLoading(false);
      }
    };

    loadPRDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600">Loading pull request...</p>
        </div>
      </div>
    );
  }

  if (!pr) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Pull request not found</p>
          <button
            onClick={() => navigate('/pr')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to PRs
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <AlertCircle className="w-6 h-6 text-green-600" />;
      case 'MERGED':
        return <CheckCircle className="w-6 h-6 text-purple-600" />;
      case 'CLOSED':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <GitPullRequest className="w-6 h-6 text-slate-600" />;
    }
  };

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalAdditions = fileChanges.reduce((sum, f) => sum + f.additions, 0);
  const totalDeletions = fileChanges.reduce((sum, f) => sum + f.deletions, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/pr')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pull Requests
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg shrink-0">
              {getStatusIcon(pr.status)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{pr.title}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(pr.status)}`}>
                  {pr.status}
                </span>
              </div>

              {pr.description && (
                <p className="text-slate-600 text-base mb-4">{pr.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-slate-900">{pr.author.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(pr.createdAt)}</span>
                </div>
                {pr.commits && (
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span>{pr.commits} commits</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>{fileChanges.length} files changed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 border-t border-slate-200 pt-4">
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                activeTab === 'files'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Files ({fileChanges.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                activeTab === 'details'
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Details
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'files' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-slate-600 text-sm font-medium mb-2">Files Changed</div>
                <div className="text-4xl font-bold text-slate-900">{fileChanges.length}</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-slate-600 text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Additions
                </div>
                <div className="text-4xl font-bold text-green-600">+{totalAdditions}</div>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="text-slate-600 text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Deletions
                </div>
                <div className="text-4xl font-bold text-red-600">-{totalDeletions}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Changes</h2>
              {fileChanges.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                  <Code className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">No files changed</p>
                </div>
              ) : (
                fileChanges.map((fileChange) => (
                  <DiffViewer key={fileChange.id} fileChange={fileChange} />
                ))
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">About</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 block mb-1">
                      Title
                    </label>
                    <p className="text-slate-900">{pr.title}</p>
                  </div>
                  {pr.description && (
                    <div>
                      <label className="text-sm font-medium text-slate-600 block mb-1">
                        Description
                      </label>
                      <p className="text-slate-900 whitespace-pre-wrap">{pr.description}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-slate-600 block mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(pr.status)}
                      <span className="font-medium text-slate-900">{pr.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Timeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Created</span>
                    <span className="font-medium text-slate-900">{formatDate(pr.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Updated</span>
                    <span className="font-medium text-slate-900">{formatDate(pr.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Author</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {pr.author.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{pr.author.username}</p>
                    <p className="text-xs text-slate-600">{pr.author.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Repository</h3>
                <div className="space-y-2">
                  <p className="font-medium text-slate-900">{pr.repository.name}</p>
                  {pr.repository.description && (
                    <p className="text-sm text-slate-600">{pr.repository.description}</p>
                  )}
                  <div className="pt-2 border-t border-slate-200 mt-3">
                    <p className="text-xs text-slate-600">Owner</p>
                    <p className="font-medium text-slate-900">{pr.repository.owner.username}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">Commits</span>
                    <span className="font-bold text-slate-900">{pr.commits || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">Files</span>
                    <span className="font-bold text-slate-900">{fileChanges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">Additions</span>
                    <span className="font-bold text-green-600">+{totalAdditions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 text-sm">Deletions</span>
                    <span className="font-bold text-red-600">-{totalDeletions}</span>
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

export default PRDetail;
