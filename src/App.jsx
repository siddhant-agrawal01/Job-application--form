import { useState, useEffect } from "react";
import useForm from "./hooks/useform";
import useValidation from "./hooks/useValidation";

const App = () => {
  const initialState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingFor: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  };

  const developerSkills = [
    "JavaScript",
    "React",
    "Python",
    "CSS",
    "HTML",
    "MongoDB",
    "Django",
    "ExpressJS",
  ];
  const designerSkills = [
    "Figma",
    "Wix",
    "Studio",
    "Webflow",
    "Blender",
    "Adobe Illustrator",
  ];
  const managerSkills = [
    "Leadership",
    "Communication",
    "Project Management",
    "Strategic Planning",
  ];

  const { formData, setFormData, errors, setErrors, handleChange } =
    useForm(initialState);
  const validate = useValidation(formData);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    setShowSummary(false);
  };

  const handleSkillChange = (skill) => {
    setFormData((prevData) => {
      const updatedSkills = prevData.additionalSkills.includes(skill)
        ? prevData.additionalSkills.filter((s) => s !== skill)
        : [...prevData.additionalSkills, skill];
      return { ...prevData, additionalSkills: updatedSkills };
    });
  };

  const renderAdditionalSkills = () => {
    let skills = [];
    if (formData.applyingFor === "Developer") {
      skills = developerSkills;
    } else if (formData.applyingFor === "Designer") {
      skills = designerSkills;
    } else if (formData.applyingFor === "Manager") {
      skills = managerSkills;
    }

    return (
      <div className="mb-4">
        <label className="block text-gray-300">Additional Skills</label>
        <div className="flex flex-wrap space-x-4">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center mb-2">
              <input
                type="checkbox"
                name="additionalSkills"
                checked={formData.additionalSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="mr-2"
              />
              <span>{skill}</span>
            </div>
          ))}
        </div>
        {errors.additionalSkills && (
          <p className="text-red-500 text-sm mt-1">{errors.additionalSkills}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Job Application</h1>
        {showSummary ? (
          <div className="animate-fadeIn">
            <h2 className="text-2xl mb-4">Application Summary</h2>
            <p className="mb-2">
              <strong>Full Name:</strong> {formData.fullName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </p>
            <p className="mb-2">
              <strong>Applying for:</strong> {formData.applyingFor}
            </p>
            {(formData.applyingFor === "Developer" ||
              formData.applyingFor === "Designer") && (
              <p className="mb-2">
                <strong>Relevant Experience:</strong>{" "}
                {formData.relevantExperience} years
              </p>
            )}
            {formData.applyingFor === "Designer" && (
              <p className="mb-2">
                <strong>Portfolio URL:</strong> {formData.portfolioUrl}
              </p>
            )}
            {formData.applyingFor === "Manager" && (
              <p className="mb-2">
                <strong>Management Experience:</strong>{" "}
                {formData.managementExperience}
              </p>
            )}
            <p className="mb-2">
              <strong>Additional Skills:</strong>{" "}
              {formData.additionalSkills.join(", ")}
            </p>
            <p className="mb-2">
              <strong>Preferred Interview Time:</strong>{" "}
              {formData.preferredInterviewTime}
            </p>
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-fadeIn">
            <div className="grid grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">
                  Applying for Position
                </label>
                <select
                  name="applyingFor"
                  value={formData.applyingFor}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                >
                  <option value="">Select Position</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
                {errors.applyingFor && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.applyingFor}
                  </p>
                )}
              </div>
              {(formData.applyingFor === "Developer" ||
                formData.applyingFor === "Designer") && (
                <div className="mb-4">
                  <label className="block text-gray-300">
                    Relevant Experience
                  </label>
                  <input
                    type="number"
                    name="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={handleChange}
                    placeholder="Years of experience"
                    className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  {errors.relevantExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.relevantExperience}
                    </p>
                  )}
                </div>
              )}
              {formData.applyingFor === "Designer" && (
                <div className="mb-4">
                  <label className="block text-gray-300">Portfolio URL</label>
                  <input
                    type="text"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  {errors.portfolioUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.portfolioUrl}
                    </p>
                  )}
                </div>
              )}
              {formData.applyingFor === "Manager" && (
                <div className="mb-4">
                  <label className="block text-gray-300">
                    Management Experience
                  </label>
                  <input
                    type="text"
                    name="managementExperience"
                    value={formData.managementExperience}
                    onChange={handleChange}
                    placeholder="Describe your management experience"
                    className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                  />
                  {errors.managementExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.managementExperience}
                    </p>
                  )}
                </div>
              )}
              {renderAdditionalSkills()}
              <div className="mb-4">
                <label className="block text-gray-300">
                  Preferred Interview Time
                </label>
                <input
                  type="datetime-local"
                  name="preferredInterviewTime"
                  value={formData.preferredInterviewTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
                {errors.preferredInterviewTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredInterviewTime}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
