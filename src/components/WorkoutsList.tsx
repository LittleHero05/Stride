import React, {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {getUserWorkouts, type Workout} from '../firebase/workouts';

const WorkoutsList: React.FC = () => {
    const {user} = useAuth();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // fetch workouts for the logged user
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setLoading(true);
            setError("");
            try {
                const items = await getUserWorkouts(user.uid);
                setWorkouts(items);
            } catch (err) {
                setError("Error fetching workouts");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    //helpers to ensure numeric math even if CSV produce strings
    const toNum = (v: unknown) => {
        if (typeof v === "number") return v;
        if (typeof v === "string") {
            const n =parseFloat(v.replace(/[^\d.]/g, ""));
            return Number.isNaN(n) ? 0 : n;
        }
        return 0;
    };
    
    //basic stats
    const totalWorkouts = workouts.length;
    const totalDistance  = workouts.reduce((sum, w ) => sum + toNum(w.distance), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + toNum(w.calories), 0);
    const avgPace = totalWorkouts > 0 ? workouts.reduce((sum, w) => sum + toNum(w.averagePace), 0) / totalWorkouts: 0;

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="p-4 bg-red-100 text-red-800 rounded">{error}</div>;
    
    return (
        <div className="p-4 bg-white shadow-md rounded-xl max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Metrics</h2>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-gray-600">Total Workouts</p>
          <p className="text-2xl font-bold text-blue-700">{totalWorkouts}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-gray-600">Total Distance</p>
          <p className="text-2xl font-bold text-green-700">{totalDistance.toFixed(2)} km</p>
        </div>
        <div className="bg-orange-50 p-4 rounded">
          <p className="text-sm text-gray-600">Total Calories</p>
          <p className="text-2xl font-bold text-orange-700">{totalCalories.toFixed(0)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-sm text-gray-600">Average Pace</p>
          <p className="text-2xl font-bold text-purple-700">{avgPace.toFixed(2)} min/km</p>
        </div>
      </div>

      {/*sample list of workouts*/}
      {workouts.length === 0 ? (
        <p className="text-center text-gray-600">No workouts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Title</th>
                <th className="px-3 py-2 border">Distance (km)</th>
                <th className="px-3 py-2 border">Time</th>
                <th className="px-3 py-2 border">Calories</th>
                <th className="px-3 py-2 border">Pace</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={w.id ?? i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">
                    {w.date ? new Date(w.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-3 py-2 border">{w.title || "N/A"}</td>
                  <td className="px-3 py-2 border">
                    {toNum(w.distance).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 border">{w.time ?? "N/A"}</td>
                  <td className="px-3 py-2 border">{toNum(w.calories).toFixed(0)}</td>
                  <td className="px-3 py-2 border">
                    {toNum(w.averagePace).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1">
            Showing {workouts.length} workouts
          </p>
          </div>
        )}
        </div>
    );

};

export default WorkoutsList;