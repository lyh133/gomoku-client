export type playerType = "black" | "white";

export type move = {
    rowIndex: number;
    colIndex: number;
    player : playerType;
}

export type gameHistory = {
  date: string;
  winner: playerType | null;
  moves: Array<move>;
}