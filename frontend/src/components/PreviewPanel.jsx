import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Download, Share2 } from 'lucide-react';

const PreviewPanel = ({ resumeData }) => {
    return (
        <div className="w-full h-full flex flex-col">
            {/* Toolbar */}
            <div className="h-12 bg-bg-secondary border-b border-white/5 flex items-center justify-between px-4">
                <span className="text-xs font-bold text-text-muted">LIVE PREVIEW</span>
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5 bg-transparent">
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-xs text-text-secondary">100%</span>
                    <button className="p-1.5 text-text-secondary hover:text-white rounded hover:bg-white/5 bg-transparent">
                        <ZoomIn size={16} />
                    </button>
                </div>
            </div>

            {/* PDF Canvas (Mock for now, replacing previous simple map) */}
            <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-900/50">
                <motion.div
                    layout
                    className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl origin-top transform scale-90"
                >
                    {/* Render Basic Resume Version for Preview */}
                    <div className="p-10">
                        <h1 className="text-3xl font-bold uppercase border-b-2 border-black pb-2 mb-4">
                            {resumeData.personalInfo.name || "Your Name"}
                        </h1>
                        <div className="text-sm mb-6 flex justify-between text-gray-600">
                            <span>{resumeData.personalInfo.email}</span>
                            <span>{resumeData.personalInfo.phone}</span>
                            <span>Linkedin / Github</span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Professional Summary</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {resumeData.summary || "Professional summary goes here..."}
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Experience</h2>
                            {resumeData.experience.length === 0 && (
                                <p className="text-sm text-gray-400 italic">No experience added yet.</p>
                            )}
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{exp.role}</span>
                                        <span>{exp.years}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mb-1">{exp.company}</div>
                                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
                                        {/* Mocking bullets if simple string, need parsing if object */}
                                        <li>Implemented key features...</li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div className="mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                {resumeData.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 rounded">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PreviewPanel;
