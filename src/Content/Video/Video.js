import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import useElementOnScreen from '~/Hook/useElementOnScreen';
import styles from './Video.module.scss';
const cx = classNames.bind(styles);
function Video({ ...props }) {
    const refVideo = useRef();
    const [progress, setProgress] = useState(0);

    const [playing, setPlaying] = useState(false);
   
    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const isVisible = useElementOnScreen(options, refVideo);
    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                // Rewind the video and play from beginning
                refVideo.current.currentTime = 0;
                refVideo.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                refVideo.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisible, playing]);
    const handleValue = (e) => {
        if (isNaN(e.duration)) {
            return;
        }
        setProgress((e.target.currentTime / e.target.duration) * 100);
    };

    
    return (
        <div className={cx('wrapper')}>
            <video
                onProgress={handleValue}
                loop
                ref={refVideo}
                onLoad={() => (refVideo.current.volume = 0.3)}
                muted
                controls
                playsInline
                className={cx('video')}
            >
                <source src={props.src} type="video/mp4" />
            </video>
        </div>
    );
}

export default Video;
