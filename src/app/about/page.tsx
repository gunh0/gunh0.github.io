import styles from '../posts/[...slug]/page.module.css';

export const metadata = {
  title: 'About | gunh0\'s Tech Blog',
  description: 'About gunh0 - Cloud Security Engineer specializing in DevSecOps',
};

export default function About() {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>About</h1>
        </header>

        <div className={styles.content}>
          <p>
            He&apos;s a Cloud Security Engineer with expertise in DevSecOps and data-driven security solutions, 
            currently working at Hyundai AutoEver in Seoul, South Korea. His professional journey spans 
            multiple aspects of cybersecurity, from cloud security and Zero Trust implementation to threat 
            intelligence and autonomous vehicle security research.
          </p>

          <p>
            His work focuses on developing and implementing security solutions for cloud-native environments, 
            with particular emphasis on Cloud Security Posture Management (CSPM), Cloud Infrastructure 
            Entitlement Management (CIEM), and Zero Trust architectures. He has contributed to several 
            patented technologies in cloud security and threat detection, demonstrating his commitment to 
            innovation in the field.
          </p>

          <p>
            With experience at companies like Tatum Security and S2W Inc., he has developed extensive 
            knowledge in cloud security, cybersecurity data analysis, and threat intelligence. His academic 
            background includes research at Korea University, where he worked on NLP-based Cyber Threat 
            Intelligence systems and autonomous vehicle security in collaboration with Samsung.
          </p>

          <p>
            He is passionate about integrating development expertise with cybersecurity strategies to create 
            robust defense mechanisms against evolving threats. His approach combines technical proficiency 
            with a deep understanding of security principles, particularly in cloud and DevOps environments.
          </p>

          <p>
            If you have questions about his work or would like to discuss collaboration opportunities, feel 
            free to reach out.
          </p>

          <h2>Contact</h2>
          <ul>
            <li>Email: <a href="mailto:devgun@korea.ac.kr">devgun@korea.ac.kr</a></li>
            <li>GitHub: <a href="https://github.com/gunh0" target="_blank" rel="noopener noreferrer">github.com/gunh0</a></li>
            <li>LinkedIn: <a href="https://linkedin.com/in/gunh0902" target="_blank" rel="noopener noreferrer">linkedin.com/in/gunh0902</a></li>
          </ul>
        </div>
      </article>
    </div>
  );
}
