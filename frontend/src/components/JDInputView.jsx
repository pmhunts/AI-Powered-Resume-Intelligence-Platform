import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';

const JDInputView = ({ onAnalyze, isAnalyzing }) => {
    const [jdText, setJdText] = useState('');
    const [uploadMethod, setUploadMethod] = useState('paste');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isReadingFile, setIsReadingFile] = useState(false);
    const fileInputRef = useRef(null);

    const characterCount = jdText.length;
    const wordCount = jdText.trim() ? jdText.trim().split(/\s+/).length : 0;
    const isValid = wordCount >= 50;

    const handleAnalyzeClick = () => {
        if (!jdText || !isValid) return;
        onAnalyze(jdText);
    };

    // ─── File Reading Logic ───────────────────────────────────────────────────

    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file, 'UTF-8');
        });
    };

    const processFile = useCallback(async (file) => {
        setFileError('');
        setUploadedFile(null);
        setJdText('');

        // Validate file type
        const validTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const validExtensions = ['.txt', '.pdf', '.docx'];
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExt)) {
            setFileError(`Unsupported file type. Please upload a .txt, .pdf, or .docx file.`);
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setFileError('File too large. Maximum size is 5MB.');
            return;
        }

        setIsReadingFile(true);

        try {
            let text = '';

            if (fileExt === '.txt' || file.type === 'text/plain') {
                // Plain text — read directly
                text = await readFileAsText(file);

            } else if (fileExt === '.pdf') {
                // PDF — extract raw text via FileReader
                // For PDF we read as text and strip non-printable chars
                // Note: for proper PDF parsing, a library like pdf.js would be needed
                // This handles text-based PDFs (not scanned images)
                const rawText = await readFileAsText(file);
                // Strip binary/non-printable characters, keep readable text
                text = rawText
                    .replace(/[^\x20-\x7E\n\r\t]/g, ' ')  // keep printable ASCII
                    .replace(/\s{3,}/g, '\n\n')             // collapse excess whitespace
                    .trim();

                if (text.length < 100) {
                    setFileError('Could not extract text from this PDF. It may be a scanned image. Please copy and paste the text instead.');
                    setIsReadingFile(false);
                    return;
                }

            } else if (fileExt === '.docx') {
                // DOCX — read as binary and extract raw text between XML tags
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                const decoder = new TextDecoder('utf-8');
                const raw = decoder.decode(uint8Array);

                // Extract text content from Word XML (word/document.xml is inside the zip)
                // This is a lightweight extraction — strips XML tags
                const textMatches = raw.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
                text = textMatches
                    .map(match => match.replace(/<[^>]+>/g, ''))
                    .join(' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                if (text.length < 100) {
                    setFileError('Could not extract text from this .docx file. Please copy and paste the text instead.');
                    setIsReadingFile(false);
                    return;
                }
            }

            if (!text || text.trim().length === 0) {
                setFileError('The file appears to be empty. Please try another file.');
                setIsReadingFile(false);
                return;
            }

            setUploadedFile({ name: file.name, size: file.size, wordCount: text.trim().split(/\s+/).length });
            setJdText(text.trim());

        } catch (err) {
            console.error('File read error:', err);
            setFileError('Failed to read the file. Please try again or paste the text instead.');
        } finally {
            setIsReadingFile(false);
        }
    }, []);

    // ─── Input Handlers ───────────────────────────────────────────────────────

    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    const handleChooseFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const handleClearFile = () => {
        setUploadedFile(null);
        setJdText('');
        setFileError('');
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] float" />
                <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] float" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
                {/* Header Steps */}
                <div className="max-w-4xl mx-auto w-full px-6 pt-12 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">1</div>
                            <span className="font-semibold text-white">Job Description</span>
                        </div>
                        <div className="h-px w-12 bg-white/10" />
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted font-bold text-sm">2</div>
                            <span className="text-text-muted">Analysis</span>
                        </div>
                        <div className="h-px w-12 bg-white/10" />
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted font-bold text-sm">3</div>
                            <span className="text-text-muted">Optimize</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-6 pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl space-y-8"
                    >
                        {/* Title */}
                        <div className="text-center space-y-4">
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex">
                                <span className="badge badge-primary text-base px-4 py-2">
                                    <Sparkles className="w-4 h-4" />
                                    Step 1: Input Job Description
                                </span>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold">
                                Paste the <span className="gradient-text">Job Description</span>
                            </h2>
                            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                Our AI will analyze keywords, required skills, and experience levels to tailor your resume perfectly.
                            </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => { setUploadMethod('paste'); setFileError(''); }}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${uploadMethod === 'paste' ? 'bg-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'}`}
                            >
                                Paste Text
                            </button>
                            <button
                                onClick={() => setUploadMethod('upload')}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${uploadMethod === 'upload' ? 'bg-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'}`}
                            >
                                <Upload className="w-4 h-4 inline mr-2" />
                                Upload File
                            </button>
                        </div>

                        {/* ── PASTE MODE ── */}
                        {uploadMethod === 'paste' && (
                            <Card variant="glass" hover={false} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent-pink rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
                                <div className="relative">
                                    <textarea
                                        value={jdText}
                                        onChange={(e) => setJdText(e.target.value)}
                                        placeholder={`Paste the full job description here...\n\nInclude job title, responsibilities, requirements, and any specific skills or keywords mentioned.`}
                                        className="w-full h-80 bg-transparent text-text-primary p-6 focus:outline-none resize-none text-base leading-relaxed placeholder:text-text-muted"
                                    />
                                    <div className="flex justify-between items-center px-6 pb-4 text-sm">
                                        <div className="flex gap-4 text-text-muted">
                                            <span>{wordCount} words</span>
                                            <span>•</span>
                                            <span>{characterCount} characters</span>
                                        </div>
                                        {wordCount > 0 && (
                                            <span className={`font-semibold ${isValid ? 'text-success' : 'text-warning'}`}>
                                                {isValid ? '✓ Sufficient' : `${50 - wordCount} more words needed`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* ── UPLOAD MODE ── */}
                        {uploadMethod === 'upload' && (
                            <AnimatePresence mode="wait">
                                {/* Hidden file input — always rendered */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".txt,.pdf,.docx"
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                />

                                {!uploadedFile ? (
                                    <motion.div
                                        key="dropzone"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <Card
                                            variant="glass"
                                            hover={false}
                                            className={`relative cursor-pointer transition-all duration-200 ${isDragOver ? 'border-primary shadow-lg shadow-primary/20' : ''}`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={handleChooseFileClick}
                                        >
                                            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-200 ${isDragOver ? 'bg-primary/5' : 'opacity-0'}`} />
                                            <div className="flex flex-col items-center justify-center py-16 px-6 relative">
                                                <motion.div
                                                    animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${isDragOver ? 'bg-primary/30' : 'bg-primary/20'}`}
                                                >
                                                    {isReadingFile ? (
                                                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Upload className={`w-10 h-10 ${isDragOver ? 'text-primary-light' : 'text-primary'}`} />
                                                    )}
                                                </motion.div>

                                                {isReadingFile ? (
                                                    <>
                                                        <h3 className="text-xl font-semibold text-white mb-2">Reading file...</h3>
                                                        <p className="text-text-secondary text-center">Extracting text content</p>
                                                    </>
                                                ) : isDragOver ? (
                                                    <>
                                                        <h3 className="text-xl font-semibold text-primary mb-2">Drop it here!</h3>
                                                        <p className="text-text-secondary">Release to upload your file</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="text-xl font-semibold text-white mb-2">Upload Job Description</h3>
                                                        <p className="text-text-secondary text-center mb-6">
                                                            Drag & drop or click to upload
                                                        </p>
                                                        <Button variant="secondary" onClick={(e) => { e.stopPropagation(); handleChooseFileClick(); }}>
                                                            Choose File
                                                        </Button>
                                                        <p className="text-text-muted text-xs mt-4">.txt, .pdf, .docx — max 5MB</p>
                                                    </>
                                                )}
                                            </div>
                                        </Card>

                                        {/* Error Message */}
                                        <AnimatePresence>
                                            {fileError && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-start gap-3 mt-3 p-4 bg-danger/10 border border-danger/30 rounded-xl"
                                                >
                                                    <XCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-danger">Upload Failed</p>
                                                        <p className="text-sm text-text-secondary mt-1">{fileError}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    /* ── File Successfully Loaded ── */
                                    <motion.div
                                        key="file-loaded"
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <Card variant="glass" hover={false}>
                                            {/* File Info Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-5 h-5 text-success" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white text-sm">{uploadedFile.name}</p>
                                                        <p className="text-xs text-text-muted">
                                                            {formatFileSize(uploadedFile.size)} • {uploadedFile.wordCount} words extracted
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-success" />
                                                    <button
                                                        onClick={handleClearFile}
                                                        className="text-text-muted hover:text-danger transition-colors text-xs underline ml-2"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Extracted Text Preview */}
                                            <div className="bg-bg-primary/50 rounded-xl p-4 border border-white/5">
                                                <p className="text-xs font-semibold text-text-muted uppercase mb-2 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Extracted Text Preview
                                                </p>
                                                <p className="text-sm text-text-secondary leading-relaxed line-clamp-6">
                                                    {jdText.slice(0, 600)}{jdText.length > 600 ? '...' : ''}
                                                </p>
                                            </div>

                                            {/* Word Count Status */}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                <span className="text-sm text-text-muted">{uploadedFile.wordCount} words detected</span>
                                                <span className={`text-sm font-semibold ${isValid ? 'text-success' : 'text-warning'}`}>
                                                    {isValid ? '✓ Ready to analyze' : `Need ${50 - wordCount} more words`}
                                                </span>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}

                        {/* Analyze Button */}
                        <div className="flex flex-col items-center gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleAnalyzeClick}
                                disabled={!isValid || isAnalyzing}
                                loading={isAnalyzing}
                                className="min-w-[300px]"
                                icon={!isAnalyzing && <Sparkles size={20} />}
                            >
                                {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Job Description'}
                            </Button>

                            {isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full max-w-md"
                                >
                                    <ProgressBar value={100} variant="primary" height="md" showLabel={false} />
                                    <p className="text-center text-sm text-text-secondary mt-2">
                                        🤖 Extracting keywords and analyzing requirements...
                                    </p>
                                </motion.div>
                            )}

                            {!isAnalyzing && (
                                <p className="text-sm text-text-muted text-center">
                                    Analysis takes ~2 seconds • 100% secure & confidential
                                </p>
                            )}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-text-muted">
                            {['AI-Powered Analysis', '90%+ Match Rate', 'Instant Results'].map((label) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                        <span className="text-success text-xs">✓</span>
                                    </div>
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JDInputView;
