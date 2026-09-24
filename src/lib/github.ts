import { promises as fs } from "fs";
import path from "path";
import type { ContentFile } from "@/types/content";

const ALLOWED: ContentFile[] = [
  "site.json",
  "hero.json",
  "services.json",
  "prices.json",
  "projects.json",
  "categories.json",
  "faq.json",
  "locations.json",
  "seo.json",
  "robots.json",
  "appearance.json",
  "brands.json",
];

function assertAllowed(file: string): asserts file is ContentFile {
  if (!ALLOWED.includes(file as ContentFile)) {
    throw new Error(`File not allowed: ${file}`);
  }
}

function contentPath(file: ContentFile) {
  return `src/content/${file}`;
}

async function writeLocal(file: ContentFile, data: unknown) {
  const full = path.join(process.cwd(), "src", "content", file);
  await fs.writeFile(full, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function saveContentFile(file: string, data: unknown, message?: string) {
  assertAllowed(file);
  const repoPath = contentPath(file);
  const content = `${JSON.stringify(data, null, 2)}\n`;
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    await writeLocal(file, data);
    return { mode: "local" as const, path: repoPath };
  }

  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${repoPath}`;
  const getRes = await fetch(`${apiBase}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  let sha: string | undefined;
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha: string };
    sha = existing.sha;
  } else if (getRes.status !== 404) {
    const text = await getRes.text();
    throw new Error(`GitHub get failed: ${getRes.status} ${text}`);
  }

  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: message || `chore(content): update ${file}`,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const text = await putRes.text();
    throw new Error(`GitHub put failed: ${putRes.status} ${text}`);
  }

  // Keep local copy in sync for current runtime
  await writeLocal(file, data);

  return { mode: "github" as const, path: repoPath };
}
