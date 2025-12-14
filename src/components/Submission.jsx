import React, { useState } from 'react';
import { useGameState } from '../context/GameStateContext';

const Submission = () => {
  const { missionsCompleted, submitGithubUrl, githubUrl } = useGameState();
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitGithubUrl(url);
  };

  if (!missionsCompleted) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Final Submission</h1>
        <p className="text-red-500">You must complete the missions before you can access the final submission.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Final Submission</h1>
      {githubUrl ? (
        <div>
          <p className="text-green-500">You have successfully submitted your GitHub link and earned a badge!</p>
          <p>Submitted URL: <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{githubUrl}</a></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="github-url" className="block mb-2">GitHub Repository URL:</label>
          <input
            type="url"
            id="github-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit and Earn Badge
          </button>
        </form>
      )}
    </div>
  );
};

export default Submission;
