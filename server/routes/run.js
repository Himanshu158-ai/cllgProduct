const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({ error: "No code provided" });
  }

  // 🔹 temp folder project root me
  const tempDir = path.join(process.cwd(), "temp");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // 🔹 C file likho
  const filePath = path.join(tempDir, "program.c");
  fs.writeFileSync(filePath, code.replace(/\r/g, ""));

  // 🔹 Docker args (IMPORTANT: ARRAY, NOT STRING)
  const dockerArgs = [
    "run",
    "--rm",
    "-t",
    "-v", `${tempDir}:/app`,
    "-w", "/app",
    "gcc:latest",
    "sh",
    "-c",
    "gcc program.c -o program && ./program"
  ];

  const docker = spawn("docker", dockerArgs);

  let output = "";
  let errorOutput = "";

  docker.stdout.on("data", (data) => {
    output += data.toString();
  });

  docker.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  docker.on("close", (code) => {
    if (code !== 0) {
      return res.json({ error: errorOutput || "Runtime error" });
    }

    res.json({ output: output.trim() });
  });
});

module.exports = router;
