import 'dotenv/config';

export default {
  expo: {
    name: "arqueo_new",
    slug: "arqueonew",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/descarga.png",
    scheme: "arqueo",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      permissions: ["android.permission.CAMERA"],
      package: "com.aplicaciones.arqueo"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-sqlite"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      EXPO_PUBLIC_LOGIN: process.env.EXPO_PUBLIC_LOGIN,
      EXPO_PUBLIC_SERVIRED: process.env.EXPO_PUBLIC_SERVIRED,
      EXPO_PUBLIC_MULTIRED: process.env.EXPO_PUBLIC_MULTIRED,
      EXPO_PUBLIC_PDF_SERVIRED: process.env.EXPO_PUBLIC_PDF_SERVIRED,
      EXPO_PUBLIC_PDF_MULTIRED: process.env.EXPO_PUBLIC_PDF_MULTIRED,
      eas: {
        projectId: "3fec5562-a7f6-4e72-8a9a-2a42aa7272ef"
      }
    },
    owner: "aplicaciones"
  }
};
