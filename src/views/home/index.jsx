import { Link } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaCheckCircle } from "react-icons/fa";
import Faq from '../../components/faq'
import InfiniteScroll from '../../components/InfiniteScroll'
import { MdOutlineInstallMobile } from "react-icons/md";
import { BsRecord2 } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import HowItWorksCard from '../../components/card/howitworkscard';
import AuthCard from '../../components/card/authCard';
import { motion } from 'framer-motion';


const Home = () => {
    // const testimonialData = [
    //     {
    //         index: 0,
    //         picSrc: "https://images.pexels.com/photos/3772712/pexels-photo-3772712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "James Dalton, College Professor",
    //         testimonial: "As a college professor, I often record lectures that run for hours. ScreenBox has been a lifesaver! The no time limit feature lets me record entire classes without worrying about interruptions. Plus, the offline recording option is perfect for when I’m teaching in areas with poor internet. Highly recommend it to all educators!"
    //     },
    //     {
    //         index: 1,
    //         picSrc: "https://images.pexels.com/photos/6953575/pexels-photo-6953575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "Sara M., YouTuber",
    //         testimonial: "I’ve been using ScreenBox for my YouTube channel, and it’s been a game-changer! The unlimited recording feature lets me record for hours without any interruptions. The HD quality is perfect for my makeup tutorials, and the custom watermark feature is great for branding my videos."
    //     },
    //     {
    //         index: 2,
    //         picSrc: "https://images.pexels.com/photos/9072217/pexels-photo-9072217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "Mike S., Twitch Streamer",
    //         testimonial: "As a Twitch streamer, I need a reliable tool to record my gameplay. ScreenBox lets me record for hours without any limits, and the webcam overlay is perfect for adding commentary. The compressed video files are a huge plus—they save me so much storage space. Love this tool!"
    //     },
    //     {
    //         index: 3,
    //         picSrc: "https://images.pexels.com/photos/12885861/pexels-photo-12885861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "Donald R., Business Owner",
    //         testimonial: "I use ScreenBox to create product demos and training videos for my team. The unlimited recording feature is perfect for long videos, and the HD quality ensures my videos look professional. The custom watermark feature is great for branding, and the compressed video files make sharing a breeze. Highly recommend it to all business owners!"
    //     },
    //     {
    //         index: 4,
    //         picSrc: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "Alex P., Graduate Student",
    //         testimonial: "I use ScreenBox to record online lectures and create study materials. The offline recording feature is a lifesaver when I’m in areas with no internet, and the HD quality ensures I don’t miss any details. For students on a budget, the free plan is amazing, but the Pro plan is totally worth it for the advanced tools!"
    //     },
    //     {
    //         index: 5,
    //         picSrc: "https://images.pexels.com/photos/6266273/pexels-photo-6266273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         userName: "Emily W., Software Developer",
    //         testimonial: "I use ScreenBox to record bug reports and coding tutorials. The advanced annotations are super helpful for pointing out issues, and the no time limit feature is perfect for long coding sessions. The best part? No sign-up required—just install and start recording. It’s a developer’s dream!"
    //     }
    // ]

    const homeFaqs = [
        {
          index: 0,
          question: "What is ScreenBox?",
          answer:
            "ScreenBox is a simple screen recording app built for remote workers and professionals who want fast, frictionless recording."
        },
        {
          index: 1,
          question: "How do I record my screen?",
          answer:
            "Sign up with Google, open your dashboard, choose your screen and audio source, then hit record. That’s it."
        },
        {
          index: 2,
          question: "Do I need to sign up?",
          answer:
            "Yes. Signing up takes just two clicks. It helps us personalize your experience and keep your recordings secure."
        },
        {
          index: 3,
          question: "Is there a time limit?",
          answer:
            "Yes — 25 minutes per recording. Need more time? Just start a new recording after each 25-minute session."
        },
        {
          index: 4,
          question: "Can I download my recordings?",
          answer:
            "Absolutely. You can instantly download your videos in WebM format. No fuss — record, preview, download."
        },
        {
          index: 5,
          question: "How much does it cost?",
          answer:
            "ScreenBox is free. Soon, we’ll offer paid features like AI tools, custom watermarks, 1080p/4K recording, offline mode, sharing, and an API — all at affordable prices."
        },
        {
          index: 6,
          question: "Is there a mobile version?",
          answer:
            "Not yet. ScreenBox is currently web-only, but we’re working on a mobile version. Stay tuned."
        },
        {
          index: 7,
          question: "Is my data secure?",
          answer:
            "Yes. We don’t store your videos. You choose where to save them — your device or Google Drive. Your content, your control."
        },
        {
          index: 8,
          question: "Do you offer support?",
          answer:
            "Yes. Reach out to our support team anytime at @screenboxsupport for help, feedback, or feature requests."
        }
      ];
      

    const [showAuthCard, setShowAuthCard] = useState(false);

    return (
        <div>
            <header>
                <div className="header-container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.svg" alt="" />
                        </Link>
                    </div>
                    <nav className='nav'>
                        <ul className='header-nav-list'>
                            <li>
                                <Link to="/movies">
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies">
                                    Use Cases
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/movies">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-actions">
                        <button onClick={() => setShowAuthCard(true)} className='header-actions-btn'>
                            <span>
                                Get started for free
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <section className='hero'>
                <div className="hero-wrapper">
                    <div className="hero-text">
                        <div className="tag">
                            <span>
                                Super fast and easy
                            </span>
                        </div>
                        <h1>
                            Your complete screen recording platform for <span>remote work.</span>
                        </h1>
                        <p>
                            Screenbox provides professionals with a simple, fast, and easy way to record their screen. Just fast and easy.
                        </p>
                        <button 
                           onClick={() => setShowAuthCard(true)}
                        >
                            <span>
                                Try ScreenBox for free
                            </span>
                        </button>
                        <span>
                            No credit card required
                        </span>
                    </div>
                    <div className="hero-video">
                        <ReactPlayer
                            url='https://youtu.be/zTAeqCrsWWc?si=yIk14dCkLrsGyQPw'
                            width='100%'
                            height='100%'
                        />
                    </div>
                </div>
            </section>
            <InfiniteScroll />
            <section className='how-it-works'>
                <div className="how-it-works-wrapper">
                    <div className="tag">
                        <span>
                            How it works
                        </span>
                    </div>
                    <h2>
                        Getting started is <span>easy.</span>
                    </h2>
                    <p className='how-it-works-description'>
                        Record your screen in three simple steps.
                    </p>
                    <div className="how-it-works-card-wrapper">
                        <HowItWorksCard 
                            title="Signup with Google"
                            description="In just two clicks, signup with Google. No authentication hassle. No friction."
                            icon={<MdOutlineInstallMobile />}
                        />
                        <HowItWorksCard
                            title="Record your screen"
                            description="In your dashboard, select the screen and audio you want to record, and click on the record button."
                            icon={<BsRecord2 />}
                        />
                        <HowItWorksCard
                            title="Download recording"
                            description="Once you’re done recording, download the video to your device or upload it to Google Drive and share with friends or team."
                            icon={<IoCloudUploadOutline />}
                        />
                    </div>
                </div>
            </section>
            <section className='single-testimonial'>
                <div className="single-testimonial-wrapper">
                    <h2>
                        Screenbox makes it easy to record effortlessly without <span className='single-testimonial-span'>friction.</span> Now, I can easily catch bugs and share them with my team.
                    </h2>
                    <p className='testimonial-description'>
                        - David Enyoghasim, Software Developer
                    </p>
                    <InfiniteScroll />
                </div>
            </section>
            <section className='features'>
                <div className="features-wrapper">
                    <div className="tag">
                        <span>
                            Features
                        </span>
                    </div>
                    <h2>
                        Screen recording made <span>super easy.</span>
                    </h2>
                    <p className='features-description'>
                        All the features you need to record your screen better.
                    </p>

                </div>
            </section>
            <section className='pricing'>
                <div className="pricing-wrapper">
                    <div className="tag">
                        <span>
                            Pricing
                        </span>
                    </div>
                    <h2>
                        Simple pricing, <span>
                             no hidden fees
                        </span>
                    </h2>
                    <p className='pricing-description'>
                        Choose a plan that fits your need, with everything you need to record your screen better.
                    </p>
                    <div className="pricing-card--wrapper">
                        <div className="price-card">
                            <h3>
                                Free forever
                            </h3>
                            <p>
                                For casual users
                            </p>
                            <span>
                                $0/month
                            </span>
                            <ul>
                                <li>
                                    <FaCheckCircle />
                                    Unlimited number of recordings
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    25 minutes max per recording
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No webcam overlay
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Watermark on videos
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No annotations
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No AI translations
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Webm format
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No offline recording
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No sharing
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No integration with Google Drive
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Download to device
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    customer support
                                </li>
                            </ul>
                            <button onClick={() => setShowAuthCard(true)}>
                            <span>
                                Try ScreenBox for free
                            </span>
                            </button>
                        </div>
                        <div className="price-card">
                            <h3>
                                Pro
                            </h3>
                            <p>
                                For remote workers & professionals
                            </p>
                            <span>
                                $5/month
                            </span>
                            <ul>
                                <li>
                                    <FaCheckCircle />
                                    Unlimited number of recordings
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    10 hours max per recording
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Webcam overlay
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Custom watermark
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Advanced annotations
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Advanced AI translations
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    HD (1080p/4K) format
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Offline recording
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Sharable link
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Integrate with Google Drive
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Save to cloud
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Customer support
                                </li>
                            </ul>
                            <button>
                            <span>
                                Coming soon!
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq">
                <div className="faq-wrapper">
                    <div className="tag">
                        <span>
                            Frequently asked questions
                        </span>
                    </div>
                    <h2>
                        Everything you need to <span>know.</span>
                    </h2>
                    <p className='faq-description'>
                        Have a question about ScreenBox? Here's everything you need to know about Screenbox.
                    </p>
                    <div className="faq-bars-wrapper">
                        <div className="faq-bar">
                           <Faq 
                            faqData={homeFaqs}
                           />
                        </div>
                    </div>
                </div>
            </section>
            <section className="final-cta">
                <div className="final-cta-wrapper">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.svg" alt="" />
                        </Link>
                    </div>
                    <h2>
                        Ready to start <span>recording?</span>
                    </h2>
                    <p className='final-cta-description'>
                        Signup easily today and start recording your screen, audio, and webcam effortlessly.
                    </p>
                    <button onClick={() => setShowAuthCard(true)}>
                        <span>
                            Try ScreenBox for free
                        </span>
                    </button>
                </div>
            </section>
            <footer>
                <div className="footer-wrapper">
                    <div className="footer-top">
                        <p>
                            &copy; 2025 ScreenBox. All rights reserved.
                        </p>
                        <div className="privacy">
                            <Link to="/">
                                Privacy Policy
                            </Link>
                            <Link to="/">
                                Terms of Service
                            </Link>
                        </div>
                     </div>
                     <div className="footer-bottom">
                        <p>
                            Powered by <a href="/">NextBuildr</a>
                        </p>
                     </div>
                     <div className="bottom-logo">
                        <span>
                            Screenbox
                        </span>
                     </div>
                </div>
            </footer>
            {showAuthCard && (<div className="modal-overlay" onClick={() => setShowAuthCard(false)}>
                <motion.div
                    className="auth-modal"
                    onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                >
                <AuthCard closeModal={() => setShowAuthCard(false)} />
                </motion.div>
            </div>
        )}
        </div>
    )
}

export default Home