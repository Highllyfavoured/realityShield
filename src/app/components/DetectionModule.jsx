// import { useState, useRef } from 'react';
// import { motion } from 'motion/react';
// import { Upload, Loader2, Mic, Square, AlertCircle } from 'lucide-react';
// import { Button } from './ui/button';
// import { Textarea } from './ui/textarea';
// import { analyzeMedia, analyzeAudio, analyzeText, mockDetection, isTokenConfigured } from '../services/huggingface';

// export function DetectionModule({
//   type,
//   title,
//   subtitle,
//   description,
//   icon: Icon,
//   model,
//   setResult,
//   isAnalyzing,
//   setIsAnalyzing,
//   iconColor,
//   gradientFrom,
//   gradientTo
// }) {
//   const [textInput, setTextInput] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [microphoneError, setMicrophoneError] = useState('');
//   const [apiError, setApiError] = useState('');
//   const fileInputRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const recordingTimerRef = useRef(null);

//   const performDetection = async (file, textContent) => {
//     setIsAnalyzing(true);
//     setApiError('');
    
//     try {
//       let result;

//       // Check if token is configured
//       if (!isTokenConfigured()) {
//         console.warn('API token not configured, using mock detection');
//         setApiError('API token not configured. Using mock data. Add your Hugging Face token to .env file for real detection.');
//         // Add delay to simulate API call
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         result = mockDetection(type);
//       } else {
//         // Use real API
//         if (type === 'media') {
//           result = await analyzeMedia(file);
//         } else if (type === 'audio') {
//           result = await analyzeAudio(file);
//         } else if (type === 'text') {
//           result = await analyzeText(textContent);
//         }
//       }

//       setResult(result);
//     } catch (error) {
//       console.error('Detection error:', error);
//       setApiError(error.message || 'Analysis failed. Please try again.');
      
//       // Fall back to mock data on error
//       console.warn('Falling back to mock detection due to error');
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockResult = mockDetection(type);
//       mockResult.error = error.message;
//       setResult(mockResult);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//       performDetection(file);
//     }
//   };

//   const handleTextAnalysis = () => {
//     if (!textInput.trim()) return;
//     performDetection(null, textInput);
//   };

//   const startRecording = async () => {
//     // Clear any previous errors
//     setMicrophoneError('');
    
//     try {
//       // Check if getUserMedia is supported
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         setMicrophoneError('Microphone access is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Edge.');
//         return;
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//         const audioFile = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
//         setFileName(audioFile.name);
        
//         // Stop all tracks to release microphone
//         stream.getTracks().forEach(track => track.stop());
        
//         // Clear error on successful recording
//         setMicrophoneError('');
        
//         // Start analysis
//         performDetection(audioFile);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//       setRecordingTime(0);

//       // Start timer
//       recordingTimerRef.current = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);

//     } catch (error) {
//       console.error('Error accessing microphone:', error);
      
//       // Provide specific error messages based on error type
//       if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
//         setMicrophoneError('Microphone access denied. Please click the lock icon in your address bar and allow microphone access, then try again.');
//       } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
//         setMicrophoneError('No microphone found. Please connect a microphone and try again.');
//       } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
//         setMicrophoneError('Microphone is already in use by another application. Please close other apps using the microphone and try again.');
//       } else if (error.name === 'OverconstrainedError') {
//         setMicrophoneError('Microphone does not meet the required constraints. Please try a different microphone.');
//       } else if (error.name === 'SecurityError') {
//         setMicrophoneError('Microphone access blocked due to security restrictions. Please ensure you\'re using HTTPS or localhost.');
//       } else {
//         setMicrophoneError('Failed to access microphone. Please check your browser settings and try again.');
//       }
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
      
//       // Clear timer
//       if (recordingTimerRef.current) {
//         clearInterval(recordingTimerRef.current);
//         recordingTimerRef.current = null;
//       }
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -5 }}
//       transition={{ duration: 0.3 }}
//       className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 overflow-hidden group`}
//     >
//       {/* Animated background effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       {/* Content */}
//       <div className="relative z-10">
//         <div className="flex items-start gap-4 mb-4">
//           <div className={`p-3 bg-slate-900/50 rounded-xl ${iconColor}`}>
//             <Icon className="w-6 h-6" />
//           </div>
//           <div className="flex-1">
//             <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
//             <p className="text-sm text-slate-400">{subtitle}</p>
//           </div>
//         </div>

