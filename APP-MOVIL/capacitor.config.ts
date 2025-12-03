import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.primaria.app',
  appName: 'MiApp',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'https://unknown-corrie-utsemintegradora-b23357e2.koyeb.app'
    ]
  }
};

export default config;