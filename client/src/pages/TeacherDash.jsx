import { useState, useEffect } from "react";
import api from "../axios";
import { toast } from "react-toastify";

export default function TeacherDashboard() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    testcase: ""
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/api/questions");
        setQuestions(res.data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = async () => {
    try {
      const res = await api.post("/api/questions/add", formData);
      toast.success(res.data.message);

      // new question top pe add
      setQuestions([res.data.question, ...questions]);
      setFormData({ title: "", description: "", testcase: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add question");
    }
  };

  // ✅ DELETE SINGLE QUESTION
  const handleDeleteQuestion = async (id) => {
    
    if (!window.confirm("Delete this question?")) return;
    // console.log(id);

    try {
      let res = await api.delete(`/api/questions/delete/${id}`);
      console.log(res.data.message);
      // setQuestions(questions.filter((q) => q.id !== id));
      toast.success("Question deleted");
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  // ✅ DELETE ALL QUESTIONS
  const handleDeleteAll = async () => {
    if (!window.confirm("Delete ALL questions?")) return;

    try {
      let res = await api.delete("/api/questions/delete");
      console.log(res.data.message);
      toast.success("All questions deleted");
    } catch (error) {
      toast.error("Failed to delete all questions");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#020617] to-black p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          Teacher Dashboard
        </h1>

        {questions.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold
              hover:bg-red-500 transition"
          >
            🗑 Delete All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ADD QUESTION */}
        <div className="bg-[#020617]/90 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            ➕ Add New Coding Question
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Question Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700"
          />

          <textarea
            name="description"
            placeholder="Problem Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700"
          />

          <textarea
            name="testcase"
            placeholder="Test Case (Input / Output)"
            rows={3}
            value={formData.testcase}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-900 text-white border border-slate-700"
          />

          <button
            onClick={handleAddQuestion}
            className="w-full py-2 rounded-xl font-bold text-black
              bg-linear-to-r from-cyan-400 to-blue-500"
          >
            🚀 Publish Question
          </button>
        </div>

        {/* QUESTION LIST */}
        <div className="bg-[#020617]/90 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            📘 Your Questions
          </h2>

          {questions.length === 0 ? (
            <p className="text-slate-400">No questions added yet.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-auto pr-1">
              {questions.map((q, index) => (
                <div
                  key={q._id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-700"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-cyan-400 font-semibold">
                      {index + 1}. {q.title}
                    </p>

                    <button
                      onClick={() => handleDeleteQuestion(q._id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      🗑 Delete
                    </button>
                  </div>

                  <p className="text-slate-300 text-sm mt-1">
                    {q.description}
                  </p>

                  <pre className="text-xs text-slate-400 mt-2 whitespace-pre-wrap">
                    {q.testcase}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
