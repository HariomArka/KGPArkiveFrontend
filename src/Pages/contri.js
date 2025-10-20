import React, { useState, useRef } from 'react';
import { Plus, X, Send, CheckCircle, AlertCircle } from 'lucide-react';

const scriptUrl = process.env.REACT_APP_SHEET_URL;

const Contri = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [subjects, setSubjects] = useState([
        { subjectName: '', driveLink: '' }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (index, field, value) => {
        const updated = [...subjects];
        updated[index][field] = value;
        setSubjects(updated);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subjectName: '', driveLink: '' }]);
    };

    const handleRemoveSubject = (index) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('timestamp', new Date().toISOString());
            subjects.forEach((s, i) => {
                formDataToSend.append(`subject${i + 1}`, s.subjectName);
                formDataToSend.append(`link${i + 1}`, s.driveLink);
            });

            const res = await fetch(scriptUrl, {
                method: 'POST',
                body: formDataToSend
            });
            const result = await res.json();
            if (result.result === 'success') {
                setSuccess(true);
                setFormData({ name: '', email: '' });
                setSubjects([{ subjectName: '', driveLink: '' }]);
                if (formRef.current) formRef.current.reset();
                setTimeout(() => setSuccess(false), 5000);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (err) {
            setError('Failed to submit the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                            Share Your Study Materials
                        </h2>
                        <p className="text-gray-600">Help fellow students by contributing your notes and resources</p>
                    </div>

                    <div className="space-y-6 mb-8 text-left">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                placeholder="Your email"
                            />
                        </div>
                    </div>

                    <div className="mb-8 text-left bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl p-6 shadow-md">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold">Important Instructions:</p>
                                <p>Just one step to follow. Go to your Google Drive file and <strong>please give access to all</strong> for the file you are submitting.</p>
                                <p>And try writing in English, 🙃 we are bad in Hibruuuuuu</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 ">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Study Materials</h3>
                        <div className="space-y-4 text-left">
                            {subjects.map((subject, index) => (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-6 relative shadow-sm hover:shadow-md transition duration-200">
                                    <div className="space-y-4 pr-10">
                                        <div>
                                            <label htmlFor={`subject-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id={`subject-${index}`}
                                                value={subject.subjectName}
                                                onChange={e => handleSubjectChange(index, 'subjectName', e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                                placeholder="e.g., Data Structures, Calculus, etc."
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`driveLink-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                                                Google Drive PDF Link <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="url"
                                                id={`driveLink-${index}`}
                                                value={subject.driveLink}
                                                onChange={e => handleSubjectChange(index, 'driveLink', e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                                placeholder="Paste Google Drive link here"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-5 right-5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Remove subject"
                                        onClick={() => handleRemoveSubject(index)}
                                        disabled={subjects.length === 1}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddSubject}
                        className="mb-8 inline-flex items-center px-5 py-2.5 bg-blue-400 text-gray-700 rounded-lg hover:bg-blue-300 font-medium shadow-sm hover:shadow transition duration-200"
                    >
                        <Plus className="mr-2" size={20} /> Add Another Subject
                    </button>

                    <div className="pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-200 ${
                                    loading ? 'opacity-60 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Send className="mr-2" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2" size={20} />
                                        Submit Contribution
                                    </>
                                )}
                            </button>
                            {success && (
                                <span className="flex items-center text-green-600 font-semibold">
                                    <CheckCircle className="mr-2 flex-shrink-0" size={20} />
                                    <span className="text-sm">Thank you for your contribution. We'll review it shortly.</span>
                                </span>
                            )}
                            {error && (
                                <span className="flex items-center text-red-600 font-semibold">
                                    <AlertCircle className="mr-2 flex-shrink-0" size={20} />
                                    <span className="text-sm">{error}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Contri;