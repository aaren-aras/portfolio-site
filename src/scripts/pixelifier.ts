export async function pixelifyImage(imgPath: string, sampleSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imgPath;

    img.onload = () => {
      const c = document.createElement('canvas');
      const w = img.width;
      const h = img.height;

      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (!ctx) {
        reject('Canvas 2D context not available');
        return;
      }

      ctx.drawImage(img, 0, 0);

      const pixelArr = ctx.getImageData(0, 0, w, h).data;

      for (let y = 0; y < h; y += sampleSize) {
        for (let x = 0; x < w; x += sampleSize) {
          const p = (x + y * w) * 4;
          ctx.fillStyle =
            'rgba(' +
            pixelArr[p] +
            ',' +
            pixelArr[p + 1] +
            ',' +
            pixelArr[p + 2] +
            ',' +
            pixelArr[p + 3] +
            ')';
          ctx.fillRect(x, y, sampleSize, sampleSize);
        }
      }

      resolve(c.toDataURL());
    };

    img.onerror = () => {
      reject('Failed to load image');
    };
  });
}
