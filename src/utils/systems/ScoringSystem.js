export class ScoringSystem {
  constructor() {
    this.score = 0;
    this.highScore = localStorage.getItem("snakeHighScore") || 0;
  }

  addScore(points = 1) {
    this.score += points;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHighScore", this.highScore);
    }
    return this.score;
  }

  getScore() {
    return this.score;
  }

  getHighScore() {
    return this.highScore;
  }

  resetScore() {
    this.score = 0;
    return this.score;
  }
}
