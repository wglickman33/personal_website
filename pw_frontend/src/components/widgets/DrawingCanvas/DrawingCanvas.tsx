import { useRef, useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import './DrawingCanvas.scss';

interface DrawingCanvasProps {
  isPreview?: boolean;
}

const DrawingCanvas = ({ isPreview = false }: DrawingCanvasProps) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef('#3b82f6');
  const brushSizeRef = useRef(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const wasInitialized = canvas.width > 0 && canvas.height > 0;
    const needsResize = canvas.width !== rect.width || canvas.height !== rect.height;
    
    if (needsResize) {
      const imageData = wasInitialized ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      if (imageData) {
        ctx.putImageData(imageData, 0, 0);
      }
    }

    if (isPreview) {
      if (!wasInitialized || needsResize) {
        ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.strokeStyle = '#3b82f6';
      ctx.fillStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX + radius * 0.3, centerY - radius * 0.2, radius * 0.15, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7, 0.2, Math.PI - 0.2);
      ctx.stroke();
    } else {
      if (!wasInitialized) {
        ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = brushSizeRef.current;
    }
  }, [theme, isPreview]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isPreview) return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    
    ctx.strokeStyle = colorRef.current;
    ctx.lineWidth = brushSizeRef.current;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isPreview) return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = colorRef.current;
    ctx.lineWidth = brushSizeRef.current;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorChange = (newColor: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setColor(newColor);
    setHexInput(newColor);
    colorRef.current = newColor;
    
    if (isDrawing) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = newColor;
        }
      }
    }
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value);
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexPattern.test(value)) {
      handleColorChange(value);
    }
  };

  const handleHexInputBlur = () => {
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexPattern.test(hexInput)) {
      setHexInput(color);
    }
  };

  const colors = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#6366f1',
  ];

  return (
    <div className={`drawing-canvas drawing-canvas--${theme} ${isPreview ? 'drawing-canvas--preview' : ''}`}>
      {!isPreview && (
        <div className="drawing-canvas__controls">
          <div className="drawing-canvas__color-picker">
            <label>Color:</label>
            <div className="drawing-canvas__color-selector">
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  const newColor = e.target.value;
                  handleColorChange(newColor);
                  if (isDrawing) {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.strokeStyle = newColor;
                      }
                    }
                  }
                }}
                className="drawing-canvas__color-input"
                aria-label="Color picker"
              />
              <div className="drawing-canvas__hex-input-wrapper">
                <span className="drawing-canvas__hex-prefix">#</span>
                <input
                  type="text"
                  value={hexInput.replace('#', '')}
                  onChange={(e) => handleHexInputChange(`#${e.target.value}`)}
                  onBlur={handleHexInputBlur}
                  className="drawing-canvas__hex-input"
                  placeholder="000000"
                  maxLength={6}
                  aria-label="Hex color code"
                />
              </div>
            </div>
            <div className="drawing-canvas__colors">
              <span className="drawing-canvas__quick-colors-label">Quick Colors:</span>
              <div className="drawing-canvas__color-buttons">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`drawing-canvas__color-btn ${color === c ? 'drawing-canvas__color-btn--active' : ''}`}
                    style={{ backgroundColor: c }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleColorChange(c, e);
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleColorChange(c, e);
                    }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="drawing-canvas__brush-size">
            <label>Brush Size: {brushSize}px</label>
            <input
              type="range"
              min="2"
              max="20"
              value={brushSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setBrushSize(newSize);
                brushSizeRef.current = newSize;
                if (isDrawing) {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.lineWidth = newSize;
                    }
                  }
                }
              }}
            />
          </div>
          <button className="drawing-canvas__clear-btn" onClick={clearCanvas}>
            Clear Canvas
          </button>
        </div>
      )}
      <div className="drawing-canvas__canvas-container">
        <canvas
          ref={canvasRef}
          className="drawing-canvas__canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;

