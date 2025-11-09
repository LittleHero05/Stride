import React, { useState } from 'react';
import Papa from "papaparse";
import {useAuth } from "../context/AuthContext";
import {saveWorkouts, type Workout} from "../firebase/workouts";

const CSVUpload: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setSaved(false)
    setError("");
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
        console.log("Parsed data:", results.data);
      },
    });
  };
  
  const handleSaveToFirebase = async () => {
    if (!user) {
      setError("Please login to save workouts");
      return;
    }

    if (data.length === 0) {
      setError("No data to save");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const workouts: Workout[] = data.map((row) => ({
        userId: user.uid,
        ...row,
        uploadedAt: new Date().toISOString(),
        fileName: fileName,
      }));

      await saveWorkouts(workouts);
      setSaved(true);
      setLoading(false);
    } catch (error) {
      console.error("Error saving workouts:", error);
      setError("Failed to save workouts. Please try again.");
      setLoading(false);
    }
  };
    
  return (
        <div className="p-4 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Upload Garmin CSV File</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4 p-2 border border-gray-300 rounded"
                disabled={loading}
            />
            
            {data.length > 0 && !saved && (
              <button
              onClick={handleSaveToFirebase}
              disabled={loading || !user}
              className="mb=4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save to Firebase"}
              </button>
            )}
            {saved && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                Workouts saved successfully!
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
                {error}
              </div>
            )}
            {data.length > 0 && (
        <div className="overflow-auto max-h-96">
          <table className="min-w-full table-auto text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-2 py-1 border">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-2 py-1 border">
                      {String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1">
            Showing first 10 rows...
          </p>
        </div>
      )}
        </div>
    );
};
export default CSVUpload;
