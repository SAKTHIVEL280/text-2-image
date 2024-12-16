interface ComfyWorkflowInput {
  prompt: string;
  imageStyle: string;
  orientation: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const checkComfyUIAvailability = async (baseUrl: string) => {
  try {
    const response = await fetch(`${baseUrl}/system_stats`);
    return response.ok;
  } catch (error) {
    console.error('ComfyUI availability check failed:', error);
    return false;
  }
};

export const generateImage = async ({ prompt, imageStyle, orientation }: ComfyWorkflowInput) => {
  // Use window.location.hostname to dynamically get the correct host
  const host = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname;
  const baseUrl = `http://${host}:8188`;
  
  // Check if ComfyUI is available
  const isAvailable = await checkComfyUIAvailability(baseUrl);
  if (!isAvailable) {
    throw new Error('ComfyUI service is not available. Please ensure ComfyUI is running and accessible.');
  }

  // Get the selected plan from localStorage
  const selectedPlan = localStorage.getItem('selectedPlan');
  const dimensions = selectedPlan === 'Premium' ? 1080 : 512;
  
  // Prepare the workflow inputs
  const workflowInputs = {
    "6": { // CLIP Text Encode node
      "text": `${imageStyle} style, ${prompt}`
    },
    "5": { // Empty Latent Image node
      "width": dimensions,
      "height": dimensions,
      "batch_size": 1
    }
  };

  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1} to connect to ComfyUI at:`, baseUrl);
      
      // Queue the prompt
      const promptResponse = await fetch(`${baseUrl}/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: workflowInputs
        })
      });

      if (!promptResponse.ok) {
        throw new Error(`HTTP error! status: ${promptResponse.status}`);
      }

      const { prompt_id } = await promptResponse.json();
      console.log('Prompt queued with ID:', prompt_id);
      
      // Poll for completion
      let pollAttempts = 0;
      const MAX_POLL_ATTEMPTS = 30; // Maximum number of polling attempts

      while (pollAttempts < MAX_POLL_ATTEMPTS) {
        const historyResponse = await fetch(`${baseUrl}/history/${prompt_id}`);
        
        if (!historyResponse.ok) {
          throw new Error(`History check failed with status: ${historyResponse.status}`);
        }

        const history = await historyResponse.json();
        
        if (history[prompt_id]?.outputs?.[3]?.images?.[0]) {
          // Get the image data
          const imageName = history[prompt_id].outputs[3].images[0].filename;
          return `${baseUrl}/view?filename=${imageName}`;
        }
        
        pollAttempts++;
        await sleep(1000); // Wait 1 second before next poll
      }

      throw new Error('Image generation timed out');
      
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      lastError = error;
      
      if (attempt < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
        await sleep(RETRY_DELAY);
      }
    }
  }

  throw new Error(`Failed to generate image after ${MAX_RETRIES} attempts. Last error: ${lastError?.message}`);
};