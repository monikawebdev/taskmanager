import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ClipboardCheck, X, PieChart, DollarSign, TrendingUp, Target, Users, Goal, ChartNetwork, Radar, ChartNoAxesGantt,
    ChevronRight, Shield, RefreshCw, Moon, Sun, Check, BarChart2, Calendar, TrendingDown, HandCoins, Menu, Clock, Flag, Watch
} from 'lucide-react';
import { Helmet } from 'react-helmet';
import LandingIMG from "../meta/imgs/Dashboard.png";
// import tweetCard from "../meta/imgs/tweet-card.png";
// import LandingpageIMG from "../meta/imgs/Landing-page-financeGet.png";

const COLORS = {
    primary: '#6366F1',
    accent: '#FBBF24',
    bgLight: '#F9FAFB',
    bgDark: '#0a0a0a',
    textDark: '#1F2937',
    textLight: '#6B7280',
};


const LandingPage = () => {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [CancelStick, setCancelStick] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('theme');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);


    const features = [
        { title: "Task Organization", description: "Effortlessly plan and prioritize your tasks.", icon: <Menu /> },
        { title: "Deadline Tracking", description: "Never miss a due date again.", icon: <Clock /> },
        { title: "Progress Monitoring", description: "Track your progress with clear insights.", icon: <BarChart2 /> },
        { title: "Goal Achievement", description: "Stay focused and reach your milestones.", icon: <Target /> },
    ];


    const taskManagerTools = [
        { title: "Task Scheduler", description: "Plan your day by scheduling tasks with ease.", icon: <Calendar className="text-purple-600" />, free: true, premium: "Recurring Tasks" },
        { title: "Priority Organizer", description: "Categorize tasks by priority for better focus.", icon: <Flag className="text-purple-600" />, free: "Today", premium: "Custom Timeframes" },
        { title: "Time Tracker", description: "Track the time spent on tasks to optimize productivity.", icon: <Watch className="text-purple-600" />, free: "Current Session", premium: "Historical Data" },
        { title: "Collaboration Tools", description: "Work with teams by sharing tasks and deadlines.", icon: <Users className="text-purple-600" />, free: false, premium: "Team Management" },
    ];


    const borrowTools = [
        { title: "Plan Smarter", description: "Organize tasks and projects with clarity using our smart productivity tools. ", icon: <HandCoins className="text-purple-600" />, free: true, premium: "Advanced Options" },
        { title: "Task Scheduler", description: "Automatically arrange your tasks based on deadlines and priorities.", icon: <TrendingDown className="text-purple-600" />, free: false, premium: "Full Access" },
    ];

    const testimonials = [
        { name: "Soumen Bhunia", role: "Freelancer", content: "Transformed my Worklife balance!", avatar: "SB" },
        { name: "Monika Pal", role: "Software Engineer", content: "Optimized my Workstation.", avatar: "MP" },
        { name: "Souvagya Dash", role: "Software Engineer", content: "Planning and simplify!", avatar: "SRD" },
        { name: "Ritesh Das", role: "Software Engineer", content: "The productivity boost is real!", avatar: "RD" },
    ];

    const benefits = [
        { icon: <Clock />, title: "Real-Time", description: "Instant updates" },
        { icon: <Shield />, title: "Secure", description: "Top-tier protection" },
        { icon: <RefreshCw />, title: "Sync", description: "Seamless tracking" },
    ];

    // const pricingPlans = [
    //     { name: "Basic", price: "₹0", priceSubtext: "/whole life", description: "Perfect for getting started with financial tracking.", features: ["Track budgets & goals for the current year", "Default 50/30/20 budgeting rule", "Real-time expense tracking", "Basic financial reports", "Reports download to CSV", "Transactions download to pdf"], cta: "Start Free", link: "/register", highlighted: false },
    //     { name: "Premium", price: "₹29", priceSubtext: "/year", description: "Unlock advanced tools for total financial control.", features: ["Everything in Basic", "Track previous year data", "Customizable finance rules", "Advanced goal setting", "Financial forecasting", "Priority support"], cta: "Go Premium", link: "/register", highlighted: true },
    // ];

    const faqs = [
        { question: "Is my data secure?", answer: "Yes, we use top-level encryption and cloud security to ensure your tasks and personal data are always safe." },
        { question: "Can I upgrade later?", answer: "Absolutely, upgrade to Premium anytime from your account settings for advanced features and integrations." },
        { question: "What's included in the free plan?", answer: "Task creation, to-do lists, basic project boards, and reminders everything you need to stay organized." },
    ];

    const blogPosts = [
        { title: "5 Tips to Save More in 2025", link: "/blog/tips-to-save" },
        { title: "Understanding Loan Interest Rates", link: "/blog/loan-rates" },
    ];

    return (
        <>
            {/* <Helmet>
                <title>FinanceGet ~ Master Your Finances</title>
                <meta property="og:title" content="FinanceGet" />
                <meta
                    property="og:description"
                    content="Take control of your financial journey with our all-in-one platform. Track, plan, and grow your wealth with intuitive tools designed for you."
                />
                <meta property="og:image" content="https://financeget.vercel.app/assets/Landing-page-financeGet-iyuiiDPm.png" />
                <meta property="og:url" content="https://financeget.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="FinanceGet" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="FinanceGet" />
                <meta
                    name="twitter:description"
                    content="Take control of your financial journey with our all-in-one platform. Track, plan, and grow your wealth with intuitive tools designed for you."
                />
                <meta name="twitter:image" content="https://financeget.vercel.app/assets/tweet-card-tHslKEPd.png" />
                <meta name="twitter:url" content="https://financeget.vercel.app/" />
            </Helmet> */}

            <div className="min-h-screen bg-white text-black transition-colors duration-300">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleDarkMode}
                    className="fixed top-4 right-4 p-2 rounded-full bg-gray-50 dark:bg-[#ffffff17] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#ffffff24] transition-all duration-200 z-50"
                    aria-label="Toggle theme"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Hero Section */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pt-20 pb-24 px-4 text-center"
                >
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Work Organized, <span className="text-purple-600">Life Simplified</span>
                        </h1>
                        <p className="max-md:text-[0.8rem] md:text-md text-gray-600 mb-8 max-w-xl mx-auto">
                            Take charge of your productivity with our all-in-one task manager. Organize, prioritize, and accomplish your goals with intuitive tools designed for your success.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/register" className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md transition-all duration-200">
                                Start Free <ChevronRight size={18} />
                            </Link>
                            <Link to="/login" className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-medium border border-purple-600 hover:bg-purple-50 shadow-md transition-all duration-200">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </motion.header>

                {/* Demo Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4"
                >
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">See It in Action</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Watch how TaskManager simplifies your financial life.
                        </p>
                        <div className="relative max-w-3xl mx-auto">
                            <img src={LandingIMG} alt="TaskManger Demo" className="rounded-lg shadow-lg w-full" />
                        </div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Your Task, Simplified</h2>
                        <p className="text-black text-center mb-10 max-w-2xl mx-auto">Everything you need to manage your Task in one place.</p>
                        <div className="grid md:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100">
                                    <div className="mb-4 text-purple-600">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Task Planning Tools Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4 bg-gray-50"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Task Planning Tools</h2>
                        <p className="text-lg text-gray-600 text-center mb-12">
                            Master your workflow with tools built to boost productivity and help you stay on track.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {taskManagerTools.map((tool, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100"
                                >
                                    <div className="mb-4">{tool.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">{tool.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className={`px-2 py-1 rounded-full ${tool.free ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {tool.free === true
                                                ? 'Free'
                                                : typeof tool.free === 'string'
                                                    ? tool.free
                                                    : 'Premium Only'}
                                        </span>
                                        {tool.premium && (
                                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                                {tool.premium}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>


                {/* Borrow Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4 bg-gray-50"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3"> Task Manager Version</h2>
                        <p className="text-lg text-gray-600 text-center mb-12">Track your performance, identify patterns, and optimize your work habits.</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {borrowTools.map((tool, index) => (
                                <div key={index} className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100">
                                    <div className="mb-4">{tool.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2 text-black">{tool.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className={`px-2 py-1 rounded-full ${tool.free ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {tool.free === true ? 'Free' : typeof tool.free === 'string' ? tool.free : 'Premium Only'}
                                        </span>
                                        {tool.premium && (
                                            <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">{tool.premium}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Pricing Section */}
                {/* <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Choose Your Plan</h2>
                        <p className="text-lg text-gray-600 text-center mb-12">Start for free or unlock premium financial tools.</p>
                        <div className="grid md:grid-cols-2 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`p-6 rounded-[1.4rem] shadow-md transition-all duration-300 border ${plan.highlighted ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border border-blue-400 transform -translate-y-2 shadow-lg' : 'bg-gray-50 border-gray-100 hover:shadow-lg hover:-translate-y-1'}`}>
                                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        {plan.priceSubtext && (
                                            <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-600'}`}>{plan.priceSubtext}</span>
                                        )}
                                    </div>
                                    <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <Check size={16} className={plan.highlighted ? 'text-blue-200' : 'text-blue-600'} />
                                                <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-700'}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={plan.link} className={`inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-[.7rem] font-medium transition-all duration-200 ${plan.highlighted ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-sm' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border border-blue-400 shadow-sm'}`}>
                                        {plan.cta} <ChevronRight size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section> */}

                {/* Statistics Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-12 px-4 bg-gradient-to-r from-purple-500 to-purple-700 shadow-lg border border-blue-400 text-white"
                >
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <div className="text-sm text-purple-100">Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">₹10M+</div>
                            <div className="text-sm  text-purple-100">Trackable</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9/5</div>
                            <div className="text-sm  text-purple-100">Rating</div>
                        </div>
                    </div>
                </motion.section>

                {/* Testimonials */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">User Love</h2>
                        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">Don't just take our word for it. See what our users have to say.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="p-6 bg-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12  bg-purple-600 text-white rounded-full flex items-center justify-center font-medium text-lg shadow-sm">{testimonial.avatar}</div>
                                        <div>
                                            <div className="font-semibold text-black">{testimonial.name}</div>
                                            <div className="text-xs text-gray-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">"{testimonial.content}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4 bg-gray-50"
                >
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-6 mt-8">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-2 text-black">{faq.question}</h3>
                                    <p className="text-sm text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="py-16 px-4"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Get Started Now</h2>
                        <p className="text-lg text-gray-600 mb-8">Join the productivity revolution with TaskManager.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md transition-all duration-200">
                                Try Free <ChevronRight size={18} />
                            </Link>
                            <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 border border-purple-600 shadow-md transition-all duration-200">
                                Contact Us
                            </button>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm">
                                    <span className="text-purple-600">{benefit.icon}</span>
                                    <span>{benefit.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Call-to-Action Banner */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`px-4 bg-purple-600 text-white ${CancelStick ? 'sticky py-4' : 'py-6'} bottom-0 z-40`}
                >
                    <div className={`justify-end ${CancelStick ? 'flex' : 'hidden'}`}>
                        <div onClick={() => { setCancelStick(!CancelStick) }} className="cursor-pointer hover:bg-purple-200/10 rounded-full p-2"><X size={18} /></div>
                    </div>
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-lg font-medium">Ready to take control of your Work?</p>
                        <Link to="/register" className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 shadow-md transition-all duration-200">
                            Start Now <ChevronRight size={18} />
                        </Link>
                    </div>
                </motion.section>

                {/* Footer */}
                <footer className="bg-black py-12 px-4 text-gray-400">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <ClipboardCheck className=" h-6 w-6 text-purple-500" />
                                <span className="text-lg font-bold text-white">TaskManager</span>
                            </div>
                            <p className="text-sm">Simplify your work life.</p>
                        </div>
                        {[
                            { title: "Product", links: ["Features", "Pricing", "Docs"] },
                            { title: "Company", links: ["About", "Blog", "Careers"] },
                            { title: "Legal", links: ["Privacy", "Terms"] },
                        ].map((section, index) => (
                            <div key={index}>
                                <h4 className="text-sm font-medium text-white mb-4">{section.title}</h4>
                                <ul className="space-y-2 text-sm">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center text-xs border-t border-[#222222a0] pt-4">© {new Date().getFullYear()} TaskManager</div>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;