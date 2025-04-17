import { Link } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaCheckCircle } from "react-icons/fa";
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


const Home = () => {

    const homeFaqs = [
        {
          index: 0,
          question: "What is Stroomify?",
          answer:
            "Stroomify is a simple screen recording app built for remote workers and professionals who want fast, frictionless recording."
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
            "Yes — 20 minutes per recording. Need more time? Just start a new recording after each 25-minute session."
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
            "Stroomify is free. Soon, we’ll offer paid features like AI tools, custom watermarks, 1080p/4K recording, offline mode, sharing, and an API — all at affordable prices. Stay tuned!"
        },
        {
          index: 6,
          question: "Is there a mobile version?",
          answer:
            "Not yet. Stroomify is currently web-only, but we’re working on a mobile version. Stay tuned."
        },
        {
          index: 7,
          question: "Is my data secure?",
          answer:
            "Yes. Your recordings are stored securely. We use encryption and follow best practices to keep your data safe."
        },
        {
          index: 8,
          question: "Do you offer support?",
          answer:
            "Yes. Reach out to our support team anytime at stroomlify.io"
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
                            Stroomify provides professionals with a simple, fast, and easy way to record their screen. Just fast and easy.
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
                            description="In just two clicks, signup with Google. No authentication hassle. No friction."
                            icon={<IoIosLogIn />}
                        />
                        <HowItWorksCard
                            title="Record your screen"
                            description="In your dashboard, select the screen and audio you want to record, and click on the record button."
                            icon={<BsRecord2 />}
                        />
                        <HowItWorksCard
                            title="Download recording"
                            description="Once you’re done recording, download the video to your device or auto save to library to share with friends or team."
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
                            description="Start recording your entire screen, window, or browser tab with a single click. No setup. No fluff."
                            icon={<RiRecordCircleFill />}
                        />
                        <FeatureCard
                            title="Audio Capture"
                            description="Capture audio from your system and microphone simultaneously. Perfect for tutorials and presentations."
                            icon={<AiFillAudio />}
                        />
                        <FeatureCard
                            title="Preview modal"
                            description="Preview your recording instantly before downloading. No need to wait for processing."
                            icon={<MdOutlinePreview />}
                        />
                        <FeatureCard
                            title="Recording Library"
                            description="Access all your recordings in one place. Easily manage, download, or delete them."
                            icon={<IoLibraryOutline />}
                        />
                        <FeatureCard
                            title="One-click downloads"
                            description="Download your recordings in WebM format with a single click. No fuss, no hassle."
                            icon={<FaDownload />}
                        />
                        <FeatureCard
                            title="Sharable link"
                            description="Easily share your recordings with a simple link. Perfect for collaboration."
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
                                Try Stroomify for free
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