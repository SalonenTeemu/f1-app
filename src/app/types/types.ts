// Represents a race event in the Formula 1 schedule.
interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
}

// Represents a driver in the Formula 1 standings.
interface Driver {
  position: number;
  points: number;
  wins: number;
  Driver: {
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructor: {
    name: string;
  };
}

// Represents a constructor in the Formula 1 standings.
interface Constructor {
  position: number;
  points: number;
  wins: number;
  Constructor: {
    name: string;
    nationality: string;
  };
}
