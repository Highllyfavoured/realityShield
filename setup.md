# RealityShield AI - Setup Guide

## Overview
RealityShield AI is an advanced, real-time multimodal detection ecosystem designed to identify and neutralize synthetic deception. This guide will help you set up and run the application locally.

## Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm package manager
- Modern web browser with microphone access for audio recording
- **Hugging Face account and API token** (for real AI model integration)

## Installation

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd realityshield-ai
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

#### Get Your Hugging Face API Token
1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up or log in to your account
3. Navigate to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token"
5. Give it a name (e.g., "RealityShield AI")
6. Select "Read" permission (recommended) or "Write" if needed
7. Click "Generate token"
8. Copy your token

#### Set Up .env File
```bash
# Copy the example environment file
cp .env.example .env



# Edit .env and replace with your actual token
# The file should look like this:
VITE_HUGGINGFACE_API_TOKEN=hf_YourActualTokenHere123456789
```

**Important Security Notes:**
- ⚠️ Never commit your `.env` file to version control
- ⚠️ Keep your Hugging Face token secret
- ⚠️ The `.env` file is already in `.gitignore` to prevent accidental commits
- ⚠️ In production, use environment variables from your hosting provider

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will start on `http://localhost:5173` (or another available port).

## Project Structure

```
realityshield-ai/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Hero.jsx              # Hero section with animated background
│   │   │   ├── DetectionModule.jsx   # Individual detection modules
│   │   │   ├── ResultsPanel.jsx      # Results display with animations
│   │   │   └── ui/                   # Reusable UI components
│   │   └── App.jsx                   # Main application component
│   └── styles/
│       ├── index.css                 # Global styles
│       ├── tailwind.css              # Tailwind imports
│       └── theme.css                 # Custom theme variables
├── .env.example                      # Example environment variables
├── .env                              # Your actual environment variables (DO NOT COMMIT)
├── package.json
├── vite.config.ts
└── setup.md                          # This file
```

## Features

### 1. Media Forensic (Image/Video Analysis)
- Upload images or video files
- Detects AI-generated content using neural forensics
- Model: `umm-maybe/AI-image-detector`
- Analyzes latent space artifacts and sensor noise patterns

### 2. Audio Forensic (Voice Clone Detection)
- **Upload audio files** (.wav, .mp3, .flac)
- **Record audio directly** using built-in microphone
- Detects synthetic voices and deepfake audio
- Model: `mo-thecreator/Deepfake-audio-detection`
- Scans for spectral discontinuities and phoneme mismatches

### 3. Text Veracity Analysis
- Paste text or news articles
- Detects fake news and misinformation
- Model: `dhruvpal/fake-news-bert`
- Analyzes stylometric fingerprinting and emotional loading

## Using the Application

### Media Detection
1. Click on the "Media Forensic" module
2. Click "Upload Media" button
3. Select an image or video file
4. Wait for analysis results from Hugging Face API

### Audio Detection
**Option 1: Upload Audio File**
1. Click on the "Audio Forensic" module
2. Click "Upload Audio" button
3. Select an audio file (.wav, .mp3, etc.)
4. Wait for analysis results

**Option 2: Record Audio**
1. Click on the "Audio Forensic" module
2. Click the microphone icon to start recording
3. Speak into your microphone
4. Click stop when finished
5. Analysis will begin automatically

**Microphone Permission Denied?**
- Click the lock icon (🔒) in your browser's address bar
- Allow microphone access for this site
- Refresh the page and try again

### Text Detection
1. Click on the "Text Veracity" module
2. Paste your text into the textarea
3. Click "Analyze Text"
4. View the credibility score and explanation from the AI model

## Understanding Results

### Credibility Score
- **0-15%**: Highly Trusted (Authentic content)
- **15-30%**: Trusted (Likely authentic)
- **30-50%**: Likely Authentic
- **50-75%**: Moderate Risk (Possible manipulation)
- **75-90%**: High Risk (Likely synthetic)
- **90-100%**: Extreme Risk (Highly confident synthetic content)

### Result Components
- **Detection Label**: Classification (Authentic/Artificial/Fake/Real)
- **Confidence Score**: Model's certainty percentage
- **Forensic Explanation**: Human-readable justification for the result
- **Risk Level Badge**: Visual indicator of credibility

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 18.3 |
| Styling | Tailwind CSS 4.0 |
| Animations | Motion (formerly Framer Motion) |
| UI Components | Radix UI |
| Icons | Lucide React |
| Build Tool | Vite 6.3 |
| Language | JavaScript (ES6+) |
| AI API | Hugging Face Inference API |

## Hugging Face API Integration

### How It Works
The app uses the Hugging Face Inference API to run AI models:
- API calls are made from the browser to Hugging Face endpoints
- Each model has a specific endpoint URL
- Your API token authenticates the requests
- Results are returned in real-time

### API Rate Limits
- **Free tier**: Limited requests per hour
- **PRO tier**: Higher rate limits
- **Enterprise**: Unlimited requests

