# Custom Rules for Image Generation and Visual Requests

For all visual requests, adopt the following protocol:

1. **Analyze Intent**: Determine if a design-based (Level 1/2) or diffusion-based (Level 3) approach is optimal.
   - **Level 1 (Code-based/Pillow)**: Best for typographic layouts, posters with text, quote cards, structured geometric/Bauhaus designs, clean pastel carousels, or abstract vector backgrounds.
   - **Level 2 (Three.js/3D Scene)**: Best for 3D renders, Apple-light style studio product shots, abstract 3D geometry, low-poly environments.
   - **Level 3 (Cloudflare Workers AI/Flux)**: Best for complex photographic shots, illustrations, realistic environments, concept art.

2. **Quality & Variations**:
   - If multiple images are requested, or if the user asks for a 'high-quality' asset, generate a batch of 3 variations using slightly varied prompts/seeds.
   - Evaluate the 3 variations for design consistency, quality, and prompt alignment, and select the single best one.

3. **Asset Management**:
   - Automatically save all final selected images into the `/assets/` directory of the project.
   - Notify the user of the final file path.
