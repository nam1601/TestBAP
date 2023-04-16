import httpRequest from './httpRequest';

export const getVideo = async (type = 'for-you', page) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {}
};
