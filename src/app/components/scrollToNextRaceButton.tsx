"use client";

interface ScrollToNextRaceButtonProps {
  nextRaceIndex: number;
}

export default function ScrollToNextRaceButton({ nextRaceIndex }: ScrollToNextRaceButtonProps) {
  function scrollToNextRace() {
    const nextRaceElement = document.getElementById(`race${nextRaceIndex + 1}`);
    if (nextRaceElement) {
      nextRaceElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      className="fixed top-12 right-4 px-4 py-2 text-slate-50 rounded-md border border-slate-50 hover:text-lime-500 hover:border-lime-500 transition-none md:transition ease-in-out md:hover:-translate-y-1 duration-150 motion-reduce:transition-none"
      onClick={scrollToNextRace}
    >
      Show Next Race
    </button>
  );
}
