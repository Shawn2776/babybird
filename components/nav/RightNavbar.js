"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const url = process.env.MAIN_URL;

function RightNavbar() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/gemini/`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(prompt),
      });

      if (response.ok) {
        const { geminiResponse } = await response.json();
        setResult(geminiResponse);
        setPrompt("");
      } else {
        setResult("Error. Please try again later.");
        setPrompt("");
      }
    } catch (error) {
      console.log("error fetching prompt result");
    }
  };

  return (
    <div className="flex-col hidden w-full gap-8 p-4 text-black md:flex">
      <div className="max-w-[50%] gap-8 flex flex-col">
        <section className="w-full">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <LuSearch className="dark:text-white" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </section>
        <section className="w-full text-white">
          <form className="w-full max-w-sm ">
            <div className="flex flex-col items-center py-2">
              <textarea
                className="w-full  h-full min-h-[100px] px-2 py-1 mr-3 leading-tight text-black bg-transparent border-none appearance-none focus:outline-none"
                type="text"
                placeholder="Talk to Gemini"
                aria-label="Full name"
                onChange={handleChange}
                value={prompt}
              ></textarea>
              <button
                className="flex-shrink-0 px-2 py-1 text-sm text-white transition duration-300 bg-teal-500 border-4 border-teal-500 rounded hover:bg-teal-700 hover:border-teal-700 "
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
      <h2 className={result ? "" : "hidden"}>Result</h2>
      <p className="">{result}</p>
    </div>
  );
}

export default RightNavbar;
