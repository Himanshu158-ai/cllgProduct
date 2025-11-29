import React from "react";

const SubmitResult = ({ results }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-2">Test Case Results:</h3>
      <ul>
        {results.map((r, idx) => (
          <li
            key={idx}
            className={r.status === "pass" ? "text-green-600" : "text-red-600"}
          >
            Test Case {idx + 1}: {r.status.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmitResult;
