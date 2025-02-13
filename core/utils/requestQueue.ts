const requestQueue: Array<() => Promise<void>> = [];

export const addToQueue = (request: () => Promise<void>) => {
  requestQueue.push(request);
};

export const retryQueuedRequests = async () => {
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      try {
        await request();
      } catch (error) {
        console.error("Failed to retry request:", error);
        // Re-add the request to the queue if it fails
        requestQueue.unshift(request);
        break;
      }
    }
  }
};