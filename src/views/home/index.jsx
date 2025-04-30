import { Link } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaCheckCircle, FaTiktok, FaTwitter } from "react-icons/fa";
import Faq from '../../components/faq'
import InfiniteScroll from '../../components/InfiniteScroll'
import { IoIosLogIn } from "react-icons/io";
import { BsRecord2 } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import HowItWorksCard from '../../components/card/howitworkscard';
import AuthCard from '../../components/card/authCard';
import { motion } from 'framer-motion';
import { RiRecordCircleFill } from "react-icons/ri";
import FeatureCard from '../../components/card/featureCard';
import { AiFillAudio } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { IoMdShareAlt } from "react-icons/io";
import {FaDownload} from "react-icons/fa";
import TestimonialCard from '../../components/card/testimonialCard';
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";



const Home = () => {

    const homeFaqs = [
        {
          index: 0,
          question: "What is Stroomify?",
          answer:
            "Stroomify is an async screen recording tool for SaaS teams, founders, and remote professionals. Capture your screen, mic, and camera — no meetings, no fuss."
        },
        {
          index: 1,
          question: "How do I start recording?",
          answer:
            "Sign in with Google, head to your dashboard, choose what to record (screen + audio), and hit the record button. Done in seconds."
        },
        {
          index: 2,
          question: "Do I need an account?",
          answer:
            "Yes. It only takes two clicks with Google. This keeps your recordings secure and gives you access to your personal library."
        },
        {
          index: 3,
          question: "Is there a time limit?",
          answer:
            "Free users can record up to 25 minutes per video. Pro users get up to 12 hours per recording."
        },
        {
          index: 4,
          question: "Can I download my videos?",
          answer:
            "Yes. All your recordings can be downloaded in WebM format directly to your device. No waiting, no watermark on Pro."
        },
        {
          index: 5,
          question: "What’s included in the free plan?",
          answer:
            "You get 30 recordings, 25-minute limit, screen + mic capture, access to your recording library, and clean UI — all free, forever."
        },
        {
          index: 6,
          question: "What’s in the Pro plan?",
          answer:
            "Unlimited recordings, 12-hour duration, no watermark, webcam overlay, shareable links, Slack integration, and more — for just $10/month."
        },
        {
          index: 7,
          question: "Can I share my recordings?",
          answer:
            "Pro users can generate sharable links to send recordings to teammates or clients. Free users can download and share manually."
        },
        {
          index: 8,
          question: "Is my data safe?",
          answer:
            "Yes. Your videos are securely stored in the cloud and only accessible by you. We use encryption to protect your data."
        },
        {
          index: 9,
          question: "Need help?",
          answer:
            "We got you. Reach out to our support team anytime at support@stroooo.io."
        }
      ];
      
      

    const [showAuthCard, setShowAuthCard] = useState(false);

    const container = {
  visible: {
    transition: {
      staggerChildren: 0.4
    }
  }
}

const word = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.8,
      ease: "easeOut"
    }
  }
}


    return (
        <div>
            <main-header>
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
                                    Features
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
            </main-header>
            <section className='hero'>
                <div className="hero-wrapper">
                    <div className="hero-text">
                        <div className="tag">
                            <span>
                                Super fast and easy
                            </span>
                        </div>
                        <motion.h1
                            className="hero-title"
                            initial="hidden"
                            animate="visible"
                            variants={container}
                        >
                            <motion.span variants={word} className='hero-normal'>Record.</motion.span>{" "}
                            <motion.span variants={word} className='hero-normal'>Share.</motion.span>{" "}
                            <motion.span variants={word} className="highlight">Ship.</motion.span>
                        </motion.h1>
                        <p>
                        Async screen recording for SaaS teams and remote workers. Ditch meetings. Record your screen, voice, and camera in seconds.
                        </p>
                        <button 
                           onClick={() => setShowAuthCard(true)}
                        >
                            <span>
                                Try Stroomify for free
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
                            description="Skip the passwords. Sign up instantly with your Google account. It's fast, secure, and friction-free."
                            icon={<IoIosLogIn />}
                        />
                        <HowItWorksCard
                            title="Record your screen"
                            description="Choose your screen, window, or tab. Select audio sources. Hit record. It's that simple."
                            icon={<BsRecord2 />}
                        />
                        <HowItWorksCard
                            title="Download recording"
                            description="Download your video or save it to your library to share with teammates or friends in a click."
                            icon={<IoCloudUploadOutline />}
                        />
                    </div>
                </div>
            </section>
            <section className='single-testimonial'>
                <div className="single-testimonial-wrapper">
                    <h2>
                        Stroomify makes it easy to record effortlessly without <span className='single-testimonial-span'>friction.</span> Now, I can easily catch bugs and share them with my team.
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
                    <div className="features-card__wrapper">
                        <FeatureCard 
                            title="One-click screen recording"
                            description="Record your entire screen, window, or tab instantly. No setup, no fluff."
                            icon={<RiRecordCircleFill />}
                        />
                        <FeatureCard
                            title="Audio Capture"
                            description="Capture both system and mic audio—great for demos, walkthroughs, and tutorials"
                            icon={<AiFillAudio />}
                        />
                        <FeatureCard
                            title="Instant Preview"
                            description="Review your recording right after finishing. No delays, no waiting around."
                            icon={<MdOutlinePreview />}
                        />
                        <FeatureCard
                            title="Recording Library"
                            description="All your recordings in one tidy dashboard. Watch, download, or delete anytime."
                            icon={<IoLibraryOutline />}
                        />
                        <FeatureCard
                            title="One-click downloads"
                            description="Export in WebM format with a single click. Quick and reliable. No fuss."
                            icon={<FaDownload />}
                        />
                        <FeatureCard
                            title="Sharable links"
                            description="Generate a link and share your recording. Ideal for async feedback and team updates."
                            icon={<IoMdShareAlt />}
                        />
                    </div>
                </div>
            </section>
            <section className='testimonial'>
                <div className="testimonial-wrapper">
                    <div className="tag">
                        <span>
                            Testimonials
                        </span>
                    </div>
                    <h2>
                        What <span>users</span> are saying.
                    </h2>
                    <p className='testimonial-description'>
                        Trusted by thousands of users and remote workers around the world.
                    </p>
                    <div className="testimonial-card__wrapper">
                        <TestimonialCard 
                            text={`"Stroomify makes screen recording so easy for us at Brooi. Just click and record. No hassle."`}
                            description="Founder of Brooi"
                            name="Jeff Benson"
                            image="/rDEgo0yhj2Qldk12p9Px3Vo65g8.avif"
                        />
                        <TestimonialCard 
                            text={`"Since using Stroomify, my screen recording process has become so much easier. I can record, edit, and share in no time."`}
                            description="Software Engineer at TechCorp"
                            name="Sarah Johnson"
                            image="/zfmF1iFYDX2iAwx2tDdmHAHKsKY.avif"
                        />
                        <TestimonialCard 
                            text={`"Stroomify is a game changer for remote teams. We can easily record and share our screens without any hassle."`}
                            description="Product Manager at InnovateX"
                            name="Michael Smith"
                            image="/rDEgo0yhj2Qldk12p9Px3Vo65g8.avif"
                        />
                        <TestimonialCard 
                            text={`"Stroomify makes our team's screen recording process so much smoother. I love the one-click recording feature!"`}
                            description="UX Designer at CreativeHub"
                            name="Emily Davis"
                            image="/Inuou987yLKbSzFSEWH9F4znyc.avif"
                        />
                        <TestimonialCard 
                            text={`"Stroomify is the best screen recording tool I've used. It's fast, easy to use, and the quality is top-notch."`}
                            description="Marketing Specialist at Brandify"
                            name="David Lee"
                            image="/rDEgo0yhj2Qldk12p9Px3Vo65g8.avif"
                        />
                        <TestimonialCard 
                            text={`"Stroomify has transformed the way we record and share our screens. It's a must-have tool for remote workers."`}
                            description="Content Creator at MediaPro"
                            name="Mike Murphy"
                            image="/rDEgo0yhj2Qldk12p9Px3Vo65g8.avif"
                        />
                    </div>
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
                                    30 recordings
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    25 minutes recording limit
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Download to device
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Screen + mic recording
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Stroomify watermark
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Access recording library
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Clean UI
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No shareable links
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No slack integration
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Customer support (email)
                                </li>
                            </ul>
                            <button onClick={() => setShowAuthCard(true)}>
                            <span>
                                Try Stroomify for free
                            </span>
                            </button>
                        </div>
                        <div className="price-card">
                            <h3>
                                Pro
                            </h3>
                            <p>
                                For remote workers
                            </p>
                            <span>
                                $8/month
                            </span>
                            <ul>
                                <li>
                                    <FaCheckCircle />
                                    Unlimited videos
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    12 hours recording limit
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    No watermark
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Webcam overlay
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Instant preview
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Recording library
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Save to library (cloud)
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Sharable links
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Slack integration
                                </li>
                                <li>
                                    <FaCheckCircle />
                                    Priority support
                                </li>
                            </ul>
                            <button>
                            <span>
                                Start 7-day free trial
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
                        Have a question about Stroomlify? Here's everything you need to know about Stroomlify.
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
                            Try Stroomify for free
                        </span>
                    </button>
                </div>
            </section>
            <footer>
                <div className="footer-wrapper">
                    <div className="footer-top">
                        <p>
                            &copy; 2025 Stroomify. All rights reserved.
                        </p>
                        <div className="privacy">
                            <Link to="/">
                                About Us
                            </Link>
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
                            Powered by <a href="/">Stroomify Team</a>
                        </p>
                        <div className="socials">
                            <a href="/">
                                <FaTwitter />
                            </a>
                            <a href="/">
                                <FaLinkedinIn />
                            </a>
                            <a href="/">
                                <FaYoutube />
                            </a>
                            <a href="/">
                                <FaTiktok />
                            </a>
                        </div>
                     </div>
                     <div className="bottom-logo">
                        <span>
                            Stroomify
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