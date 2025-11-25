import { Loader2, Download, Cpu, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingProgressProps {
  progress: number;
  stage: string;
}

const LoadingProgress = ({ progress, stage }: LoadingProgressProps) => {
  const getStageIcon = () => {
    if (progress < 30) return <Download className="w-5 h-5" />;
    if (progress < 80) return <Cpu className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  const getStageColor = () => {
    if (progress < 30) return "text-blue-500";
    if (progress < 80) return "text-amber-500";
    return "text-emerald-500";
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Animated loader */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full gradient-bg opacity-20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${getStageColor()} transition-colors duration-300`}>
            {getStageIcon()}
          </div>
        </div>
        <Loader2 className="absolute inset-0 w-20 h-20 text-primary animate-spin opacity-30" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mb-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Progress text */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-1">{stage}</p>
        <p className="text-xs text-muted-foreground">{progress}% complete</p>
      </div>

      {/* Stage indicators */}
      <div className="flex items-center gap-2 mt-6">
        <StageIndicator 
          active={progress >= 0} 
          complete={progress >= 30} 
          label="Download" 
        />
        <div className="w-8 h-px bg-border" />
        <StageIndicator 
          active={progress >= 30} 
          complete={progress >= 80} 
          label="Process" 
        />
        <div className="w-8 h-px bg-border" />
        <StageIndicator 
          active={progress >= 80} 
          complete={progress >= 100} 
          label="Finish" 
        />
      </div>
    </div>
  );
};

const StageIndicator = ({ 
  active, 
  complete, 
  label 
}: { 
  active: boolean; 
  complete: boolean; 
  label: string;
}) => (
  <div className="flex flex-col items-center gap-1">
    <div 
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        complete 
          ? "bg-primary scale-100" 
          : active 
            ? "bg-primary/50 scale-110 animate-pulse" 
            : "bg-muted scale-100"
      }`} 
    />
    <span className={`text-xs transition-colors ${
      active ? "text-foreground" : "text-muted-foreground"
    }`}>
      {label}
    </span>
  </div>
);

export default LoadingProgress;
