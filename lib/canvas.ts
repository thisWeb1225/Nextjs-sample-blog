import { TextOptionsType } from "../components/particleText/particleText";

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  canvasContainer?: HTMLDivElement
) => {
  
  if (canvasContainer) {
    const canvasContainerRect = canvasContainer.getBoundingClientRect()
    canvas.width = canvasContainerRect.width;
    canvas.height = canvasContainerRect.height;
  } else {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
};

export const clearCanvas = (
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const darwCanvasText = (
  canvas: HTMLCanvasElement,
  texts: TextOptionsType[],
  locale: string,
) => {
  const ctx = canvas.getContext('2d');
  texts.forEach((text) => {
    const { content, contentCh, size, weight, color, x, y, align } = text;

    ctx.textAlign = align?.x || 'center';
    ctx.textBaseline = align?.y || 'middle';

    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px Inter`;

    const lineHeight = size;

    if (locale === 'en' || !contentCh) wrapText(content, x, y, lineHeight, canvas);
    else wrapText(contentCh, x, y, lineHeight, canvas);
    
  });
};

const wrapText = (content, x, y, lineHeight, canvas) => {
  const ctx = canvas.getContext('2d');

  const maxTextWidth = canvas.width * 0.7;
  let linesArray = [];
  let lineCounter = 0;
  let line = '';
  let words = content.split(' ');
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
