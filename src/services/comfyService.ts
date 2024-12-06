interface ComfyWorkflowInput {
  prompt: string;
  imageStyle: string;
  orientation: string;
}

export const generateImage = async ({ prompt, imageStyle, orientation }: ComfyWorkflowInput) => {
  const baseUrl = 'http://127.0.0.1:8188';
  
  // Prepare the workflow inputs
  const workflowInputs = {
    "6": { // CLIP Text Encode node
      "text": `${imageStyle} style, ${prompt}`
    },
    "5": { // Empty Latent Image node
      "width": orientation === "landscape" ? 768 : 512,
      "height": orientation === "landscape" ? 512 : 768,
      "batch_size": 1
    }
  };

  try {
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

    const { prompt_id } = await promptResponse.json();
    
    // Poll for completion
    while (true) {
      const historyResponse = await fetch(`${baseUrl}/history/${prompt_id}`);
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