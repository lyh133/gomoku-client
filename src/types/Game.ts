export type playerType = "black" | "white";
export type gameResult = "black" | "white" | "draw";
export type move = {
    rowIndex: number;
    colIndex: number;
    player : playerType;
    moveNum: number;
}

export type gameState = {
  board: Array<Array<string | null>>;
  result: gameResult | null;
  isFinished: boolean;
  moves: Array<move>;
  turn: playerType;
}

export type gameHistory = {
  date: string;
  result: gameResult;
  size: Number;
  moves: Array<move>;
}