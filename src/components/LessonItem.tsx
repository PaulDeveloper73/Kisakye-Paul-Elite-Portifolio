
import React from 'react';
import type { Lesson } from '../types';
import CopyButton from './CopyButton';

interface LessonItemProps {
  lesson: Lesson;
  isOpen?: boolean;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, isOpen }) => {
  return (
    <details open={isOpen} className="group bg-accent/[0.03] border border-accent/10 rounded-xl overflow-hidden mb-3 transition-all hover:border-accent/30">
      <summary className="list-none cursor-pointer p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-left">
          <h3 className="text-[1.05rem] font-bold text-ink leading-tight group-hover:text-accent transition-colors">
            {lesson.title}
          </h3>
          <p className="text-sm text-ink/60 leading-relaxed">
            {lesson.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {lesson.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[0.7rem] font-mono rounded-full border border-accent/20 bg-accent/5 text-accent/80 font-bold">
              {tag}
            </span>
          ))}
          <span className="px-3 py-1 text-[0.75rem] font-mono text-accent/60 bg-accent/10 rounded-lg border border-accent/20 whitespace-nowrap font-bold">
            {lesson.duration}
          </span>
        </div>
      </summary>

      <div className="p-4 pt-0 space-y-4">
        {lesson.objectives && (
          <div className="bg-accent/5 border border-accent/10 rounded-xl overflow-hidden">
            <div className="bg-accent/10 px-3 py-2 border-b border-accent/10 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-accent/60">Objectives</span>
              <span className="text-[10px] font-mono text-accent/40 italic">results oriented</span>
            </div>
            <div className="p-3">
              <ul className="list-disc list-inside text-sm text-ink/80 space-y-1">
                {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </div>
          </div>
        )}

        {lesson.exercise && (
          <div className="bg-accent/5 border border-accent/10 rounded-xl overflow-hidden">
            <div className="bg-accent/10 px-3 py-2 border-b border-accent/10 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-wider text-accent/60">Practical Task</span>
              <span className="text-[10px] font-mono text-accent/40 italic">hands-on build</span>
            </div>
            <div className="p-3 space-y-3">
              <p className="text-sm text-ink/80 font-medium">{lesson.exercise.description}</p>
              {lesson.exercise.code && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-accent/40">{lesson.exercise.code.title}</span>
                    <CopyButton text={lesson.exercise.code.content} />
                  </div>
                  <pre className="p-3 rounded-lg bg-bg0 border border-accent/10 overflow-x-auto text-xs font-mono text-accent/90 shadow-inner">
                    <code>{lesson.exercise.code.content}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {lesson.criteria && (
          <div className="p-4 border border-dashed border-accent/30 bg-accent/5 rounded-xl">
             <span className="text-xs font-black text-accent mb-2 block uppercase tracking-widest">Acceptance Protocol</span>
             <ul className="list-disc list-inside text-sm text-ink/70 space-y-1">
               {lesson.criteria.map((c, i) => <li key={i} className="font-medium">{c}</li>)}
             </ul>
          </div>
        )}
      </div>
    </details>
  );
};

export default LessonItem;
