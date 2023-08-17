export type playerType = "black" | "white";

export type move = {
    rowIndex: number;
    colIndex: number;
    player : playerType;
    moveNum: number;
}

export type gameHistory = {
  date: string;
  winner: playerType | null;
  size: Number;
  moves: Array<move>;
}