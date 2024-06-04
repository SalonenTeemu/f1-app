interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    circuitName: string;
    Location: {
      locality: string;
      country: string;
    };
  };
}
