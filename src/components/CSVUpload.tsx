import React, { useState } from 'react';
import Papa from "papaparse";

const CSVUpload: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [fileName, setFileName] = useState<string>("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
        console.log("Parsed data:", results.data);
      },
    });
  };
    return (
        <div className="p-4 bg-white shadow-md rounded-xl max-w-xl mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Upload Garmin CSV File</h2>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
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
