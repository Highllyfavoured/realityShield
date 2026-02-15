import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, Shield, Info, TrendingUp, Activity } from 'lucide-react';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';

export function ResultsPanel({ result, isAnalyzing }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (result) {
      setDisplayScore(0);
      const targetScore = result.score;
      const duration = 1000;
      const steps = 60;
      const increment = targetScore / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
          setDisplayScore(targetScore);
          clearInterval(timer);
        } else {
          setDisplayScore(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [result]);

  const getCredibilityLevel = (score, isArtificial) => {
    if (isArtificial) {
      if (score >= 90) return { level: 'EXTREME RISK', color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' };
      if (score >= 75) return { level: 'HIGH RISK', color: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' };
      return { level: 'MODERATE RISK', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' };
    } else {
      if (score <= 15) return { level: 'HIGHLY TRUSTED', color: 'text-green-500', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' };
      if (score <= 30) return { level: 'TRUSTED', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' };
      return { level: 'LIKELY AUTHENTIC', color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' };
    }
  };

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 animate-pulse" />
        
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Activity className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">
            Forensic Analysis in Progress
          </h3>
          <p className="text-slate-400 mb-6">
            Running multimodal detection algorithms...
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Neural Pattern Recognition</span>
              <motion.span 
                className="text-cyan-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Processing...
              </motion.span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Frequency Domain Analysis</span>
              <motion.span 
                className="text-cyan-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                Processing...
              </motion.span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Stylometric Fingerprinting</span>
              <motion.span 
                className="text-cyan-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                Processing...
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {result ? (
        <motion.div
          key={result.type + result.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${result.isArtificial ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                  {result.isArtificial ? (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Detection Complete
                  </h3>
                  <p className="text-slate-400 capitalize">
                    {result.type} Analysis Result
                  </p>
                </div>
              </div>
              
              {/* Credibility Badge */}
              <div className={`px-4 py-2 rounded-xl border ${getCredibilityLevel(result.score, result.isArtificial).bgColor} ${getCredibilityLevel(result.score, result.isArtificial).borderColor}`}>
                <div className="flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${getCredibilityLevel(result.score, result.isArtificial).color}`} />
                  <span className={`text-sm font-bold ${getCredibilityLevel(result.score, result.isArtificial).color}`}>
                    {getCredibilityLevel(result.score, result.isArtificial).level}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Credibility Score */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold text-white">Credibility Score</h4>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-end gap-2 mb-2">
                    <motion.span 
                      className={`text-5xl font-bold ${result.isArtificial ? 'text-red-500' : 'text-green-500'}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {displayScore.toFixed(1)}%
                    </motion.span>
                    <span className="text-slate-400 text-lg mb-2">{result.label}</span>
                  </div>
                  <Progress 
                    value={displayScore} 
                    className="h-3"
                    indicatorClassName={result.isArtificial ? 'bg-red-500' : 'bg-green-500'}
                  />
                </div>
                
                <p className="text-sm text-slate-400">
                  {result.isArtificial 
                    ? `${displayScore.toFixed(1)}% confidence this content is synthetic/artificial`
                    : `${displayScore.toFixed(1)}% authentic content, low risk of manipulation`
                  }
                </p>
              </div>

              {/* Detection Details */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold text-white">Detection Method</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Analysis Type</span>
                    <span className="text-sm text-white font-medium capitalize">{result.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Model Confidence</span>
                    <span className="text-sm text-white font-medium">{result.score.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className={`text-sm font-medium ${result.isArtificial ? 'text-red-400' : 'text-green-400'}`}>
                      {result.isArtificial ? 'Flagged' : 'Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Forensic Explanation */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-2">Forensic Explanation</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {result.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* XAI Notice */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
              <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-cyan-400">Explainable AI (XAI):</span> This analysis provides 
                  human-readable justifications for detection results, ensuring transparency in the verification process.
                </p>
              </div>
            </div>

            {/* Mock Data Warning
            {result.isMock && (
              <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-yellow-400">Demo Mode:</span> This is simulated data. 
                    Add your Hugging Face API token to the .env file to use real AI model detection.
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 rounded-full mb-4">
            <Shield className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            System Ready
          </h3>
          <p className="text-slate-500">
            Upload media, audio, or text to begin forensic analysis
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}