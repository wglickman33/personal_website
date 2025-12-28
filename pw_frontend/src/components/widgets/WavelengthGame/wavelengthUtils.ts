export const clampAngle = (angle: number): number => {
  return Math.max(0, Math.min(180, angle));
};

export const angleFromPointer = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  radius: number
): number => {
  const dx = x - centerX;
  const dy = centerY - y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < radius * 0.3) {
    return 90;
  }
  
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  if (angle < 0) {
    angle += 360;
  }
  
  angle = 180 - angle;
  
  return clampAngle(angle);
};

export const wedgeIndex = (angle: number, wedgeCount: number = 7): number => {
  const wedgeSize = 180 / wedgeCount;
  const index = Math.floor(angle / wedgeSize);
  return Math.min(index, wedgeCount - 1);
};

export const scoreFromGuess = (targetAngle: number, guessAngle: number): number => {
  const targetWedge = wedgeIndex(targetAngle, 7);
  const guessWedge = wedgeIndex(guessAngle, 7);
  const distance = Math.abs(targetWedge - guessWedge);
  
  if (distance === 0) return 4;
  if (distance === 1) return 3;
  if (distance === 2) return 2;
  return 0;
};

export const angleToPoint = (angle: number, centerX: number, centerY: number, radius: number): { x: number; y: number } => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
};

