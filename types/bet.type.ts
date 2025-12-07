// Partie pari simplement parlant

export interface BetTeamType {
  name: string;
  crest: string;
  tla: string;
}

export interface MatchModel {
  id?: number | string;
  score: string;
  winner: string;
  homeTeam: BetTeamType;
  awayTeam: BetTeamType;
  start_at: string;
  end_at: string;
  winPercentage: number;
  lossPercentage: number;
  created_at?: string;
  isActive: boolean;
  isEnded: boolean;
}

export interface BetModel {
  id?: string;
  uid: string;
  matchId: string | number;
  match: MatchModel;
  prediction: string;
  win?: boolean;
  potentialGain: number;
  potentialLoss: number;
  created_at?: string;
}

export interface MatchModelResponse {
  message: string;
  data: MatchModel;
}

export interface MatchsModelResponse {
  message: string;
  data: MatchModel[];
}

export interface BetModelResponse {
  message: string;
  data: BetModel;
}

export interface BetsModelResponse {
  message: string;
  data: BetModel[];
}