//         <p className="text-sm text-slate-300 mb-4 leading-relaxed">
//           {description}
//         </p>

//         {/* Model Tag */}
//         <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-700/50 rounded-lg mb-4">
//           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//           <span className="text-xs text-slate-400 font-mono">{model}</span>
//         </div>

//         {/* Input Section */}
//         {type === 'text' ? (
//           <div className="space-y-3">
//             <Textarea
//               placeholder="Paste text or news article to analyze..."
//               value={textInput}
//               onChange={(e) => setTextInput(e.target.value)}
//               className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 min-h-[120px] resize-none"
//               disabled={isAnalyzing}
//             />
//             <Button
//               onClick={handleTextAnalysis}
//               disabled={isAnalyzing || !textInput.trim()}
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//             >
//               {isAnalyzing ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Analyzing...
//                 </>
//               ) : (
//                 'Analyze Text'
//               )}
//             </Button>
//           </div>
//         ) : type === 'audio' ? (
//           <div className="space-y-3">
//             {/* File Upload */}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="audio/*"
//               onChange={handleFileUpload}
//               className="hidden"
//               disabled={isAnalyzing || isRecording}
//             />
//             <Button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isAnalyzing || isRecording}
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white"
//             >
//               {isAnalyzing ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload Audio
//                 </>
//               )}
//             </Button>

//             {/* Divider */}
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-700/50"></div>
//               </div>
//               <div className="relative flex justify-center text-xs">
//                 <span className="bg-slate-900/50 px-2 text-slate-500">or</span>
//               </div>
//             </div>

//             {/* Microphone Recording */}
//             <Button
//               onClick={isRecording ? stopRecording : startRecording}
//               disabled={isAnalyzing}
//               className={`w-full ${
//                 isRecording 
//                   ? 'bg-red-600 hover:bg-red-700' 
//                   : 'bg-orange-600 hover:bg-orange-700'
//               } text-white`}
//             >
//               {isRecording ? (
//                 <>
//                   <Square className="w-4 h-4 mr-2" />
//                   Stop Recording {formatTime(recordingTime)}
//                 </>
//               ) : (
//                 <>
//                   <Mic className="w-4 h-4 mr-2" />
//                   Record Audio
//                 </>
//               )}
//             </Button>

//             {/* Recording Indicator */}
//             {isRecording && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center justify-center gap-2 text-red-400 text-sm"
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                   className="w-3 h-3 bg-red-500 rounded-full"
//                 />
//                 Recording in progress...
//               </motion.div>
//             )}

//             {fileName && !isRecording && (
//               <p className="text-xs text-slate-400 mt-2 truncate">
//                 Selected: {fileName}
//               </p>
//             )}

