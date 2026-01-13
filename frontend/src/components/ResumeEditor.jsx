import React, { useState } from 'react';
import EditorLayout from './EditorLayout';
import FormPanel from './FormPanel';
import PreviewPanel from './PreviewPanel';

const ResumeEditor = ({ initialData, onUpdate }) => {
    // Helper to update deeply nested state
    const handleUpdate = (section, field, value) => {
        let updatedData = { ...initialData };

        if (section === 'personalInfo') {
            updatedData.personalInfo = {
                ...initialData.personalInfo,
                [field]: value
            };
        } else {
            // For direct fields or others, expand logic as needed
            updatedData[section] = value;
        }

        onUpdate(updatedData);
    };

    return (
        <div className="h-full">
            <EditorLayout
                preview={<PreviewPanel resumeData={initialData} />}
            >
                <FormPanel resumeData={initialData} onUpdate={handleUpdate} />
            </EditorLayout>
        </div>
    );
};

export default ResumeEditor;
