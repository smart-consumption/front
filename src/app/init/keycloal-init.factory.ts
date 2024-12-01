import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    const isBrowser = typeof window !== 'undefined';

    return keycloak.init({
      config: {
        url: 'http://keycloak.local:9090/',
        realm: 'smart-consumption',
        clientId: 'api-gateway'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: isBrowser
          ? window.location.origin + '/assets/silent-check-sso.html'
          : '', // Deja vacío o usa un valor predeterminado para SSR
        checkLoginIframe: false,
        pkceMethod: 'S256',
      },
    });
  };
}
