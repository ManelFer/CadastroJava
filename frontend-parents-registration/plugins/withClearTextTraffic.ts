const { withAndroidManifest } = require('@expo/config-plugins');
import { ConfigPlugin, AndroidManifest } from '@expo/config-plugins';

interface AndroidManifestApplication {
    $: {
        'android:usesCleartextTraffic'?: string;
    };
}

interface AndroidManifestRoot {
    $?: {
        'xmlns:android'?: string;
    };
    application?: AndroidManifestApplication[];
}

const withClearTextTraffic: ConfigPlugin = function (config) {
    return withAndroidManifest(config, async (config: { modResults: { manifest: AndroidManifestRoot } }) => {
        const androidManifest: AndroidManifestRoot = config.modResults.manifest;

        if (!androidManifest.$) {
            androidManifest.$ = {
                'xmlns:android': 'http://schemas.android.com/apk/res/android',
            };
        }

        if (!androidManifest.application) {
            androidManifest.application = [{
                $: {
                    'android:usesCleartextTraffic': 'true',
                }
            }];
        } else {
            androidManifest.application[0].$['android:usesCleartextTraffic'] = 'true';
        }

        return config;
    });
};

module.exports = withClearTextTraffic;