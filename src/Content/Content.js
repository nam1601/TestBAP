import classNames from 'classnames/bind';
import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { getVideo } from '~/GetApi';
import styles from './Content.module.scss';
import Video from './Video';
import {
    PullToRefresh,
    PullDownContent,
    ReleaseContent,
    RefreshContent,
} from 'react-js-pull-to-refresh';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Content({ ...props }) {
    const [content, setContent] = useState([]);

    const [pagination, setPagination] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [firstFetching, setFirstFetching] = useState(true);
    const listInnerRef = useRef();

    const fetchApi = async () => {
        const res = await getVideo('for-you', pagination);
        setContent((prev) => [...prev, ...res.data]);
        setPagination(pagination + 1);
        if (res.data.length === 0 || pagination === res.meta.pagination.total) {
            setHasMore(false);
        }
    };
    useEffect(() => {
        const theFirstFetch = async () => {
            const res = await getVideo('for-you', 1);
            setContent([...res.data]);
        };
        theFirstFetch();
    }, []);
    const handlePull = async () => {
        setPagination(1);
        const res = await getVideo('for-you', pagination);
        setContent([...res.data]);
        setPagination(2);
    };
    return (
        <div>
            <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={200}
                triggerHeight={50}
                backgroundColor="white"
                startInvisible={true}
                onRefresh={handlePull}
            >
                <div className={cx('wrapper')} id="content" ref={listInnerRef}>
                    <InfiniteScroll
                        dataLength={content.length}
                        next={fetchApi}
                        hasMore={hasMore}
                    >
                        {content.map((item, index) => (
                            <div className={cx('post-block')} key={index}>
                                <div className={cx('account')}>
                                    <div className={cx('info-block')}>
                                        <div className={cx('video-block')}>
                                            <Video
                                                description={item.description}
                                                src={item.file_url}
                                                index={index}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </PullToRefresh>
        </div>
    );
}

export default Content;
