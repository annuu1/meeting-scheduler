import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

import heroImage from "../assets/hero_img.png";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";

import twitter from "../assets/icons/twitter.svg";
import instagram from "../assets/icons/instagram.svg";
import youtube from "../assets/icons/youtube.svg";
import tiktok from "../assets/icons/tiktok.svg";
import discord from "../assets/icons/discord.svg";

import logo from "../assets/logo.png"
function Home() {
  const testimonials = [
    {
      text: "AMAZING TOOL! Saved me months\nThis is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "JOHN MASTER",
      title: "Director, Spark.com",
    },
    {
      text: "AMAZING TOOL! Saved me months\nThis is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "JOHN MASTER",
      title: "Director, Spark.com",
    },
    {
      text: "AMAZING TOOL! Saved me months\nThis is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "JOHN MASTER",
      title: "Director, Spark.com",
    },
    {
      text: "AMAZING TOOL! Saved me months\nThis is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "JOHN MASTER",
      title: "Director, Spark.com",
    },
  ];

  const integrations = [
    {
      name: "Audiomack",
      icon: "🎵",
      description: "Add an Audiomack player to your Linktree",
    },
    {
      name: "Bandsintown",
      icon: "🎤",
      description: "Drive ticket sales by listing your events",
    },
    {
      name: "Bonfire",
      icon: "🔥",
      description: "Display and sell your custom merch",
    },
    {
      name: "Cameo",
      icon: "🎉",
      description: "Make impossible fan connections possible",
    },
    {
      name: "Books",
      icon: "📚",
      description: "Promote books on your Linktree",
    },
    {
      name: "Buy Me a Gift",
      icon: "🎁",
      description: "Let visitors support you with a small gift",
    },
    {
      name: "Clubhouse",
      icon: "👋",
      description: "Let your community in the conversation",
    },
    {
      name: "Community",
      icon: "📱",
      description: "Build an SMS subscriber list",
    },
    {
      name: "Contact Details",
      icon: "📧",
      description: "Easily share downloadable contact details",
    },
  ];

  const icons = [
    { src: twitter, alt: 'Twitter', key: 'twitter' },
    { src: instagram, alt: 'Instagram', key: 'instagram' },
    { src: youtube, alt: 'YouTube', key: 'youtube' },
    { src: tiktok, alt: 'Music', key: 'music' },
    { src: discord, alt: 'Discord', key: 'discord' },
  ];


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt="" />
          CNNCT
          </div>
        <Link to="/signup" className={styles.signupBtn}>
          {" "}
          Sign up free
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 style={{ textAlign: "center" }}>
            CNNCT – Easy <br />
            Scheduling Ahead
          </h1>
          <Link to="/signup" className={`${styles.signupBtn} ${styles.large}`}>
            {" "}
            Sign up free
          </Link>
          <img
            src={heroImage}
            alt="sample image"
            className={styles.heroImage}
          />
          <h2>Simplified scheduling for you and your team</h2>
          <p style={{ textAlign: "center" }}>
            CNNCT eliminates the back-and-forth of scheduling meetings so you
            can focus on what matters. Set your availability, share your link,
            and let others book time with you instantly.
          </p>
        </div>
        <div className={styles.feature}>
          <div>
            <div>
              <h1>Stay Organized with Your Calendar & Meetings</h1>
            </div>
            <div>
              <div className={styles["list-caption"]}>
                Seamless Event Scheduling
              </div>
              <ul className={styles.list}>
                <li className={styles["list-item"]}>
                  View all your upcoming meetings and appointments in one place.
                </li>
                <li className={styles["list-item"]}>
                  Syncs with Google Calendar, Outlook, and iCloud to avoid
                  conflicts
                </li>
                <li className={styles["list-item"]}>
                  Customize event types: one-on-ones, team meetings, group
                  sessions, and webinars.
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            <div className={styles.croppedCard1}>
              <img
                src={feature1}
                alt="feature image"
                className={`${styles.card} ${styles.card1}`}
              />
            </div>
            <div className={styles.croppedCard2}>
              <img
                src={feature2}
                alt="feature image"
                className={`${styles.card} ${styles.card2}`}
              />
            </div>
          </div>
        </div>
        <div className={styles.review}>
          <div className={styles.reviewHead}>
            <div>
              {" "}
              <h1>
                Here's what our{" "}
                <span style={{ color: "rgb(4, 100, 226)" }}>customer</span>
                has to says
              </h1>
              <Link to="#" className={styles.storyBtn}>
                Read customer stories
              </Link>
            </div>
          </div>
          <div className={styles.testimonials}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={styles.testimonialCard}
                style={
                  index === 1 || index === 2 ? { backgroundColor: "#fff" } : {}
                }
              >
                <h1>{testimonial.title}</h1>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.userInfo}>
                  <div className={styles.userPic}></div>
                  <div className={styles.userDetails}>
                    <h2>{testimonial.author}</h2>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.integrations}>
            <h1>All Link Apps and Integrations</h1>
            <div className={styles.integrationsList}>
              {integrations.map((integration, index) => (
                <div key={index} className={styles.integration}>
                  <div className={styles.appIcon}> {integration.icon}</div>
                  <div className={styles.appDetails}>
                    <h3>{integration.name}</h3>
                    <p>{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Footer Section */}
          <footer className={styles["footer"]}>
            <div className={styles["footer-content"]}>
              <div className={styles["footer-buttons"]}>
                <button className={styles["footer-button"]}>Log in</button>
                <button className={styles["footer-button-primary"]}>
                  Sign up free
                </button>
              </div>
              <div className={styles["footer-links"]}>
                <div className={styles["footer-column"]}>
                  <a href="#" className={styles["footer-link"]}>
                    About CNNCT
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Blog
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Press
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                  Social Good
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Contact
                  </a>
                </div>
                <div className={styles["footer-column"]}>
                  <a href="#" className={styles["footer-link"]}>Careers</a>
                  <a href="#" className={styles["footer-link"]}>
                    Getting Started
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Features and How-Tos
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    FAQ
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                  Report a Violation
                  </a>
                </div>
                <div className={styles["footer-column"]}>
                  <a href="#" className={styles["footer-link"]}>
                    Terms and Conditions
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Privacy Policy
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Cookie Notice
                  </a>
                  <a href="#" className={styles["footer-link"]}>
                    Trust Center
                  </a>
                </div>
              </div>
            </div>
            <div className={styles["footer-bottom"]}>
            <p className={styles["footer-acknowledgment"]}>
              We acknowledge the Traditional Custodians of the LAND on which our
              office stands, The Wurundjeri people of the Kulin Nation, and pay
              our respects to Elders past, present and emerging.
            </p>
            <div className={styles["social-icons"]}>
            {icons.map((icon) => (
        <span key={icon.key} className={styles["social-icon"]}>
          <img src={icon.src} alt={icon.alt} className={styles["icon-image"]} />
        </span>
      ))}
            </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;
