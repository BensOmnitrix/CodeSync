import React, { useState } from "react";
import type { FileChange } from "../types/pr";
import { FileIcon, ChevronDown, ChevronUp } from "lucide-react";

interface DiffViewerProps {
  fileChange: FileChange;
  isExpanded?: boolean;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  fileChange,
  isExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ADDED":
        return "text-green-600 bg-green-50";
      case "MODIFIED":
        return "text-blue-600 bg-blue-50";
      case "DELETED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusBadgeText = (status: string) => {
    switch (status) {
      case "ADDED":
        return "New";
      case "MODIFIED":
        return "Modified";
      case "DELETED":
        return "Deleted";
      default:
        return status;
    }
  };

  // Parse unified diff format
  const parseDiff = (diffText: string) => {
    const lines = diffText.split("\n");
    const result: Array<{
      type: "add" | "remove" | "context" | "hunk";
      content: string;
      oldLineNum?: number;
      newLineNum?: number;
    }> = [];

    let oldLineNum = 0;
    let newLineNum = 0;

    for (const line of lines) {
      if (line.startsWith("@@")) {
        result.push({ type: "hunk", content: line });
        const match = line.match(/@@ -(\d+).*?\+(\d+)/);
        if (match) {
          oldLineNum = parseInt(match[1]);
          newLineNum = parseInt(match[2]);
        }
      } else if (line.startsWith("+") && !line.startsWith("+++")) {
        result.push({
          type: "add",
          content: line.substring(1),
          newLineNum: newLineNum++,
        });
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        result.push({
          type: "remove",
          content: line.substring(1),
          oldLineNum: oldLineNum++,
        });
      } else if (line.startsWith(" ")) {
        result.push({
          type: "context",
          content: line.substring(1),
          oldLineNum: oldLineNum++,
          newLineNum: newLineNum++,
        });
      } else if (
        !line.startsWith("---") &&
        !line.startsWith("+++") &&
        !line.startsWith("diff") &&
        !line.startsWith("index")
      ) {
        if (line.length > 0) {
          result.push({
            type: "context",
            content: line,
            oldLineNum,
            newLineNum,
          });
        }
      }
    }

    return result;
  };

  const diffLines = parseDiff(fileChange.diff);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* File Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 border-b border-gray-200 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          <FileIcon className="w-5 h-5 text-gray-500" />
          <div className="text-left">
            <p className="font-mono text-sm text-gray-800">{fileChange.path}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(fileChange.status)}`}
            >
              {getStatusBadgeText(fileChange.status)}
            </span>
            {fileChange.additions > 0 && (
              <span className="text-green-600 text-xs font-medium">
                +{fileChange.additions}
              </span>
            )}
            {fileChange.deletions > 0 && (
              <span className="text-red-600 text-xs font-medium">
                -{fileChange.deletions}
              </span>
            )}
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Diff Content */}
      {expanded && (
        <div className="bg-white overflow-x-auto">
          {diffLines.length > 0 ? (
            <div className="diff-view-wrapper">
              <table className="w-full border-collapse text-xs font-mono">
                <tbody>
                  {diffLines.map((line, idx) => {
                    if (line.type === "hunk") {
                      return (
                        <tr
                          key={idx}
                          className="bg-blue-50 border-b border-blue-100 text-blue-700"
                        >
                          <td colSpan={3} className="px-4 py-2 font-semibold">
                            {line.content}
                          </td>
                        </tr>
                      );
                    }

                    let rowClass =
                      "border-b border-gray-100 px-4 py-1 text-gray-700";
                    if (line.type === "add") {
                      rowClass =
                        "border-b border-green-100 bg-green-50 text-green-800 px-4 py-1";
                    } else if (line.type === "remove") {
                      rowClass =
                        "border-b border-red-100 bg-red-50 text-red-800 px-4 py-1";
                    } else if (line.type === "context") {
                      rowClass =
                        "border-b border-gray-100 bg-gray-50 text-gray-600 px-4 py-1";
                    }

                    return (
                      <tr key={idx}>
                        <td className="w-12 text-right pr-3 select-none text-gray-400 border-r border-gray-200 bg-gray-50">
                          {line.oldLineNum || ""}
                        </td>
                        <td className="w-12 text-right pr-3 select-none text-gray-400 border-r border-gray-200 bg-gray-50">
                          {line.newLineNum || ""}
                        </td>
                        <td className={rowClass}>
                          <pre className="whitespace-pre-wrap break-word overflow-hidden">
                            {line.content}
                          </pre>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p className="text-sm">Unable to parse diff for this file</p>
              <pre className="mt-4 p-4 bg-gray-50 rounded text-left text-xs overflow-auto max-h-96 text-gray-700">
                {fileChange.diff}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Footer Stats */}
      {!expanded && (
        <div className="px-6 py-2 bg-gray-50 text-xs text-gray-600 border-t border-gray-100 flex justify-end gap-4">
          <span>
            <span className="text-green-600 font-medium">
              {fileChange.additions}
            </span>{" "}
            additions
          </span>
          <span>
            <span className="text-red-600 font-medium">
              {fileChange.deletions}
            </span>{" "}
            deletions
          </span>
        </div>
      )}
    </div>
  );
};

export default DiffViewer;
