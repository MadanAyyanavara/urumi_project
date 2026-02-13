import { exec } from "child_process";
import path from "path";

const PROJECT_ROOT = path.resolve(__dirname, "../../../");

export function execCmd(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      { cwd: PROJECT_ROOT },
      (error, stdout, stderr) => {
        if (error) {
          return reject(stderr || error.message);
        }
        resolve(stdout);
      }
    );
  });
}
