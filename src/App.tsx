import { useState } from "react";
import "./App.css";
import { DiaryEntryForm } from "./DiaryEntryForm";
import { DiaryEntryList } from "./DiaryEntryList";
import { DiaryEntry } from "./types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const addEntry = (newEntry: Omit<DiaryEntry, "id">) => {
    setDiaryEntries((prevEntries) => [
      { ...newEntry, id: Date.now() },
      ...prevEntries,
    ]);
  };

  const removeEntry = (id: number) => {
    setDiaryEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== id)
    );
  };

  return (
    <div className="App">
      <h1>Diary Entry Tracker</h1>
      <DiaryEntryForm onSave={addEntry} />
      <DiaryEntryList diaryEntries={diaryEntries} onDelete={removeEntry} />
    </div>
  );
}

export default App;
