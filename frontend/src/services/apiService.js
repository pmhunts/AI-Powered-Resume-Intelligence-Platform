import { getApiUrl, API_CONFIG } from '../config/apiConfig';
import toast from 'react-hot-toast';

/**
 * Centralized API Service for Resume Builder
 * Handles all backend API communication with error handling and request timeouts
 */
class ApiService {
    /**
     * Generic fetch wrapper with error handling and timeout
     */
    async request(endpoint, options = {}) {
        const url = getApiUrl(endpoint);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        const defaultOptions = {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            console.error(`API Request Failed [${endpoint}]:`, error);
            throw error;
        }
    }

    /**
     * Analyze Job Description
     * @param {string} jdText - Job description text
     * @returns {Promise<Object>} JD analysis results
     */
    async analyzeJD(jdText) {
        try {
            const response = await this.request('/jds/analyze', {
                method: 'POST',
                body: JSON.stringify({ text: jdText }),
            });
            return response; // response is { success: true, data: ... }
        } catch (error) {
            toast.error(error.message || 'Failed to analyze job description');
            return { success: false, error: error.message };
        }
    }

    /**
     * Score Resume against Job Description
     * @param {Object} resumeContent - Resume data
     * @param {Object} jdContent - Job description data
     * @returns {Promise<Object>} Scoring results
     */
    async scoreResume(resumeContent, jdContent) {
        try {
            const response = await this.request('/resumes/score', {
                method: 'POST',
                body: JSON.stringify({
                    resume_content: resumeContent,
                    jd_content: jdContent,
                }),
            });
            return response; // response is { success: true, data: ... }
        } catch (error) {
            toast.error('Failed to score resume. Make sure backend is running.');
            return { success: false, error: error.message };
        }
    }

    /**
     * Enhance content using AI
     * @param {string} text - Content to enhance
     * @param {Object} jdContext - Job description context
     * @returns {Promise<Object>} Enhanced content variants
     */
    async enhanceContent(text, jdContext = {}) {
        try {
            const response = await this.request('/resumes/enhance-content', {
                method: 'POST',
                body: JSON.stringify({
                    text,
                    jd_context: jdContext,
                }),
            });
            return response; // response is { success: true, variants: ... }
        } catch (error) {
            toast.error('Failed to enhance content');
            return { success: false, error: error.message };
        }
    }

    /**
     * Download resume as PDF
     * @param {Object} resumeContent - Resume data
     * @param {string} title - Resume title
     * @returns {Promise<Object>}
     */
    async downloadPDF(resumeContent, title = 'Resume') {
        const toastId = toast.loading('Generating PDF...');
        try {
            const url = getApiUrl('/resumes/download-pdf');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: resumeContent,
                    title,
                }),
            });

            if (!response.ok) {
                throw new Error(`PDF generation failed: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);

            toast.success('Resume downloaded successfully!', { id: toastId });
            return { success: true };
        } catch (error) {
            toast.error('Failed to download PDF', { id: toastId });
            console.error('PDF Download Error:', error);
            return { success: false, error: error.message };
        }
    }
}

const apiService = new ApiService();
export default apiService;