//             {microphoneError && (
//               <p className="text-xs text-red-400 mt-2 truncate">
//                 {microphoneError}
//               </p>
//             )}
//           </div>
//         ) : (
//           <div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*,video/*"
//               onChange={handleFileUpload}
//               className="hidden"
//               disabled={isAnalyzing}
//             />
//             <Button
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isAnalyzing}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               {isAnalyzing ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload Media
//                 </>
//               )}
//             </Button>
//             {fileName && (
//               <p className="text-xs text-slate-400 mt-2 truncate">
//                 Selected: {fileName}
//               </p>
//             )}
//           </div>
//         )}

//         {/* API Error Message */}
//         {apiError && (
//           <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-3 text-sm text-red-500">
//             <AlertCircle className="w-4 h-4 mr-2 inline-block" />
//             {apiError}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Loader2, Mic, Square, AlertCircle, X, Image as ImageIcon, Film, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { analyzeMedia, analyzeAudio, analyzeText, mockDetection, isTokenConfigured } from '../services/huggingface';

export function DetectionModule({
  type,
  title,
  subtitle,
  description,
  icon: Icon,
  model,
  setResult,
  isAnalyzing,
  setIsAnalyzing,
  iconColor,
  gradientFrom,
  gradientTo
}) {
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [microphoneError, setMicrophoneError] = useState('');
  const [apiError, setApiError] = useState('');
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);

  // Clean up memory when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const performDetection = async (file, textContent) => {
    setIsAnalyzing(true);
    setApiError('');
    
    try {
      let result;

      if (!isTokenConfigured()) {
        console.warn('API token not configured, using mock detection');
        setApiError('API token not configured. Using mock data. Add your Hugging Face token to .env file for real detection.');
        await new Promise(resolve => setTimeout(resolve, 2000));
        result = mockDetection(type);
      } else {
        if (type === 'media') {
          result = await analyzeMedia(file);
        } else if (type === 'audio') {
          result = await analyzeAudio(file);
        } else if (type === 'text') {
          result = await analyzeText(textContent);
        }
      }

      setResult(result);
    } catch (error) {
      console.error('Detection error:', error);
      setApiError(error.message || 'Analysis failed. Please try again.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResult = mockDetection(type);
      mockResult.error = error.message;
      setResult(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      
      // Create preview URL
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
      
      performDetection(file);
    }
  };

  const clearFile = () => {
    setFileName('');
    setPreviewUrl('');
    setFileType('');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTextAnalysis = () => {
    if (!textInput.trim()) return;
    performDetection(null, textInput);
  };

  const startRecording = async () => {
    setMicrophoneError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicrophoneError('Microphone access is not supported in this browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
        setFileName(audioFile.name);
        setFileType(audioFile.type);
        
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(audioFile));
        
        stream.getTracks().forEach(track => track.stop());
        setMicrophoneError('');
        performDetection(audioFile);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicrophoneError('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 bg-slate-900/50 rounded-xl ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/50 border border-slate-700/50 rounded-lg mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">{model}</span>
        </div>

        {/* --- Media Preview Section --- */}
        <AnimatePresence>
          {previewUrl && !isRecording && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative mb-4 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/80 aspect-video flex items-center justify-center"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearFile}
                className="absolute top-2 right-2 z-20 bg-slate-900/80 hover:bg-red-500/80 text-white rounded-full h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>

              {fileType.startsWith('image/') ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
              ) : fileType.startsWith('video/') ? (
                <video src={previewUrl} controls className="w-full h-full object-contain" />
              ) : fileType.startsWith('audio/') ? (
                <div className="flex flex-col items-center gap-3 p-6 w-full">
                  <Music className="w-12 h-12 text-orange-400" />
                  <audio src={previewUrl} controls className="w-full h-10" />
                  <p className="text-xs text-slate-400 truncate max-w-[200px]">{fileName}</p>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Section */}
        {type === 'text' ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Paste text or news article to analyze..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 min-h-[120px] resize-none"
              disabled={isAnalyzing}
            />
            <Button
              onClick={handleTextAnalysis}
              disabled={isAnalyzing || !textInput.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : 'Analyze Text'}
            </Button>
          </div>
        ) : type === 'audio' ? (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isAnalyzing || isRecording}
            />
            {!previewUrl && (
              <>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing || isRecording}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isAnalyzing ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <><Upload className="w-4 h-4 mr-2" /> Upload Audio</>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50"></div></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-slate-900/50 px-2 text-slate-500">or</span></div>
                </div>

                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isAnalyzing}
                  className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'} text-white`}
                >
                  {isRecording ? (
                    <><Square className="w-4 h-4 mr-2" /> Stop Recording {formatTime(recordingTime)}</>
                  ) : (
                    <><Mic className="w-4 h-4 mr-2" /> Record Audio</>
                  )}
                </Button>
              </>
            )}

            {isRecording && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-red-400 text-sm">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-3 h-3 bg-red-500 rounded-full" />
                Recording in progress...
              </motion.div>
            )}
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isAnalyzing}
            />
            {!previewUrl && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Upload Media</>
                )}
              </Button>
            )}
          </div>
        )}

        {apiError && (
          <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-3 text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-2 inline-block" />
            {apiError}
          </div>
        )}
      </div>
    </motion.div>
  );
}