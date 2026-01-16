import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export const getSinglePullRequest = async (req: Request, res: Response) => {
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
};