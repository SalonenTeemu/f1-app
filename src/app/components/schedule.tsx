import { Race } from "@/app/types/types";
import {
  isRaceFinished,
  getNextRaceIndex,
  formatTime,
  formatDate,
} from "@/app/utils/utils";
import ScrollToNextRaceButton from "@/app/components/scrollToNextRaceButton";

export default async function Schedule() {
  let raceScheduleData: Race[] | null = null;
  let error: string | null = null;

  try {
    const data = await getRaceScheduleData();
    if (data instanceof Array && data.length > 0) {
      raceScheduleData = data;
    } else {
      throw new Error("No races found");
    }
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error = err.message || "Failed to fetch race schedule data";
  }

  if (error) {
    return <div className="text-slate-50">Error: {error}</div>;
  }

  if (!raceScheduleData || raceScheduleData.length === 0) {
    return <div className="text-slate-50">No races found</div>;
  }

  const nextRaceIndex = getNextRaceIndex(raceScheduleData);

  return (
    <main className="w-full min-h-screen relative bg-slate-950 text-slate-50 selection:bg-lime-500 scroll-smooth">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">
            Formula 1 {raceScheduleData[0].season} Race Schedule
          </h1>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-md bg-zinc-700 border border-slate-50 mr-2"></div>
              <span>Finished Race</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-md bg-lime-500 border border-slate-50 mr-2"></div>
              <span>Next Race</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-md bg-slate-950 border border-slate-50 mr-2"></div>
              <span>Upcoming Race</span>
            </div>
          </div>
        </div>
        <ul className="grid gap-4">
          {raceScheduleData.map((race, index) => {
            const formattedDate = formatDate(race.date);
            const formattedTime = formatTime(race.time);

            return (
              <li
                key={index}
                id={`race${index + 1}`}
                className={`border p-4 rounded-md ${
                  isRaceFinished(race.date) ? "bg-zinc-700" : ""
                } ${
                  index === nextRaceIndex ? "bg-lime-500 text-slate-950" : ""
                }`}>
                <h2 className="text-xl font-bold">
                  {race.round}. {race.raceName}
                </h2>
                <p>Date: {formattedDate}</p>
                {formattedTime && <p>Time: {formattedTime}</p>}
                <p>
                  Location: {race.Circuit.Location.locality},{" "}
                  {race.Circuit.Location.country}
                </p>
                <p>Circuit: {race.Circuit.circuitName}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <ScrollToNextRaceButton nextRaceIndex={nextRaceIndex} />
    </main>
  );
}

/**
 * Fetches the race schedule data from external jolpica f1 API.
 * @returns {Promise<Race[]>} A promise that resolves to an array of Race objects.
 * @throws {Error} If fetching the data fails or if the data format is invalid.
 */
async function getRaceScheduleData(): Promise<Race[]> {
  const res = await fetch("https://api.jolpi.ca/ergast/f1/current.json", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch race data");
  }
  const data = await res.json();
  console.log("Fetched race data");

  if (data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races) {
    return data.MRData.RaceTable.Races.map((race: Race) => ({
      season: race.season,
      round: race.round,
      raceName: race.raceName,
      date: race.date,
      time: race.time,
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
