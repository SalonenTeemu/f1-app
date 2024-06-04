import { Race } from "./types/types";

export default async function Home() {
  let raceScheduleData: Race[] | null = null;
  let error: string | null = null;

  try {
    const data = await getRaceScheduleData();
    if (data instanceof Array && data.length > 0) {
      raceScheduleData = data;
    } else {
      throw new Error("No races found");
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    error = err.message || "Failed to fetch race schedule data";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!raceScheduleData || raceScheduleData.length === 0) {
    return <div>No races found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        Todo: Has race been raced?, show current/next race, to the top button,
        styling, favicon
      </div>
      <h1 className="text-3xl font-bold mb-4">F1 Schedule</h1>
      <ul className="grid gap-4">
        {raceScheduleData.map((race, index) => (
          <li key={index} className="border p-4 rounded-md">
            <h2 className="text-xl font-bold">{race.raceName}</h2>
            <p>Date: {race.date}</p>
            <p>Round: {race.round}</p>
            <p>
              Location: {race.Circuit.Location.locality},{" "}
              {race.Circuit.Location.country}
            </p>
            <p>Circuit: {race.Circuit.circuitName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getRaceScheduleData(): Promise<Race[]> {
  const res = await fetch("https://ergast.com/api/f1/current.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("Fetched data:", data);

  if (data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races) {
    return data.MRData.RaceTable.Races.map((race: Race) => ({
      season: race.season,
      round: race.round,
      raceName: race.raceName,
      date: race.date,
      Circuit: {
        circuitName: race.Circuit.circuitName,
        Location: {
          locality: race.Circuit.Location.locality,
          country: race.Circuit.Location.country,
        },
      },
    }));
  } else {
    throw new Error("Invalid data format");
  }
}
