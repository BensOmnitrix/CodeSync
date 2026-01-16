export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Repository {
  id: string;
  name: string;
  description?: string;
  owner: User;
}

export interface PullRequest {
  id: string;
  title: string;
  description?: string;
  status: 'OPEN' | 'CLOSED' | 'MERGED';
  author: User;
  repository: Repository;
  createdAt: string;
  updatedAt: string;
  commits?: number;
  changes?: number;
}

export interface FileChange {
  id: string;
  path: string;
  status: 'ADDED' | 'MODIFIED' | 'DELETED';
  additions: number;
  deletions: number;
  diff: string;
}

export interface DiffLine {
  type: 'add' | 'remove' | 'normal' | 'context';
  content: string;
  lineNumber?: number;
}

export interface SplitDiff {
  oldLine?: number;
  newLine?: number;
  oldContent?: string;
  newContent?: string;
  type: 'add' | 'remove' | 'normal' | 'context';
}
