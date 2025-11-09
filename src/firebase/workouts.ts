import {db} from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export interface Workout {
    id?: string;
    userId: string;
    date: string;
    title: string;
    distance: number;
    calories: number;
    time: number;
    averageHeartRate: number;
    averagePace: number;
    steps: number;
    minElevation: number;
    maxElevation: number;
}

// Single workout save
export const saveWorkout = async (workout:Workout) => {
    try {
        const workoutsRef = collection(db, "workouts");
        await addDoc(workoutsRef, workout);
        console.log("Workout saved successfully");
        return true;
    } catch (error) {
        console.error("error saving workout:", error);
        throw error;
    }
};

// Bulk save workouts
export const saveWorkouts = async (workouts:Workout[]) => {
    try {
        const workoutsRef = collection(db, "workouts");
        const promises = workouts.map(workout => addDoc(workoutsRef, workout));
        await Promise.all(promises);
        console.log('Saved ${workouts.length} workouts successfully');
        return true;
    } catch (error) {
        console.error('Error saving workouts:', error);
        throw error;
    }
};

// Get workouts for a specific user
export const getUserWorkouts = async (userId: string) => {
    try {
        const workoutsRef = collection(db, "workouts");
        const q = query(workoutsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const workouts: Workout[] = [];
        querySnapshot.forEach((doc) => {
            workouts.push({id: doc.id, ...doc.data() } as Workout);
        });

        return workouts;
    } catch (error) {
        console.error('Error getting workouts:', error);
        throw error;
    }
}