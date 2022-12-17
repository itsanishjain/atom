import React, { useEffect, useState } from "react";

const CreateProfile = () => {
  const [resume, setResume] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  console.log(file);

  const getResume = async () => {
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    const data = await fetch("/api/upload-resume", {
      method: "POST",
      body: form,
    });
    const jsonData = await data.json();
    setResume(jsonData);
    setLoading(false);
  };
  return (
    <div>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        name="file"
        accept="application/pdf"
      />
      <button onClick={getResume}>Upload</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        resume && <pre>{JSON.stringify(resume, null, 2)}</pre>
      )}
    </div>
  );
};

export default CreateProfile;
