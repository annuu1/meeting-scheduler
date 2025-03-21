import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css'

import heroImage from '../assets/hero_img.png'
import feature1 from '../assets/feature1.png'
import feature2 from '../assets/feature2.png'
function Home() {
  return (
    <div>
        <header className={styles.header}>
            <div className='logo'>CNNCT</div>
            <Link to="/signup" className={styles.signupBtn} > Sign up free</Link>
        </header>
        <main className={styles.main}>
            <div className={styles.hero}>
                <h1>CNNCT – Easy 
                Scheduling Ahead</h1>
                <Link to="/signup" className={`${styles.signupBtn} ${styles.large}`} > Sign up free</Link>
                <img src={heroImage} alt="sample image" className={styles.heroImage} />
                <h2>Simplified scheduling for you and your team</h2>
                <p>CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link, and let others book time with you instantly.</p>
            </div>
            <div className={styles.feature}>
                <div>
                    <div><h1>Stay Organized with Your Calendar & Meetings</h1></div>
                    <div>
                    <div className={styles['list-caption']}>Seamless Event Scheduling</div>
                        <ul className={styles.list}>
                            <li className={styles['list-item']} >View all your upcoming meetings and appointments in one place.</li>
                            <li className={styles['list-item']}>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts</li>
                            <li className={styles['list-item']}>Customize event types: one-on-ones, team meetings, group sessions, and webinars.</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    <div className={styles.croppedCard1}>
                    <img src={feature1} alt="feature image" className={`${styles.card} ${styles.card1}`} />
                    </div>
                    <div className={styles.croppedCard2}>
                    <img src={feature2} alt="feature image" className={`${styles.card} ${styles.card2}`} />
                    </div>
                </div>
            </div>
            <div className={styles.review}>
                <div className={styles.reviewHead}>
                    <div> <h1>Here's what our customer
                    has to says</h1>
                    <Link to='#' className={styles.storyBtn}>Read customer stories</Link>
                    </div>
                    <div>some text</div>
                </div>
                <div className={styles.testimonials}>
                    <div className={styles.testimonialCard}>
                        <h1>Amazing tool! Saved me months</h1>
                        <h3>This is placeholder for you testimonials and what your clients has to day, put them here and make sure its 100% true and meaningful.</h3>
                        <div className={styles.userInfo}>
                            <div className={styles.userPic}></div>
                            <div className={styles.userDetails}>
                                <h3 >John Doe</h3>
                                <h3>Director, Spark.com</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.testimonialCard}>
                        <h1>Amazing tool! Saved me months</h1>
                        <h3>This is placeholder for you testimonials and what your clients has to day, put them here and make sure its 100% true and meaningful.</h3>
                        <div className={styles.userInfo}>
                            <div className={styles.userPic}></div>
                            <div className={styles.userDetails}>
                                <h3 >John Doe</h3>
                                <h3>Director, Spark.com</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.testimonialCard}>
                        <h1>Amazing tool! Saved me months</h1>
                        <h3>This is placeholder for you testimonials and what your clients has to day, put them here and make sure its 100% true and meaningful.</h3>
                        <div className={styles.userInfo}>
                            <div className={styles.userPic}></div>
                            <div className={styles.userDetails}>
                                <h3 >John Doe</h3>
                                <h3>Director, Spark.com</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.testimonialCard}>
                        <h1>Amazing tool! Saved me months</h1>
                        <h3>This is placeholder for you testimonials and what your clients has to day, put them here and make sure its 100% true and meaningful.</h3>
                        <div className={styles.userInfo}>
                            <div className={styles.userPic}></div>
                            <div className={styles.userDetails}>
                                <h3 >John Doe</h3>
                                <h3>Director, Spark.com</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.integrations}>
                    <h1>All Link Apps and Integrations</h1>
                    <div className={styles.integrationsList}>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>Audiomack</h3>
                            <h3>AAdd an Audiomack player to your Linktree</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>
                    <div className={styles.integration}>
                        <div className={styles.appIcon}></div>
                        <div className={styles.appDetails}>
                            <h3>App Name</h3>
                            <h3>App Description</h3>
                        </div>
                    </div>

                    </div>
                    

                </div>
            </div>
        </main>
        
    </div>
  )
}

export default Home