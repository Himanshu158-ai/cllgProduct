
import React, { useState } from "react";
import MonacoEditor from "../components/CodeEditor";

const CodingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      q: "What is a closure in JavaScript?",
      a: "A closure is a function that remembers its lexical scope even when executed outside of that scope."
    },
    {
      q: "Explain the event loop in JavaScript.",
      a: "Event loop handles asynchronous operations by placing callbacks in the task queue and executing them when the call stack is empty."
    },
    {
      q: "Difference between var, let & const?",
      a: "var = function scoped, let & const = block scoped. const cannot be reassigned."
    },
    {
      q: "What is React Virtual DOM?",
      a: "Virtual DOM is a lightweight JS representation of the real DOM which improves UI performance."
    },
    {
      q: "Explain useState & useEffect hooks.",
      a: "useState manages component state, useEffect handles side-effects like API calls."
    },
    {
      q: "What is async/await?",
      a: "async/await is syntax to write asynchronous code that looks synchronous."
    },
    {
      q: "What is a closure in JavaScript?",
      a: "A closure is a function that remembers its lexical scope even when executed outside of that scope."
    },
    {
      q: "Explain the event loop in JavaScript.",
      a: "Event loop handles asynchronous operations by placing callbacks in the task queue and executing them when the call stack is empty."
    },
    {
      q: "Difference between var, let & const?",
      a: "var = function scoped, let & const = block scoped. const cannot be reassigned."
    },
    {
      q: "What is React Virtual DOM?",
      a: "Virtual DOM is a lightweight JS representation of the real DOM which improves UI performance."
    },
    {
      q: "Explain useState & useEffect hooks.",
      a: "useState manages component state, useEffect handles side-effects like API calls."
    },
    {
      q: "What is async/await?",
      a: "async/await is syntax to write asynchronous code that looks synchronous."
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-screen min-h-screen bg-gray-800 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 h-full">

        {/* LEFT SIDE - QUESTIONS */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl p-5 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
            Coding Questions
          </h2>

          <div className="space-y-3 text-gray-700">
            {questions.map((item, index) => (
              <div key={index}>
                {/* QUESTION */}
                <div
                  onClick={() => toggle(index)}
                  className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {index + 1}. {item.q}
                </div>

                {/* ANSWER BOX */}
                {openIndex === index && (
                  <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-gray-200 shadow-inner rounded-xl p-6 flex items-center justify-center">
          {/* <h3 className="text-xl text-gray-600">Right Panel (Empty)</h3> */}
          <MonacoEditor/>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
