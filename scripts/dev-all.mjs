import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const processes = [];
let isShuttingDown = false;
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function run(name, command) {
  const child = spawn(command, {
    cwd: repoRoot,
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (isShuttingDown) {
      return;
    }

    console.error(`\n[${name}] exited (${signal ?? code}). Stopping all...`);
    shutdown(signal ?? code ?? 0);
  });

  processes.push(child);
}

function shutdown(exitCode = 0) {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;

  for (const proc of processes) {
    if (!proc.killed) {
      proc.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(typeof exitCode === "number" ? exitCode : 0), 200);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

run("frontend", process.platform === "win32" ? "npm.cmd --prefix Frontend run dev" : "npm --prefix Frontend run dev");
run("backend", process.platform === "win32" ? "npm.cmd --prefix backend start" : "npm --prefix backend start");
