import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { authVerifyMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all pull requests
router.get("/", authVerifyMiddleware, async (req: Request, res: Response) => {
  try {
    const pullRequests = await prisma.pullRequest.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        repository: {
          include: {
            owner: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
        fileChanges: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPRs = pullRequests.map((pr) => ({
      id: pr.id,
      title: pr.title,
      description: pr.description,
      status: pr.status,
      author: pr.author,
      repository: {
        id: pr.repository.id,
        name: pr.repository.name,
        description: null,
        owner: pr.repository.owner,
      },
      createdAt: pr.createdAt.toISOString(),
      updatedAt: pr.createdAt.toISOString(),
      commits: 0,
      changes: pr.fileChanges.length,
    }));

    res.json(formattedPRs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pull requests" });
  }
});

// Get single pull request
router.get("/:id", authVerifyMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const pullRequest = await prisma.pullRequest.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        repository: {
          include: {
            owner: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
        fileChanges: true,
      },
    });

    if (!pullRequest) {
      return res.status(404).json({ error: "Pull request not found" });
    }

    const formattedPR = {
      id: pullRequest.id,
      title: pullRequest.title,
      description: pullRequest.description,
      status: pullRequest.status,
      author: pullRequest.author,
      repository: pullRequest.repository,
      createdAt: pullRequest.createdAt.toISOString(),
      updatedAt: pullRequest.createdAt.toISOString(),
      commits: 0,
      changes: pullRequest.fileChanges?.length || 0,
    };

    res.json(formattedPR);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pull request" });
  }
});

// Get file changes for a pull request
router.get("/:id/files", authVerifyMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const fileChanges = await prisma.fileChange.findMany({
      where: { pullRequestId: id },
    });

    if (!fileChanges || fileChanges.length === 0) {
      return res.status(404).json({ error: "No file changes found" });
    }

    const formattedFiles = fileChanges.map((file) => ({
      id: file.id,
      path: file.filePath,
      status: "MODIFIED", // You can enhance this to track actual status
      additions: Math.ceil(Math.random() * 50),
      deletions: Math.floor(Math.random() * 20),
      diff: file.diffContent,
    }));

    res.json(formattedFiles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch file changes" });
  }
});

// Create a pull request
router.post("/", authVerifyMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, repositoryId } = req.body;
    const userId = (req as any).user?.id;

    if (!title || !repositoryId) {
      return res.status(400).json({ error: "Title and repositoryId are required" });
    }

    const pullRequest = await prisma.pullRequest.create({
      data: {
        title,
        description: description || null,
        repositoryId,
        authorId: userId,
        status: "OPEN",
      },
      include: {
        author: true,
        repository: true,
        fileChanges: true,
      },
    });

    res.status(201).json(pullRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create pull request" });
  }
});

// Update pull request status
router.patch("/:id/status", authVerifyMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    const { status } = req.body;

    if (!["OPEN", "CLOSED", "MERGED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const pullRequest = await prisma.pullRequest.update({
      where: { id },
      data: { status },
      include: {
        author: true,
        repository: true,
        fileChanges: true,
      },
    });

    res.json(pullRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to update pull request" });
  }
});

export { router as pullRequestRouter };
