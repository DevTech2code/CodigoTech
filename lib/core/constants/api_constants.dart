class ApiConstants {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://asset-app-back.onrender.com',
  );

  static const Duration requestTimeout = Duration(seconds: 25);

  static const String authLoginPath = '/auth/login';
  static const String assetsByPersonPath = '/assets/by-person';
}
