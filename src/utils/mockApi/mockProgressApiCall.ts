/**
 * Імітація прогресу довготривалої операції (backup, export тощо)
 */
export async function mockProgressApiCall(
  onProgress: (progress: number) => void,
  totalDuration: number = 5000,
  updateInterval: number = 200
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    let progress = 0;
    const steps = totalDuration / updateInterval;
    const progressIncrement = 100 / steps;

    const interval = setInterval(() => {
      progress += progressIncrement;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);
        resolve({
          success: true,
          message: 'Операція завершена успішно',
        });
      } else {
        onProgress(Math.min(progress, 100));
      }
    }, updateInterval);
  });
}
