import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    branch: "",
    college: "",
    year: "",
    ccId: "",
    cfId: "",
    leetId: "",
  });

  const { formValues, branch, oAuthSignup, fullName } = useAuthStore();

  const handleSubmit = async () => {
    console.log("Hola");
    await formValues(formData);
    console.log("ab khel shuru hoga");
    await oAuthSignup(navigate);
    alert("Form submitted successfully!");
  };

  console.log(fullName);

  const steps = [
    {
      label: "Step 1: Personal Details",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="branch"
            placeholder="Enter your Branch"
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="college"
            placeholder="Enter your College Name"
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="year"
            placeholder="Enter your Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ),
      isValid: () =>
        formData.branch.trim() !== "" &&
        formData.college.trim() !== "" &&
        formData.year.trim() !== "",
    },
    {
      label: "Step 2: Competitive Programming IDs",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="ccId"
            placeholder="Enter your CodeChef ID"
            value={formData.ccId}
            onChange={(e) => setFormData({ ...formData, ccId: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="cfId"
            placeholder="Enter your Codeforces ID"
            value={formData.cfId}
            onChange={(e) => setFormData({ ...formData, cfId: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="leetId"
            placeholder="Enter your LeetCode ID"
            value={formData.leetId}
            onChange={(e) => setFormData({ ...formData, leetId: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ),
      isValid: () =>
        formData.ccId.trim() !== "" &&
        formData.cfId.trim() !== "" &&
        formData.leetId.trim() !== "",
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg bg-white max-w-lg mx-auto mt-10 text-black">
      <h2 className="text-xl font-bold mb-4 text-blue-600">{steps[step].label}</h2>
      {steps[step].content}
      <div className="mt-6 flex justify-between w-full">
        <button
          className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300 disabled:opacity-50"
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
        >
          Prev
        </button>
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
          onClick={() => {
            if (step === steps.length - 1) {
              handleSubmit();
            } else {
              setStep((prev) => Math.min(prev + 1, steps.length - 1));
            }
          }}
          disabled={!steps[step].isValid()}
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
