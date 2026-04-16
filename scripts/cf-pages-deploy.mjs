/**
 * Build and deploy this site to Cloudflare Pages (production branch).
 */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const cwd = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const project = "theunitedstates-site";

execSync("npm run build", { stdio: "inherit", cwd, shell: true });
execSync(
  `npx wrangler pages deploy dist --project-name=${project} --branch=main --commit-dirty=true`,
  { stdio: "inherit", cwd, shell: true },
);
