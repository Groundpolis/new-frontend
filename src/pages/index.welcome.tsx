import React, { useEffect, useMemo, useRef, useState } from 'react';
import Particles from 'react-tsparticles';
import { ISourceOptions } from 'tsparticles';
import groundpolisLogo from '../assets/icon_transparent.svg';
import AboutGroundpolis from '../components/welcome/AboutGroundpolis';
import AboutServer from '../components/welcome/AboutServer';
import DisabledRegisterCard from '../components/welcome/DisabledRegisterCard';
import Skyline from '../components/welcome/Skyline';
import { Article } from '../components/welcome/styled/Article';
import { Container } from '../components/welcome/styled/Container';
import { Hero } from '../components/welcome/styled/Hero';
import { Sky } from '../components/welcome/styled/Sky';
import TimelinePreview from '../components/welcome/TimelinePreview';
import VersionInfo from '../components/welcome/VersionInfo';
import { useAuthenticate } from '../hooks/useAuthenticate';
import { useDarkTheme } from '../hooks/useDarkTheme';
import { useFixedLayout } from '../hooks/useFixedLayout';
import { useAppSelector } from '../store';


const sky: ISourceOptions = {
  particles: {
    move: {
      speed: 2,
    },
    shape: {
      type: 'square'
    },
  },
  retina_detect: true,
};

export default function WelcomePage() {
  useDarkTheme();
  useFixedLayout('zen');
  const authenticate = useAuthenticate();

  const { meta, host } = useAppSelector(state => state.session);
  if (meta === null || host === null) throw new TypeError();

  const [width, setWidth] = useState(document.body.clientWidth);
  const [isInvisible, setInvisible] = useState(false);

  const repeat = useMemo(() => Math.ceil(width / 504) + 1, [width]);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const instanceName = meta.name || 'Groundpolis';
  const isDisabledRegistration = meta.disableRegistration && meta.disableInvitation;

  useEffect(() => {
    const onResize = () => {
      setWidth(document.body.clientWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  useEffect(() => {
    setInvisible(true);
  }, [repeat]);

  useEffect(() => {
    if (isInvisible) {
      setInvisible(false);
    }
  }, [isInvisible]);

  // const createNew = () => {
  //   showModal(RegisterAccountDialog);
  // };

  // const login = () => {
  //   showModal(LoginDialog);
  // };

  return (
    <>
      <Sky className="flex f-bottom">
        <Particles className="stars bg-skyblue-9" options={sky} params={{preset: 'stars', autoPlay: true,}} />
        {!isInvisible && new Array(repeat).fill(<Skyline/>)}
        <Hero>
          <div className="main">
            <h1 className="shadow-1-t">
              {meta.logoImageUrl ? (
                <img src={meta.logoImageUrl} alt={meta.name ?? ''} className="logo" />
              ) : (
                <>
                  <img src={meta.iconUrl ?? groundpolisLogo} alt="" className="icon" />
                  {instanceName}
                </>
              )}
            </h1>
            <div className="desc">
              <h2 className="text-primary shadow-1-t text-125">
                <span className="text-150">??????</span>???????????????
                <span className="text-150">??????</span>????????????<br/>
                ??????????????? ???????????????????????????
              </h2>
              <p className="shadow-1-t">
                ?????????????????????????????????????????????????????????<br/>
                ??????????????????????????????????????????????????????
              </p>
              <div className="card acrylic shadow-1 mt-4 registration">
                <div className="body pa-2">
                  {isDisabledRegistration && <DisabledRegisterCard meta={meta}/>}
                  <div className="hstack">
                    {/* {isDisabledRegistration ? ( */}
                    {/* <a href="https://join.misskey.page/instances" className="btn shadow-1 text-bold primary" target="_blank" rel="noreferrer noopener"> */}
                    {/* ????????????????????? <i className="fas fa-external-link-alt ml-1"/> */}
                    {/* </a> */}
                    {/* ) : ( */}
                    <button className="btn shadow-1 text-bold primary" onClick={authenticate}>????????????</button>
                    {/* )} */}
                    <button className="btn shadow-1 text-bold" onClick={() => descriptionRef.current?.scrollIntoView({behavior: 'smooth'})}>
                      ?????????
                    </button>
                  </div>
                  {/* <p className="mt-2">????????????????????????????????????<button className="btn link pa-0" onClick={login}>????????????</button></p> */}
                </div>
              </div>
              <VersionInfo meta={meta} />
            </div>
          </div>
          <TimelinePreview />
        </Hero>
      </Sky>
      <Container ref={descriptionRef}>
        <AboutServer meta={meta} />
        <div className="bg-primary mx-auto" style={{width: '80%', height: 1, marginTop: '5rem', marginBottom: '5rem'}} />
        <AboutGroundpolis meta={meta} />
        <Article>
          <footer className="text-center py-4 text-dimmed">
            <div>(C){new Date().getFullYear()} {meta.maintainerName}</div>
          </footer>
        </Article>
      </Container>
    </>
  );
}
