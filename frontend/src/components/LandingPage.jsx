import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Target, TrendingUp, Users, CheckCircle2, Star } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

const LandingPage = ({ onGetStarted }) => {
    const features = [
        {
            icon: Zap,
            title: "Instant AI Analysis",
            desc: "Get detailed ATS score breakdown in seconds with AI-powered insights."
        },
        {
            icon: Shield,
            title: "ATS-Safe Formats",
            desc: "Guaranteed compatibility with 99% of Applicant Tracking Systems."
        },
        {
            icon: Target,
            title: "Smart Optimization",
            desc: "AI rewrites bullet points to match job descriptions perfectly."
        }
    ];

    const stats = [
        { label: 'Avg Score Boost', value: '45%', icon: TrendingUp },
        { label: 'Interviews Landed', value: '2.5x', icon: Target },
        { label: 'Active Users', value: '12K+', icon: Users },
        { label: 'Success Rate', value: '94%', icon: Star }
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Software Engineer @ Google',
            content: 'Landed 3 interviews in 2 weeks! The AI suggestions were incredibly specific and helpful.',
            avatar: 'SC',
            rating: 5
        },
        {
            name: 'Michael Rodriguez',
            role: 'Product Manager @ Meta',
            content: 'My ATS score went from 62% to 91%. This platform is a game-changer for job seekers.',
            avatar: 'MR',
            rating: 5
        },
        {
            name: 'Emily Watson',
            role: 'Data Scientist @ Amazon',
            content: 'The gap analysis feature showed me exactly what keywords I was missing. Pure gold!',
            avatar: 'EW',
            rating: 5
        }
    ];

    const pricingPlans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            features: [
                '1 Resume Analysis',
                'Basic ATS Score',
                'Limited AI Suggestions',
                'PDF Export'
            ],
            cta: 'Get Started',
            variant: 'secondary'
        },
        {
            name: 'Pro',
            price: '$29',
            period: 'month',
            features: [
                'Unlimited Analyses',
                'Advanced ATS Insights',
                'AI Content Generation',
                'Multiple Templates',
                'Gap Analysis',
                'Interview Prep Mode'
            ],
            cta: 'Start Free Trial',
            variant: 'primary',
            popular: true
        },
        {
            name: 'Enterprise',
            price: '$99',
            period: 'month',
            features: [
                'Everything in Pro',
                'Team Collaboration',
                'Custom Branding',
                'Priority Support',
                'API Access'
            ],
            cta: 'Contact Sales',
            variant: 'secondary'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px] float" />
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent-pink/10 rounded-full blur-[100px] float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex"
                        >
                            <span className="badge badge-primary text-base px-5 py-2">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Resume Intelligence
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                            Beat The ATS. <br />
                            <span className="gradient-text-animate">
                                Land The Interview.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                            Stop guessing keywords. Our AI analyzes job descriptions in real-time to build
                            <span className="text-primary font-semibold"> data-driven resumes </span>
                            that rank in the <span className="text-success font-semibold">top 1%</span> of applicants.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={onGetStarted}
                                icon={<ArrowRight size={20} />}
                            >
                                Build Your Resume Free
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-sm text-text-muted pt-4"
                        >
                            ✓ No credit card required  •  ✓ 2-minute setup  •  ✓ Trusted by 12,000+ professionals
                        </motion.p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {stats.map((stat, i) => (
                            <Card key={i} variant="glass" hover={false} className="text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <stat.icon className="w-8 h-8 text-primary mb-2" />
                                    <span className="text-4xl font-bold gradient-text">{stat.value}</span>
                                    <span className="text-sm text-text-secondary">{stat.label}</span>
                                </div>
                            </Card>
                        ))}
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Why Choose <span className="gradient-text">ResumeAI</span>?
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                            Built by engineers who understand what it takes to pass ATS systems and impress recruiters.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Card variant="glass" className="h-full">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 glow-primary">
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Loved by <span className="gradient-text">Professionals</span>
                        </h2>
                        <p className="text-xl text-text-secondary">
                            Join thousands who landed their dream jobs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card variant="glass" className="h-full">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                                        ))}
                                    </div>
                                    <p className="text-text-primary mb-6 leading-relaxed">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{testimonial.name}</p>
                                            <p className="text-sm text-text-secondary">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Simple, <span className="gradient-text">Transparent</span> Pricing
                        </h2>
                        <p className="text-xl text-text-secondary">
                            Start free, upgrade when you need more power
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative"
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-primary text-sm px-4 py-1.5">
                                        Most Popular
                                    </div>
                                )}
                                <Card
                                    variant={plan.popular ? "elevated" : "glass"}
                                    className={`h-full ${plan.popular ? 'border-2 border-primary' : ''}`}
                                >
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                                            <span className="text-text-secondary">/{plan.period}</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-text-secondary">
                                                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant={plan.variant}
                                        className="w-full"
                                        onClick={onGetStarted}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-4xl mx-auto px-6 py-20">
                    <Card variant="glass" className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to <span className="gradient-text">Transform</span> Your Resume?
                        </h2>
                        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                            Join 12,000+ professionals who boosted their career with AI-powered resume optimization.
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={onGetStarted}
                            icon={<ArrowRight size={20} />}
                        >
                            Start Building Now - It's Free
                        </Button>
                    </Card>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/5 mt-20">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-2xl font-bold gradient-text mb-2">ResumeAI</p>
                                <p className="text-sm text-text-muted">© 2026 AI Resume Builder. All rights reserved.</p>
                            </div>
                            <div className="flex gap-8 text-sm text-text-secondary">
                                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-primary transition-colors">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
