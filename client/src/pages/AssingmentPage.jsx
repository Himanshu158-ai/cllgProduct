import React, { useState, useEffect } from "react";
import MonacoEditor from "../components/CodeEditor";
import { toast } from "react-toastify";
import api from "../axios";

const CodingPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState({});

  // 🔹 FETCH QUESTIONS FROM DB
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/api/questions");
        setQuestions(res.data);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setActiveQuestion(index);
  };

  async function handleSubmit(){
    if (activeQuestion === null) {
      toast.error("Please select a question first");
      return;
    }

    const submission = {
      questionId: questions[activeQuestion]._id, // 🔥 FIX
      code: codes[activeQuestion] || ""
    };

    try {
      let res = await api.post("/run",submission);
      toast.success("Submited");
      console.log(res.data.output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-[#0f172a] via-[#020617] to-black p-4">
      <div className="flex flex-col md:flex-row gap-4 h-full">

        {/* LEFT SIDE - QUESTIONS */}
        <div className="w-full md:w-1/3 bg-[#020617]/90 backdrop-blur rounded-2xl p-5 overflow-auto border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 border-b border-slate-700 pb-2">
            📘 Assignment Questions
          </h2>

          {loading ? (
            <p className="text-slate-400">Loading questions...</p>
          ) : questions.length === 0 ? (
            <p className="text-slate-400">No questions available.</p>
          ) : (
            <div className="space-y-4">
              {questions.map((item, index) => (
                <div
                  key={item._id}
                  className={`rounded-xl border transition-all
                    ${
                      activeQuestion === index
                        ? "border-cyan-400 bg-cyan-400/10 shadow-lg"
                        : "border-slate-700 bg-slate-900 hover:border-cyan-600"
                    }
                  `}
                >
                  {/* CLICK AREA */}
                  <div
                    onClick={() => toggleQuestion(index)}
                    className="cursor-pointer p-4 space-y-2"
                  >
                    <h3 className="text-cyan-400 font-bold text-lg">
                      {index + 1}. {item.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {openIndex === index && (
                    <div className="mx-4 mb-4 p-3 bg-slate-950 border-l-4 border-cyan-400 rounded-lg">
                      <p className="text-sm text-cyan-300 font-semibold mb-1">
                        Sample Test Case
                      </p>
                      <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                        {item.testcase}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - CODE EDITOR */}
        <div className="flex-1 rounded-2xl flex flex-col overflow-hidden bg-[#020617] border border-slate-800 shadow-xl">

          <div className="flex-1">
            <MonacoEditor
              value={codes[activeQuestion] || "// Select a question & write code"}
              onChange={(value) =>
                setCodes({ ...codes, [activeQuestion]: value })
              }
            />
          </div>

          <div className="p-4 flex justify-between items-center bg-slate-900 border-t border-slate-800">
            <span className="text-slate-400 text-sm">
              💻 Language: C
            </span>

            <button
              onClick={handleSubmit}
              className="px-8 py-2 rounded-xl font-bold text-black
                bg-linear-to-r from-cyan-400 to-blue-500
                hover:from-cyan-300 hover:to-blue-400
                transition-all shadow-lg"
            >
              🚀 Submit Code
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodingPage;
