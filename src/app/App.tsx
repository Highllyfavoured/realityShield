// import { useState } from 'react';
// import { Hero } from './components/Hero';
// import { DetectionModule } from './components/DetectionModule';
// import { ResultsPanel } from './components/ResultsPanel';
// import { Shield, Image as ImageIcon, Mic, FileText } from 'lucide-react';

// export default function App() {
//   const [currentResult, setCurrentResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
//       {/* Header */}
//       <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-blue-500/20">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Shield className="w-8 h-8 text-cyan-400" />
//               <div className="absolute inset-0 bg-cyan-400/20 blur-xl" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-white">RealityShield AI</h1>
//               <p className="text-xs text-cyan-400">The Antivirus of the Information Age</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <Hero />

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-white mb-3">
//             Digital Trust Firewall
//           </h2>
//           <p className="text-slate-400 max-w-2xl mx-auto">
//             Real-time multimodal detection ecosystem designed to identify and neutralize synthetic deception
//           </p>
//         </div>

//         {/* Detection Modules Grid */}
//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           <DetectionModule
//             type="media"
//             title="Media Forensic"
//             subtitle="Image/Video Analysis"
//             description="Detects synthetic patterns using SigLIP and neural forensics to identify AI-generated imagery"
//             icon={ImageIcon}
//             model="umm-maybe/AI-image-detector"
//             setResult={setCurrentResult}
//             isAnalyzing={isAnalyzing}
//             setIsAnalyzing={setIsAnalyzing}
//             iconColor="text-blue-400"
//             gradientFrom="from-blue-500/10"
//             gradientTo="to-blue-600/5"
//           />
          
//           <DetectionModule
//             type="audio"
//             title="Audio Forensic"
//             subtitle="Voice Clone Detection"
//             description="Scans for spectral discontinuities and phoneme-to-frequency mismatches in synthetic voices"
//             icon={Mic}
//             model="mo-thecreator/Deepfake-audio-detection"
//             setResult={setCurrentResult}
//             isAnalyzing={isAnalyzing}
//             setIsAnalyzing={setIsAnalyzing}
//             iconColor="text-orange-400"
//             gradientFrom="from-orange-500/10"
//             gradientTo="to-orange-600/5"
//           />
          
//           <DetectionModule
//             type="text"
//             title="Fake News Detector"
//             subtitle="Text Veracity Analysis"
//             description="Analyzes stylometric fingerprinting and hyper-partisan emotional loading patterns"
//             icon={FileText}
//             model="dhruvpal/fake-news-bert"
//             setResult={setCurrentResult}
//             isAnalyzing={isAnalyzing}
//             setIsAnalyzing={setIsAnalyzing}
//             iconColor="text-purple-400"
//             gradientFrom="from-purple-500/10"
//             gradientTo="to-purple-600/5"
//           />
//         </div>

//         {/* Results Panel */}
//         <ResultsPanel result={currentResult} isAnalyzing={isAnalyzing} />
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-blue-500/20 bg-slate-950/50 py-8 mt-20">
//         <div className="container mx-auto px-6 text-center">
//           <p className="text-slate-400 text-sm">
//             RealityShield AI © 2026 - Protecting the "Voter's Mind" and the "Investor's Wallet"
//           </p>
//           <p className="text-slate-500 text-xs mt-2">
//             A Multimodal Digital Trust Firewall
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }