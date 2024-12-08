interface ComfyWorkflowInput {
  prompt: string;
  imageStyle: string;
  orientation: string;
}

export const generateImage = async ({ prompt, imageStyle, orientation }: ComfyWorkflowInput) => {
  // Use window.location.hostname to dynamically get the correct host
  const host = window.location.hostname === 'localhost' ? '127.0.0.1' : window.location.hostname;
  const baseUrl = `http://${host}:8188`;
  
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

  try {
    console.log('Attempting to connect to ComfyUI at:', baseUrl);
    
    // Queue the prompt
    const promptResponse = await fetch(`${baseUrl}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        prompt: workflowInputs
      })
    });

    if (!promptResponse.ok) {
      console.error('ComfyUI prompt error:', await promptResponse.text());
      throw new Error('Failed to queue prompt');
    }

    const { prompt_id } = await promptResponse.json();
    console.log('Prompt queued with ID:', prompt_id);
    
    // Poll for completion
    while (true) {
      const historyResponse = await fetch(`${baseUrl}/history/${prompt_id}`);
      
      if (!historyResponse.ok) {
        console.error('ComfyUI history error:', await historyResponse.text());
        throw new Error('Failed to check history');
      }

      const history = await historyResponse.json();
      
      if (history[prompt_id]?.outputs?.[3]?.images?.[0]) {
        // Get the image data
        const imageName = history[prompt_id].outputs[3].images[0].filename;
        return `${baseUrl}/view?filename=${imageName}`;
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('ComfyUI generation error:', error);
    throw new Error('Failed to generate image');
  }
};