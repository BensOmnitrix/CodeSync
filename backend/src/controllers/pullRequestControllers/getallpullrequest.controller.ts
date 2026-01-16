import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export const getAllPullRequestController = async (req: Request, res: Response) => {
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
}