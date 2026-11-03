import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronDown,
    faArrowRight,
    faArrowLeft,
    faBolt,
    faComments,
    faChartLine,
    faShieldHalved,
    faLayerGroup,
    faCircleCheck,
    faTicket,
    faUsers,
    faBuilding,
    faBookOpen,
    faFileLines,
    faCompass,
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';

export function Home() {
    const navigate = useNavigate();
    const [heroEmail, setHeroEmail] = useState('');
    const [agreedToComms, setAgreedToComms] = useState(false);
    const [activeFeatureTab, setActiveFeatureTab] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [faqOpen, setFaqOpen] = useState(false);

    const navDropdownItems = ['Platform', 'Products', 'Solutions', 'Resources', 'Pricing'];

    const trustedLogos = [
        'COMPANY ONE',
        'PARTNER TWO',
        'GLOBAL CORP',
        'ENTERPRISE CO',
        'STUDIO LABS',
        'VENTURE INC',
        'SYSTEMS IO'
    ];

    const workflowSteps = [
        {
            title: 'Every ticket raised becomes a structured signal',
            description:
                'Placeholder description explaining how incoming issues are automatically categorized, prioritized, and routed to the right team queue.',
            badge: 'Ticket Intake',
            requester: 'Jane Doe',
            issueText: 'Need help with floor plan revisions before Friday.',
            agentResponse: 'Routing to Facilities & Operations Queue — Priority: High.',
            metrics: ['Category', 'Priority', 'SLA Timer']
        },
        {
            title: 'Turn team activity into continuous improvement',
            description:
                'Placeholder copy highlighting how recurring bottlenecks and common requests surface in your dashboard views for faster triage.',
            badge: 'Queue Intelligence',
            requester: 'System Insights',
            issueText: '34 similar floor plan requests detected this month.',
            agentResponse: 'Suggested Action: Create standardized floor plan template.',
            metrics: ['High Impact', '88% Match', 'Auto-Tag']
        },
        {
            title: 'Faster resolutions. Stronger visibility. Better outcomes.',
            description:
                'Placeholder text describing how clear ownership, status tracking, and audit trails keep requesters and assignees aligned from open to closed.',
            badge: 'Resolution Flow',
            requester: 'Admin User',
            issueText: 'Can I get an update on ticket #142?',
            agentResponse: 'Status updated to Completed. Floor plan v2 attached and verified.',
            metrics: ['Verified', 'Resolved', 'Logged']
        }
    ];

    const statsData = [
        { value: '22K+', label: 'Active teams placeholder' },
        { value: '830M', label: 'Issues tracked placeholder' },
        { value: '4.7B', label: 'Resolutions delivered placeholder' }
    ];

    const interactiveFeatures = [
        {
            title: 'Manage high ticket volume automatically',
            subtitle: 'Route, assign, and prioritize incoming requests without manual triage.',
            previewHeader: 'Automated Queue Routing',
            previewRequester: 'Requester: Alex Morgan',
            previewMessage: 'Hi, our team needs urgent access to the Q4 event layout.',
            previewResolution: 'Assigned to Operations Lead • Status set to Open • SLA tracked.'
        },
        {
            title: 'Launch your workspace in minutes, not months',
            subtitle: 'Onboard your company, invite team members, and start tracking issues immediately.',
            previewHeader: 'Instant Workspace Setup',
            previewRequester: 'Company Onboarding',
            previewMessage: 'Workspace configured with custom views and role permissions.',
            previewResolution: 'Team queues active • Ready to log and resolve tickets.'
        },
        {
            title: 'Scale operations without adding overhead',
            subtitle: 'Keep every department aligned using unified views for open, assigned, and closed tickets.',
            previewHeader: 'Cross-Team Visibility',
            previewRequester: 'View: All Tickets',
            previewMessage: 'Filtering 1,240 tickets across 6 internal departments.',
            previewResolution: 'Zero bottlenecks detected • 98.4% on-time resolution rate.'
        },
        {
            title: 'Maintain complete auditability on every resolution',
            subtitle: 'Track comments, assignee changes, and status updates in a single chronological view.',
            previewHeader: 'Full Ticket History',
            previewRequester: 'Audit Log #309',
            previewMessage: 'Status transitioned from Open to Completed by John Doe.',
            previewResolution: 'Timestamped comment history preserved for compliance.'
        },
        {
            title: 'Modernize internal and external support workflows',
            subtitle: 'Deliver a clean, intuitive portal for both ticket requesters and administrators.',
            previewHeader: 'Unified Admin Centre',
            previewRequester: 'Admin Configuration',
            previewMessage: 'Updated user roles and department routing rules.',
            previewResolution: 'Changes applied across all active workspace views.'
        }
    ];

    const testimonials = [
        {
            company: 'GLOBAL EVENTS CO.',
            quote:
                '“Placeholder testimonial quote: Having a centralized issue tracker transformed how our production and operations teams collaborate on tight deadlines.”',
            author: 'Sarah Jenkins',
            role: 'Director of Operations, Global Events Co.',
            stat1Value: '36%',
            stat1Label: 'Faster ticket turnaround',
            stat2Value: '30-40%',
            stat2Label: 'Reduction in unassigned issues'
        },
        {
            company: 'STUDIO PARTNERS',
            quote:
                '“Placeholder testimonial quote: The clean interface and custom ticket views made onboarding our entire staff effortless from day one.”',
            author: 'Marcus Vance',
            role: 'Head of Technical Support, Studio Partners',
            stat1Value: '2.4x',
            stat1Label: 'Increase in team visibility',
            stat2Value: '99%',
            stat2Label: 'SLA compliance rate'
        }
    ];

    const integrationPlaceholders = [
        'Slack Placeholder',
        'Notion Placeholder',
        'Zoom Placeholder',
        'Teams Placeholder',
        'Jira Placeholder',
        'GitHub Placeholder',
        'Drive Placeholder',
        'Calendar Placeholder',
        'SSO Placeholder',
        'Webhook API',
        'Analytics App',
        'CRM Sync'
    ];

    const resourceCards = [
        {
            tag: 'PRODUCT',
            featured: true,
            title: 'A powerful, flexible issue tracking platform',
            icon: faCompass
        },
        {
            tag: 'REPORT',
            featured: false,
            title: 'Service & Operations Trends 2026',
            icon: faFileLines
        },
        {
            tag: 'GUIDE',
            featured: false,
            title: 'Structuring high-velocity support queues',
            icon: faBookOpen
        },
        {
            tag: 'ARTICLE',
            featured: false,
            title: 'What makes internal ticketing effective?',
            icon: faNewspaper
        }
    ];

    const footerColumns = [
        {
            heading: 'Products',
            links: [
                'Pricing Placeholder',
                'Issue Tracking',
                'Employee Service',
                'Admin Centre',
                'Integrations',
                'System Status',
                'Sign In',
                'Request Demo'
            ]
        },
        {
            heading: 'Features',
            links: [
                'Ticket Views',
                'Automated Routing',
                'Custom Workflows',
                'Team Collaboration',
                'Knowledge Base',
                'Reporting & Analytics',
                'Role Management',
                'Security & Access'
            ]
        },
        {
            heading: 'Resources',
            links: [
                'Help Centre',
                'Security Overview',
                'API & Developers',
                'Product Blog',
                'Events & Webinars',
                'Customer Stories',
                'Partner Directory',
                'Professional Services'
            ]
        },
        {
            heading: 'Company',
            links: [
                'About Us',
                'Why Wise Tickets?',
                'Careers',
                'Sustainability',
                'Press & Media',
                'Ventures',
                'Contact Sales',
                'Legal Notices'
            ]
        },
        {
            heading: 'Popular Topics',
            links: [
                'Operations Trends 2026',
                'Product Updates',
                'Customer Service Guide',
                'Help Desk Software',
                'Ticketing Best Practices',
                'ITSM Fundamentals',
                'SLA Management',
                'Client Portal Setup'
            ]
        }
    ];

    const handleHeroSubmit = (e) => {
        e.preventDefault();
        navigate('/registration');
    };

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-wiseOffWhite text-wiseGrey1 font-lato selection:bg-wiseRose4 selection:text-wiseGrey1">
            {/* =========================================================
                TOP STICKY SUB-NAVIGATION BAR
            ========================================================= */}
            <header className="sticky top-0 z-30 bg-wiseOffWhite/95 backdrop-blur-sm border-b border-wiseGrey4/30 px-6 lg:px-16 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Brand Identifier Placeholder */}
                    <Link
                        to="/homepage"
                        className="text-2xl font-black tracking-tight text-wiseGrey1 flex items-center gap-2"
                    >
                        <span className="w-8 h-8 rounded-lg bg-wiseRose3 text-wiseOffWhite flex items-center justify-center text-base font-bold">
                            W
                        </span>
                        <span>WiseTickets</span>
                    </Link>

                    {/* Center Navigation Placeholders */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navDropdownItems.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className="text-sm font-medium text-wiseGrey2 hover:text-wiseRose2 flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                                <span>{item}</span>
                                <FontAwesomeIcon icon={faChevronDown} className="text-[10px] text-wiseGrey3" />
                            </button>
                        ))}
                    </nav>

                    {/* Right CTA Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-lg bg-wiseRose4 text-wiseGrey1 font-semibold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4 hover:outline hover:outline-offset-2 hover:outline-wiseRose4"
                        >
                            Try it for free
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg border border-wiseGrey4 text-wiseGrey1 font-semibold text-sm hover:border-wiseGrey1 hover:bg-wiseGrey5 transition duration-200"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </header>

            {/* =========================================================
                1. HERO SECTION (Dark Split Layout)
            ========================================================= */}
            <section className="bg-wiseGrey1 text-wiseOffWhite px-6 lg:px-16 py-16 lg:py-24 border-b border-wiseGrey2">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Copy & Trial CTA */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-wiseRose4">
                            STREAMLINED ISSUE TRACKING PLATFORM
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-wiseOffWhite">
                            Resolve up to 80% of team issues faster with structured workflows.
                        </h1>

                        <p className="text-lg text-wiseGrey4 max-w-xl leading-relaxed">
                            Built to improve every resolution. Centralize requests, assign clear ownership, and track progress across every department in real time.
                        </p>

                        {/* Trial Badge */}
                        <div className="flex items-center gap-2 text-sm text-wiseRose4 font-medium pt-2">
                            <span className="w-5 h-5 rounded-full bg-wiseRose3/20 border border-wiseRose3 flex items-center justify-center text-xs">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span>Free workspace setup. No credit card required.</span>
                        </div>

                        {/* Email Capture + CTA */}
                        <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                            <input
                                type="email"
                                value={heroEmail}
                                onChange={(e) => setHeroEmail(e.target.value)}
                                placeholder="Enter your work email..."
                                className="flex-1 px-4 py-3.5 rounded-lg bg-wiseOffWhite text-wiseGrey1 placeholder:text-wiseGrey3 border border-wiseRose4 focus:outline-2 focus:outline-wiseRose3"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-base cursor-pointer transition duration-200 hover:bg-wiseRose3 hover:text-wiseOffWhite whitespace-nowrap"
                            >
                                Try it for free
                            </button>
                        </form>

                        {/* Marketing Consent & Privacy Notice Placeholders */}
                        <div className="flex flex-col gap-2 text-xs text-wiseGrey4 max-w-xl">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={agreedToComms}
                                    onChange={(e) => setAgreedToComms(e.target.checked)}
                                    className="accent-wiseRose3 rounded cursor-pointer"
                                />
                                <span>I agree to receive product updates and onboarding communications.</span>
                            </label>
                            <p>
                                By submitting, I agree to the{' '}
                                <Link to="/privacy" className="text-wiseRose4 underline hover:text-wiseRose3">
                                    Privacy Notice
                                </Link>{' '}
                                and{' '}
                                <Link to="/terms" className="text-wiseRose4 underline hover:text-wiseRose3">
                                    Terms and Conditions
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Visual Placeholder + Floating Ticket Overlays */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-3xl bg-gradient-to-br from-wiseGrey2 via-wiseGrey1 to-wiseRose1/40 border border-wiseGrey2 p-6 min-h-[420px] flex flex-col justify-between overflow-hidden shadow-2xl">
                            {/* Decorative Background Placeholder */}
                            <div className="flex items-center justify-between text-xs text-wiseGrey4 border-b border-wiseGrey2 pb-4">
                                <span className="font-mono uppercase tracking-wider text-wiseRose4">
                                    [ Hero Media / Image Placeholder ]
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-wiseRose3 text-wiseOffWhite font-semibold">
                                    Status: Open
                                </span>
                            </div>

                            <div className="my-auto py-8 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-wiseRose4/15 border border-wiseRose4/40 flex items-center justify-center text-wiseRose4 text-3xl mb-3">
                                    <FontAwesomeIcon icon={faTicket} />
                                </div>
                                <p className="text-sm text-wiseGrey4 max-w-xs">
                                    Visual placeholder for hero photography or live dashboard preview
                                </p>
                            </div>

                            {/* Floating Card 1: Incoming Issue */}
                            <div className="bg-wiseOffWhite text-wiseGrey1 rounded-2xl p-4 shadow-xl border border-wiseGrey4/40 mb-3 max-w-sm self-start">
                                <div className="flex items-center gap-2 text-xs font-bold text-wiseGrey3 mb-1">
                                    <span className="w-5 h-5 rounded-full bg-wiseRose4 text-wiseGrey1 flex items-center justify-center text-[10px]">
                                        R
                                    </span>
                                    <span>Requester • Ticket #34</span>
                                </div>
                                <p className="text-sm font-medium text-wiseGrey1">
                                    Need help with floor plan revisions before the client walkthrough.
                                </p>
                            </div>

                            {/* Floating Card 2: Resolution Action */}
                            <div className="bg-wiseOffWhite text-wiseGrey1 rounded-2xl p-4 shadow-xl border-l-4 border-wiseRose3 max-w-sm self-end">
                                <div className="flex items-center gap-2 text-xs font-bold text-wiseRose2 mb-1">
                                    <FontAwesomeIcon icon={faBolt} />
                                    <span>Assigned Agent • Resolution Update</span>
                                </div>
                                <p className="text-xs text-wiseGrey2 mb-2.5">
                                    Floor plan updated and attached to ticket comments. Status changed to Completed.
                                </p>
                                <div className="flex flex-col gap-1 text-xs text-wiseGrey2 bg-wiseRose5 p-2 rounded-lg">
                                    <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faCircleCheck} className="text-wiseRose2" />
                                        Verified assignee & department queue
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faCircleCheck} className="text-wiseRose2" />
                                        Logged audit comment & closed ticket
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                2. TRUSTED BY LOGO STRIP
            ========================================================= */}
            <section className="bg-wiseOffWhite py-12 px-6 lg:px-16 border-b border-wiseGrey5">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-wiseGrey3 max-w-[220px] text-center lg:text-left">
                        OVER 22,000 SERVICE TEAMS TRUST OUR PLATFORM
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-8 md:gap-12 flex-1">
                        {trustedLogos.map((logo) => (
                            <div
                                key={logo}
                                className="text-base md:text-lg font-black tracking-tight text-wiseGrey3/70 hover:text-wiseGrey1 transition-colors select-none"
                            >
                                {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                3. VALUE PROPOSITION & CONNECTED WORKFLOW CARDS
            ========================================================= */}
            <section className="py-20 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-6xl mx-auto">
                    {/* Centered Section Header */}
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-5">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-wiseGrey1 leading-tight">
                            Issue tracking that gets{' '}
                            <span className="text-wiseRose3">smarter</span> with every resolution.
                        </h2>
                        <p className="text-base sm:text-lg text-wiseGrey3 leading-relaxed">
                            Placeholder body copy: Empower your support and operations teams with organized views, instant ticket creation, and transparent status tracking across your entire organization.
                        </p>
                        <Link
                            to="/register"
                            className="mt-2 px-6 py-3 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4"
                        >
                            Explore the platform
                        </Link>
                    </div>

                    {/* Top Connector Node */}
                    <div className="flex flex-col items-center my-8">
                        <div className="w-8 h-8 rounded-full bg-wiseRose5 border border-wiseRose3 text-wiseRose2 flex items-center justify-center text-xs font-bold shadow-sm">
                            <FontAwesomeIcon icon={faBolt} />
                        </div>
                        <div className="w-px h-12 bg-wiseRose4" />
                    </div>

                    {/* 3 Connected Horizontal Feature Cards */}
                    <div className="flex flex-col">
                        {workflowSteps.map((step, index) => (
                            <React.Fragment key={step.title}>
                                <div className="rounded-3xl bg-wiseGrey5 border border-wiseGrey4/30 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
                                    {/* Left Text Column */}
                                    <div className="lg:col-span-5 flex flex-col gap-3">
                                        <span className="text-xs font-bold uppercase tracking-widest text-wiseRose2">
                                            0{index + 1} • {step.badge}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-wiseGrey1 leading-snug">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-wiseGrey3 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Right Mock UI Placeholder */}
                                    <div className="lg:col-span-7 bg-wiseOffWhite rounded-2xl border border-wiseGrey4/40 p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                                        <div className="flex-1 flex flex-col gap-3 w-full">
                                            <div className="bg-wiseGrey5 rounded-xl p-3.5 border border-wiseGrey4/30">
                                                <span className="text-xs font-bold text-wiseGrey3 block mb-1">
                                                    {step.requester}
                                                </span>
                                                <p className="text-sm text-wiseGrey1 font-medium">
                                                    {step.issueText}
                                                </p>
                                            </div>
                                            <div className="bg-wiseRose5/70 rounded-xl p-3.5 border border-wiseRose4/60 ml-4">
                                                <span className="text-xs font-bold text-wiseRose2 block mb-1">
                                                    Resolution Engine
                                                </span>
                                                <p className="text-sm text-wiseGrey1">
                                                    {step.agentResponse}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right Side Mini Card */}
                                        <div className="w-full md:w-52 bg-wiseGrey1 text-wiseOffWhite rounded-xl p-4 flex flex-col gap-2.5 shrink-0">
                                            <div className="text-xs font-bold text-wiseRose4 flex items-center gap-1.5 border-b border-wiseGrey2 pb-2">
                                                <FontAwesomeIcon icon={faLayerGroup} />
                                                <span>Ticket Metadata</span>
                                            </div>
                                            {step.metrics.map((metric) => (
                                                <div
                                                    key={metric}
                                                    className="flex items-center justify-between text-xs bg-wiseGrey2/70 px-2.5 py-1.5 rounded"
                                                >
                                                    <span className="text-wiseGrey4">{metric}</span>
                                                    <FontAwesomeIcon icon={faCheck} className="text-wiseRose4" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical Line Connector between cards */}
                                {index < workflowSteps.length - 1 && (
                                    <div className="flex justify-center">
                                        <div className="w-px h-14 bg-wiseRose4" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                4. METRICS & STATS SECTION
            ========================================================= */}
            <section className="py-16 px-6 lg:px-16 bg-gradient-to-b from-wiseOffWhite via-wiseRose5/40 to-wiseOffWhite">
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-wiseGrey1 max-w-xl mx-auto mb-12">
                        Thousands of daily requests turned into streamlined, trackable outcomes.
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {statsData.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-wiseOffWhite/80 border border-wiseRose4/30"
                            >
                                <span className="text-5xl sm:text-6xl font-light tracking-tight text-wiseRose3">
                                    {stat.value}
                                </span>
                                <span className="text-sm font-medium text-wiseGrey2">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                5. SPLIT SPOTLIGHT BANNER
            ========================================================= */}
            <section className="py-16 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold tracking-widest uppercase text-wiseGrey2">
                                WISE TICKETS • MULTI-TENANT
                            </span>
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-wiseRose5 text-wiseRose2 border border-wiseRose4">
                                NEW
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-wiseGrey1 leading-tight">
                            Standalone issue tracking for any department
                        </h2>
                        <p className="text-base text-wiseGrey3 leading-relaxed">
                            Placeholder text: Deploy dedicated ticket queues for IT, Facilities, HR, or Customer Operations. Every resolution keeps your team aligned without requiring complex legacy software.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                to="/register"
                                className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4"
                            >
                                Get started free
                            </Link>
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-lg border border-wiseGrey4 text-wiseGrey1 font-semibold text-sm hover:bg-wiseGrey5 cursor-pointer transition"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="rounded-3xl bg-wiseGrey1 text-wiseOffWhite p-10 min-h-[260px] flex items-center justify-center gap-8 border border-wiseGrey2 shadow-lg">
                            <div className="text-center">
                                <div className="text-3xl font-black tracking-tight text-wiseOffWhite mb-1">
                                    wisetickets
                                </div>
                                <span className="text-xs text-wiseGrey4 uppercase tracking-widest">
                                    Core Engine
                                </span>
                            </div>
                            <div className="h-16 w-px bg-wiseGrey2" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-wiseRose4 mb-1">
                                    Admin Centre
                                </div>
                                <span className="text-xs text-wiseGrey4 uppercase tracking-widest">
                                    Role & Queue Control
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                6. DARK INTERACTIVE FEATURE SHOWCASE
            ========================================================= */}
            <section className="py-20 px-6 lg:px-16 bg-wiseGrey1 text-wiseOffWhite">
                <div className="max-w-7xl mx-auto">
                    {/* Centered Header */}
                    <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 mb-14">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                            Designed for modern support & operations
                        </h2>
                        <p className="text-base text-wiseGrey4 leading-relaxed">
                            Placeholder subheading: A unified workspace that brings ticket requesters, assignees, and administrators together to deliver high-quality resolutions across every team.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <Link
                                to="/register"
                                className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseRose3 hover:text-wiseOffWhite"
                            >
                                Try it for free
                            </Link>
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-lg bg-wiseGrey2 text-wiseOffWhite font-semibold text-sm hover:bg-wiseGrey3 cursor-pointer transition"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>

                    {/* Interactive 2-Column Accordion/Tabs & Preview Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Selectable Feature List */}
                        <div className="lg:col-span-5 flex flex-col">
                            {interactiveFeatures.map((item, idx) => {
                                const isActive = activeFeatureTab === idx;
                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => setActiveFeatureTab(idx)}
                                        className={`text-left py-5 px-4 border-b border-wiseGrey2 transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-wiseGrey2/50 border-l-4 border-l-wiseRose3 pl-5'
                                                : 'hover:bg-wiseGrey2/25 opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <h3 className="text-base sm:text-lg font-bold text-wiseOffWhite">
                                            {item.title}
                                        </h3>
                                        {isActive && (
                                            <p className="text-sm text-wiseGrey4 mt-2 leading-relaxed">
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Dynamic Preview Card */}
                        <div className="lg:col-span-7">
                            <div className="rounded-3xl bg-gradient-to-br from-wiseRose2/30 via-wiseGrey2 to-wiseGrey1 border border-wiseRose4/30 p-8 sm:p-12 flex flex-col items-center justify-between min-h-[420px] shadow-2xl">
                                <div className="w-full max-w-md bg-wiseOffWhite text-wiseGrey1 rounded-2xl p-6 shadow-xl border border-wiseGrey4/40 my-auto">
                                    <div className="flex items-center justify-between border-b border-wiseGrey5 pb-3 mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-wiseRose2">
                                            {interactiveFeatures[activeFeatureTab].previewHeader}
                                        </span>
                                        <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-wiseRose3 text-wiseOffWhite">
                                            Active
                                        </span>
                                    </div>

                                    <div className="bg-wiseGrey5 rounded-xl p-3.5 mb-3">
                                        <span className="text-xs font-bold text-wiseGrey3 block mb-1">
                                            {interactiveFeatures[activeFeatureTab].previewRequester}
                                        </span>
                                        <p className="text-sm font-medium text-wiseGrey1">
                                            {interactiveFeatures[activeFeatureTab].previewMessage}
                                        </p>
                                    </div>

                                    <div className="bg-wiseRose5 rounded-xl p-3.5 border border-wiseRose4">
                                        <span className="text-xs font-bold text-wiseRose2 block mb-1">
                                            System Update
                                        </span>
                                        <p className="text-xs text-wiseGrey2">
                                            {interactiveFeatures[activeFeatureTab].previewResolution}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-wiseGrey4 text-center max-w-lg mt-6">
                                    {interactiveFeatures[activeFeatureTab].subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                7. EXTEND POWER ACROSS ORGANISATION (2-Card Grid + Report)
            ========================================================= */}
            <section className="py-20 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-wiseGrey1 max-w-2xl mx-auto mb-12 leading-tight">
                        Extend structured issue tracking across your entire organisation.
                    </h2>

                    {/* 2 Service Pillar Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="rounded-3xl bg-wiseGrey5 border border-wiseGrey4/30 p-8 lg:p-10 flex flex-col justify-between gap-6">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-wiseRose5 text-wiseRose2 flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <h3 className="text-2xl font-bold text-wiseGrey1 mb-3">
                                    Internal Team Service
                                </h3>
                                <p className="text-sm sm:text-base text-wiseGrey3 leading-relaxed">
                                    Placeholder copy: Deliver effortless internal support for IT, HR, and Operations without clunky spreadsheets. Resolve employee requests quickly and keep every department moving.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4"
                                >
                                    Try it for free
                                </Link>
                                <button
                                    type="button"
                                    className="text-sm font-bold text-wiseGrey1 underline underline-offset-4 hover:text-wiseRose2 cursor-pointer"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-wiseRose5/60 border border-wiseRose4/40 p-8 lg:p-10 flex flex-col justify-between gap-6">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-wiseRose4/40 text-wiseRose1 flex items-center justify-center mb-4">
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                                <h3 className="text-2xl font-bold text-wiseGrey1 mb-3">
                                    Client & Partner Support
                                </h3>
                                <p className="text-sm sm:text-base text-wiseGrey3 leading-relaxed">
                                    Placeholder copy: Replace fragmented email threads with a dedicated issue portal that gives your external stakeholders clear status updates and fast turnaround times.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <Link
                                    to="/contact"
                                    className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4"
                                >
                                    Contact us
                                </Link>
                                <button
                                    type="button"
                                    className="text-sm font-bold text-wiseGrey1 underline underline-offset-4 hover:text-wiseRose2 cursor-pointer"
                                >
                                    Learn more
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Industry Report Dark Split Card */}
                    <div className="rounded-3xl bg-wiseGrey1 text-wiseOffWhite p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-6 flex flex-col gap-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-wiseRose4">
                                INDUSTRY REPORT PLACEHOLDER
                            </span>
                            <h3 className="text-2xl sm:text-4xl font-bold leading-tight">
                                Named a Leader in the 2026 Issue & Workflow Management Quadrant
                            </h3>
                            <p className="text-sm sm:text-base text-wiseGrey4 leading-relaxed">
                                Placeholder report summary: Recognised for intuitive multi-tenant architecture, rapid onboarding, and consistent execution in modern team issue tracking.
                            </p>
                            <div className="pt-2">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm hover:bg-wiseRose3 hover:text-wiseOffWhite cursor-pointer transition"
                                >
                                    Read the report
                                </button>
                            </div>
                        </div>

                        {/* Quadrant Chart Placeholder */}
                        <div className="lg:col-span-6">
                            <div className="bg-wiseOffWhite text-wiseGrey1 rounded-2xl p-6 border border-wiseGrey4">
                                <p className="text-xs font-bold text-wiseGrey3 mb-4">
                                    Figure 1. Quadrant Placeholder for Issue Tracking Platforms
                                </p>
                                <div className="grid grid-cols-2 grid-rows-2 border border-wiseGrey4/60 h-56 relative">
                                    <div className="border-r border-b border-wiseGrey4/40 p-2 text-[10px] font-bold uppercase text-wiseGrey3">
                                        Challengers
                                    </div>
                                    <div className="border-b border-wiseGrey4/40 p-2 text-[10px] font-bold uppercase text-wiseRose2 bg-wiseRose5/40 relative">
                                        Leaders
                                        <div className="absolute top-10 right-12 flex items-center gap-1.5 bg-wiseGrey1 text-wiseOffWhite px-2.5 py-1 rounded-full text-xs font-bold shadow">
                                            <span className="w-2 h-2 rounded-full bg-wiseRose3" />
                                            Wise Tickets
                                        </div>
                                    </div>
                                    <div className="border-r border-wiseGrey4/40 p-2 text-[10px] font-bold uppercase text-wiseGrey3 flex items-end">
                                        Niche Players
                                    </div>
                                    <div className="p-2 text-[10px] font-bold uppercase text-wiseGrey3 flex items-end">
                                        Visionaries
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                8. CUSTOMER STORIES CAROUSEL ("Built for businesses of all sizes")
            ========================================================= */}
            <section className="py-20 px-6 lg:px-16 bg-wiseGrey5/60 border-y border-wiseGrey4/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl sm:text-5xl font-bold text-wiseGrey1 mb-3">
                            Built for teams of all sizes
                        </h2>
                        <p className="text-base text-wiseGrey3">
                            From growing startups to established enterprises, explore how organisations streamline their support queues.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Quote Column */}
                        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                            <div className="text-xl font-black tracking-tight text-wiseRose2">
                                {testimonials[activeTestimonial].company}
                            </div>
                            <blockquote className="text-xl sm:text-2xl font-medium text-wiseGrey1 leading-relaxed">
                                {testimonials[activeTestimonial].quote}
                            </blockquote>
                            <div>
                                <p className="text-sm font-bold text-wiseGrey1">
                                    {testimonials[activeTestimonial].author}
                                </p>
                                <p className="text-xs text-wiseGrey3">
                                    {testimonials[activeTestimonial].role}
                                </p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="text-sm font-bold text-wiseGrey1 underline underline-offset-4 hover:text-wiseRose2 cursor-pointer"
                                >
                                    Read customer story
                                </button>
                            </div>

                            {/* Carousel Controls */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveTestimonial((prev) =>
                                            prev === 0 ? testimonials.length - 1 : prev - 1
                                        )
                                    }
                                    className="w-9 h-9 rounded-full border border-wiseGrey4 flex items-center justify-center text-wiseGrey1 hover:bg-wiseRose4 hover:border-wiseRose4 cursor-pointer transition"
                                    title="Previous Story"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                                </button>
                                <div className="flex items-center gap-1.5 px-2">
                                    {testimonials.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={`h-2 rounded-full transition-all ${
                                                activeTestimonial === idx
                                                    ? 'w-6 bg-wiseRose3'
                                                    : 'w-2 bg-wiseGrey4'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveTestimonial((prev) =>
                                            prev === testimonials.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                    className="w-9 h-9 rounded-full border border-wiseGrey4 flex items-center justify-center text-wiseGrey1 hover:bg-wiseRose4 hover:border-wiseRose4 cursor-pointer transition"
                                    title="Next Story"
                                >
                                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                                </button>
                            </div>
                        </div>

                        {/* Right Customer Media & Metrics Card */}
                        <div className="lg:col-span-6">
                            <div className="rounded-3xl overflow-hidden bg-wiseGrey1 text-wiseOffWhite border border-wiseGrey2 shadow-xl">
                                <div className="h-56 bg-gradient-to-tr from-wiseGrey2 via-wiseRose1/40 to-wiseGrey1 flex flex-col items-center justify-center p-6 text-center">
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        className="text-4xl text-wiseRose4 mb-3"
                                    />
                                    <span className="text-xs uppercase tracking-widest text-wiseGrey4">
                                        [ Customer Video / Case Study Image Placeholder ]
                                    </span>
                                </div>
                                <div className="p-6 sm:p-8 grid grid-cols-2 gap-6 bg-wiseGrey1 border-t border-wiseGrey2">
                                    <div>
                                        <div className="text-3xl sm:text-4xl font-bold text-wiseRose4">
                                            {testimonials[activeTestimonial].stat1Value}
                                        </div>
                                        <div className="text-xs sm:text-sm text-wiseGrey4 mt-1">
                                            {testimonials[activeTestimonial].stat1Label}
                                        </div>
                                    </div>
                                    <div className="border-l border-wiseGrey2 pl-6">
                                        <div className="text-3xl sm:text-4xl font-bold text-wiseRose4">
                                            {testimonials[activeTestimonial].stat2Value}
                                        </div>
                                        <div className="text-xs sm:text-sm text-wiseGrey4 mt-1">
                                            {testimonials[activeTestimonial].stat2Label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
                9. CONNECT YOUR ECOSYSTEM (Integrations Grid)
            ========================================================= */}
            <section className="py-20 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-wiseGrey1 leading-tight">
                            Connect your ecosystem. Your way.
                        </h2>
                        <p className="text-base text-wiseGrey3 leading-relaxed">
                            Placeholder copy: Quickly integrate your favourite tools and communication channels to get value immediately. Fine-tune your workspace to match your organisation&apos;s specific operational needs.
                        </p>
                        <div className="pt-2">
                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4 cursor-pointer"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {integrationPlaceholders.map((integration) => (
                            <div
                                key={integration}
                                className="p-4 rounded-2xl bg-wiseGrey5 border border-wiseGrey4/30 flex items-center justify-center text-center text-sm font-bold text-wiseGrey2 hover:border-wiseRose3 hover:bg-wiseRose5/40 transition"
                            >
                                {integration}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                10. ADDITIONAL RESOURCES (4-Column Card Grid)
            ========================================================= */}
            <section className="py-16 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-wiseGrey1 mb-8">
                        Additional resources
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resourceCards.map((card) => (
                            <div
                                key={card.title}
                                className="rounded-2xl bg-wiseGrey5 border border-wiseGrey4/30 overflow-hidden flex flex-col justify-between group hover:shadow-md transition"
                            >
                                <div>
                                    {/* Image Placeholder Header */}
                                    <div className="h-44 bg-gradient-to-br from-wiseRose4/40 via-wiseRose5 to-wiseGrey5 flex items-center justify-center border-b border-wiseGrey4/20">
                                        <FontAwesomeIcon
                                            icon={card.icon}
                                            className="text-3xl text-wiseRose2 group-hover:scale-110 transition-transform"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-wiseGrey3">
                                                {card.tag}
                                            </span>
                                            {card.featured && (
                                                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-wiseRose4 text-wiseGrey1">
                                                    FEATURED
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-wiseGrey1 leading-snug">
                                            {card.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="px-5 pb-5">
                                    <button
                                        type="button"
                                        className="text-xs font-bold text-wiseGrey1 underline underline-offset-4 group-hover:text-wiseRose2 cursor-pointer"
                                    >
                                        Learn more
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================
                11. PRICING CTA BANNER
            ========================================================= */}
            <section className="py-16 px-6 lg:px-16 bg-wiseOffWhite">
                <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-wiseGrey5 via-wiseRose5 to-wiseGrey5 border border-wiseRose4/40 p-10 lg:p-16 text-center flex flex-col items-center gap-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-wiseGrey1">
                        Pricing built for your success
                    </h2>
                    <p className="text-base text-wiseGrey2 max-w-xl">
                        Get faster resolutions, aligned teams, and a workspace that scales effortlessly with your company.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            to="/register"
                            className="px-6 py-3 rounded-lg bg-wiseRose4 text-wiseGrey1 font-bold text-sm transition duration-200 hover:bg-wiseGrey1 hover:text-wiseRose4"
                        >
                            See plans and pricing
                        </Link>
                        <button
                            type="button"
                            className="px-6 py-3 rounded-lg bg-wiseOffWhite border border-wiseGrey4 text-wiseGrey1 font-semibold text-sm hover:border-wiseGrey1 cursor-pointer transition"
                        >
                            Calculate your ROI
                        </button>
                    </div>
                </div>
            </section>

            {/* =========================================================
                12. FOOTER (Dark Multi-Column Zendesk-Inspired Layout)
            ========================================================= */}
            <footer className="bg-wiseGrey1 text-wiseOffWhite pt-12 pb-16 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    {/* Top Collapsible FAQ Trigger Banner */}
                    <div className="rounded-2xl bg-wiseGrey2/60 border border-wiseGrey2 p-6 mb-14 text-center">
                        <h3 className="text-xl font-bold mb-2">Need to know more?</h3>
                        <button
                            type="button"
                            onClick={() => setFaqOpen(!faqOpen)}
                            className="text-sm font-semibold text-wiseRose4 hover:underline inline-flex items-center gap-2 cursor-pointer"
                        >
                            <span>View FAQs</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`text-xs transition-transform ${faqOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {faqOpen && (
                            <div className="mt-6 pt-6 border-t border-wiseGrey3/40 text-left grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-wiseGrey4">
                                <div>
                                    <p className="font-bold text-wiseOffWhite mb-1">
                                        How does company registration work?
                                    </p>
                                    <p>
                                        Placeholder FAQ answer: Complete our 3-step registration wizard with your company details and admin account to launch your tenant workspace immediately.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold text-wiseOffWhite mb-1">
                                        Can I manage user permissions and ticket statuses?
                                    </p>
                                    <p>
                                        Placeholder FAQ answer: Yes, the Admin Centre and ticket detail views allow you to update assignees, statuses, and team configurations anytime.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 5-Column Footer Navigation Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-14 border-b border-wiseGrey2">
                        {footerColumns.map((col) => (
                            <div key={col.heading} className="flex flex-col gap-3">
                                <h4 className="text-sm font-bold text-wiseOffWhite tracking-wide">
                                    {col.heading}
                                </h4>
                                <ul className="flex flex-col gap-2.5">
                                    {col.links.map((linkText) => (
                                        <li key={linkText}>
                                            <a
                                                href="#placeholder"
                                                onClick={(e) => e.preventDefault()}
                                                className="text-xs text-wiseGrey4 hover:text-wiseRose4 hover:underline transition-colors"
                                            >
                                                {linkText}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Large Contact Callout Bar */}
                    <div className="py-10 border-b border-wiseGrey2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="text-3xl sm:text-5xl font-bold tracking-tight">
                            How can we help?{' '}
                            <Link
                                to="/contact"
                                className="text-wiseRose4 underline underline-offset-8 hover:text-wiseRose3 transition-colors"
                            >
                                Contact us
                            </Link>
                        </div>

                        {/* Social Placeholder Icons */}
                        <div className="flex items-center gap-3">
                            {['X', 'in', 'fb', 'yt', 'ig'].map((network) => (
                                <button
                                    key={network}
                                    type="button"
                                    className="w-9 h-9 rounded-full bg-wiseGrey2 text-wiseOffWhite text-xs font-bold hover:bg-wiseRose4 hover:text-wiseGrey1 cursor-pointer transition"
                                >
                                    {network}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Legal Links */}
                    <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-wiseGrey4">
                        <div className="flex flex-wrap items-center gap-6">
                            <Link to="/terms" className="hover:text-wiseRose4 hover:underline">
                                Terms of Use
                            </Link>
                            <Link to="/privacy" className="hover:text-wiseRose4 hover:underline">
                                Privacy Notice
                            </Link>
                            <Link to="/privacy" className="hover:text-wiseRose4 hover:underline">
                                Cookie Notice
                            </Link>
                            <Link to="/contact" className="hover:text-wiseRose4 hover:underline">
                                Contact Us
                            </Link>
                        </div>
                        <span>© 2026 Wise Tickets. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}