import { textOptionsType } from '../components/particleText/particleText';

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  canvasContainer: HTMLElement
) => {
  if (canvasContainer) {
    const containerRect = canvasContainer.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;
  } else {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
};

export const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const darwCanvasText = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  texts: textOptionsType[]
) => {

  texts.forEach((text) => {
    const { content, size, weight, color, x, y, align } = text;

    ctx.textAlign = align?.x || 'center';
    ctx.textBaseline = align?.y || 'middle';

    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px Inter`;

    const lineHeight = size;

    wrapText(content, x, y, lineHeight, size, ctx, canvas);
  });
};

const wrapText = (text, x, y, lineHeight, size, ctx, canvas) => {
  const maxTextWidth = canvas.width * 0.7;
  let linesArray = [];
  let lineCounter = 0;
  let line = '';
  let words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    let textLine = `${line}${words[i]} `;
    if (ctx.measureText(textLine).width > maxTextWidth) {
      line = `${words[i]} `;
      lineCounter++;
    } else {
      line = textLine;
    }
    linesArray[lineCounter] = line;
  }

  let textHeight = lineHeight * lineCounter;
  let textY = y - textHeight / 2;

  linesArray.forEach((char, i) => {
    ctx.fillText(char, x, textY + i * lineHeight);
  });
};
