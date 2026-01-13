import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Code, ChevronDown, Plus } from 'lucide-react';

const FormSection = ({ title, icon: Icon, children, isOpen, onToggle }) => {
    return (
        <div className="border border-white/5 bg-bg-secondary rounded-xl mb-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isOpen ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-secondary'}`}>
                        <Icon size={20} />
                    </div>
                    <span className="font-bold text-text-primary">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={20} className="text-text-muted" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 pt-0 border-t border-white/5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FormPanel = ({ resumeData, onUpdate }) => {
    const [openSection, setOpenSection] = useState('personal');

    const toggle = (section) => setOpenSection(openSection === section ? null : section);

    return (
        <div className="p-6">
            <h3 className="text-lg font-bold text-text-secondary mb-4 uppercase tracking-wider text-xs">Editor Sections</h3>

            <FormSection
                title="Personal Information"
                icon={User}
                isOpen={openSection === 'personal'}
                onToggle={() => toggle('personal')}
            >
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="col-span-2">
                        <label className="text-xs text-text-muted mb-1 block">Full Name</label>
                        <input
                            type="text"
                            className="w-full bg-bg-primary border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none"
                            value={resumeData.personalInfo.name}
                            onChange={(e) => onUpdate('personalInfo', 'name', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-text-muted mb-1 block">Email</label>
                        <input
                            type="email"
                            className="w-full bg-bg-primary border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => onUpdate('personalInfo', 'email', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-text-muted mb-1 block">Phone</label>
                        <input
                            type="text"
                            className="w-full bg-bg-primary border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => onUpdate('personalInfo', 'phone', e.target.value)}
                        />
                    </div>
                </div>
            </FormSection>

            <FormSection
                title="Experience"
                icon={Briefcase}
                isOpen={openSection === 'experience'}
                onToggle={() => toggle('experience')}
            >
                <p className="text-sm text-text-muted mb-4">Add your professional experience here.</p>
                {/* Placeholder for experience list */}
                <button className="w-full py-2 border border-dashed border-white/20 rounded-lg text-text-muted hover:text-white hover:border-white/40 flex items-center justify-center gap-2 transition-all">
                    <Plus size={16} /> Add Experience
                </button>
            </FormSection>

            <FormSection
                title="Skills"
                icon={Code}
                isOpen={openSection === 'skills'}
                onToggle={() => toggle('skills')}
            >
                <div className="flex flex-wrap gap-2 mt-2">
                    {resumeData.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-bg-primary border border-white/10 rounded-full text-sm text-text-secondary flex items-center gap-2">
                            {skill}
                            <button className="hover:text-red-400">×</button>
                        </span>
                    ))}
                    <button className="px-3 py-1 border border-dashed border-white/20 rounded-full text-sm text-text-muted hover:text-white hover:border-white/40">
                        + Add Skill
                    </button>
                </div>
            </FormSection>

        </div>
    );
};

export default FormPanel;
