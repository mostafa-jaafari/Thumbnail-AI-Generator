"use server";

export async function generateThumbnailAction(
    topic: string,
    aspectRatio: string,
    thumbnailStyle: { title: string; description: string },
    colorScheme: { name: string; colors: string[] },
    additionalPrompt: string,
) {
    // 1. Clean up the style description to avoid conflicting terms
    // We remove words that might trigger text generation
    const cleanStyle = thumbnailStyle.description.replace(/text|typography|font/gi, "visuals");

    // 2. Construct a prompt optimized for Flux/Realism
    // Key changes:
    // - Removed "YouTube thumbnail" (STOPs gibberish text)
    // - Added "Hyper-realistic", "Depth of field" (STARTs realism)
    // - Added "Cinematic lighting" (Makes it pop like a thumbnail)
    const prompt = `A hyper-realistic, award-winning photography shot of ${topic}. 
    The image features a ${thumbnailStyle.title} aesthetic (${cleanStyle}).
    Lighting and atmosphere: Cinematic, volumetric lighting, rim light to separate subject from background.
    Color palette: ${colorScheme.name} with accents of ${colorScheme.colors.join(", ")}.
    ${additionalPrompt ? `Specific details: ${additionalPrompt}.` : ""}
    Technical details: 8k resolution, highly detailed texture, sharp focus on the subject, f/1.8 aperture, ray tracing, unreal engine 5 render style.
    Composition: Dynamic angle, rule of thirds, clean background, no text, no watermark.`;

    // 3. Map Aspect Ratio
    let width = 1280;
    let height = 720;

    if (aspectRatio === "1:1") { width = 1024; height = 1024; }
    if (aspectRatio === "9:16") { width = 720; height = 1280; }

    // 4. Randomize Seed
    const randomSeed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt);
    
    // 5. Pollinations URL
    // We add 'enhance=true' if the API supports it (helps with prompt understanding)
    // We ensure 'nologo=true' is active
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${randomSeed}&model=flux`;

    return imageUrl; 
}