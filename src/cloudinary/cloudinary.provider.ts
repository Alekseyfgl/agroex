import {ConfigOptions, v2 } from 'cloudinary';
import {CLOUDINARY, CONFIG} from './constants/constants';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (): ConfigOptions => {
        return v2.config({
            cloud_name: CONFIG.CLOUD_NAME,
            api_key: CONFIG.API_KEY,
            api_secret: CONFIG.API_SECRET,
        });
    },
};