If you encounter rate limit errors, consider:
1. Upgrading your Hugging Face account
2. Adding retry logic with exponential backoff
3. Using a different model with better availability

### Supported Models
```javascript
// Media Detection
umm-maybe/AI-image-detector

// Audio Detection  
mo-thecreator/Deepfake-audio-detection

// Text Detection
dhruvpal/fake-news-bert
```

## Browser Permissions

### Microphone Access
When using the audio recording feature:
1. Your browser will prompt for microphone permission
2. Click "Allow" to enable recording
3. Permission is required only for the recording feature
4. You can still upload audio files without granting permission

### HTTPS Requirement
- Microphone access requires HTTPS or localhost
- In production, ensure your site uses HTTPS
- Development on localhost works without HTTPS

## Troubleshooting

### "Invalid API Token" Error
```bash
# Check your .env file
cat .env

# Make sure it looks like this:
VITE_HUGGINGFACE_API_TOKEN=hf_YourActualTokenHere

# Restart the dev server after changing .env
npm run dev
```

### "Model Not Found" Error
- The model might be private or renamed
- Check the model exists on Hugging Face
- Try using an alternative model
- Ensure your token has the right permissions

### Port Already in Use
If port 5173 is busy:
```bash
# Vite will automatically try the next available port
# Or specify a custom port:
vite --port 3000
```

### Microphone Not Working
- Ensure browser has microphone permissions
- Check if another application is using the microphone
- Try using HTTPS (required for some browsers)
- Verify microphone hardware is functioning
- Look for error messages in the UI (shown in red below the Record button)

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### API Request Failed
- Check your internet connection
- Verify your Hugging Face token is valid
- Check if the model is available (some models have downtime)
- Look at browser console for detailed error messages
- Try a different model as fallback

## Performance

### With Real API Integration
- **Image Analysis**: 2-5s (depends on file size and API load)
- **Audio Analysis**: 3-8s (depends on audio length and API load)
- **Text Analysis**: 1-3s (depends on text length)
- **Video Analysis**: May take longer for video files

### Tips for Better Performance
- Compress images before uploading
- Keep audio recordings under 30 seconds
- Limit text to 5000 characters
- Use good internet connection

## Security & Privacy

### Client-Side Processing
- Files are sent directly to Hugging Face API
- No intermediate server storage
- Temporary processing only

### Data Privacy
- ⚠️ Do not upload sensitive or private content
- Hugging Face may log API requests
- Review [Hugging Face Privacy Policy](https://huggingface.co/privacy)
- For sensitive data, consider self-hosted models

### Token Security
- Never share your API token
- Don't commit .env to git
- Rotate tokens regularly
- Use read-only tokens when possible

## Development Mode vs Production

### Development (Current Setup)
- API calls from browser directly
- Token exposed in client-side code
- Good for testing and prototyping

### Production Recommendations
1. **Backend Proxy**: Create a backend server to handle API calls
2. **Token Management**: Store tokens server-side only
3. **Rate Limiting**: Implement your own rate limiting
4. **Caching**: Cache results to reduce API calls
5. **Error Handling**: Robust error handling and retries
6. **Monitoring**: Track API usage and costs

### Example Production Architecture
```
User Browser
    ↓
Your Backend Server (Node.js/Python)
    ↓ (API token stored here)
Hugging Face API
```

## Cost Estimation

### Free Tier
- Good for testing and development
- Limited requests per hour
- May experience rate limits

### PRO Subscription ($9/month)
- Faster inference
- Higher rate limits
- Priority access

### Enterprise
- Custom pricing
- Unlimited requests
- Dedicated support

## Alternative Models

If the specified models don't work, try these alternatives:

### Image Detection
- `Organika/sdxl-detector`
- `umm-maybe/AI-image-detector-v2`
- `clip-image-classifier`

### Audio Detection
- `jonatasgrosman/wav2vec2-large-xlsr-53-english`
- `speechbrain/spkrec-ecapa-voxceleb`
- `facebook/wav2vec2-base-960h`

### Text Detection
- `FacebookAI/roberta-base-openai-detector`
- `roberta-fake-news-detector`
- `distilbert-base-uncased-finetuned-sst-2-english`

## License & Usage

RealityShield AI © 2026 - Educational/demonstration purposes.

**Disclaimer**: This tool is for educational and research purposes. Results should not be considered 100% accurate. Always verify important content through multiple sources.

## Support

For issues, questions, or contributions:
- Review the code documentation
- Check browser console for errors
- Ensure all dependencies are installed
- Verify Node.js version compatibility
- Check Hugging Face API status
- Review your API token permissions

---

**Ready to detect synthetic deception!** 🛡️

## Quick Start Checklist

- [ ] Node.js installed (v18+)
- [ ] Dependencies installed (`npm install`)
- [ ] Hugging Face account created
- [ ] API token generated
- [ ] `.env` file configured with token
- [ ] Dev server running (`npm run dev`)
- [ ] Browser microphone permissions granted (for audio recording)
- [ ] Test each detection module

**Enjoy using RealityShield AI!**
