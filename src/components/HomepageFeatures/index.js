import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Self-Hosting',
    Svg: require('@site/static/img/undraw_server_9eix.svg').default,
    description: (
      <>
        I like to manage my services for fun. No users. All containers. Constant experimentation.
      </>
    ),
  },
  {
    title: 'Game Design',
    Svg: require('@site/static/img/undraw_retro-video-game_l9zp.svg').default,
    description: (
      <>
        From blender doughnuts, Trenchbroom, Godot, to Comfy-UI workflows. I'll share that stuff here.
      </>
    ),
  },
  {
    title: 'Resume',
    Svg: require('@site/static/img/undraw_resume_jrgi.svg').default,
    description: (
      <>
        I'm currently employed with Columbia Southern University as a Sr. System Admin.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
