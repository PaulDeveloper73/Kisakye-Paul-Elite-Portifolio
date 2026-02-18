
import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all duration-200 ${
        copied 
          ? 'bg-accent/10 border-accent text-accent' 
          : 'bg-white/5 border-white/10 hover:border-accent/40 text-ink/80'
      }`}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

export default CopyButton;
