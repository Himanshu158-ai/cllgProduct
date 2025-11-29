import React from "react";

const AssignmentDetails = ({ assignment }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{assignment.title}</h2>
      <p className="mb-4">{assignment.description}</p>
      <h3 className="font-semibold mb-2">Test Cases:</h3>
      <ul className="list-disc list-inside">
        {assignment.testCases.map((tc, idx) => (
          <li key={idx}>Input: {tc.input} | Output: {tc.output}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentDetails;
