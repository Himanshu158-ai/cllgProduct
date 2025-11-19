const router = require("express").Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

router.post("/c", (req, res) => {
  const { code, userInput } = req.body;

  // Unique temp file names (har user ke liye alag)
  const timestamp = Date.now();
  const tempFile = `temp_${timestamp}.c`;
  const outputFile = `temp_${timestamp}.out`;

  // Write code to temp file
  fs.writeFileSync(tempFile, code);

  // Compile C code
  exec(`gcc ${tempFile} -o ${outputFile}`, (err) => {
    if (err) {
      // Compilation error
      fs.unlinkSync(tempFile); // cleanup
      return res.json({ error: err.message });
    }

    // Run compiled program with 2-second timeout
    const run = exec(`./${outputFile}`, { timeout: 2000 }, (error, stdout, stderr) => {
      // Cleanup temp files
      fs.unlinkSync(tempFile);
      fs.unlinkSync(outputFile);

      if (error) {
        if (error.killed) {
          return res.json({ error: "Execution timed out!" });
        }
        return res.json({ error: error.message });
      }

      res.json({ output: stdout || stderr });
    });

    // Pass user input
    if (userInput) {
      run.stdin.write(userInput);
    }
    run.stdin.end();
  });
});

module.exports = router;

